from typing import List, Optional
from pydantic import BaseModel, Field


class AddressCreateSchema(BaseModel):
    full_name: str = Field(..., min_length=2)
    phone: str = Field(..., min_length=8)
    street: str = Field(..., min_length=4)
    apartment: Optional[str] = None
    city: str
    state: str
    country: str = "Nigeria"
    postal_code: str
    is_default: bool = False


class AddressOutSchema(AddressCreateSchema):
    id: str

    class Config:
        from_attributes = True


class OrderItemCreateSchema(BaseModel):
    product_id: str
    product_name: str
    product_image: str
    variant_details: Optional[str] = None
    price: float
    quantity: int = 1
    subtotal: float


class OrderCreateSchema(BaseModel):
    address_id: Optional[str] = None
    subtotal: float
    discount: float = 0.0
    delivery_fee: float = 0.0
    total: float
    delivery_method: str = "standard"
    payment_method: str = "card"
    items: List[OrderItemCreateSchema]


class OrderOutSchema(BaseModel):
    id: str
    order_number: str
    user_id: str
    subtotal: float
    discount: float
    delivery_fee: float
    total: float
    delivery_method: str
    status: str
    payment_method: str
    payment_status: str

    class Config:
        from_attributes = True
