"use client";

import { Fragment, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updateAccountSettings } from "@/actions/accountSettings";
import { AccountSettingsFormFields } from "@/types/acountSettings";
import { AccountSettingsSchema } from "@/schemas/accountSettingsSchema";

import { Separator } from "@/components/ui/separator";
import { Form, FormField } from "@/components/ui/form";
import AccountImage from "@/components/account/AccountImage";
import AccountSectionWrapper from "@/components/account/AccountSectionWrapper";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";
import FloatingLabelPasswordField from "@/components/forms/FloatingLabelPasswordField";

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
      <form className="w-full">
        <AccountImage imageSRC={user!.image ?? ""} />

        <AccountSectionWrapper sectionTitle="Full Name">
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
        </AccountSectionWrapper>

        <Separator className="my-4" />

        <AccountSectionWrapper
          sectionTitle="Contact Email"
          sectionDescription="Menage your account email for the invoices"
        >
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
        </AccountSectionWrapper>

        <Separator className="my-4" />

        {!user?.isOAuth && (
          <Fragment>
            <AccountSectionWrapper
              sectionTitle="Password"
              sectionDescription="Modify your current password"
            >
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
            </AccountSectionWrapper>
            <Separator className="my-4" />
          </Fragment>
        )}
      </form>
    </Form>
  );
};

export default AccountForm;
