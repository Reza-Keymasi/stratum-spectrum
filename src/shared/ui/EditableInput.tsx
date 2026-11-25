"use client";

import { useState, useEffect, KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface EditableInputProps {
  value: string;
  onCommit: (value: string) => void;
  className?: string;
}

const EditableInput = ({
  value,
  onCommit,
  className = "",
}: EditableInputProps) => {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleCommit = () => {
    const next = draft.trim();
    if (!next) return setDraft(value);
    if (next === value) return;
    onCommit(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") e.currentTarget.blur();
    if (e.key === "Escape") {
      setDraft(value);
      e.currentTarget.blur();
    }
  };

  return (
    <Input
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleCommit}
      onKeyDown={handleKeyDown}
      className={cn(
        "p-4 bg-transparent border-none shadow-none focus-visible:border-none focus-visible:ring-0",
        className,
      )}
    />
  );
};

export default EditableInput;
