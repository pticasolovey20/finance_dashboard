import * as zod from "zod";

import { LoginSchema, RegisterSchema } from "@/schemas/authSchema";

export type LoginFormFields = zod.infer<typeof LoginSchema>;

export type RegisterFormFields = zod.infer<typeof RegisterSchema>;

export type ProviderType = "google" | "github";
