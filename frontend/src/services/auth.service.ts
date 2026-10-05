import apiClient, { setAuthToken } from "./api-client";
import { AuthResponse, LoginInput, RegisterInput, ResetPasswordInput, UserSession } from "@/types/auth";

function mapAuthResponse(data: any): AuthResponse {
  const u = data.user || {};
  const t = data.tokens || {};
  return {
    user: {
      id: u.id || "",
      email: u.email || "",
      firstName: u.first_name || u.firstName || "",
      lastName: u.last_name || u.lastName || "",
      phone: u.phone,
      avatarUrl: u.avatar_url || u.avatarUrl,
      isEmailVerified: Boolean(u.is_email_verified ?? u.isEmailVerified),
    },
    tokens: {
      accessToken: t.access_token || t.accessToken || "",
      refreshToken: t.refresh_token || t.refreshToken,
      tokenType: t.token_type || t.tokenType || "bearer",
      expiresIn: t.expires_in || t.expiresIn || 3600,
    },
    message: data.message,
  };
}

export const authService = {
  async register(data: RegisterInput): Promise<{ message: string; email: string }> {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
    };
    const res = await apiClient.post("/auth/register", payload);
    return res.data;
  },

  async login(data: LoginInput): Promise<AuthResponse> {
    const res = await apiClient.post("/auth/login", data);
    return mapAuthResponse(res.data);
  },

  async verifyOtp(email: string, otp: string): Promise<AuthResponse> {
    const res = await apiClient.post("/auth/verify-email", { email, otp });
    return mapAuthResponse(res.data);
  },

  async resendOtp(email: string): Promise<{ message: string }> {
    const res = await apiClient.post("/auth/resend-otp", { email });
    return res.data;
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const res = await apiClient.post("/auth/forgot-password", { email });
    return res.data;
  },

  async resetPassword(data: ResetPasswordInput): Promise<{ message: string }> {
    const res = await apiClient.post("/auth/reset-password", {
      email: data.email,
      otp: data.otp,
      new_password: data.newPassword,
    });
    return res.data;
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } finally {
      setAuthToken(null);
    }
  },

  async getCurrentUser(): Promise<UserSession> {
    const res = await apiClient.get("/users/me");
    const u = res.data;
    return {
      id: u.id,
      email: u.email,
      firstName: u.first_name || u.firstName,
      lastName: u.last_name || u.lastName,
      phone: u.phone,
      avatarUrl: u.avatar_url || u.avatarUrl,
      isEmailVerified: Boolean(u.is_email_verified ?? u.isEmailVerified),
    };
  },

  async googleAuth(idToken: string): Promise<AuthResponse> {
    const res = await apiClient.post("/auth/oauth/google", { id_token: idToken });
    return mapAuthResponse(res.data);
  },
};
