from fastapi import APIRouter
from app.api.v1.endpoints import (
    auth,
    users,
    products,
    categories,
    cart,
    wishlist,
    addresses,
    orders,
    oauth,
    notifications,
)

api_router = APIRouter()

api_router.include_router(auth.router)
api_router.include_router(oauth.router)
api_router.include_router(users.router)
api_router.include_router(products.router)
api_router.include_router(categories.router)
api_router.include_router(cart.router)
api_router.include_router(wishlist.router)
api_router.include_router(addresses.router)
api_router.include_router(orders.router)
api_router.include_router(notifications.router)
