"use client";

import { KeyboardEvent, useEffect, useState } from "react";

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EditableTextareaProps {
  value: string;
  onCommit: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const EditableTextarea = ({
  value,
  onCommit,
  placeholder = "",
  disabled = false,
  className = "",
}: EditableTextareaProps) => {
  const [draft, setDraft] = useState<string>(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  const handleCommit = () => {
    const next = draft.trim();
    if (!next) return setDraft(value);
    if (next === value) return;
    onCommit(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") e.currentTarget.blur();
    if (e.key === "Escape") {
      setDraft(value);
      e.currentTarget.blur();
    }
  };
  return (
    <Textarea
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleCommit}
      onKeyDown={handleKeyDown}
      className={cn(
        "min-h-30 focus-visible:ring-0 border-green-200 focus-visible:border-green-200",
        className,
      )}
      disabled={disabled}
      placeholder={placeholder}
    />
  );
};

export default EditableTextarea;
