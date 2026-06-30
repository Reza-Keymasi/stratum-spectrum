import { z } from "zod";

import { fetchHandler } from "@/shared/lib/fetchHandler";
import {
  CreateAndEditTaskInput,
  GetTaskSchema,
  Task,
  TaskSchema,
} from "../types/task.schema";

export const getTasks = async () => {
  return await fetchHandler<Task[]>("/api/tasks").then((res) =>
    z.array(GetTaskSchema).parse(res),
  );
};

export const getTasksByLearningPathId = async (learningPathId: string) => {
  return fetchHandler<Task[]>(`/api/tasks/${learningPathId}`).then((res) =>
    z.array(TaskSchema).parse(res),
  );
};

export const createTask = (input: CreateAndEditTaskInput) => {
  return fetchHandler<Task>("/api/tasks", {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const deleteTask = (id: string) => {
  return fetchHandler<void>(`/api/tasks/${id}`, {
    method: "DELETE",
  });
};

export const updateTask = ({
  id,
  payload,
}: {
  id: string;
  payload: Partial<Task>;
}) => {
  return fetchHandler<Task>(`/api/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
