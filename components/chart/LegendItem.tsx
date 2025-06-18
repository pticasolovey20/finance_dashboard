import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface IPieData {
  name: string;
  value: number;
  color: string;
}

interface ILegendItemProps {
  entry: IPieData;
  isHidden: boolean;
  onMouseEnter: () => void;
  onClick: (itemName: string) => void;
}

const LegendItem = ({
  entry,
  isHidden,
  onMouseEnter,
  onClick,
}: ILegendItemProps) => {
  const handleClick = useCallback(() => {
    onClick(entry.name);
  }, [onClick, entry.name]);

  return (
    <li
      title={isHidden ? "Show" : "Hide"}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "flex items-center gap-2",
        "cursor-pointer transition-all",
        "duration-200 hover:opacity-75",
        isHidden ? "opacity-50" : "opacity-100"
      )}
    >
      <span
        className={cn(
          "w-3 h-3 rounded-full transition-colors",
          isHidden ? "bg-foreground" : ""
        )}
        style={{
          backgroundColor: isHidden ? undefined : entry.color,
        }}
      />
      <span
        className={cn(
          "text-base text-muted-foreground transition-all",
          isHidden ? "line-through" : ""
        )}
      >
        {entry.name}
      </span>
    </li>
  );
};

export default LegendItem;
