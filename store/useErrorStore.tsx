import { create } from "zustand";
import { toast } from "@/hooks/use-toast";

type ParsedError = {
  message: string;
  status?: number;
  code?: string;
};

type ErrorStore = {
  error: ParsedError | null;
  setError: (error: unknown) => void;
  clearError: () => void;
};

export const useErrorStore = create<ErrorStore>((set) => ({
  error: null,

  setError: (error) => {
    const parsed = parseError(error);
    set({ error: parsed });

    showError(parsed);
  },

  clearError: () => set({ error: null }),
}));

const parseError = (error: unknown): ParsedError => {
  if (typeof error === "string") {
    return { message: error };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  if (typeof error === "object" && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const e = error as Record<string, any>;

    return {
      message: e.message || "Unexpected error",
      status: e.status,
      code: e.code,
    };
  }

  return { message: "Unknown error" };
};

const showError = (error: ParsedError) => {
  toast({
    variant: "destructive",
    description: error.message,
  });
};
