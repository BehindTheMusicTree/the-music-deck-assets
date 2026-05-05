function slugPart(s: string | undefined): string {
  return (s ?? "")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Stable catalogue row key: `title-year` (slug segments). */
export function catalogRowKey(title: string, year?: string): string {
  const t = slugPart(title);
  if (!t) {
    throw new Error("catalogRowKey: title is required");
  }
  const y = slugPart(year);
  return y ? `${t}-${y}` : t;
}

/**
 * Assign row keys to a collection. Cards sharing the same title+year base key
 * get numeric suffixes (-0, -1, …), ordered by id (lowest id = 0).
 */
export function assignCatalogRowKeys(
  items: { id: number; title: string; year?: string }[],
): Map<number, string> {
  const groups = new Map<string, number[]>();
  for (const item of items) {
    const base = catalogRowKey(item.title, item.year);
    const g = groups.get(base) ?? [];
    g.push(item.id);
    groups.set(base, g);
  }
  const result = new Map<number, string>();
  for (const [base, ids] of groups) {
    if (ids.length === 1) {
      result.set(ids[0], base);
    } else {
      ids.sort((a, b) => a - b);
      ids.forEach((id, i) => result.set(id, `${base}-${i}`));
    }
  }
  return result;
}
