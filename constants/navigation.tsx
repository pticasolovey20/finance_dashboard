import { ProtectedRoutesEnum } from "@/types/routeTypes";

import {
  Wallet,
  Settings,
  CircleUser,
  LayoutDashboard,
  BadgeDollarSign,
} from "lucide-react";

export const NAVIGATION = [
  {
    label: "Dashboard",
    href: ProtectedRoutesEnum.DASHBOARD,
    icon: LayoutDashboard,
  },

  {
    label: "Transactions",
    href: ProtectedRoutesEnum.TRANSACTIONS,
    icon: BadgeDollarSign,
  },

  {
    label: "Budget",
    href: ProtectedRoutesEnum.BUDGET,
    icon: Wallet,
  },

  {
    label: "Settings",
    href: ProtectedRoutesEnum.SETTINGS,
    icon: Settings,
  },

  {
    label: "Account",
    href: ProtectedRoutesEnum.ACCOUNT,
    icon: CircleUser,
  },
];
