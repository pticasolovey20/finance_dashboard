import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Table, VisibilityState } from "@tanstack/react-table";

import { FiltersFormFields } from "@/types/filters";
import { FiltersSchema } from "@/schemas/filtersSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import SubmitButton from "@/components/forms/SubmitButton";

interface IFiltersFormProps<TableData> {
  table: Table<TableData>;
  columnVisibility: VisibilityState;
  setColumnVisibility: Dispatch<SetStateAction<VisibilityState>>;
  onCloseDrawer: () => void;
}

const FiltersForm = <TableData,>({
  table,
  columnVisibility,
  setColumnVisibility,
  onCloseDrawer,
}: IFiltersFormProps<TableData>) => {
  const columns = table.getAllLeafColumns();

  const form = useForm<FiltersFormFields>({
    resolver: zodResolver(FiltersSchema),
    defaultValues: {
      columns: columnVisibility,
    },
  });

  const { handleSubmit, control } = form;

  const onFormSubmit = (formData: FiltersFormFields) => {
    setColumnVisibility(formData.columns as VisibilityState);
    onCloseDrawer();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="w-full space-y-4 p-4"
      >
        <FormField
          control={control}
          name="columns"
          render={({ field }) => {
            const columnIDs = columns.map((col) => col.id);

            return (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="text-base">Columns</FormLabel>

                <div className="flex flex-col gap-4">
                  {columnIDs.map((columnID) => {
                    const checked = field.value?.[columnID] ?? true;

                    return (
                      <FormItem
                        key={columnID}
                        className="flex items-center gap-2"
                      >
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

                        <FormLabel className="text-sm font-normal capitalize !mt-0">
                          {columnID}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
              </FormItem>
            );
          }}
        />

        <div className="flex justify-end">
          <SubmitButton label="Apply Filters" classNames="w-fit" />
        </div>
      </form>
    </Form>
  );
};

export default FiltersForm;
