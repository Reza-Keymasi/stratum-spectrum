import { z } from "zod";

import { fetchHandler } from "@/shared/lib/fetchHandler";
import { CreateTaskInput, GetTasksStats, Task } from "../types/task.schema";
import { axiosApiClient } from "@/features/auth/lib/axiosApiClient";

const BASE_URL = "/tasks";

export const getTasks = () => {
  const response = axiosApiClient
    .get<Task[]>(BASE_URL)
    .then((data) => data.data);

  return response;
};

export const getTaskByUserId = async (userId: string) => {
  return await fetchHandler<Task[]>(`${BASE_URL}/${userId}`);
};

export const createTask = (input: CreateTaskInput) => {
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

export const getTasksStats = (scopeQuery: string): Promise<GetTasksStats> => {
  const response = axiosApiClient
    .get<GetTasksStats>(`${BASE_URL}/stats?${scopeQuery}`)
    .then((data) => data.data);

  return response;
};
