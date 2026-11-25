"use client";

import { addDays } from "date-fns";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AppDatePicker } from "@/shared/ui/AppDatePicker";
import { fromDateOnly, toDateString } from "@/lib/date";

interface DueDateProps {
  value?: string | null;
  onChange: (dueDate: string | null) => void;
}

const QUICK_DATES = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "Next week", days: 7 },
];

const DueDate = ({ value, onChange }: DueDateProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] text-gray-400 uppercase">due date</span>
      <div className="flex gap-3 w-full">
        <AppDatePicker
          name="dueDate"
          className="flex-1 border! rounded-md shadow-none py-4 bg-transparent cursor-pointer"
          value={fromDateOnly(value)}
          onChangeDate={(date) => onChange(date ? toDateString(date) : null)}
        />
        {QUICK_DATES.map(({ label, days }) => {
          const iso = toDateString(addDays(new Date(), days));
          return (
            <Button
              key={label}
              variant="ghost"
              onClick={() => value !== iso && onChange(iso)}
              className={cn(
                "bg-green-50 hover:bg-green-100  border-none flex items-center gap-1 text-xs border rounded-md px-3 py-1 cursor-pointer",
              )}
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DueDate;
