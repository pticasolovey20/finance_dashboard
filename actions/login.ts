"use server";

import * as zod from "zod";
import { LoginSchema } from "@/schemas/authSchema";

export const login = async (values: zod.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  console.log(validatedFields);
};
