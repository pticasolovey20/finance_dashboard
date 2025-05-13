"use client";

import * as zod from "zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { register } from "@/actions/register";
import { RegisterSchema } from "@/schemas/authSchema";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import FloatingLabelFormItem from "@/components/forms/FloatingLabelFormItem";

type RegisterFormFields = zod.infer<typeof RegisterSchema>;

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

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

  const onFormSubmit = async (formData: zod.infer<typeof RegisterSchema>) => {
    startTransition(() =>
      register(formData).catch((error) => {
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
          name="firstName"
          render={({ field }) => (
            <FloatingLabelFormItem<RegisterFormFields>
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
            <FloatingLabelFormItem<RegisterFormFields>
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
            <FloatingLabelFormItem<RegisterFormFields>
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
            <FloatingLabelFormItem<RegisterFormFields>
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
            <FloatingLabelFormItem<RegisterFormFields>
              field={field}
              type="password"
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        />

        <Button type="submit" disabled={isPending} className="w-full h-10">
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
