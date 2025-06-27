import { useIsMobile } from "@/hooks/use-mobile";
import { useCallback, useMemo, useState } from "react";

import { ICategoryData } from "@/types/categoryTypes";

import CustomLegend from "@/components/chart/CustomLegend";
import ChartWrapper from "@/components/chart/ChartWrapper";
import PieActiveShape from "@/components/chart/PieActiveShape";
import { Pie, Cell, PieChart, ResponsiveContainer } from "recharts";

interface IPieCategoryChartProps {
  categories: ICategoryData[];
  showLegend?: boolean;
  isLoading: boolean;
}

const PieCategoryChart = ({ categories, showLegend = true, isLoading }: IPieCategoryChartProps) => {
  const [activeName, setActiveName] = useState<string | undefined>(undefined);
  const [hiddenItems, setHiddenItems] = useState<string[]>([]);
  const [accordionValue, setAccordionValue] = useState<string>("");

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

  const activeIndex = useMemo(() => {
    return visibleData.findIndex((item) => item.name === activeName);
  }, [visibleData, activeName]);

  const handlePieEnter = useCallback(
    (_event: MouseEvent, index: number) => {
      const item = visibleData[index];

      if (item) {
        setActiveName(item.name);
      }
    },
    [visibleData]
  );

  const handleMouseLeave = useCallback(() => setActiveName(undefined), []);

  const handleLegendHover = useCallback(
    (itemName: string) => {
      const itemIndex = visibleData.findIndex((item) => item.name === itemName);

      if (itemIndex === -1) {
        setActiveName(undefined);
      } else {
        setActiveName(itemName);
      }
    },
    [visibleData]
  );

  const handleLegendClick = useCallback((itemName: string) => {
    setHiddenItems((prev) => {
      if (prev.includes(itemName)) {
        setActiveName(itemName);
        return prev.filter((name) => name !== itemName);
      } else {
        return [...prev, itemName];
      }
    });
  }, []);

  const pieCells = useMemo(() => {
    return visibleData.map((entry) => {
      return <Cell key={entry.name} strokeWidth={0} stroke="transparent" fill={entry.color} />;
    });
  }, [visibleData]);

  if (data.length === 0) {
    return <ChartWrapper title="Pie Category Chart" isLoading={isLoading} isEmpty={true} />;
  }

  return (
    <ChartWrapper title="Pie Category Chart" isLoading={isLoading} isEmpty={false}>
      <div className="w-full h-[500px]">
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
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showLegend && (
        <CustomLegend
          data={data}
          hiddenItems={hiddenItems}
          accordionValue={accordionValue}
          setAccordionValue={setAccordionValue}
          handleLegendClick={handleLegendClick}
          handleLegendHover={handleLegendHover}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </ChartWrapper>
  );
};

export default PieCategoryChart;
