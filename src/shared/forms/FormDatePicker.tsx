import { useFormContext, Controller } from "react-hook-form";
import { AppDatePicker } from "../ui/AppDatePicker";

interface FormDatePickerProps {
  name: string;
  placeholder?: string;
}

const FormDatePicker = ({ name, placeholder }: FormDatePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        const dateValue =
          typeof field.value === "number" ? new Date(field.value) : undefined;

        return (
          <div className="flex flex-col gap-1 w-full">
            <AppDatePicker
              name={field.name}
              value={dateValue}
              onChangeDate={(date) => {
                field.onChange(date ? date.getTime() : undefined);
              }}
              placeholder={placeholder}
            />
            {error && (
              <span className="text-xs text-red-500 font-medium px-1">
                {error.message}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default FormDatePicker;
