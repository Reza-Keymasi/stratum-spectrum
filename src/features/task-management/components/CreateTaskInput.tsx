"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useCreateTask } from "../hooks/useTaskManagementQueries";
import FormInput from "@/shared/forms/FormInput";
import {
  CreateTaskInput as CreateTask,
  CreateTaskSchema,
} from "../types/task.schema";

const CreateTaskInput = () => {
  const methods = useForm({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      labels: [],
      project: undefined,
    },
  });

  const { mutate: createTask, isPending: isPendingCreateTask } =
    useCreateTask();

  const handleCreateTask = (data: CreateTask) => {
    createTask(data, {
      onSuccess: () => {
        methods.reset();
      },
    });
  };

  const titleValue = methods.watch("title");

  return (
    <FormProvider {...methods}>
      <form
        className="relative h-16"
        onSubmit={methods.handleSubmit(handleCreateTask)}
      >
        <FormInput
          name="title"
          placeholder="Add a task..."
          className="absolute bg-white! focus-visible:outline-2! focus-visible:ring-1! h-full pl-5! pr-20!"
        />
        {titleValue !== "" ? (
          <Button
            type="submit"
            variant="ghost"
            className="absolute right-4 top-3.5 px-6 text-white bg-green-500 hover:bg-green-600 hover:text-white cursor-pointer"
            disabled={isPendingCreateTask}
          >
            Add
          </Button>
        ) : null}
      </form>
    </FormProvider>
  );
};

export default CreateTaskInput;
