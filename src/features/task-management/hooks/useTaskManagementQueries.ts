import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  updateTask,
  createTask,
  deleteTask,
  getTasks,
  getTaskByUserId,
  getTasksStats,
  getTaskById,
  getProjects,
  getLabels,
} from "../services/taskManagementServices";
import { CreateTaskInput, Task, UpdateTaskInput } from "../types/task.schema";
import { Scope, scopeToQuery } from "../lib/url";

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

export const useGetTaskByUserId = (userId: string) => {
  return useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => getTaskByUserId(userId),
  });
};

export const useGetTaskById = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskById(id),
  });
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ["tasks", "projects"],
    queryFn: getProjects,
  });
};

export const useGetLabels = () => {
  return useQuery({
    queryKey: ["tasks", "labels"],
    queryFn: getLabels,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateTaskInput) => createTask(input),
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

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskInput }) =>
      updateTask({ id, payload }),

    onMutate: async ({ id, payload }) => {
      await queryClient.cancelQueries({ queryKey: taskKeys.detail(id) });
      const prev = queryClient.getQueryData<Task>(taskKeys.detail(id));
      queryClient.setQueryData<Task>(taskKeys.detail(id), (old) => {
        if (!old) return old;
        const { labels, done, ...rest } = payload;
        const status =
          done === undefined
            ? rest.status
            : done
              ? "done"
              : (old.PrevStatus ?? "todo");

        return {
          ...old,
          ...rest,
          ...(status && { status }),
          ...(labels && {
            labels: labels.map(
              (name) =>
                old.labels.find((l) => l.name === name) ?? {
                  _id: name,
                  name,
                  color: "#64748b",
                },
            ),
          }),
        };
      });
      return { prev };
    },

    onError: (error, { id }, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(taskKeys.detail(id), ctx.prev);
    },

    onSettled: (data, error, { id }) => {
      (queryClient.invalidateQueries({ queryKey: ["tasks", id] }),
        queryClient.invalidateQueries({ queryKey: ["tasks", "list"] }),
        queryClient.invalidateQueries({ queryKey: ["tasks", "tasks-stats"] }));
      // queryClient.invalidateQueries({queryKey:[]}),
    },
  });
};

export const useGetTasksStats = (scope: Scope) => {
  const scopeQuery = scopeToQuery(scope);
  return useQuery({
    queryKey: ["tasks-stats", scopeQuery],
    queryFn: () => getTasksStats(scopeQuery),
  });
};
