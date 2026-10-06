import { create } from "zustand";
import { UserSession } from "@/types/auth";
import { toast } from "./useToastStore";
import { setAuthToken } from "@/services/api-client";

interface AuthStore {
  user: UserSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: UserSession, token: string) => void;
  logout: () => void;
  setUser: (user: UserSession) => void;
  updateUser: (updates: Partial<UserSession>) => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: (user, token) => {
    setAuthToken(token);
    set({ user, isAuthenticated: true });
    toast.success("Welcome Back", `Signed in as ${user.firstName} ${user.lastName}`);
  },

  logout: () => {
    setAuthToken(null);
    set({ user: null, isAuthenticated: false });
    toast.info("Signed Out", "You have been logged out securely.");
  },

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },

  updateUser: (updates) => {
    const current = get().user;
    if (!current) return;
    const updated = { ...current, ...updates };
    set({ user: updated });
    toast.success("Profile Updated", "Your changes have been saved.");
  },
}));
