import { fetchHandler } from "@/shared/lib/fetchHandler";
import {
  CreateHabitInput,
  GetHabit,
  ToggleHabitCompletion,
} from "../types/habit.schema";
import { UpdateDay } from "../types/habit-entry.schema";
import { HabitEntry } from "../types/habit-entry.types";

const BASE_URL = "/api/habits";

export const getHabits = (): Promise<GetHabit[]> => {
  return fetchHandler<GetHabit[]>(BASE_URL);
};

export const getHabitById = (id: string): Promise<GetHabit> => {
  return fetchHandler(`${BASE_URL}/${id}`);
};

export const createHabit = (input: CreateHabitInput) => {
  return fetchHandler(BASE_URL, {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const deleteHabit = (id: string) => {
  return fetchHandler(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const getHabitEntry = (id: string): Promise<HabitEntry[]> => {
  return fetchHandler(`${BASE_URL}/${id}/entries`);
};

export const toggleHabitCompletion = (
  id: string,
  input: ToggleHabitCompletion,
): Promise<{ success: boolean; message: string }> => {
  return fetchHandler(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
};

export const updateHabitEntry = (
  input: UpdateDay,
  id: string,
  weekNumber: string,
): Promise<any> => {
  return fetchHandler(`${BASE_URL}/${id}/entries/${weekNumber}`, {
    method: "PATCH",
    body: JSON.stringify(input),
  });
};

export const addNewWeek = (id: string) => {
  return fetchHandler(`${BASE_URL}/${id}/entries`, {
    method: "POST",
  });
};
