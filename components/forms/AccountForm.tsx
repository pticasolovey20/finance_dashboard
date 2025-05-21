"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updateAccountSettings } from "@/actions/accountSettings";
import { AccountSettingsFormFields } from "@/types/acountSettings";
import { AccountSettingsSchema } from "@/schemas/accountSettingsSchema";

import { Form, FormField } from "@/components/ui/form";
import AccountSectionWrapper from "@/components/account/AccountSectionWrapper";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";
import FloatingLabelPasswordField from "@/components/forms/FloatingLabelPasswordField";
import { Separator } from "../ui/separator";

const AccountForm = () => {
  const [isPending, startTransition] = useTransition();
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

  useEffect(() => {
    if (isPending) toast({ description: "Saving..." });
  }, [isPending, toast]);

  const onFieldBlur = async (
    fieldName: keyof AccountSettingsFormFields,
    value: string
  ) => {
    const currentValue = form.getValues(fieldName);
    const defaultValue = form.formState.defaultValues?.[fieldName];

    if (currentValue === defaultValue) return;

    startTransition(() => {
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
    });
  };

  return (
    <Form {...form}>
      <form className="w-full mt-4">
        <div className="w-full h-[100px] p-4 mb-4 rounded-lg bg-gray-300">
          UPLOAD IMAGE SECTION
        </div>

        <AccountSectionWrapper sectionTitle="Full Name">
          <div>
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
                    disabled={isPending}
                  />
                )}
              />
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <FloatingLabelInputField<AccountSettingsFormFields>
                      field={field}
                      onBlur={() => onFieldBlur("firstName", field.value ?? "")}
                      id="firstName"
                      label="First Name"
                      disabled={isPending}
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
            <Separator className="my-4" />
          </div>
        </AccountSectionWrapper>

        <AccountSectionWrapper
          sectionTitle="Contact Email"
          sectionDescription="Menage your account email for the invoices"
        >
          <div>
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

            <Separator className="my-4" />
          </div>
        </AccountSectionWrapper>

        {!user?.isOAuth && (
          <AccountSectionWrapper
            sectionTitle="Password"
            sectionDescription="Modify your current password"
          >
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
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
                      onBlur={() =>
                        onFieldBlur("newPassword", field.value ?? "")
                      }
                      id="newPassword"
                      label="New Password"
                      disabled
                    />
                  )}
                />
              </div>

              <Separator className="my-4" />
            </div>
          </AccountSectionWrapper>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
