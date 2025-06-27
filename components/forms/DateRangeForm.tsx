"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formatDate } from "@/lib/formatDate";
import { DateRangeSchema } from "@/schemas/dateRangeSchema";
import { DaterangeFormFields } from "@/types/dateRangeTypes";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangeFormProps {
  onSubmit: (data: DaterangeFormFields) => void;
}

const DateRangeForm = ({ onSubmit }: DateRangeFormProps) => {
  const form = useForm<DaterangeFormFields>({
    resolver: zodResolver(DateRangeSchema),
  });

  const { handleSubmit, control } = form;

  const getButtonLabel = (range?: { from?: Date; to?: Date }) => {
    switch (true) {
      case !range?.from && !range?.to:
        return "Date Range";

      case !!range?.from && !!range?.to:
        return `${formatDate(range.from!, "dd.MM.yy")} - ${formatDate(range.to!, "dd.MM.yy")}`;

      case !!range?.from && !range?.to:
        return `${formatDate(range.from!, "dd.MM.yy")} - ...`;

      default:
        return "";
    }
  };

  const disabled = (date: Date) => date > new Date() || date < new Date("2024-01-01");

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-10 sm:max-w-[200px] w-full">
        <FormField
          control={control}
          name="dateRange"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" className="h-10 w-full flex items-center gap-3">
                      <span>{getButtonLabel(value)}</span>
                      <CalendarIcon />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0 overflow-hidden" align="start">
                  <Calendar
                    mode="range"
                    captionLayout="dropdown"
                    selected={value}
                    disabled={disabled}
                    onSelect={(range) => {
                      onChange(range);

                      if (range?.from && range?.to) {
                        handleSubmit(onSubmit)();
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default DateRangeForm;
