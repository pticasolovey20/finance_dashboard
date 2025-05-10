"use server";

import * as zod from "zod";
import bcrypt from "bcryptjs";

import { database } from "@/lib/database";
import { getUserByEmail } from "@/lib/user";
import { RegisterSchema } from "@/schemas/authSchema";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "User already exist!" };

  await database.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: "User successfully registered!" };
};
