import { z } from "zod";

import { fetchHandler } from "@/shared/lib/fetchHandler";
import {
  CreateLearningPathInput,
  LearningPath,
  LearningPathSchema,
} from "../types/path.schema";

const BASE_URL = "/api/learning-paths";

export const getLearningPaths = async () => {
  return fetchHandler<LearningPath[]>(BASE_URL).then((res) =>
    z.array(LearningPathSchema).parse(res),
  );
};

export const getLearningPath = (id: string) => {
  return fetchHandler<LearningPath>(`${BASE_URL}/${id}`);
};

export const createLearningPath = (input: CreateLearningPathInput) => {
  return fetchHandler(BASE_URL, {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const updateLearningPathSummary = (id: string, summary: string) => {
  return fetchHandler(`${BASE_URL}/${id}/summary`, {
    method: "PATCH",
    body: JSON.stringify({ summary }),
  });
};

export const deleteLearningPath = (id: string) => {
  return fetchHandler<void>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
