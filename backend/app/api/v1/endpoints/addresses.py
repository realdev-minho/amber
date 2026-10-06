from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete, update
from app.db.session import get_db
from app.models.order import Address
from app.models.user import User
from app.schemas.order import AddressCreateSchema, AddressOutSchema
from app.api.deps import get_current_user

router = APIRouter(prefix="/addresses", tags=["Addresses"])


@router.get("", response_model=List[AddressOutSchema])
async def get_addresses(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    res = await db.execute(
        select(Address)
        .where(Address.user_id == current_user.id)
        .order_by(Address.is_default.desc(), Address.created_at.desc())
    )
    return res.scalars().all()


@router.post("", response_model=AddressOutSchema)
async def create_address(
    payload: AddressCreateSchema,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if payload.is_default:
        await db.execute(
            update(Address)
            .where(Address.user_id == current_user.id)
            .values(is_default=False)
        )

    addr = Address(
        user_id=current_user.id,
        full_name=payload.full_name,
        phone=payload.phone,
        street=payload.street,
        apartment=payload.apartment,
        city=payload.city,
        state=payload.state,
        country=payload.country,
        postal_code=payload.postal_code,
        is_default=payload.is_default,
    )
    db.add(addr)
    await db.commit()
    await db.refresh(addr)
    return addr


@router.patch("/{address_id}", response_model=AddressOutSchema)
async def update_address(
    address_id: str,
    payload: AddressCreateSchema,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    res = await db.execute(
        select(Address).where(
            Address.id == address_id,
            Address.user_id == current_user.id,
        )
    )
    addr = res.scalar_one_or_none()
    if not addr:
        raise HTTPException(status_code=404, detail="Address not found")

    if payload.is_default:
        await db.execute(
            update(Address)
            .where(Address.user_id == current_user.id)
            .values(is_default=False)
        )

    addr.full_name = payload.full_name
    addr.phone = payload.phone
    addr.street = payload.street
    addr.apartment = payload.apartment
    addr.city = payload.city
    addr.state = payload.state
    addr.country = payload.country
    addr.postal_code = payload.postal_code
    addr.is_default = payload.is_default

    db.add(addr)
    await db.commit()
    await db.refresh(addr)
    return addr


@router.delete("/{address_id}")
async def delete_address(
    address_id: str,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    res = await db.execute(
        select(Address).where(
            Address.id == address_id,
            Address.user_id == current_user.id,
        )
    )
    addr = res.scalar_one_or_none()
    if not addr:
        raise HTTPException(status_code=404, detail="Address not found")

    await db.execute(
        delete(Address).where(
            Address.id == address_id,
            Address.user_id == current_user.id,
        )
    )
    await db.commit()
    return {"message": "Address deleted"}
