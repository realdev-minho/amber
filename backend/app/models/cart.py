import uuid
from typing import Optional
from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db.base import Base, TimestampMixin


class Cart(Base, TimestampMixin):
    __tablename__ = "carts"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=True)

    items: Mapped[list["CartItem"]] = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base, TimestampMixin):
    __tablename__ = "cart_items"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    cart_id: Mapped[str] = mapped_column(String(36), ForeignKey("carts.id", ondelete="CASCADE"), index=True, nullable=False)
    product_id: Mapped[str] = mapped_column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    variant_id: Mapped[Optional[str]] = mapped_column(String(36), ForeignKey("product_variants.id", ondelete="SET NULL"), nullable=True)
    selected_color: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    selected_size: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    quantity: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)

    cart: Mapped["Cart"] = relationship("Cart", back_populates="items")


class Wishlist(Base, TimestampMixin):
    __tablename__ = "wishlists"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True, nullable=False)

    items: Mapped[list["WishlistItem"]] = relationship("WishlistItem", back_populates="wishlist", cascade="all, delete-orphan")


class WishlistItem(Base, TimestampMixin):
    __tablename__ = "wishlist_items"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    wishlist_id: Mapped[str] = mapped_column(String(36), ForeignKey("wishlists.id", ondelete="CASCADE"), index=True, nullable=False)
    product_id: Mapped[str] = mapped_column(String(36), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)

    wishlist: Mapped["Wishlist"] = relationship("Wishlist", back_populates="items")
