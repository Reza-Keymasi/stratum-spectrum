import { useFormContext, Controller } from "react-hook-form";

import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckboxProps {
  name: string;
}

const FormCheckbox = ({ name }: FormCheckboxProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          className="h-5 w-5"
        />
      )}
    />
  );
};

export default FormCheckbox;
