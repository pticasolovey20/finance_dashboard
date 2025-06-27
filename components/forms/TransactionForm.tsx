import { useEffect, useMemo } from "react";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  incomeCategoryOptions,
  expenseCategoryOptions,
  transactionsTypeOptions,
} from "@/constants/transactionFormOptions";
import { useTransactionStore } from "@/store/useTransactionStore";
import { TransactionStatus, TransactionType } from "@prisma/client";
import { TransactionsFormFields } from "@/types/transactionFormTypes";
import { TransactionFormSchema } from "@/schemas/transactionFormSchema";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";
import { incomeCategories, expenseCategories } from "@/constants/transactionCategory";

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
  const { isCreating, isUpdating, isDeleting, createTransaction, editTransaction, deleteTransaction } =
    useTransactionStore();

  const { transactionData, mode: formMode, closeFormModal } = useTransactionTableStore();

  const { toast } = useToast();

  const isEditMode = formMode === "edit";

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(TransactionFormSchema),

    defaultValues: {
      type: transactionData?.type ?? undefined,
      status: transactionData?.status ?? TransactionStatus.pending,
      categoryId: transactionData?.categoryId ?? undefined,
      amount: transactionData?.amount ?? undefined,
      date: transactionData?.date ?? new Date(),
      note: transactionData?.note ?? undefined,
    },
  });

  const { handleSubmit, control, setValue } = form;

  const transactionType = useWatch({
    control,
    name: "type",
  });

  const selectedCategoryId = useWatch({
    control,
    name: "categoryId",
  });

  useEffect(() => {
    if (!selectedCategoryId) return;

    if (incomeCategories.includes(selectedCategoryId)) {
      setValue("type", TransactionType.income, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else if (expenseCategories.includes(selectedCategoryId)) {
      setValue("type", TransactionType.expense, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [selectedCategoryId, setValue]);

  const filteredCategoryOptions = useMemo(() => {
    return incomeCategoryOptions.concat(expenseCategoryOptions).map((option) => {
      const isIncome = incomeCategoryOptions.some((category) => category.value === option.value);

      const isExpense = expenseCategoryOptions.some((category) => category.value === option.value);

      const disabled =
        transactionType === TransactionType.income
          ? isExpense
          : transactionType === TransactionType.expense
          ? isIncome
          : false;

      return {
        ...option,
        disabled,
      };
    });
  }, [transactionType]);

  const handleDeleteTransaction = async () => {
    deleteTransaction(transactionData!.id)
      .then(() => toast({ description: "Transaction deleted successfully!" }))
      .catch(() => {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      })
      .finally(() => closeFormModal());
  };

  const onFormSubmit = async (formData: TransactionsFormFields) => {
    if (isEditMode) {
      if (!transactionData?.id) {
        toast({
          variant: "destructive",
          description: "Transaction ID is missing!",
        });

        return;
      }

      editTransaction(transactionData?.id, formData)
        .then(() => toast({ description: "Transaction updated successfully!" }))
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong!",
          });
        })
        .finally(() => closeFormModal());
    } else {
      createTransaction(formData)
        .then(() => toast({ description: "Transaction created successfully!" }))
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Something went wrong!",
          });
        })
        .finally(() => closeFormModal());
    }
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
            <FloatingLabelSelectField field={field} options={transactionsTypeOptions} id="type" label="Type" />
          )}
        />

        {isEditMode && (
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FloatingLabelInputField field={field} id="status" label="Status" disabled classNames="capitalize" />
            )}
          />
        )}

        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FloatingLabelSelectField
              field={field}
              options={filteredCategoryOptions}
              id="categoryId"
              label="Category ID"
            />
          )}
        />

        <FormField
          control={control}
          name="amount"
          render={({ field }) => <FloatingLabelInputField field={field} id="amount" label="Amount" />}
        />

        <div className={cn(isEditMode ?? "col-span-1 sm:col-span-2")}>
          <FormField
            control={control}
            name="note"
            render={({ field }) => <FloatingLabelTextareaField field={field} id="note" label="Note" />}
          />
        </div>

        <div className={cn(isEditMode ?? "col-span-1 sm:col-span-2", "flex flex-col-reverse xs:flex-row gap-4 mt-8")}>
          {isEditMode && (
            <Button
              type="button"
              variant="destructive"
              className="h-10 w-full"
              disabled={isDeleting}
              onClick={handleDeleteTransaction}
            >
              Delete
            </Button>
          )}

          <SubmitButton label={isEditMode ? "Save" : "Create"} disabled={isCreating || isUpdating} />
        </div>
      </form>
    </Form>
  );
};

export default TransactionForm;
