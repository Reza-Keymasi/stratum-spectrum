import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  CreateHabitInput,
  GetHabit,
  ToggleHabitCompletion,
} from "../types/habit.schema";
import {
  createHabit,
  getHabitById,
  getHabits,
} from "../services/habitServices";
import { UpdateDay } from "../types/habit-entry.schema";
import { HabitEntry } from "../types/habit-entry.types";

interface UpdateHabitEntryVariables {
  input: UpdateDay;
  id: string;
  weekNumber: string;
}

export const useGetHabits = (): UseQueryResult<GetHabit[]> => {
  return useQuery({
    queryKey: ["habits"],
    queryFn: getHabits,
  });
};

export const useGetHabit = (id: string): UseQueryResult<GetHabit> => {
  return useQuery({
    queryKey: ["habit", id],
    queryFn: () => getHabitById(id),
  });
};

export const useCreateHabit = () => {
  return useMutation({
    mutationFn: (input: CreateHabitInput) => createHabit(input),
  });
};
