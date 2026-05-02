import { redirect } from "next/navigation";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Charter" };


export default function CharterPage() {
  redirect("/charter/palette");
}
