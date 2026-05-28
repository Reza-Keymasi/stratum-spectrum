import { useFormContext } from "react-hook-form";

import AppTextArea from "../ui/AppTextArea";

interface FormTextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
}

const FormTextArea = ({ name, label, placeholder }: FormTextAreaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <AppTextArea
      {...register(name)}
      label={label}
      placeholder={placeholder}
      error={errors[name]?.message as string}
    />
  );
};

export default FormTextArea;
