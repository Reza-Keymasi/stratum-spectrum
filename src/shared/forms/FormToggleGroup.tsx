import { useFormContext, Controller } from "react-hook-form";

import AppToggleGroup from "../ui/AppToggleGroup";

type GroupType = "single" | "multiple";

interface BaseFormToggleGroupProps {
  name: string;
  items: string[];
}

interface SingleToggleGroupProps<
  T extends GroupType,
> extends BaseFormToggleGroupProps {
  type: T;
}

interface MultipleToggleGroupProps<
  T extends GroupType,
> extends BaseFormToggleGroupProps {
  type: T;
}

type FormToggleGroupProps =
  | SingleToggleGroupProps<"single">
  | MultipleToggleGroupProps<"multiple">;

const FormToggleGroup = ({ name, items, type }: FormToggleGroupProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppToggleGroup
          {...({
            type,
            value: field.value ?? (type === "multiple" ? [] : ""),
            onValueChange: field.onChange,
          } as any)}
          items={items}
        />
      )}
    />
  );
};

export default FormToggleGroup;
