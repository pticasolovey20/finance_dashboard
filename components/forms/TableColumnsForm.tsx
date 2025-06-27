import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, VisibilityState } from "@tanstack/react-table";

import { TableColumnsSchema } from "@/schemas/tableColumnsSchema";
import { TableColumnsFormFields } from "@/types/tableColumnsTypes";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

interface TableColumnsFormProps<TableData> {
  table: Table<TableData>;
  onCloseDrawer: () => void;
}

const TableColumnsForm = <TableData,>({ table, onCloseDrawer }: TableColumnsFormProps<TableData>) => {
  const { columnVisibility, setColumnVisibility } = useTransactionTableStore();

  const columns = table.getAllLeafColumns();

  const form = useForm<TableColumnsFormFields>({
    resolver: zodResolver(TableColumnsSchema),
    defaultValues: {
      columns: columnVisibility,
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = (formData: TableColumnsFormFields) => {
    setColumnVisibility(formData.columns as VisibilityState);
    onCloseDrawer();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className={cn("w-full flex flex-col overflow-y-auto", "p-4 md:p-0 md:pt-4 md:pl-1 md:pr-2 md:pb-1")}
      >
        <FormField
          control={control}
          name="columns"
          render={({ field }) => {
            const columnIDs = columns.map((col) => col.id);

            return (
              <div className="w-full flex flex-col gap-4">
                {columnIDs.map((columnID) => {
                  const checked = field.value?.[columnID] ?? true;

                  return (
                    <FormItem key={columnID} className="w-full flex items-center gap-2">
                      <FormControl>
                        <Checkbox
                          className="h-5 w-5"
                          checked={checked}
                          onCheckedChange={(value) =>
                            field.onChange({
                              ...field.value,
                              [columnID]: value,
                            })
                          }
                        />
                      </FormControl>

                      <FormLabel className="w-full text-sm font-normal capitalize !mt-0">
                        {columnID === "categoryId" ? "Category" : columnID}
                      </FormLabel>
                    </FormItem>
                  );
                })}
              </div>
            );
          }}
        />

        <div className="flex flex-col-reverse xs:flex-row gap-4 mt-8">
          <Button variant="outline" className="h-10 w-full" disabled>
            Reset
          </Button>

          <SubmitButton label="Save" />
        </div>
      </form>
    </Form>
  );
};

export default TableColumnsForm;
