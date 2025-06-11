import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { TransactionType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useToast } from "@/hooks/use-toast";
import { TransactionSchema } from "@/schemas/transactionSchema";
import { TransactionsFormFields } from "@/types/transactionTypes";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";
import { transactionsTypeOptions } from "@/constants/transactionFormOptions";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import SubmitButton from "@/components/forms/SubmitButton";
import FloatingLabelInputField from "@/components/forms/FloatingLabelInputField";
import FloatingLabelSelectField from "@/components/forms/FloatingLabelSelectField";

interface ITransactionFormProps {
  classNames?: string;
}

const TransactionForm = ({ classNames }: ITransactionFormProps) => {
  const { isLoading, createTransaction } = useTransactionStore();
  const { transactionData, mode, closeTransactionModal } =
    useTransactionTableStore();
  const { toast } = useToast();

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(TransactionSchema),

    defaultValues: {
      type: transactionData?.type ?? undefined,
      categoryId: transactionData?.categoryId ?? undefined,
      amount: transactionData?.amount ?? undefined,
      date: transactionData?.date ?? new Date(),
      note: transactionData?.note ?? undefined,
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = async (formData: TransactionsFormFields) => {
    createTransaction({
      ...formData,
      type: formData.type as TransactionType,
    })
      .then(() => closeTransactionModal())
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn(
          "w-full p-4 md:p-0 md:pt-4 md:pl-1 md:pr-2 overflow-y-auto",
          "grid grid-cols-1 sm:grid-cols-2 gap-4",
          classNames
        )}
      >
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FloatingLabelSelectField
              field={field}
              options={transactionsTypeOptions}
              // id="type"
              // label="Type"
            />
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

        <div className="col-span-1 sm:col-span-2 flex flex-col-reverse xs:flex-row gap-4 mt-8">
          <Button variant="destructive" className="h-10 w-full" disabled>
            Delete
          </Button>

          <SubmitButton
            label={mode === "create" ? "Create" : "Save"}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
