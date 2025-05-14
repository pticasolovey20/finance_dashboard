import { AuthRoutesEnum, ProtectedRoutesEnum } from "@/types/route";

export const publicRoutes = ["/faq"];

export const authRoutes = [
  AuthRoutesEnum.LOGIN,
  AuthRoutesEnum.REGISTER,
  AuthRoutesEnum.ERROR,
] as string[];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = ProtectedRoutesEnum.DASHBOARD;
