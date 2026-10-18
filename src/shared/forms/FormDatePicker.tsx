import { useFormContext, Controller } from "react-hook-form";
import { AppDatePicker } from "../ui/AppDatePicker";
import { parseISO, format } from "date-fns";

type DateValueType = "timestamp" | "date-string";

interface FormDatePickerProps {
  name: string;
  placeholder?: string;
  className?: string;
  valueType?: DateValueType;
}

const toPickerDate = (value: unknown, type: DateValueType) => {
  if (type === "timestamp") {
    return typeof value === "number" ? new Date(value) : undefined;
  }

  return value && typeof value === "string" ? parseISO(value) : undefined;
};

const formPickerDate = (date: Date, type: DateValueType) => {
  return type === "timestamp" ? date.getTime() : format(date, "yyyy-MM-dd");
};

const FormDatePicker = ({
  name,
  placeholder,
  className = "",
  valueType = "timestamp",
}: FormDatePickerProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="flex flex-col gap-1 w-full">
            <AppDatePicker
              name={field.name}
              value={toPickerDate(field.value, valueType)}
              onChangeDate={(date) => {
                if (date) {
                  field.onChange(formPickerDate(date, valueType));
                } else if (valueType === "timestamp") {
                  field.onChange(undefined);
                }
              }}
              placeholder={placeholder}
              className={className}
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
