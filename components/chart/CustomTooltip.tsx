import {
  Payload,
  ValueType,
  NameType,
} from "recharts/types/component/DefaultTooltipContent";

interface ICustomTooltipProps {
  active: boolean | undefined;
  payload: Payload<ValueType, NameType>[] | undefined;
  label: string;
}

const CustomTooltip = ({ active, payload, label }: ICustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const formatLabel = (key: string) =>
    key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div className="rounded-md border bg-background p-3 shadow-md">
      <p className="text-sm font-medium text-muted-foreground">
        {new Date(label).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>

      <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
        {payload.map((item, index: number) => (
          <li key={index} className="flex justify-between gap-2">
            <span className="font-semibold" style={{ color: item.color }}>
              {formatLabel(item.name as string)}:{" "}
            </span>

            <span>{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomTooltip;
