import {
  IconHome,
  IconHistory,
  IconSparkles,
  IconCreditCard,
} from "@tabler/icons-react";

export interface NavLink {
  href: string;
  label: string;
  icon: typeof IconHome;
  matchMode?: "exact" | "startsWith";
}

export const NAV_LINKS: NavLink[] = [
  {
    href: "/dashboard",
    label: "Panel Principal",
    icon: IconHome,
    matchMode: "exact",
  },
  {
    href: "/dashboard/subir",
    label: "Analizar Vidriera",
    icon: IconSparkles,
    matchMode: "exact",
  },
  {
    href: "/dashboard/historial",
    label: "Mis Análisis",
    icon: IconHistory,
    matchMode: "startsWith",
  },
  {
    href: "/planes",
    label: "Planes",
    icon: IconCreditCard,
    matchMode: "exact",
  },
];
