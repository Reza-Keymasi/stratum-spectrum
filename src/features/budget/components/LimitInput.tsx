"use client";

import { ChangeEvent, FocusEvent, useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useUpdateCategoryBudgetLimit } from "../hooks/useBudgetQueries";

interface LimitInputProps {
  category: string;
  limit?: number;
}

const LimitInput = ({ category, limit = 0 }: LimitInputProps) => {
  const [value, setValue] = useState<number | string>(0);

  useEffect(() => {
    setValue(limit);
  }, [limit]);

  const { mutate: updateLimit, error } = useUpdateCategoryBudgetLimit(category);

  const handleChangeLimit = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setValue(value);
  };

  const handleUpdateLimit = (event: FocusEvent<HTMLInputElement>) => {
    const limitValue = Number(event.target.value);
    if (!Number.isNaN(value) && value !== limit) {
      updateLimit({ limit: limitValue });
    }
  };

  return (
    <div
      className="flex gap-0 w-16 border-b border-dashed focus-within:text-green-500 focus-within:border-green-400 transition-all duration-200 ease-in"
      tabIndex={0}
    >
      <span>$</span>
      <Input
        className="w-auto pr-0 pl-0 focus-visible:ring-0 ring-0 focus-visible:border-0 border-0 shadow-none rounded-none h-5"
        min={0}
        value={value}
        onChange={(event) => handleChangeLimit(event)}
        onBlur={(event) => handleUpdateLimit(event)}
        type="number"
      />
    </div>
  );
};

export default LimitInput;
