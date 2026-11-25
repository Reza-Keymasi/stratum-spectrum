import { fetchHandler } from "@/shared/lib/fetchHandler";
import {
  CreateSubTaskInput,
  CreateTaskInput,
  GetLabel,
  GetProjects,
  GetSubTask,
  GetTasksStats,
  Task,
  UpdateTaskInput,
} from "../types/task.schema";
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

export const getTaskById = (id: string) => {
  const response = axiosApiClient
    .get<Task>(`${BASE_URL}/${id}`)
    .then((data) => data.data);

  return response;
};

export const createTask = (input: CreateTaskInput) => {
  return axiosApiClient.post(`${BASE_URL}`, input);
};

export const createSubTask = (
  id: string,
  title: string,
): Promise<GetSubTask> => {
  const response = axiosApiClient
    .post(`${BASE_URL}/${id}/subtasks`, {
      title,
    })
    .then((data) => data.data);

  return response;
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
  payload: UpdateTaskInput;
}) => {
  return axiosApiClient
    .patch<Task>(`${BASE_URL}/${id}`, payload)
    .then((data) => data.data);
};

export const getTasksStats = (scopeQuery: string): Promise<GetTasksStats> => {
  const response = axiosApiClient
    .get<GetTasksStats>(`${BASE_URL}/stats?${scopeQuery}`)
    .then((data) => data.data);

  return response;
};

export const getProjects = (): Promise<GetProjects[]> => {
  const response = axiosApiClient
    .get<GetProjects[]>(`${BASE_URL}/projects`)
    .then((data) => data.data);

  return response;
};

export const getLabels = () => {
  const response = axiosApiClient
    .get<GetLabel[]>(`${BASE_URL}/labels`)
    .then((data) => data.data);

  return response;
};
