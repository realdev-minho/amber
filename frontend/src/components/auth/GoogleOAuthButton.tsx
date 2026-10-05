"use client";

export function GoogleOAuthButton({
  text = "Continue with Google",
  redirect = "/shop",
}: {
  text?: string;
  redirect?: string;
}) {
  const handleGoogleLogin = () => {
    const clientId =
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      "329279771447-3lqjej06a9huras6js0to295jopoq7pg.apps.googleusercontent.com";

    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const redirectUri = `${origin}/auth/callback/google`;

    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", clientId);
    googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.set("response_type", "id_token token");
    googleAuthUrl.searchParams.set("scope", "openid email profile");
    googleAuthUrl.searchParams.set("nonce", Math.random().toString(36).substring(2));
    googleAuthUrl.searchParams.set("prompt", "select_account");
    googleAuthUrl.searchParams.set("state", redirect);

    window.location.href = googleAuthUrl.toString();
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full py-3 px-4 rounded-xl bg-white/6 hover:bg-white/10 border border-white/12 text-xs sm:text-sm font-semibold text-white flex items-center justify-center gap-3 transition-all active:scale-95 shadow-sm"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
        />
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
        />
        <path
          fill="#FBBC05"
          d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
        />
        <path
          fill="#34A853"
          d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.4 7.5 23.5 12 23.5z"
        />
      </svg>
      <span>{text}</span>
    </button>
  );
}
