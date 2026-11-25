import { useState } from "react";
import { Plus, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  DEFAULT_STYLES,
  LABELS,
  normalizeLabel,
  getLabelStyles,
} from "../../lib/labels";
import { Button } from "@/components/ui/button";
import AppInput from "@/shared/ui/AppInput";

interface LabelPickerProps {
  value: string[];
  onChange: (names: string[]) => void;
}

const LabelPicker = ({ value, onChange }: LabelPickerProps) => {
  const [draft, setDraft] = useState("");

  const availableOptions = LABELS.filter((l) => !value.includes(l));

  const toggle = (name: string) => {
    onChange(
      value.includes(name) ? value.filter((v) => v !== name) : [...value, name],
    );
  };

  const addCustom = () => {
    const name = normalizeLabel(draft);
    setDraft("");
    if (name && !value.includes(name)) onChange([...value, name]);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <AppInput
          name="addLabel"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addCustom();
            }
          }}
          maxLength={30}
          placeholder="Add label"
          className="w-1/2 bg-transparent! shadow-none border! border-dashed border-gray-200"
        />

        <div className="flex gap-1">
          {value.map((label) => (
            <Button
              key={label}
              type="button"
              onClick={() => toggle(label)}
              className={cn(
                "rounded-md text-xs transition-colors cursor-pointer",
                getLabelStyles(label) ?? DEFAULT_STYLES,
              )}
            >
              {label}
              <X className="size-2" />
            </Button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        {availableOptions.map((label) => (
          <Button
            key={label}
            type="button"
            onClick={() => toggle(label)}
            className={cn(
              "rounded-md px-3 py-0.5 text-xs transition-colors cursor-pointer hover:bg-transparent",
              DEFAULT_STYLES,
            )}
          >
            <Plus className="size-2" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LabelPicker;
