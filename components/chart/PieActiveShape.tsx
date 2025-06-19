import { Sector } from "recharts";

export interface IPieActiveShapeProps {
  cx?: number;
  cy?: number;
  innerRadius?: number;
  outerRadius?: number;
  startAngle?: number;
  endAngle?: number;
  fill?: string;

  payload?: {
    name: string;
    value: number;
  };

  percent?: number;
}

const PieActiveShape = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  percent,
}: IPieActiveShapeProps) => {
  const percentage = ((percent ?? 0) * 100).toFixed(2);

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        className="font-medium"
      >
        <tspan x={cx} dy="-0.4em">
          {payload?.name ?? ""}
        </tspan>

        <tspan x={cx} dy="1.2em">{`${percentage}%`}</tspan>
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
        innerRadius={outerRadius! + 6}
        outerRadius={outerRadius! + 10}
        fill={fill}
      />
    </g>
  );
};

export default PieActiveShape;
