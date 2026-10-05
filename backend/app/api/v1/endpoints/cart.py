from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from app.db.session import get_db
from app.models.cart import Cart, CartItem
from app.models.product import Product
from app.models.user import User
from app.api.deps import get_optional_current_user

router = APIRouter(prefix="/cart", tags=["Cart"])


class CartItemAddSchema(BaseModel):
    product_id: str
    variant_id: Optional[str] = None
    selected_color: Optional[str] = None
    selected_size: Optional[str] = None
    quantity: int = 1


class CartItemUpdateSchema(BaseModel):
    quantity: int


def resolve_cart_user_id(user: Optional[User], x_session_id: Optional[str]) -> str:
    if user:
        return user.id
    if x_session_id and x_session_id.strip():
        return f"guest-{x_session_id.strip()}"
    return "guest-session"


async def get_or_create_cart(db: AsyncSession, user_id: str) -> Cart:
    res = await db.execute(
        select(Cart).options(selectinload(Cart.items)).where(Cart.user_id == user_id)
    )
    cart = res.scalar_one_or_none()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        await db.commit()
        await db.refresh(cart)
    return cart


@router.get("")
async def get_cart(
    user: Optional[User] = Depends(get_optional_current_user),
    x_session_id: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    user_id = resolve_cart_user_id(user, x_session_id)
    cart = await get_or_create_cart(db, user_id)
    return {
        "id": cart.id,
        "items": cart.items,
        "total_items": sum(i.quantity for i in cart.items),
        "subtotal": sum(i.price * i.quantity for i in cart.items),
    }


@router.post("/items")
async def add_item_to_cart(
    payload: CartItemAddSchema,
    user: Optional[User] = Depends(get_optional_current_user),
    x_session_id: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    user_id = resolve_cart_user_id(user, x_session_id)
    cart = await get_or_create_cart(db, user_id)
    prod_res = await db.execute(select(Product).where(Product.id == payload.product_id))
    product = prod_res.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    new_item = CartItem(
        cart_id=cart.id,
        product_id=product.id,
        variant_id=payload.variant_id,
        selected_color=payload.selected_color,
        selected_size=payload.selected_size,
        quantity=max(1, payload.quantity),
        price=product.price,
    )
    db.add(new_item)
    await db.commit()
    return {"message": "Item added to cart", "item_id": new_item.id}


@router.patch("/items/{item_id}")
async def update_cart_item(item_id: str, payload: CartItemUpdateSchema, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(CartItem).where(CartItem.id == item_id))
    item = res.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Cart item not found")

    item.quantity = max(1, payload.quantity)
    db.add(item)
    await db.commit()
    return {"message": "Cart item updated", "quantity": item.quantity}


@router.delete("/items/{item_id}")
async def delete_cart_item(item_id: str, db: AsyncSession = Depends(get_db)):
    await db.execute(delete(CartItem).where(CartItem.id == item_id))
    await db.commit()
    return {"message": "Cart item removed"}


@router.delete("")
async def clear_cart(
    user: Optional[User] = Depends(get_optional_current_user),
    x_session_id: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    user_id = resolve_cart_user_id(user, x_session_id)
    cart = await get_or_create_cart(db, user_id)
    await db.execute(delete(CartItem).where(CartItem.cart_id == cart.id))
    await db.commit()
    return {"message": "Cart cleared"}
