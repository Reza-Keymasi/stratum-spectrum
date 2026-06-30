import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CreateLearningPathInput } from "../types/path.schema";
import {
  createLearningPath,
  deleteLearningPath,
  getLearningPath,
  getLearningPaths,
  updateLearningPathSummary,
} from "../services/learningPathServices";

export const useGetLearningPaths = () => {
  return useQuery({
    queryKey: ["learning-paths"],
    queryFn: getLearningPaths,
  });
};

export const useGetLearningPath = (id: string) => {
  return useQuery({
    queryKey: ["lerning-path", id],
    queryFn: () => getLearningPath(id),
    enabled: !!id,
  });
};

export const useCreateLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateLearningPathInput) => createLearningPath(input),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["learning-paths"] }),
  });
};

export const useUpdateLearningPathSummary = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (summary: string) => updateLearningPathSummary(id, summary),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["learning-path", id],
      });
    },
  });
};

export const useDeleteLearningPath = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLearningPath(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["learning-paths"] }),
  });
};
