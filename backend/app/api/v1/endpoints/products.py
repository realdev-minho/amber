from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.db.session import get_db
from app.models.product import Product
from app.models.order import Review
from app.schemas.product import ProductOutSchema, ReviewOutSchema, ReviewCreateSchema

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=List[ProductOutSchema])
async def get_products(
    category: Optional[str] = None,
    query: Optional[str] = None,
    is_offer: Optional[bool] = None,
    limit: int = Query(50, ge=1, le=100),
    offset: int = 0,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Product).options(selectinload(Product.images), selectinload(Product.variants))

    if category:
        stmt = stmt.where(Product.category.ilike(category))
    if is_offer:
        stmt = stmt.where((Product.discount_percentage >= 15) | (Product.is_offer == True))
    if query:
        pattern = f"%{query}%"
        stmt = stmt.where(
            Product.name.ilike(pattern) | Product.brand.ilike(pattern) | Product.description.ilike(pattern)
        )

    stmt = stmt.offset(offset).limit(limit)
    res = await db.execute(stmt)
    products = res.scalars().all()
    return products


@router.get("/{slug}", response_model=ProductOutSchema)
async def get_product_by_slug(slug: str, db: AsyncSession = Depends(get_db)):
    stmt = (
        select(Product)
        .options(selectinload(Product.images), selectinload(Product.variants))
        .where(Product.slug == slug)
    )
    res = await db.execute(stmt)
    product = res.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.get("/{product_id}/reviews", response_model=List[ReviewOutSchema])
async def get_product_reviews(product_id: str, db: AsyncSession = Depends(get_db)):
    stmt = select(Review).where(Review.product_id == product_id).order_by(Review.created_at.desc())
    res = await db.execute(stmt)
    return res.scalars().all()


@router.post("/{product_id}/reviews", response_model=ReviewOutSchema)
async def create_product_review(
    product_id: str,
    payload: ReviewCreateSchema,
    db: AsyncSession = Depends(get_db),
):
    review = Review(
        product_id=product_id,
        user_id="user-auth-id",
        rating=payload.rating,
        title=payload.title,
        body=payload.body,
        verified_purchase=True,
    )
    db.add(review)
    await db.commit()
    await db.refresh(review)
    return review
