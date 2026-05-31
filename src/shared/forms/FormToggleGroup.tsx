import { useFormContext, Controller } from "react-hook-form";

import AppToggleGroup from "../ui/AppToggleGroup";

interface FormToggleGroupProps {
  name: string;
  items: string[];
}

const FormToggleGroup = ({ name, items }: FormToggleGroupProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppToggleGroup
          value={field.value}
          onValueChange={field.onChange}
          items={items}
        />
      )}
    />
  );
};

export default FormToggleGroup;
