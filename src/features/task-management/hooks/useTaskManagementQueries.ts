import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTask,
  deleteTask,
  getTasks,
  getTaskByUserId,
  getTasksStats,
  getTaskById,
  getProjects,
  getLabels,
} from "../services/taskManagementServices";
import { CreateTaskInput } from "../types/task.schema";
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

export const useGetTasksStats = (scope: Scope) => {
  const scopeQuery = scopeToQuery(scope);
  return useQuery({
    queryKey: ["tasks-stats", scopeQuery],
    queryFn: () => getTasksStats(scopeQuery),
  });
};
