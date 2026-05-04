"use server";

import { revalidateCardsCache } from "@/lib/cards-revalidate";

function apiOrigin(): string {
  const base = process.env.API_URL;
  if (!base?.trim()) throw new Error("API_URL is not set");
  return base.replace(/\/+$/, "");
}

export async function uploadCardArtwork(
  _prev: { ok: boolean; message: string } | undefined,
  formData: FormData,
): Promise<{ ok: boolean; message: string }> {
  const idRaw = formData.get("cardId");
  const file = formData.get("file");
  if (typeof idRaw !== "string" || !idRaw.trim()) {
    return { ok: false, message: "Missing card id" };
  }
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Choose an image file" };
  }
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) {
    return { ok: false, message: "ADMIN_API_TOKEN is not configured" };
  }
  const id = Number(idRaw);
  if (!Number.isFinite(id)) {
    return { ok: false, message: "Invalid card id" };
  }
  const upstream = new FormData();
  upstream.append("file", file);
  const res = await fetch(`${apiOrigin()}/cards/${id}/artwork`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: upstream,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    return { ok: false, message: text.slice(0, 500) };
  }
  await revalidateCardsCache();
  return { ok: true, message: "Uploaded" };
}
