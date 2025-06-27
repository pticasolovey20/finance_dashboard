import { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ResponsiveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  contentClassName?: string;
  titleClassName?: string;
}

const ResponsiveModal = ({
  open,
  onOpenChange,
  title,
  children,
  contentClassName = "",
  titleClassName = "",
}: ResponsiveModalProps) => {
  const isMobile = useIsMobile();

  if (!open) return null;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn("max-h-[calc(100dvh-50px)]", contentClassName)} aria-describedby={undefined}>
          <DrawerHeader>
            <DrawerTitle className={cn("text-xl lg:text-2xl text-center", titleClassName)}>{title}</DrawerTitle>
          </DrawerHeader>

          {children}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("min-w-[600px] max-h-[calc(100dvh-50px)] flex flex-col", contentClassName)}
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className={`text-xl lg:text-2xl pl-1 ${titleClassName}`}>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ResponsiveModal;
