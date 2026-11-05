import { useCallback } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export const TYPE_FILTERS = ["all", "income", "expense"] as const;
export type TypeFilter = (typeof TYPE_FILTERS)[number];

export const useSwitchTransactionType = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawType = searchParams.get("type");
  const type: TypeFilter = TYPE_FILTERS.includes(rawType as TypeFilter)
    ? (rawType as TypeFilter)
    : "all";

  const setType = useCallback(
    (next: TypeFilter) => {
      const params = new URLSearchParams(searchParams.toString());

      if (next === "all") params.delete("type");
      else params.set("type", next);

      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  const typeApiParams = type === "all" ? {} : { type };
  return {
    type,
    setType,
    typeApiParams,
  };
};
