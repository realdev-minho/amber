from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserRegisterSchema(BaseModel):
    first_name: str = Field(..., min_length=2, max_length=100)
    last_name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=8)


class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str


class VerifyOtpSchema(BaseModel):
    email: EmailStr
    otp: Optional[str] = None
    code: Optional[str] = None

    @property
    def token_code(self) -> str:
        return (self.otp or self.code or "").strip()


class ResendOtpSchema(BaseModel):
    email: EmailStr


class ForgotPasswordSchema(BaseModel):
    email: EmailStr


class ResetPasswordSchema(BaseModel):
    email: EmailStr
    otp: Optional[str] = None
    code: Optional[str] = None
    new_password: str = Field(..., min_length=8)

    @property
    def token_code(self) -> str:
        return (self.otp or self.code or "").strip()


class TokenResponseSchema(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class UserOutSchema(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    phone: Optional[str] = None
    avatar_url: Optional[str] = None
    is_email_verified: bool

    class Config:
        from_attributes = True


class AuthResponseSchema(BaseModel):
    user: UserOutSchema
    tokens: TokenResponseSchema
    message: Optional[str] = None
