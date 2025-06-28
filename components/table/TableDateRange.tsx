import { DateRangeFormFields } from "@/types/dateRangeTypes";
import { useTransactionStore } from "@/store/useTransactionStore";
import { useTransactionTableStore } from "@/store/useTransactionTableStore";

import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateRangeForm from "@/components/forms/DateRangeForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const TableDateRange = () => {
  const { currentDateRange, setDateRange, clearDateRange } = useTransactionStore();

  const {
    transactionModals: { isDateRangeOpen },
    openDateRange,
    closeDateRange,
  } = useTransactionTableStore();

  const handleOpenChange = (open: boolean) => {
    if (open) {
      openDateRange();
    } else {
      closeDateRange();
    }
  };

  const handleDateRangeSubmit = (data: DateRangeFormFields) => {
    setDateRange(data.dateRange);
    closeDateRange();
  };

  const handleClearDateRange = () => clearDateRange();

  return (
    <Popover open={isDateRangeOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          onClick={openDateRange}
          className="h-10 sm:max-w-[200px] w-full flex items-center gap-3"
        >
          <span className="md:text-base">Pick Date</span>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full h-fit p-0 bg-background overflow-hidden" align="start">
        <DateRangeForm
          storedDateRange={currentDateRange}
          handleDateRangeSubmit={handleDateRangeSubmit}
          handleClearDateRange={handleClearDateRange}
          closeDateRange={closeDateRange}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TableDateRange;
