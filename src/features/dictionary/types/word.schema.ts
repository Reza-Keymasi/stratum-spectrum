import { z } from "zod";

export const WORD_CLASSES = [
  "noun",
  "verb",
  "adjective",
  "adverb",
  "pronoun",
  "preposition",
  "conjunction",
  "interjection",
];

export type WordClass = (typeof WORD_CLASSES)[number];

export const WordSchema = z.object({
  _id: z.string(),
  title: z.string(),
  meaning: z.string(),
  wordClass: z.enum(WORD_CLASSES).optional(),
  synonyms: z
    .array(
      z.object({
        title: z.string(),
        meaning: z.string().optional(),
        wordClass: z.enum(WORD_CLASSES).optional(),
      }),
    )
    .optional(),
  opposites: z
    .array(
      z.object({
        title: z.string(),
        meaning: z.string(),
        wordClass: z.enum(WORD_CLASSES).optional(),
      }),
    )
    .optional(),
});

export const CreateWordSchema = WordSchema.omit({ _id: true });
export const UpdateWordSchema = WordSchema.omit({
  _id: true,
  // createdAt: true,
}).partial();
export const EnrichWordSchema = WordSchema.pick({
  wordClass: true,
  synonyms: true,
  opposites: true,
});

export type Word = z.infer<typeof WordSchema>;
export type CreateWordInput = z.infer<typeof CreateWordSchema>;
export type UpdateWordInput = z.infer<typeof UpdateWordSchema>;
export type EnrichWord = z.infer<typeof EnrichWordSchema>;

export type WordsApiResponse = {
  success: boolean;
  data: Word[];
  error?: string;
};
