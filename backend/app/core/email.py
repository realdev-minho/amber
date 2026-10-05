import httpx
from typing import Optional
from app.core.config import settings


async def send_mailgun_email(
    to_email: str,
    subject: str,
    html_content: str,
    text_content: Optional[str] = None,
) -> bool:
    if not settings.MAILGUN_API_KEY or not settings.MAILGUN_DOMAIN:
        # Development fallback: log email dispatch locally
        print(f"[MAILGUN SIMULATION] To: {to_email} | Subject: {subject}")
        return True

    url = f"https://api.mailgun.net/v3/{settings.MAILGUN_DOMAIN}/messages"
    auth = ("api", settings.MAILGUN_API_KEY)
    data = {
        "from": settings.MAILGUN_FROM_EMAIL,
        "to": [to_email],
        "subject": subject,
        "html": html_content,
        "text": text_content or subject,
    }

    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(url, auth=auth, data=data, timeout=10.0)
            print(f"[MAILGUN] Sent to {to_email} | Status: {res.status_code} | Body: {res.text}", flush=True)
            return res.status_code == 200
    except Exception as e:
        print(f"[MAILGUN ERROR] Failed to dispatch to {to_email}: {e}", flush=True)
        return False


def get_otp_email_template(otp: str, purpose: str = "Email Verification") -> str:
    return f"""
    <!DOCTYPE html>
    <html>
      <body style="background-color: #0D0B0A; color: #FBF8F5; font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto; background-color: #1A1614; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 36px; text-align: center;">
          <h1 style="color: #FBF8F5; font-size: 26px; margin: 0;">amber<span style="color: #FF8A00;">.</span></h1>
          <p style="color: #9E948C; font-size: 13px; margin-top: 6px;">Your Shop For Everything</p>
          <div style="margin: 32px 0; border-top: 1px solid rgba(255,255,255,0.08);"></div>
          <h2 style="font-size: 18px; color: #FBF8F5; margin-bottom: 8px;">{purpose}</h2>
          <p style="color: #9E948C; font-size: 13px; line-height: 1.6;">Use the secure one-time verification code below. It will expire in 10 minutes.</p>
          <div style="background-color: #12100F; border: 1px solid rgba(255,138,0,0.3); border-radius: 14px; padding: 18px; margin: 24px 0;">
            <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #FF8A00;">{otp}</span>
          </div>
          <p style="color: #6B635B; font-size: 11px;">If you did not initiate this request, you can safely disregard this email.</p>
        </div>
      </body>
    </html>
    """


def get_order_email_template(order_number: str, total_formatted: str) -> str:
    return f"""
    <!DOCTYPE html>
    <html>
      <body style="background-color: #0D0B0A; color: #FBF8F5; font-family: -apple-system, BlinkMacSystemFont, sans-serif; padding: 40px 20px;">
        <div style="max-width: 520px; margin: 0 auto; background-color: #1A1614; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 36px;">
          <h1 style="color: #FBF8F5; font-size: 26px; margin: 0; text-align: center;">amber<span style="color: #FF8A00;">.</span></h1>
          <div style="margin: 28px 0; border-top: 1px solid rgba(255,255,255,0.08);"></div>
          <h2 style="font-size: 20px; color: #FBF8F5; margin-bottom: 4px;">Your order has been confirmed.</h2>
          <p style="color: #9E948C; font-size: 13px;">We are preparing your items with signature insured courier shipping.</p>
          <div style="background-color: #12100F; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin: 24px 0;">
            <p style="margin: 0; color: #9E948C; font-size: 12px;">Order Number</p>
            <p style="margin: 4px 0 16px; font-family: monospace; font-size: 18px; font-weight: bold; color: #FBF8F5;">#{order_number}</p>
            <p style="margin: 0; color: #9E948C; font-size: 12px;">Total Amount</p>
            <p style="margin: 4px 0 0; font-size: 22px; font-weight: bold; color: #FF8A00;">{total_formatted}</p>
          </div>
          <p style="color: #6B635B; font-size: 11px; text-align: center;">Thank you for shopping with Amber Marketplace.</p>
        </div>
      </body>
    </html>
    """
