"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogRowKey = catalogRowKey;
exports.assignCatalogRowKeys = assignCatalogRowKeys;
function slugPart(s) {
    return (s ?? "")
        .normalize("NFKD")
        .replace(/\p{M}/gu, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
function catalogRowKey(title, year) {
    const t = slugPart(title);
    if (!t) {
        throw new Error("catalogRowKey: title is required");
    }
    const y = slugPart(year);
    return y ? `${t}-${y}` : t;
}
function assignCatalogRowKeys(items) {
    const groups = new Map();
    for (const item of items) {
        const base = catalogRowKey(item.title, item.year);
        const g = groups.get(base) ?? [];
        g.push(item.id);
        groups.set(base, g);
    }
    const result = new Map();
    for (const [base, ids] of groups) {
        if (ids.length === 1) {
            result.set(ids[0], base);
        }
        else {
            ids.sort((a, b) => a - b);
            ids.forEach((id, i) => result.set(id, `${base}-${i}`));
        }
    }
    return result;
}
//# sourceMappingURL=catalog-row-key.js.map