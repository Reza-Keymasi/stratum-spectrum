import { useFormContext } from "react-hook-form";
import AppInput from "../ui/AppInput";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  isDisabled?: boolean;
}

const FormInput = ({
  name,
  label,
  placeholder,
  type,
  isDisabled,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const registerOptions = type === "number" ? { valueAsNumber: true } : {};
  return (
    <AppInput
      {...register(name, registerOptions)}
      type={type}
      label={label}
      placeholder={placeholder}
      error={errors[name]?.message as string}
      disabled={isDisabled}
    />
  );
};

export default FormInput;
