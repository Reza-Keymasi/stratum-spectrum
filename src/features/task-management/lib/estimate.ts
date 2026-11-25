export const ESTIMATES = [
  { label: "No estimate", value: "none" },
  { label: "15 Minutes", value: "15" },
  { label: "30 Minutes", value: "30" },
  { label: "1 Hour", value: "60" },
  { label: "2 Hour", value: "120" },
  { label: "4 Hour", value: "240" },
  { label: "8 Hour", value: "480" },
];

export const estimateToValue = (m?: number | null) => (m ? String(m) : "none");
export const valueToEstimate = (v: string) => (v === "none" ? null : Number(v));

export const formatMinutes = (m: number) => {
  const h = Math.floor(m / 60);
  const r = m % 60;

  return h ? (r ? `${h}h ${r}m` : `${h}h`) : `${r}m`;
};
