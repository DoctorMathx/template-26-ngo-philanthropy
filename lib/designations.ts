import { funds } from "@/mock/funds";
import { campaigns } from "@/mock/campaigns";
import { focusAreas } from "@/mock/focus-areas";

export type DesignationGroup = { group: string; options: { value: string; label: string }[] };

// Designation values: "general" | "fund:<slug>" | "campaign:<slug>" | "programme:<focus-slug>"
export const designationGroups: DesignationGroup[] = [
  { group: "Where it’s needed most", options: [{ value: "general", label: "General fund — where it’s needed most" }] },
  { group: "Pooled funds (matched 1:1)", options: funds.map((f) => ({ value: `fund:${f.slug}`, label: f.name })) },
  { group: "Appeals", options: campaigns.map((c) => ({ value: `campaign:${c.slug}`, label: c.title })) },
  { group: "Focus areas", options: focusAreas.map((f) => ({ value: `programme:${f.slug}`, label: f.name })) },
];

const ALL = designationGroups.flatMap((g) => g.options);

export function designationLabel(value: string | null | undefined) {
  return ALL.find((o) => o.value === value)?.label ?? "General fund — where it’s needed most";
}

export function isValidDesignation(value: string | null | undefined): value is string {
  return !!value && ALL.some((o) => o.value === value);
}

/** Pooled-fund slug that a designation feeds (and so is matched), if any. */
export function matchedFundFor(value: string | null | undefined) {
  if (!value) return null;
  if (value.startsWith("fund:")) return funds.find((f) => f.slug === value.slice(5)) ?? null;
  if (value.startsWith("campaign:")) {
    const c = campaigns.find((x) => x.slug === value.slice(9));
    return c ? funds.find((f) => f.slug === c.fund) ?? null : null;
  }
  return null;
}
