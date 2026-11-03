"use client";

import { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { usePeriod } from "../hooks/usePeriod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const monthName = (month: number) => {
  return new Date(2000, month - 1, 1).toLocaleDateString("en-US", {
    month: "long",
  });
};

const Arrow = ({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled: boolean;
  children: ReactNode;
}) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    className="cursor-pointer"
    size="icon-xs"
    variant="ghost"
  >
    {children}
  </Button>
);

const PeriodSwitcher = () => {
  const {
    year,
    month,
    isAll,
    prevMonth,
    nextMonth,
    prevYear,
    nextYear,
    toggleAll,
  } = usePeriod();

  return (
    <>
      <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2">
        <Arrow onClick={prevMonth} disabled={isAll}>
          <ArrowLeft className="text-gray-400 size-3" />
        </Arrow>
        <span className="text-sm">{monthName(month)}</span>
        <Arrow onClick={nextMonth} disabled={isAll}>
          <ArrowRight className="text-gray-400 size-3" />
        </Arrow>
      </div>
      <div className="flex items-center gap-3 border border-gray-300 rounded-md px-3 py-2">
        <Arrow onClick={prevYear} disabled={isAll}>
          <ArrowLeft className="text-gray-400 size-3" />
        </Arrow>
        <span className="text-sm">{year}</span>
        <Arrow onClick={nextYear} disabled={isAll}>
          <ArrowRight className="text-gray-400 size-3" />
        </Arrow>
      </div>

      <Button
        className={cn(
          "border rounded-md px-3 py-2 shadow-none cursor-pointer",
          isAll
            ? "border-green-500 text-green-600 hover:text-green-600"
            : "border-gray-300",
        )}
        variant="outline"
        size="lg"
        onClick={toggleAll}
        aria-pressed={isAll}
      >
        <span className="text-sm">All</span>
      </Button>
    </>
  );
};

export default PeriodSwitcher;
