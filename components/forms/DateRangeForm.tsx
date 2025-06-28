"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DateRangeSchema } from "@/schemas/dateRangeSchema";
import { DateRangeData, DateRangeFormFields } from "@/types/dateRangeTypes";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface DateRangeFormProps {
  storedDateRange: DateRangeData;
  handleDateRangeSubmit: (data: DateRangeFormFields) => void;
  handleClearDateRange: () => void;
  closeDateRange: () => void;
}

const DateRangeForm = ({
  storedDateRange,
  handleDateRangeSubmit,
  handleClearDateRange,
  closeDateRange,
}: DateRangeFormProps) => {
  const form = useForm<DateRangeFormFields>({
    resolver: zodResolver(DateRangeSchema),
    defaultValues: {
      dateRange: storedDateRange,
    },
  });

  const { handleSubmit, control, watch, reset } = form;

  const selectedRange = watch("dateRange");
  const minDate = new Date("2024-01-01");
  const maxDate = new Date();

  const disabledCalendar = (date: Date) => date > maxDate || date < minDate;

  const handleReset = () => {
    handleClearDateRange();
    reset({ dateRange: null });
    closeDateRange();
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleDateRangeSubmit)} className="">
        <FormField
          control={control}
          name="dateRange"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormControl>
                <Calendar
                  mode="range"
                  captionLayout="dropdown"
                  selected={value ?? undefined}
                  disabled={disabledCalendar}
                  onSelect={onChange}
                  startMonth={new Date(2024, 0)}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {!!selectedRange && (
          <div className="flex flex-col gap-2 px-3 pb-3">
            <Button type="button" variant="outline" className="w-full" onClick={handleReset}>
              Reset
            </Button>

            <SubmitButton label="Apply" />
          </div>
        )}
      </form>
    </Form>
  );
};

export default DateRangeForm;
