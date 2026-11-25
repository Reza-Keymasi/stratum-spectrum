export const LABEL_STYLES = {
  bug: "bg-red-100 text-red-700 hover:bg-red-200",
  docs: "bg-lime-100 text-lime-700 hover:bg-lime-200",
  brand: "bg-teal-100 text-teal-700 hover:bg-teal-200",
  email: "bg-orange-100 text-orange-700 hover:bg-orange-200",
  research: "bg-violet-100 text-violet-700 hover:bg-violet-200",
  develop: "bg-blue-100 text-blue-700 hover:bg-blue-200",
  design: "bg-pink-100 text-pink-700 hover:bg-pink-200",
  ux: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
} as const;

export const LABELS = Object.keys(LABEL_STYLES);

export const DEFAULT_STYLES = "bg-transparent text-gray-400";

export const getLabelStyles = (name: string) => {
  if (name in LABEL_STYLES)
    return LABEL_STYLES[name as keyof typeof LABEL_STYLES];

  return "bg-gray-100 text-gray-700 border-gray-400 hover:bg-gray-200";
};

export const normalizeLabel = (s: string) =>
  s.trim().toLowerCase().slice(0, 30);
