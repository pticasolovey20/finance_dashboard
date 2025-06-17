import { create } from "zustand";

type AccountSettingsState = {
  isLoading: boolean;
  error: string | null;
};

export const useAccountSettingsStore = create<AccountSettingsState>(() => ({
  isLoading: false,
  error: null,
}));
