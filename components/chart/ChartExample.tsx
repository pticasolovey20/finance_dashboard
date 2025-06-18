/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { COLORS } from "@/constants/chart";
import { useIsMobile } from "@/hooks/use-mobile";

import CircleLoader from "@/components/CircleLoader";
import { Card, CardContent } from "@/components/ui/card";
import { Sector, PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

const renderActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
}: any) => {
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        <tspan x={cx} dy="-0.4em">
          {payload.name}
        </tspan>

        <tspan x={cx} dy="1.2em">{`${(percent * 100).toFixed(2)}%`}</tspan>
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />

      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

interface IChartExampleProps {
  categories: unknown[];
  isLoading: boolean;
}

const ChartExample = ({ categories, isLoading }: IChartExampleProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const isMobile = useIsMobile();

  const preparedData = categories.map(({ categoryName, _count }: any) => ({
    name: categoryName,
    value: _count.transactions,
  }));

  const onPieEnter = (_: any, index: number) => setActiveIndex(index);

  return (
    <Card className="max-w-[500px] w-full rounded-lg">
      <CardContent className="relative h-[500px] p-3">
        {isLoading ? (
          <CircleLoader />
        ) : (
          <ResponsiveContainer>
            <PieChart width={500} height={500}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={preparedData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 80 : 100}
                outerRadius={isMobile ? 140 : 180}
                paddingAngle={3}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {preparedData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ChartExample;
