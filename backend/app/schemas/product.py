from typing import List, Optional
from pydantic import BaseModel, Field


class CategoryOutSchema(BaseModel):
    id: str
    name: str
    slug: str
    description: Optional[str] = None
    image_url: Optional[str] = None
    product_count: int = 0

    class Config:
        from_attributes = True


class ProductImageSchema(BaseModel):
    id: str
    url: str
    alt_text: str = ""
    is_primary: bool = False

    class Config:
        from_attributes = True


class ProductVariantSchema(BaseModel):
    id: str
    name: str
    sku: str
    color: Optional[str] = None
    size: Optional[str] = None
    price_modifier: float = 0.0
    stock: int = 10

    class Config:
        from_attributes = True


class ProductOutSchema(BaseModel):
    id: str
    slug: str
    name: str
    brand: str
    description: str
    category: str
    price: float
    original_price: Optional[float] = None
    discount_percentage: Optional[int] = None
    stock: int
    rating: float
    review_count: int
    is_featured: bool = False
    is_offer: bool = False
    free_shipping: bool = False
    images: List[ProductImageSchema] = []
    variants: List[ProductVariantSchema] = []

    class Config:
        from_attributes = True


class ReviewCreateSchema(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    title: str = Field(..., min_length=3, max_length=150)
    body: str = Field(..., min_length=10, max_length=1000)


class ReviewOutSchema(BaseModel):
    id: str
    product_id: str
    user_id: str
    rating: int
    title: str
    body: str
    verified_purchase: bool
    helpful_count: int

    class Config:
        from_attributes = True
