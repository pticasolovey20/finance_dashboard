import { cn } from "@/lib/utils";
import { faker } from "@faker-js/faker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionSchema } from "@/schemas/transactionSchema";
import { TransactionsFormFields } from "@/types/transactionTypes";
import { useTransactionModalStore } from "@/store/useTransactionModalStore";

import { Form, FormField } from "@/components/ui/form";
import SubmitButton from "@/components/forms/SubmitButton";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";

interface ITransactionFormProps {
  classNames?: string;
}

const TransactionForm = ({ classNames }: ITransactionFormProps) => {
  const { transactionData, mode } = useTransactionModalStore();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(TransactionSchema),

    defaultValues: {
      id: transactionData?.id ?? faker.string.uuid(),
      type: transactionData?.type ?? undefined,
      categoryId: transactionData?.categoryId ?? undefined,
      amount: transactionData?.amount ?? undefined,
      date: transactionData?.date ?? new Date(),
      note: transactionData?.note ?? undefined,
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = (formData: TransactionsFormFields) => {
    console.log(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn(
          "w-full p-4 md:p-0 md:pt-4 md:pr-2 overflow-y-auto",
          "grid grid-cols-1 sm:grid-cols-2 gap-4",
          classNames
        )}
      >
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FloatingLabelInputField
              field={field}
              id="id"
              label="ID"
              disabled
            />
          )}
        />

        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FloatingLabelInputField field={field} id="type" label="Type" />
          )}
        />

        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FloatingLabelInputField
              field={field}
              id="categoryId"
              label="Category ID"
            />
          )}
        />

        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FloatingLabelInputField field={field} id="amount" label="Amount" />
          )}
        />

        <div className="col-span-1 sm:col-span-2">
          <FormField
            control={control}
            name="note"
            render={({ field }) => (
              <FloatingLabelInputField field={field} id="note" label="Note" />
            )}
          />
        </div>

        <SubmitButton
          label={mode === "create" ? "Create" : "Save"}
          classNames="col-span-1 sm:col-span-2 mt-6"
        />
      </form>
    </Form>
  );
};

export default TransactionForm;
