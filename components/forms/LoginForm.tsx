"use client";

import * as zod from "zod";

import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useTransition, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/actions/login";
import { LoginSchema } from "@/schemas/authSchema";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FloatingLabelFormItem from "@/components/forms/FloatingLabelFormItem";

type LoginFormFields = zod.infer<typeof LoginSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam === "OAuthAccountNotLinked") {
      toast({
        variant: "destructive",
        description: "Email is already used with a different provider!",
      });
    }
  }, [searchParams, toast]);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = async (formData: zod.infer<typeof LoginSchema>) => {
    startTransition(() =>
      login(formData).catch((error) => {
        toast({
          variant: "destructive",
          description: error.message || "Something went wrong",
        });
      })
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FloatingLabelFormItem<LoginFormFields>
              field={field}
              id="email"
              type="email"
              label="Email"
            />
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FloatingLabelFormItem<LoginFormFields>
              field={field}
              id="password"
              type="password"
              label="Password"
            />
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full h-10">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
