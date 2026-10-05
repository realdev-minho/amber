from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.models.product import Category, Product, ProductImage
from app.core.security import get_password_hash


async def seed_initial_data(db: AsyncSession):
    # Check if products already exist
    res = await db.execute(select(Product).limit(1))
    if res.scalar_one_or_none():
        return

    # Seed categories
    categories_data = [
        ("Fashion", "fashion", "Tailored luxury essentials and contemporary silhouettes.", "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80"),
        ("Electronics", "electronics", "High-fidelity acoustics and studio audio.", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"),
        ("Watches", "watches", "Automatic chronographs and sapphire crystal timepieces.", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80"),
        ("Bags", "bags", "Full-grain calfskin totes and weatherproof weekenders.", "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80"),
        ("Shoes", "shoes", "Performance trainers and hand-stitched leather loafers.", "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80"),
    ]

    for name, slug, desc, img in categories_data:
        db.add(Category(name=name, slug=slug, description=desc, image_url=img))

    # Seed sample products
    products_data = [
        {
            "slug": "minimal-leather-crossbody-bag",
            "name": "Minimal Leather Crossbody Bag",
            "brand": "Atelier Vesper",
            "category": "bags",
            "price": 88500,
            "original_price": 105000,
            "discount_percentage": 15,
            "stock": 18,
            "rating": 4.9,
            "review_count": 142,
            "is_featured": True,
            "free_shipping": True,
            "description": "Handcrafted from Italian full-grain pebble leather with brushed brass hardware.",
            "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1000&auto=format&fit=crop&q=80",
        },
        {
            "slug": "airpulse-wireless-studio-headphones",
            "name": "AirPulse Wireless Studio Headphones",
            "brand": "Aura Acoustic",
            "category": "electronics",
            "price": 145000,
            "original_price": 175000,
            "discount_percentage": 17,
            "stock": 25,
            "rating": 4.9,
            "review_count": 312,
            "is_featured": True,
            "is_offer": True,
            "free_shipping": True,
            "description": "Custom 45mm beryllium drivers, hybrid active noise cancellation, and lambskin ear cushions.",
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80",
        },
        {
            "slug": "classic-chronograph-automatic-watch",
            "name": "Classic Chronograph Automatic Watch",
            "brand": "Chronos & Co",
            "category": "watches",
            "price": 320000,
            "original_price": 380000,
            "discount_percentage": 15,
            "stock": 9,
            "rating": 5.0,
            "review_count": 64,
            "is_featured": True,
            "free_shipping": True,
            "description": "Swiss automatic 28,800 bph movement with anti-reflective double-domed sapphire crystal.",
            "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80",
        },
        {
            "slug": "aurora-pure-white-minimal-sneakers",
            "name": "Aurora Pure White Minimal Sneakers",
            "brand": "Solstice Atelier",
            "category": "shoes",
            "price": 92000,
            "original_price": 115000,
            "discount_percentage": 20,
            "stock": 22,
            "rating": 4.9,
            "review_count": 215,
            "is_featured": True,
            "free_shipping": True,
            "description": "Supple Nappa leather low-top sneakers set on lightweight vulcanized rubber cupsole.",
            "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&auto=format&fit=crop&q=80",
        },
    ]

    for p in products_data:
        prod = Product(
            slug=p["slug"],
            name=p["name"],
            brand=p["brand"],
            category=p["category"],
            price=p["price"],
            original_price=p["original_price"],
            discount_percentage=p["discount_percentage"],
            stock=p["stock"],
            rating=p["rating"],
            review_count=p["review_count"],
            is_featured=p.get("is_featured", False),
            is_offer=p.get("is_offer", False),
            free_shipping=p.get("free_shipping", False),
            description=p["description"],
        )
        db.add(prod)
        await db.flush()

        img = ProductImage(product_id=prod.id, url=p["image"], alt_text=p["name"], is_primary=True)
        db.add(img)

    await db.commit()
