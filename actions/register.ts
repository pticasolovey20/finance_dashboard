"use server";

import * as zod from "zod";
import bcrypt from "bcrypt";
import { database } from "@/lib/database";
import { RegisterSchema } from "@/schemas/authSchema";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "" };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await database.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    return { error: "" };
  }

  await database.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: "" };
};
