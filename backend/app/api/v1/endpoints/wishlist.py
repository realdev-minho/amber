from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Header
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete
from sqlalchemy.orm import selectinload
from app.db.session import get_db
from app.models.cart import Wishlist, WishlistItem
from app.models.product import Product
from app.models.user import User
from app.api.deps import get_optional_current_user

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])


class WishlistItemAddSchema(BaseModel):
    product_id: str


def resolve_wishlist_user_id(user: Optional[User], x_session_id: Optional[str]) -> str:
    if user:
        return user.id
    if x_session_id and x_session_id.strip():
        return f"guest-{x_session_id.strip()}"
    return "guest-session"


async def get_or_create_wishlist(db: AsyncSession, user_id: str) -> Wishlist:
    res = await db.execute(
        select(Wishlist).options(selectinload(Wishlist.items)).where(Wishlist.user_id == user_id)
    )
    wishlist = res.scalar_one_or_none()
    if not wishlist:
        wishlist = Wishlist(user_id=user_id)
        db.add(wishlist)
        await db.commit()
        await db.refresh(wishlist)
    return wishlist


@router.get("")
async def get_wishlist(
    user: Optional[User] = Depends(get_optional_current_user),
    x_session_id: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    user_id = resolve_wishlist_user_id(user, x_session_id)
    wishlist = await get_or_create_wishlist(db, user_id)
    return {
        "id": wishlist.id,
        "items": wishlist.items,
        "total_items": len(wishlist.items),
    }


@router.post("/items")
async def add_item_to_wishlist(
    payload: WishlistItemAddSchema,
    user: Optional[User] = Depends(get_optional_current_user),
    x_session_id: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    user_id = resolve_wishlist_user_id(user, x_session_id)
    wishlist = await get_or_create_wishlist(db, user_id)
    prod_res = await db.execute(select(Product).where(Product.id == payload.product_id))
    product = prod_res.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    existing_res = await db.execute(
        select(WishlistItem).where(
            WishlistItem.wishlist_id == wishlist.id,
            WishlistItem.product_id == product.id,
        )
    )
    if existing_res.scalar_one_or_none():
        return {"message": "Product already in wishlist"}

    item = WishlistItem(wishlist_id=wishlist.id, product_id=product.id)
    db.add(item)
    await db.commit()
    return {"message": "Product added to wishlist"}


@router.delete("/items/{product_id}")
async def remove_item_from_wishlist(
    product_id: str,
    user: Optional[User] = Depends(get_optional_current_user),
    x_session_id: Optional[str] = Header(None),
    db: AsyncSession = Depends(get_db),
):
    user_id = resolve_wishlist_user_id(user, x_session_id)
    wishlist = await get_or_create_wishlist(db, user_id)
    await db.execute(
        delete(WishlistItem).where(
            WishlistItem.wishlist_id == wishlist.id,
            WishlistItem.product_id == product_id,
        )
    )
    await db.commit()
    return {"message": "Product removed from wishlist"}
