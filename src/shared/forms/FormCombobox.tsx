import { useFormContext, Controller } from "react-hook-form";

import AppCombobox from "../ui/AppCombobox";

interface FormComboboxProps {
  name: string;
  placeholder?: string;
  itemsArray: { label: string; value: string }[];
  isMultiple?: boolean;
  isDisabled?: boolean;
}

const FormCombobox = ({
  name,
  placeholder,
  itemsArray,
  isMultiple = false,
  isDisabled = false,
}: FormComboboxProps) => {
  const { control } = useFormContext();
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AppCombobox
          itemsArray={itemsArray}
          inputPlaceholder={placeholder}
          name={name}
          multiple={isMultiple}
          value={field.value ?? (isMultiple ? [] : "")}
          onChange={field.onChange}
          isDisabled={isDisabled}
        />
      )}
    />
  );
};

export default FormCombobox;
