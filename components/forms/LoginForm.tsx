"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFormFields } from "@/types/auth";
import { useAuthStore } from "@/store/authStore";
import { LoginSchema } from "@/schemas/authSchema";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";
import FloatingLabelPasswordField from "@/components/forms/FloatingLabelPasswordField";

const LoginForm = () => {
  const { toast } = useToast();
  const { loginUser, isLoading, error, resetError } = useAuthStore();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const errorParam = queryParams.get("error");

    if (errorParam === "OAuthAccountNotLinked") {
      toast({
        variant: "destructive",
        description: "Email is already used with a different provider!",
      });

      queryParams.delete("error");
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [toast]);

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        description: error,
      });

      resetError();
    }
  }, [error, toast, resetError]);

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(LoginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = async (formData: LoginFormFields) => loginUser(formData);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FloatingLabelInputField<LoginFormFields>
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
            <FloatingLabelPasswordField<LoginFormFields>
              field={field}
              id="password"
              label="Password"
            />
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 flex gap-2"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
