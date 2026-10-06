import random
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.session import get_db
from app.models.user import User, RefreshSession, OtpCode
from app.core.security import (
    verify_password,
    get_password_hash,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.core.email import send_mailgun_email, get_otp_email_template
from app.schemas.auth import (
    UserRegisterSchema,
    UserLoginSchema,
    VerifyOtpSchema,
    ResendOtpSchema,
    ForgotPasswordSchema,
    ResetPasswordSchema,
    AuthResponseSchema,
    UserOutSchema,
    TokenResponseSchema,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register")
async def register(payload: UserRegisterSchema, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == payload.email))
    existing = res.scalar_one_or_none()
    if existing:
        raise HTTPException(status_code=400, detail="An account with this email already exists")

    new_user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        first_name=payload.first_name,
        last_name=payload.last_name,
        is_email_verified=False,
    )
    db.add(new_user)

    code = f"{random.randint(100000, 999999)}"
    otp = OtpCode(
        email=payload.email,
        code=code,
        purpose="email_verification",
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=10),
    )
    db.add(otp)
    await db.commit()

    html = get_otp_email_template(code, "Verify Your Amber Account")
    print(f"[AUTH OTP] Registered email: {payload.email} -> Code: {code}", flush=True)
    await send_mailgun_email(payload.email, "Your Amber Verification Code", html)

    return {"message": "Account created. A 6-digit OTP code has been dispatched to your email."}


@router.post("/login", response_model=AuthResponseSchema)
async def login(payload: UserLoginSchema, response: Response, db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == payload.email))
    user = res.scalar_one_or_none()
    if not user or not user.hashed_password or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    # Store refresh session
    session = RefreshSession(
        user_id=user.id,
        refresh_token=refresh_token,
        expires_at=datetime.now(timezone.utc) + timedelta(days=30),
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
        message="Sign in successful",
    )


@router.post("/verify-email", response_model=AuthResponseSchema)
async def verify_email(payload: VerifyOtpSchema, response: Response, db: AsyncSession = Depends(get_db)):
    res = await db.execute(
        select(OtpCode)
        .where(
            OtpCode.email == payload.email,
            OtpCode.code == payload.token_code,
            OtpCode.is_used == False,
        )
        .order_by(OtpCode.created_at.desc())
    )
    otp_record = res.scalar_one_or_none()
    if not otp_record:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP code")

    now_utc = datetime.now(timezone.utc)
    is_expired = (
        otp_record.expires_at.replace(tzinfo=timezone.utc) < now_utc
        if otp_record.expires_at.tzinfo is None
        else otp_record.expires_at < now_utc
    )
    if is_expired:
        raise HTTPException(status_code=400, detail="Invalid or expired OTP code")

    otp_record.is_used = True

    user_res = await db.execute(select(User).where(User.email == payload.email))
    user = user_res.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User account not found")

    user.is_email_verified = True

    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)

    session = RefreshSession(
        user_id=user.id,
        refresh_token=refresh_token,
        expires_at=datetime.now(timezone.utc) + timedelta(days=30),
    )
    db.add(session)
    await db.commit()

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
        message="Email verified successfully",
    )


@router.post("/resend-otp")
async def resend_otp(payload: ResendOtpSchema, db: AsyncSession = Depends(get_db)):
    code = f"{random.randint(100000, 999999)}"
    otp = OtpCode(
        email=payload.email,
        code=code,
        purpose="email_verification",
        expires_at=datetime.now(timezone.utc) + timedelta(minutes=10),
    )
    db.add(otp)
    await db.commit()

    html = get_otp_email_template(code, "Your New Verification Code")
    print(f"[AUTH OTP] Resent code for {payload.email} -> Code: {code}", flush=True)
    await send_mailgun_email(payload.email, "New Amber Verification Code", html)
    return {"message": "New 6-digit OTP code dispatched."}


@router.post("/logout")
async def logout(response: Response, request: Request, db: AsyncSession = Depends(get_db)):
    refresh_token = request.cookies.get("amber_refresh_token")
    if refresh_token:
        res = await db.execute(select(RefreshSession).where(RefreshSession.refresh_token == refresh_token))
        session = res.scalar_one_or_none()
        if session:
            session.is_revoked = True
            await db.commit()

    response.delete_cookie(key="amber_refresh_token")
    return {"message": "Logged out successfully"}
