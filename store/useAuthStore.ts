import { create } from "zustand";
import { login } from "@/actions/login";
import { register } from "@/actions/register";
import { LoginFormFields, RegisterFormFields } from "@/types/authTypes";

type AuthState = {
  isLoading: boolean;
  error: string | null;

  loginUser: (data: LoginFormFields) => Promise<void>;
  registerUser: (data: RegisterFormFields) => Promise<void>;

  setLoading: (value: boolean) => void;
  resetError: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoading: false,
  error: null,

  loginUser: async (data) => {
    set({ isLoading: true, error: null });

    const response = await login(data);

    if (response?.message) {
      set({ error: response.message });
    }

    set({ isLoading: false });
  },

  registerUser: async (data) => {
    set({ isLoading: true, error: null });

    const response = await register(data);

    if (response?.message) {
      set({ error: response.message });
    }

    set({ isLoading: false });
  },

  setLoading: (value) => set({ isLoading: value }),

  resetError: () => set({ error: null }),
}));
