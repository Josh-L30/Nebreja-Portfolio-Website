// Scroll choreography measured from the pinned reference; no animation runtime.
export const clamp = (n) => Math.max(0, Math.min(1, n));
export function serviceState(progress) {
  const t = clamp(progress) * 3.4;
  const expansion = clamp(t),
    first = clamp((t - 1) / 1.2),
    second = clamp((t - 2.2) / 1.2);
  return {
    t,
    scale: 0.72 + 0.28 * expansion,
    radius: 24 * (1 - expansion),
    y: [-100 * first, 100 * (1 - first) - 100 * second, 100 * (1 - second)],
    mediaY: [18 * first, -18 * (1 - first) + 18 * second, -18 * (1 - second)],
    mediaScale: 1 / 0.72 + (1 - 1 / 0.72) * expansion,
    indicator: first + second,
    active: t >= 2.8 ? 2 : t >= 1.6 ? 1 : 0,
    titles: [0.78, 1.95, 2.85].map((start) => t - start),
  };
}
export function devicePose(progress, type = "laptop", drag = { x: 0, y: 0 }) {
  const p = clamp(progress) - 0.5,
    keyboard = type === "keyboard";
  return {
    x:
      (keyboard ? 0.74 : 0.52) +
      p * (keyboard ? 0.45 : 0.85) +
      Math.max(-0.85, Math.min(0.85, drag.x)),
    y: (keyboard ? -0.52 : -0.6) + p * 1.4 + drag.y,
    z: (keyboard ? 0.06 : 0) - p * (keyboard ? 0.15 : 0.35),
  };
}
