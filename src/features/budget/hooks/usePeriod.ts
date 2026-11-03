"use client";

import { useMemo, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const parseInRange = (
  value: string | null,
  min: number,
  max: number,
  fallback: number,
) => {
  const num = Number(value);
  return Number.isInteger(num) && num >= min && num <= max ? num : fallback;
};

export const usePeriod = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const now = new Date();
  const year = parseInRange(
    searchParams.get("year"),
    2000,
    2100,
    now.getFullYear(),
  );
  const month = parseInRange(
    searchParams.get("month"),
    1,
    12,
    now.getMonth() + 1,
  );
  const isAll = searchParams.get("all") === "1";

  const update = useCallback(
    (patch: { year?: number; month?: number; all?: boolean }) => {
      const next = new URLSearchParams(searchParams.toString());
      next.set("year", String(patch.year ?? year));
      next.set("month", String(patch.month ?? month));

      if (patch.all ?? isAll) {
        next.set("all", "1");
      } else {
        next.delete("all");
      }

      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, year, month, isAll],
  );

  const apiParams = useMemo(
    () => (isAll ? {} : { year, month }),
    [isAll, year, month],
  );

  return {
    year,
    month,
    isAll,
    apiParams,
    prevMonth: () => update({ month: month === 1 ? 12 : month - 1 }),
    nextMonth: () => update({ month: month === 12 ? 1 : month + 1 }),
    prevYear: () => update({ year: year - 1 }),
    nextYear: () => update({ year: year + 1 }),
    toggleAll: () => update({ all: !isAll }),
  };
};
