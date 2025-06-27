import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import LegendItem from "@/components/chart/LegendItem";

interface ICustomLegendProps {
  data: {
    name: string;
    color: string;
    value: number;
  }[];
  hiddenItems: string[];
  accordionValue: string;
  setAccordionValue: (value: string) => void;
  handleLegendClick: (name: string) => void;
  handleLegendHover: (name: string) => void;
  handleMouseLeave: () => void;
}

const CustomLegend = ({
  data,
  hiddenItems,
  accordionValue,
  setAccordionValue,
  handleLegendClick,
  handleLegendHover,
  handleMouseLeave,
}: ICustomLegendProps) => {
  const isLegendOpen = accordionValue === "legend-accordion";

  return (
    <Accordion
      type="single"
      collapsible
      value={accordionValue}
      onValueChange={setAccordionValue}
    >
      <AccordionItem value="legend-accordion" className="!border-none">
        <AccordionTrigger
          className={cn(
            "flex justify-center gap-2 p-0",
            "text-muted-foreground hover:no-underline hover:text-foreground"
          )}
        >
          <span className="text-base font-medium">Chart Legend</span>
        </AccordionTrigger>

        <AccordionContent
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{ opacity: isLegendOpen ? 1 : 0 }}
        >
          <ul className="flex flex-wrap justify-center gap-4 mt-4">
            {data.map((entry) => (
              <LegendItem
                key={entry.name}
                entry={entry}
                isHidden={hiddenItems.includes(entry.name)}
                onClick={handleLegendClick}
                onMouseEnter={() => handleLegendHover(entry.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CustomLegend;
