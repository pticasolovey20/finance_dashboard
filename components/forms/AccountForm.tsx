"use client";

import { useForm } from "react-hook-form";
// import { ExtendedUser } from "@/next-auth";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updateAccountSettings } from "@/actions/accountSettings";
import { AccountSettingsFormFields } from "@/types/acountSettings";
import { AccountSettingsSchema } from "@/schemas/accountSettingsSchema";

import { Separator } from "@/components/ui/separator";
import { Form, FormField } from "@/components/ui/form";
import ContentHeader from "@/components/account/ContentHeader";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";
import FloatingLabelPasswordField from "@/components/forms/FloatingLabelPasswordField";

// interface IAccountFormProps {
//   user: ExtendedUser;
// }

const AccountForm = () => {
  const user = useCurrentUser();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(AccountSettingsSchema),

    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
    },
  });

  const { control } = form;
  const { toast } = useToast();
  const { update } = useSession();

  const onFieldBlur = async (
    fieldName: keyof AccountSettingsFormFields,
    value: string
  ) => {
    updateAccountSettings({ [fieldName]: value })
      .then(({ message }) => {
        update();
        toast({ description: message });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      });
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-4">
        <div className="flex flex-col gap-4">
          <ContentHeader title="Full Name" />

          {user?.isOAuth ? (
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FloatingLabelInputField<AccountSettingsFormFields>
                  field={field}
                  onBlur={() => onFieldBlur("name", field.value ?? "")}
                  id="name"
                  label="Name"
                />
              )}
            />
          ) : (
            <div className="flex gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FloatingLabelInputField<AccountSettingsFormFields>
                    field={field}
                    onBlur={() => onFieldBlur("firstName", field.value ?? "")}
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
                    onBlur={() => onFieldBlur("lastName", field.value ?? "")}
                    id="lastName"
                    label="Last Name"
                  />
                )}
              />
            </div>
          )}
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
                onBlur={() => onFieldBlur("email", field.value ?? "")}
                id="email"
                type="email"
                label="Email"
                disabled
              />
            )}
          />
        </div>

        <Separator className="mt-4 mb-4" />

        {!user?.isOAuth && (
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
                    onBlur={() => {
                      onFieldBlur("currentPassword", field.value ?? "");
                    }}
                    id="currentPassword"
                    label="Current Password"
                    disabled
                  />
                )}
              />

              <FormField
                control={control}
                name="newPassword"
                render={({ field }) => (
                  <FloatingLabelPasswordField<AccountSettingsFormFields>
                    field={field}
                    onBlur={() => onFieldBlur("newPassword", field.value ?? "")}
                    id="newPassword"
                    label="New Password"
                    disabled
                  />
                )}
              />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
