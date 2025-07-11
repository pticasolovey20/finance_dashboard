import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import CircleLoader from "@/components/CircleLoader";
import EmptyChart from "@/components/chart/EmptyChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface IChartWrapperProps {
  title: string;

  isLoading: boolean;
  isEmpty: boolean;

  width?: string;
  height?: string;

  children?: ReactNode;
  showHeader?: boolean;
  classNames?: string;
}

const ChartWrapper = ({
  title,

  isEmpty,
  isLoading,

  width = "max-w-[500px]",
  height = "h-auto",

  children,
  showHeader = true,
  classNames,
}: IChartWrapperProps) => {
  return (
    <Card
      className={cn(width, "w-full rounded-lg overflow-hidden", classNames)}
    >
      {showHeader && (
        <CardHeader className="p-4">
          <CardTitle className="text-center text-lg">{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent
        className={cn(
          height,
          "min-h-[500px] relative p-3 bg-inherit",
          "transition-all duration-300 ease-in-out"
        )}
      >
        {isLoading ? (
          <CircleLoader />
        ) : isEmpty ? (
          <EmptyChart height={height} />
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};

export default ChartWrapper;
