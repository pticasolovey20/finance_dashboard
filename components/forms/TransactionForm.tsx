import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionSchema } from "@/schemas/transactionSchema";
import { ITransactionData, TransactionsFormFields } from "@/types/transactions";

import { Form, FormField } from "@/components/ui/form";
import SubmitButton from "@/components/forms/SubmitButton";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";

interface ITransactionFormProps {
  selectedTransactionRow: ITransactionData;
  classNames?: string;
}

const TransactionForm = ({
  selectedTransactionRow,
  classNames,
}: ITransactionFormProps) => {
  const TRANSACTION_ID = selectedTransactionRow.id;

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(TransactionSchema),

    defaultValues: {
      id: TRANSACTION_ID,
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
          "h-full w-full",
          "mt-6 p-4 md:p-0",
          "grid grid-cols-1 sm:grid-cols-2 gap-4",
          classNames
        )}
      >
        <FormField
          control={control}
          name="id"
          render={({ field }) => (
            <FloatingLabelInputField<TransactionsFormFields>
              field={field}
              id="id"
              label="ID"
            />
          )}
        />

        <SubmitButton label="Apply" />
      </form>
    </Form>
  );
};

export default TransactionForm;
