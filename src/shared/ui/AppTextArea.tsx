import { TextareaHTMLAttributes } from "react";

import { Textarea } from "@/components/ui/textarea";

interface AppTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const AppTextArea = ({ label, error, ...props }: AppTextAreaProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-medium text-sky-700">{label}</label>
      )}

      <Textarea
        className="border-sky-200 focus-visible:ring-0 focus-visible:border-sky-400"
        {...props}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default AppTextArea;
