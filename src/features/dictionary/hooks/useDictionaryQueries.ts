import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getWords,
  addWord,
  deleteWord,
  UpdateWord,
} from "../services/dictionaryServices";
import { CreateWordInput, UpdateWordInput } from "../types/word.schema";

export const useGetWords = () => {
  return useQuery({
    queryKey: ["words"],
    queryFn: getWords,
  });
};

export const useAddWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateWordInput) => addWord(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["words"] }),
  });
};

export const useUpdateWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWordInput }) =>
      UpdateWord(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["words"] }),
  });
};

export const useDeleteWord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWord(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["words"] }),
  });
};
