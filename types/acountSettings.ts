import * as zod from "zod";
import { AccountSettingsSchema } from "@/schemas/accountSettingsSchema";

export type AccountSettingsFormFields = zod.infer<typeof AccountSettingsSchema>;
