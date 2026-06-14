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
          className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground border-none bg-gray-200/30 focus-visible:ring-0 focus-visible:bg-gray-200/50 py-6"
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
