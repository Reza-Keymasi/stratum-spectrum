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
  updateHabitEntry,
  getHabitEntry,
  addNewWeek,
  toggleHabitCompletion,
  deleteHabit,
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

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteHabit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
};

export const useGetHabitEntry = (id: string): UseQueryResult<HabitEntry[]> => {
  return useQuery({
    queryKey: ["habit-entry", id],
    queryFn: () => getHabitEntry(id),
  });
};

export const useToggleHabitCompletion = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ToggleHabitCompletion) =>
      toggleHabitCompletion(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habit", id] });
    },
  });
};

export const useUpdateHabitEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ input, id, weekNumber }: UpdateHabitEntryVariables) =>
      updateHabitEntry(input, id, weekNumber),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["habit-entry", id] });
    },
  });
};

export const useAddNewWeek = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => addNewWeek(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habit-entry", id] });
    },
  });
};
