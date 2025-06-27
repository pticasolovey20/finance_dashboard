import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateRangeForm from "@/components/forms/DateRangeForm";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const TableDateRange = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline" className="h-10 sm:max-w-[200px] w-full flex items-center gap-3">
          <span className="md:text-base">Date Range</span>
          <CalendarIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full h-fit p-0 bg-background overflow-hidden" align="start">
        <DateRangeForm onSubmit={(data) => console.log(data)} />
      </PopoverContent>
    </Popover>
  );
};

export default TableDateRange;
