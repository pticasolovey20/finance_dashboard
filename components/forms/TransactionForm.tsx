import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { TransactionStatus } from "@prisma/client";
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
import FloatingLabelTextareaField from "@/components/forms/FloatingLabelTextareaField";

interface ITransactionFormProps {
  classNames?: string;
}

const TransactionForm = ({ classNames }: ITransactionFormProps) => {
  const { isLoading, createTransaction, deleteTransaction } =
    useTransactionStore();
  const {
    transactionData,
    mode: formMode,
    closeTransactionModal,
  } = useTransactionTableStore();
  const { toast } = useToast();

  const isEditMode = formMode === "edit";

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(TransactionSchema),

    defaultValues: {
      type: transactionData?.type ?? undefined,
      status: transactionData?.status ?? TransactionStatus.pending,
      categoryId: transactionData?.categoryId ?? undefined,
      amount: transactionData?.amount ?? undefined,
      date: transactionData?.date ?? new Date(),
      note: transactionData?.note ?? undefined,
    },
  });

  const { handleSubmit, control } = form;

  const handleDeleteTransaction = async () => {
    deleteTransaction(transactionData!.id)
      .then(() => toast({ description: "Transaction deleted successfully!" }))
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      })
      .finally(() => closeTransactionModal());
  };

  const onFormSubmit = async (formData: TransactionsFormFields) => {
    createTransaction(formData)
      .then(() => toast({ description: "Transaction created successfully!" }))
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      })
      .finally(() => closeTransactionModal());
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn(
          "w-full grid gap-4 overflow-y-auto",
          isEditMode ?? "grid-cols-1 sm:grid-cols-2",
          "p-4 md:p-0 md:pt-4 md:pl-1 md:pr-2 md:pb-1",
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
              id="type"
              label="Type"
            />
          )}
        />

        {isEditMode && (
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FloatingLabelInputField
                field={field}
                id="status"
                label="Status"
                disabled
                classNames="capitalize"
              />
            )}
          />
        )}

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

        <div className={cn(isEditMode ?? "col-span-1 sm:col-span-2")}>
          <FormField
            control={control}
            name="note"
            render={({ field }) => (
              <FloatingLabelTextareaField
                field={field}
                id="note"
                label="Note"
              />
            )}
          />
        </div>

        <div
          className={cn(
            isEditMode ?? "col-span-1 sm:col-span-2",
            "flex flex-col-reverse xs:flex-row gap-4 mt-8"
          )}
        >
          {isEditMode && (
            <Button
              type="button"
              variant="destructive"
              className="h-10 w-full"
              disabled={isLoading}
              onClick={handleDeleteTransaction}
            >
              Delete
            </Button>
          )}

          <SubmitButton
            label={isEditMode ? "Save" : "Create"}
            isLoading={isLoading}
          />
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
