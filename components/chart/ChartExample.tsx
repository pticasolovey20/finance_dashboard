"use client";
import { data } from "@/constants/chart";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  Area,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import CustomTooltip from "@/components/chart/CustomTooltip";

const ChartExample = () => {
  const isMobile = useIsMobile();

  const config = {
    data,

    width: 800,
    height: 500,
    margin: {
      top: isMobile ? 0 : 20,
      right: isMobile ? 0 : 20,
      bottom: isMobile ? 0 : 20,
      left: isMobile ? -10 : 0,
    },
  };

  return (
    <Card className="max-w-[800px] w-full rounded-lg">
      <CardContent className="h-[500px] p-3">
        <ResponsiveContainer>
          <ComposedChart {...config} className="!cursor-pointer">
            <CartesianGrid stroke="#f5f5f5" />

            <XAxis
              dataKey="date"
              tickFormatter={(date) =>
                new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />

            <YAxis />

            <Tooltip
              content={({ active, payload, label }) => (
                <CustomTooltip
                  active={active}
                  payload={payload}
                  label={label}
                />
              )}
            />

            {/* TO DO: Custom Legend */}
            <Legend content={() => <div></div>} />

            <Area
              type="monotone"
              dataKey="third_param"
              fill="#8884d8"
              stroke="#8884d8"
            />

            <Bar
              dataKey="second_param"
              barSize={isMobile ? 20 : 40}
              fill="#413ea0"
            />

            <Line
              type="monotone"
              dataKey="first_param"
              stroke="#ff7300"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartExample;
