import { cache } from "react";
import { cookies } from "next/headers";
import { TZDate } from "react-day-picker";
import { startOfDay, addDays, subDays, format } from "date-fns";

export interface Today {
  tz: string;
  iso: string;
  start: Date;
  end: Date;
  weekAgo: Date;
}

export const isValidTZ = (tz?: string): tz is string => {
  if (!tz) return false;

  try {
    Intl.DateTimeFormat(undefined, { timeZone: tz });
    return true;
  } catch {
    return false;
  }
};

const plain = (d: Date) => new Date(d.getTime());

export const getToday = cache(async (): Promise<Today> => {
  const saved = (await cookies()).get("tz")?.value;
  const tz = isValidTZ(saved) ? saved : "UTC";

  const start = startOfDay(new TZDate(Date.now(), tz));

  return {
    tz,
    iso: format(start, "yyyy-MM-dd"),
    start: plain(start),
    end: plain(addDays(start, 1)),
    weekAgo: plain(subDays(start, 7)),
  };
});
