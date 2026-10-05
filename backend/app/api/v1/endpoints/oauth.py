from fastapi import APIRouter, Depends, HTTPException, Response, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
import httpx
from datetime import datetime, timezone, timedelta

from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token
from app.db.session import get_db
from app.models.user import User, RefreshSession
from app.schemas.auth import AuthResponseSchema, UserOutSchema, TokenResponseSchema

router = APIRouter(prefix="/auth/oauth", tags=["OAuth Authentication"])


class GoogleAuthPayload(BaseModel):
    id_token: str


@router.post("/google", response_model=AuthResponseSchema)
async def authenticate_with_google(
    payload: GoogleAuthPayload,
    response: Response,
    db: AsyncSession = Depends(get_db),
):
    """
    Verifies a Google ID token from Google Identity Services, creates or updates
    the user record, and issues Amber JWT credentials.
    """
    token = payload.id_token.strip()
    if not token:
        raise HTTPException(status_code=400, detail="Google id_token is required")

    # Verify ID token with Google tokeninfo endpoint
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            resp = await client.get(
                "https://oauth2.googleapis.com/tokeninfo",
                params={"id_token": token},
            )
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid Google ID token",
                )
            google_data = resp.json()
    except httpx.RequestError as exc:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Unable to reach Google OAuth verification servers: {str(exc)}",
        )

    # Validate Audience (Client ID) if configured
    if settings.GOOGLE_CLIENT_ID and google_data.get("aud") != settings.GOOGLE_CLIENT_ID:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google token audience does not match configured GOOGLE_CLIENT_ID",
        )

    email = google_data.get("email")
    if not email:
        raise HTTPException(status_code=400, detail="Google token does not contain a valid email")

    first_name = google_data.get("given_name") or "Amber"
    last_name = google_data.get("family_name") or "Member"
    avatar_url = google_data.get("picture")

    # Find or create user
    res = await db.execute(select(User).where(User.email == email))
    user = res.scalar_one_or_none()

    if not user:
        user = User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            avatar_url=avatar_url,
            is_email_verified=True,
            is_active=True,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    else:
        # Ensure email is verified and update avatar if missing
        user.is_email_verified = True
        if avatar_url and not user.avatar_url:
            user.avatar_url = avatar_url
        await db.commit()
        await db.refresh(user)

    # Issue JWT tokens
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    # Save refresh session
    session = RefreshSession(
        user_id=user.id,
        refresh_token=refresh_token,
        expires_at=datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    db.add(session)
    await db.commit()

    # Set secure HttpOnly cookie for refresh token
    response.set_cookie(
        key="amber_refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="lax",
        max_age=30 * 24 * 3600,
    )

    return AuthResponseSchema(
        user=UserOutSchema.model_validate(user),
        tokens=TokenResponseSchema(access_token=access_token, expires_in=3600),
        message="Google authentication successful",
    )
