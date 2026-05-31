import { z } from "zod";

import {
  Word,
  WordSchema,
  CreateWordInput,
  UpdateWordInput,
} from "../types/word.schema";
import { fetchHandler } from "@/shared/lib/fetchHandler";

const BASE_URL = "/api/language/dictionary";

export const getWords = () => {
  return fetchHandler<{ data: Word[] }>(BASE_URL).then((res) =>
    z.array(WordSchema).parse(res.data),
  );
};

export const addWord = (input: CreateWordInput) => {
  return fetchHandler<Word>(BASE_URL, {
    method: "POST",
    body: JSON.stringify(input),
  });
};

export const UpdateWord = (id: string, data: UpdateWordInput) => {
  return fetchHandler<Word>(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const deleteWord = (id: string) => {
  return fetchHandler<void>(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};
