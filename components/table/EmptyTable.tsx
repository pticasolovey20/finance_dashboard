import { cn } from "@/lib/utils";

const EmptyTable = () => {
  return (
    <div
      className={cn(
        "min-h-[200px] overflow-hidden",
        "flex items-center justify-center",
        "border border-input rounded-md"
      )}
    >
      <span className="font-medium text-lg">Nothing found!</span>
    </div>
  );
};

export default EmptyTable;
