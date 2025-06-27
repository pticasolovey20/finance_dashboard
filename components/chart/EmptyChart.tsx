import { cn } from "@/lib/utils";

interface IEmptyChartProps {
  height?: string;
}

const EmptyChart = ({ height }: IEmptyChartProps) => {
  return (
    <div
      className={cn("flex items-center justify-center min-h-[500px]", height)}
    >
      <span className="text-muted-foreground text-lg">No data available</span>
    </div>
  );
};

export default EmptyChart;
