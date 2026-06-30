import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/shared/forms/FormInput";
import FormToggleGroup from "@/shared/forms/FormToggleGroup";
import FormDatePicker from "@/shared/forms/FormDatePicker";
import {
  CreateLearningPathInput,
  CreateLearningPathSchema,
} from "../types/path.schema";
import { useCreateLearningPath } from "../hooks/useLearningPath";
import { Button } from "@/components/ui/button";

const pathArray = ["easy", "medium", "hard"];

const CreateLearningPathForm = () => {
  const { mutate: createPath } = useCreateLearningPath();
  const methods = useForm<CreateLearningPathInput>({
    resolver: zodResolver(CreateLearningPathSchema),
  });

  const titleWatch = methods.watch("title");
  const topicWatch = methods.watch("topic");

  const handleSubmitPath = (data: CreateLearningPathInput) => {
    createPath(data, { onSuccess: () => methods.reset() });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitPath)}
        className="flex flex-col gap-3"
      >
        <FormInput name="title" placeholder="Enter path title" />
        <FormInput name="topic" placeholder="Enter path topic" />
        <FormDatePicker
          name="targetDate"
          placeholder="Enter path target date"
        />
        <div className="w-full flex justify-between items-center">
          <span className="text-gray-500">How difficult your path is?</span>
          <FormToggleGroup name="difficulty" items={pathArray} />
        </div>
        <Button
          disabled={!titleWatch || !topicWatch}
          type="submit"
          className="bg-sky-500 hover:bg-sky-600"
        >
          Save
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateLearningPathForm;
