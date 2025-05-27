import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import SectionHeader from "@/components/SectionHeader";

interface ISectionWrapperProps {
  sectionTitle: string;
  sectionDescription?: string;
  classNames?: string;
  children: ReactNode;
}

const SectionWrapper = ({
  sectionTitle,
  sectionDescription,
  classNames,
  children,
}: ISectionWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-8 my-6", classNames)}>
      <SectionHeader title={sectionTitle} description={sectionDescription} />

      {children}
    </div>
  );
};

export default SectionWrapper;
