/**
 * `border-box` flag layer on the card shell: the image is painted on the full
 * shell then clipped to the 10px border. With `cover`, each side shows a
 * *different* crop of the same bitmap (flags look rotated, “half a cross”,
 * stripes that don’t line up at corners). `100% 100%` stretches the flag to
 * the same box on every side so the border reads as one frame (at the cost of
 * aspect stretch on very tall cards). CSS gradients also use `100% 100%`.
 */
export function flatShellFlagBackgroundSize(
  _borderImage: string | undefined,
): "100% 100%" {
  return "100% 100%";
}
