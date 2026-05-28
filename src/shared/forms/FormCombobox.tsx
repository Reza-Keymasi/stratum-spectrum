import { useFormContext, Controller } from "react-hook-form";
import AppCombobox from "../ui/AppCombobox";

interface FormComboboxProps {
  name: string;
  placeholder?: string;
  itemsArray: string[];
}

const FormCombobox = ({ name, placeholder, itemsArray }: FormComboboxProps) => {
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
          value={field.value ?? ""}
          onChange={field.onChange}
        />
      )}
    />
  );
};

export default FormCombobox;
