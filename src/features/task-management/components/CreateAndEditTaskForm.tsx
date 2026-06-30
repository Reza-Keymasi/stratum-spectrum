import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormCombobox from "@/shared/forms/FormCombobox";
import FormInput from "@/shared/forms/FormInput";
import FormDatePicker from "@/shared/forms/FormDatePicker";
import FormTextArea from "@/shared/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import {
  useCreateTask,
  useUpdateTask,
} from "../hooks/useTaskManagementQueries";
import {
  CreateAndEditTaskInput,
  CreateAndEditTaskSchema,
  Task,
} from "../types/task.schema";

interface CreateAndEditTaskFormProps {
  initialData?: Task | null;
  closeModal?: () => void;
  learningPathId?: string;
}

const CreateAndEditTaskForm = ({
  initialData,
  closeModal,
  learningPathId,
}: CreateAndEditTaskFormProps) => {
  const methods = useForm<CreateAndEditTaskInput>({
    resolver: zodResolver(CreateAndEditTaskSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      priority: initialData?.priority ?? "medium",
      category: initialData?.category ?? "personal",
      dueDate: initialData?.dueDate ?? undefined,
      learningPathId:
        initialData?.learningPath?._id ?? learningPathId ?? undefined,
    },
  });

  const isEditMode = !!initialData;

  const { mutate, isPending: isCreateTaskPending } = useCreateTask();
  const { mutate: editTask, isPending: isEditTaskPending } = useUpdateTask({
    extraInvalidationKeys: learningPathId
      ? [["tasks", learningPathId]]
      : undefined,
  });

  const isPending = isCreateTaskPending || isEditTaskPending;

  const handleSubmitTask = (data: CreateAndEditTaskInput) => {
    if (isEditMode) {
      editTask(
        { id: initialData?._id, payload: data },
        {
          onSuccess: () => {
            methods.reset();
            closeModal?.();
          },
        },
      );
    } else {
      mutate(data, {
        onSuccess: () => {
          methods.reset();
          closeModal?.();
        },
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitTask)}
        className="flex flex-col gap-3 w-full"
      >
        <div className="flex gap-3">
          <FormInput name="title" placeholder="Task title" />
          <FormDatePicker name="dueDate" placeholder="Enter due date" />
        </div>
        <div className="flex gap-3">
          <FormCombobox
            name="priority"
            itemsArray={["low", "medium", "high"]}
            placeholder="Enter Priority"
          />
          <FormCombobox
            name="category"
            itemsArray={["planning", "learning", "personal"]}
            placeholder="Enter Category"
          />
        </div>
        <FormTextArea name="description" placeholder="Short description" />
        <Button
          className="w-full py-6 bg-blue-500/90 hover:bg-blue-500"
          type="submit"
          disabled={isPending}
        >
          {isEditMode ? "Edit task" : "Create task"}
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateAndEditTaskForm;
