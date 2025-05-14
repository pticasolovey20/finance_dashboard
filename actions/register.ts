"use server";

import * as zod from "zod";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

import { database } from "@/lib/database";
import { getUserByEmail } from "@/lib/user";
import { AuthRoutesEnum } from "@/types/route";
import { RegisterSchema } from "@/schemas/authSchema";

export const register = async (values: zod.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) return { message: "Invalid fields!" };

  const { firstName, lastName, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { message: "User already exists!" };

  await database.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  redirect(AuthRoutesEnum.LOGIN);
};
