import { z } from "zod";
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

// Period Query Schema

export const QuerySchema = z
  .object({
    year: z.coerce.number().min(2000).max(2100).optional(),
    month: z.coerce.number().min(1).max(12).optional(),
  })
  .refine((value) => value.month === undefined || value.year !== undefined, {
    message: "Month require year",
  });

export type QueryDate = z.infer<typeof QuerySchema>;

export const periodFilter = (searchParams: URLSearchParams) => {
  const parsed = QuerySchema.safeParse({
    year: searchParams.get("year") ?? undefined,
    month: searchParams.get("month") ?? undefined,
  });

  if (!parsed.success) return null;

  const { year, month } = parsed.data;

  if (year === undefined) return {};

  const start = new Date(Date.UTC(year, (month ?? 1) - 1, 1));
  const end = month
    ? new Date(Date.UTC(year, month, 1))
    : new Date(Date.UTC(year + 1, 0, 1));

  return { transactionDate: { $gte: start, $lt: end } };
};
