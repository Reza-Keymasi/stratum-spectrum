import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateTask,
  createTask,
  deleteTask,
  getTasks,
  getTasksByLearningPathId,
} from "../services/taskManagementServices";
import { CreateAndEditTaskInput, Task } from "../types/task.schema";

const taskKeys = {
  all: ["tasks"] as const,
  list: () => [...taskKeys.all, "list"] as const,
  detail: (id: string) => [...taskKeys.all, "detail", id],
};

export const useGetTasks = () => {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: getTasks,
  });
};

export const useGetTasksByLearningPathId = (learningPathId: string) => {
  return useQuery({
    queryKey: ["tasks", learningPathId],
    queryFn: () => getTasksByLearningPathId(learningPathId),
    enabled: !!learningPathId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateAndEditTaskInput) => createTask(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};

export const useUpdateTask = (options?: {
  onMutate?: (variables: {
    id: string;
    payload: Partial<Task>;
  }) => Promise<any> | any;
  onError?: (err: any, variables: any, context: any) => void;
  onSettled?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Task> }) =>
      updateTask({ id, payload }),

    onMutate: options?.onMutate,
    onError: options?.onError,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["learning-path"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["learning-path"] });
      options?.onSettled?.();
    },
  });
};
