import type { Metadata } from "next";
import BattlesPageTabs from "@/components/battles/BattlesPageTabs";
export const metadata: Metadata = { title: "Battles" };

export default function BattlesPage() {
  return <BattlesPageTabs />;
}
