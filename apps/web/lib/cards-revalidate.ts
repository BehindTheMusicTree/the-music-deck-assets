"use server";

import { revalidateTag } from "next/cache";

export async function revalidateCardsCache(): Promise<void> {
  revalidateTag("cards", "max");
}
