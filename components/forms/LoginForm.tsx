"use client";

import * as zod from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas/authSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = async (formData: zod.infer<typeof LoginSchema>) => {
    startTransition(() =>
      login(formData)
        .then(() => {})
        .catch((error) => console.log(error))
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="max-w-[400px] w-full space-y-4 p-4"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input placeholder="example@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
