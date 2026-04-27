/** URL/SVG `border-box` fill needs `cover` to keep aspect; CSS gradients use `100% 100%`. */
export function flatShellFlagBackgroundSize(
  borderImage: string | undefined,
): "cover" | "100% 100%" {
  if (!borderImage) return "100% 100%";
  return /^url\(/i.test(borderImage.trim()) ? "cover" : "100% 100%";
}
