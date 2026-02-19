"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bkend } from "@/lib/bkend";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { user, accessToken, refreshToken } = await bkend.auth.signin({
            email,
            password,
          });
          localStorage.setItem("bkend_access_token", accessToken);
          localStorage.setItem("bkend_refresh_token", refreshToken);
          set({ user, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      signup: async (email, password) => {
        set({ isLoading: true });
        try {
          const { user, accessToken, refreshToken } = await bkend.auth.signup({
            email,
            password,
          });
          localStorage.setItem("bkend_access_token", accessToken);
          localStorage.setItem("bkend_refresh_token", refreshToken);
          set({ user, isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        bkend.auth.signout().catch(() => {});
        localStorage.removeItem("bkend_access_token");
        localStorage.removeItem("bkend_refresh_token");
        set({ user: null });
      },

      setUser: (user) => set({ user }),
    }),
    { name: "auth-storage" },
  ),
);
