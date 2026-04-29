import type { Metadata } from "next";
import BattlesPageTabs from "@/components/BattlesPageTabs";
export const metadata: Metadata = { title: "Battles" };

export default function BattlesPage() {
  return <BattlesPageTabs />;
}
