"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { RegisterFormFields } from "@/types/auth";
import { RegisterSchema } from "@/schemas/authSchema";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";

const RegisterForm = () => {
  const { toast } = useToast();
  const { registerUser, isLoading, error, resetError } = useAuthStore();

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
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = async (formData: RegisterFormFields) => {
    registerUser(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FloatingLabelInputField<RegisterFormFields>
              field={field}
              id="firstName"
              label="First Name"
            />
          )}
        />

        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FloatingLabelInputField<RegisterFormFields>
              id="lastName"
              field={field}
              label="Last Name"
            />
          )}
        />

        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FloatingLabelInputField<RegisterFormFields>
              id="email"
              label="Email"
              field={field}
            />
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FloatingLabelInputField<RegisterFormFields>
              field={field}
              id="password"
              type="password"
              label="Password"
              helperText="Password must be at least 8 english characters, and contain 1 uppercase, 1 lowercase and 1 digit"
            />
          )}
        />

        <FormField
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <FloatingLabelInputField<RegisterFormFields>
              field={field}
              type="password"
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 flex gap-2"
        >
          <span>Register</span>
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
