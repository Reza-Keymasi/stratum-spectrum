import { format } from "date-fns";

export const toDateString = (d: Date) => format(d, "yyyy-MM-dd");

export const formatDateString = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const today = () => toDateString(new Date());

export const dayToUTCDate = (s: string) => new Date(`${s}T00:00:00.000z`);

export const monthRange = (year: number, month: number) => ({
  start: new Date(Date.UTC(year, month - 1, 1)),
  end: new Date(Date.UTC(year, month, 1)),
});
