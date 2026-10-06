from typing import Optional
from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.models.user import User
from app.schemas.auth import UserOutSchema
from app.api.deps import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])


class UserUpdateSchema(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None


class AvatarUpdateSchema(BaseModel):
    avatar_url: str


@router.get("/me", response_model=UserOutSchema)
async def get_me(user: User = Depends(get_current_user)):
    return user


@router.patch("/me", response_model=UserOutSchema)
async def update_me(
    payload: UserUpdateSchema,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if payload.first_name:
        user.first_name = payload.first_name
    if payload.last_name:
        user.last_name = payload.last_name
    if payload.phone:
        user.phone = payload.phone

    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


@router.patch("/me/avatar", response_model=UserOutSchema)
async def update_avatar(
    payload: AvatarUpdateSchema,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    user.avatar_url = payload.avatar_url
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user
