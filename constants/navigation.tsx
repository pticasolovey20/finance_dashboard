import { Settings } from "lucide-react";
import { ProtectedRoutesEnum } from "@/types/route";

export const NAVIGATION = [
  {
    label: "Dashboard",
    href: ProtectedRoutesEnum.DASHBOARD,
    icon: <Settings />,
  },
  {
    label: "Transactions",
    href: ProtectedRoutesEnum.TRANSACTIONS,
    icon: <Settings />,
  },
  { label: "Budget", href: ProtectedRoutesEnum.BUDGET, icon: <Settings /> },
  {
    label: "Settings",
    href: ProtectedRoutesEnum.SETTINGS,
    icon: <Settings />,
  },
];
