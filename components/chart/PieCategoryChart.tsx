import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, useMemo, useState } from "react";

import { ICategoryData } from "@/types/categoryTypes";

import LegendItem from "@/components/chart/LegendItem";
import ChartWrapper from "@/components/chart/ChartWrapper";
import PieActiveShape from "@/components/chart/PieActiveShape";
import { Pie, Cell, Legend, PieChart, ResponsiveContainer } from "recharts";

interface IPieCategoryChartProps {
  categories: ICategoryData[];
  isLoading: boolean;
}

const PieCategoryChart = ({
  categories,
  isLoading,
}: IPieCategoryChartProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);

  const isMobile = useIsMobile();

  const data = useMemo(() => {
    return categories.map(({ categoryName, _count, color }) => ({
      color,
      name: categoryName,
      value: _count!.transactions,
    }));
  }, [categories]);

  const visibleData = useMemo(() => {
    return data.filter((item) => !hiddenItems.includes(item.name));
  }, [data, hiddenItems]);

  const handlePieEnter = useCallback((_: unknown, index: number) => {
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => setActiveIndex(undefined), []);

  const handleLegendHover = useCallback(
    (itemName: string) => {
      const itemIndex = visibleData.findIndex((item) => item.name === itemName);

      if (itemIndex === -1) {
        setActiveIndex(undefined);
      } else {
        setActiveIndex(itemIndex);
      }
    },

    [visibleData]
  );

  const handleLegendClick = useCallback((itemName: string) => {
    setHiddenItems((prev) => {
      if (prev.includes(itemName)) {
        return prev.filter((name) => name !== itemName);
      } else {
        return [...prev, itemName];
      }
    });
  }, []);

  const renderCustomLegend = useCallback(() => {
    return (
      <ul className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry) => {
          return (
            <LegendItem
              key={entry.name}
              entry={entry}
              isHidden={hiddenItems.includes(entry.name)}
              onClick={handleLegendClick}
              onMouseEnter={() => handleLegendHover(entry.name)}
            />
          );
        })}
      </ul>
    );
  }, [data, hiddenItems, handleLegendClick, handleLegendHover]);

  const pieCells = useMemo(() => {
    return visibleData.map((entry) => {
      return (
        <Cell
          key={entry.name}
          strokeWidth={0}
          stroke="transparent"
          fill={entry.color}
        />
      );
    });
  }, [visibleData]);

  if (data.length === 0) {
    return (
      <ChartWrapper
        title="Pie Category Chart"
        isLoading={isLoading}
        isEmpty={true}
      />
    );
  }

  return (
    <ChartWrapper
      title="Pie Category Chart"
      isLoading={isLoading}
      isEmpty={false}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={<PieActiveShape />}
            data={visibleData}
            cx="50%"
            cy="50%"
            innerRadius={isMobile ? 100 : 100}
            outerRadius={isMobile ? 160 : 180}
            paddingAngle={3}
            dataKey="value"
            onMouseEnter={handlePieEnter}
            onMouseLeave={handleMouseLeave}
          >
            {pieCells}
          </Pie>

          <Legend
            wrapperStyle={{ paddingTop: "20px" }}
            content={renderCustomLegend}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default PieCategoryChart;
