from typing import List
import random
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.db.session import get_db
from app.models.order import Order, OrderItem
from app.models.notification import Notification
from app.models.user import User
from app.schemas.order import OrderCreateSchema, OrderOutSchema
from app.core.email import send_mailgun_email, get_order_email_template
from app.api.deps import get_current_user

router = APIRouter(prefix="/orders", tags=["Orders"])


@router.post("", response_model=OrderOutSchema)
async def create_order(
    payload: OrderCreateSchema,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    order_num = f"AMB-{random.randint(100000, 999999)}"

    order = Order(
        order_number=order_num,
        user_id=current_user.id,
        address_id=payload.address_id,
        subtotal=payload.subtotal,
        discount=payload.discount,
        delivery_fee=payload.delivery_fee,
        total=payload.total,
        delivery_method=payload.delivery_method,
        payment_method=payload.payment_method,
        status="processing",
        payment_status="paid",
    )
    db.add(order)
    await db.flush()

    for item in payload.items:
        db_item = OrderItem(
            order_id=order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            product_image=item.product_image,
            variant_details=item.variant_details,
            price=item.price,
            quantity=item.quantity,
            subtotal=item.subtotal,
        )
        db.add(db_item)

    # Insert notification for user
    notif = Notification(
        user_id=current_user.id,
        title="Order Confirmed",
        message=f"Order #{order.order_number} for ₦{int(order.total):,} has been received.",
        type="order",
    )
    db.add(notif)

    await db.commit()
    await db.refresh(order)

    # Dispatch Mailgun transactional confirmation email to real user
    if current_user.email:
        html = get_order_email_template(order.order_number, f"₦{int(order.total):,}")
        await send_mailgun_email(
            current_user.email,
            f"Order Confirmed #{order.order_number} - Amber",
            html,
        )

    return order


@router.get("", response_model=List[OrderOutSchema])
async def get_orders(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    res = await db.execute(
        select(Order)
        .where(Order.user_id == current_user.id)
        .order_by(Order.created_at.desc())
    )
    return res.scalars().all()


@router.get("/{order_id}")
async def get_order_by_id(
    order_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Order)
        .options(selectinload(Order.items))
        .where(
            (Order.user_id == current_user.id)
            & ((Order.id == order_id) | (Order.order_number == order_id))
        )
    )
    res = await db.execute(stmt)
    order = res.scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    return {
        "id": order.id,
        "order_number": order.order_number,
        "total": order.total,
        "subtotal": order.subtotal,
        "delivery_fee": order.delivery_fee,
        "status": order.status,
        "delivery_method": order.delivery_method,
        "items": order.items,
        "created_at": order.created_at,
    }
