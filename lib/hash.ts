// Small deterministic hash → base36 code (used for donation and LOI references).
export function shortCode(input: string, len = 6) {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36).toUpperCase().padStart(len, "0").slice(0, len);
}
