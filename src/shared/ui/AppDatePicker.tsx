"use client";

import { format, parseISO, setDate } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AppDatePickerProps {
  name: string;
  value?: Date | string | null;
  onChangeDate?: (date?: Date) => void;
  placeholder?: string;
}

export function AppDatePicker({
  name,
  value,
  onChangeDate,
  placeholder = "Pick a date",
}: AppDatePickerProps) {
  const dateValue =
    typeof value === "string" ? parseISO(value) : (value ?? undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dateValue}
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground border-sky-200 focus-visible:ring-0 focus-visible:border-sky-400"
        >
          {dateValue ? format(dateValue, "PPP") : <span>{placeholder}</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={onChangeDate}
          defaultMonth={dateValue}
        />
      </PopoverContent>
    </Popover>
  );
}
