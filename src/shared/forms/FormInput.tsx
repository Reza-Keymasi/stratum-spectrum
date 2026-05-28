import { useFormContext } from "react-hook-form";
import AppInput from "../ui/AppInput";

interface FormInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
}

const FormInput = ({ name, label, placeholder, type }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <AppInput
      {...register(name)}
      type={type}
      label={label}
      placeholder={placeholder}
      error={errors[name]?.message as string}
    />
  );
};

export default FormInput;
