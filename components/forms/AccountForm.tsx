"use client";

import { useForm } from "react-hook-form";
import { ExtendedUser } from "@/next-auth";
import { zodResolver } from "@hookform/resolvers/zod";

import { AccountSettingsFormFields } from "@/types/acountSettings";
import { AccountSettingsSchema } from "@/schemas/accountSettingsSchema";

import { Separator } from "@/components/ui/separator";
import { Form, FormField } from "@/components/ui/form";
import ContentHeader from "@/components/account/ContentHeader";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";
import FloatingLabelPasswordField from "@/components/forms/FloatingLabelPasswordField";

interface IAccountFormProps {
  user: ExtendedUser;
}

const AccountForm = ({ user }: IAccountFormProps) => {
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(AccountSettingsSchema),

    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = async (formData: AccountSettingsFormFields) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-4">
        <div className="flex flex-col gap-4">
          <ContentHeader title="Full Name" />

          <div className="flex gap-4">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FloatingLabelInputField<AccountSettingsFormFields>
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
                <FloatingLabelInputField<AccountSettingsFormFields>
                  field={field}
                  id="lastName"
                  label="Last Name"
                />
              )}
            />
          </div>
        </div>

        <Separator className="mt-4 mb-4" />

        <div className="flex flex-col gap-4">
          <ContentHeader
            title="Contact Email"
            description="Menage yout accounts email for the invoices"
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FloatingLabelInputField<AccountSettingsFormFields>
                field={field}
                id="email"
                type="email"
                label="Email"
              />
            )}
          />
        </div>

        <Separator className="mt-4 mb-4" />

        <div className="flex flex-col gap-4">
          <ContentHeader
            title="Password"
            description="Modify your current password"
          />

          <div className="flex gap-4">
            <FormField
              control={control}
              name="currentPassword"
              render={({ field }) => (
                <FloatingLabelPasswordField<AccountSettingsFormFields>
                  field={field}
                  id="currentPassword"
                  label="Current Password"
                />
              )}
            />

            <FormField
              control={control}
              name="newPassword"
              render={({ field }) => (
                <FloatingLabelPasswordField<AccountSettingsFormFields>
                  field={field}
                  id="newPassword"
                  label="New Password"
                />
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AccountForm;
