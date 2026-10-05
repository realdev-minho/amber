from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.db.base import Base
from app.db.session import engine, async_session_maker
from app.db.seed import seed_initial_data
import app.models.user  # noqa: F401
import app.models.product  # noqa: F401
import app.models.cart  # noqa: F401
import app.models.order  # noqa: F401
import app.models.notification  # noqa: F401


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Seed initial data
    async with async_session_maker() as db:
        await seed_initial_data(db)

    yield

    # Clean up connections
    await engine.dispose()


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
    }


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to Amber Marketplace API",
        "docs": "/docs",
        "health": "/health",
        "api_v1": settings.API_V1_STR,
    }
