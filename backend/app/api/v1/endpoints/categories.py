from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.db.session import get_db
from app.models.product import Category, Product
from app.schemas.product import CategoryOutSchema, ProductOutSchema

router = APIRouter(prefix="/categories", tags=["Categories"])


@router.get("", response_model=List[CategoryOutSchema])
async def get_categories(db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(Category).order_by(Category.name.asc()))
    return res.scalars().all()


@router.get("/{slug}/products", response_model=List[ProductOutSchema])
async def get_category_products(slug: str, db: AsyncSession = Depends(get_db)):
    cat_res = await db.execute(select(Category).where(Category.slug == slug))
    cat = cat_res.scalar_one_or_none()
    if not cat:
        raise HTTPException(status_code=404, detail="Category not found")

    stmt = (
        select(Product)
        .options(selectinload(Product.images), selectinload(Product.variants))
        .where(Product.category.ilike(slug))
    )
    prod_res = await db.execute(stmt)
    return prod_res.scalars().all()
