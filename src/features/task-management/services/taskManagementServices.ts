import { z } from "zod";

import { fetchHandler } from "@/shared/lib/fetchHandler";
import {
  CreateAndEditTaskInput,
  GetTaskSchema,
  Task,
} from "../types/task.schema";

const BASE_URL = "/api/tasks";

export const getTasks = async () => {
  return await fetchHandler<Task[]>(BASE_URL).then((res) =>
    z.array(GetTaskSchema).parse(res),
  );
};

export const getTaskByUserId = async (userId: string) => {
  return await fetchHandler<Task[]>(`${BASE_URL}/${userId}`);
};

export const createTask = (input: CreateAndEditTaskInput) => {
  return fetchHandler<Task>(BASE_URL, {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const deleteTask = (id: string) => {
  return fetchHandler<void>(`${BASE_URL}/${id}`, {
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
  return fetchHandler<Task>(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
