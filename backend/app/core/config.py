from typing import List, Optional
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Amber Marketplace API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Database: Supabase / PostgreSQL asyncpg connection
    DATABASE_URL: str = "sqlite+aiosqlite:///./amber.db"
    POSTGRES_DATABASE_URL: Optional[str] = None

    # Security
    SECRET_KEY: str = "amber-super-secret-production-jwt-key-2026-secure-32chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "https://amber.shop",
    ]

    # Mailgun Email settings
    MAILGUN_API_KEY: Optional[str] = None
    MAILGUN_DOMAIN: Optional[str] = None
    MAILGUN_FROM_EMAIL: str = "Amber Shop <noreply@amber.shop>"

    # Google OAuth
    GOOGLE_CLIENT_ID: Optional[str] = None
    GOOGLE_CLIENT_SECRET: Optional[str] = None

    # Unsplash API
    UNSPLASH_ACCESS_KEY: Optional[str] = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="allow",
    )


settings = Settings()
