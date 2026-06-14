import { InputHTMLAttributes } from "react";

import { Input } from "@/components/ui/input";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const AppInput = ({ label, error, ...props }: AppInputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-sky-700">{label}</label>
      )}

      <Input
        className="border-none bg-gray-200/30 focus-visible:ring-0 focus-visible:bg-gray-200/50 py-6"
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default AppInput;
