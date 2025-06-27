"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DateRangeSchema } from "@/schemas/dateRangeSchema";
import { DaterangeFormFields } from "@/types/dateRangeTypes";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import SubmitButton from "@/components/forms/SubmitButton";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

interface DateRangeFormProps {
  onSubmit: (data: DaterangeFormFields) => void;
}

const DateRangeForm = ({ onSubmit }: DateRangeFormProps) => {
  const form = useForm<DaterangeFormFields>({
    resolver: zodResolver(DateRangeSchema),
  });

  const { handleSubmit, control, reset, watch } = form;

  const dateRangeValue = watch("dateRange");
  const isRangeComplete = dateRangeValue?.from && dateRangeValue?.to;

  const minDate = new Date("2024-01-01");
  const maxDate = new Date();

  const disabled = (date: Date) => date > maxDate || date < minDate;

  const handleReset = () => reset({ dateRange: undefined });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <FormField
          control={control}
          name="dateRange"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormControl>
                <Calendar
                  mode="range"
                  captionLayout="dropdown"
                  selected={value}
                  disabled={disabled}
                  onSelect={onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2 px-3 pb-3">
          <Button type="button" variant="outline" className="w-full" onClick={handleReset}>
            Reset
          </Button>

          <SubmitButton label="Apply" disabled={!isRangeComplete} />
        </div>
      </form>
    </Form>
  );
};

export default DateRangeForm;
