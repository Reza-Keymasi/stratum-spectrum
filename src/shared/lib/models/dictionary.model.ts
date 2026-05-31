import { Schema, model, models } from "mongoose";

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

interface IWordShape {
  title: string;
  meaning: string;
  wordClass?: WordClass;
}

export interface IWordBase {
  title: string;
  meaning: string;
  wordClass?: (typeof WORD_CLASSES)[number];
  opposites?: IWordShape[];
  synonyms?: IWordShape[];
}

export interface IWord extends IWordBase {
  _id: string;
}

const WordShapeSchema = new Schema<IWordShape>(
  {
    title: {
      type: String,
      required: true,
    },
    meaning: {
      type: String,
      required: true,
    },
    wordClass: {
      type: String,
      enum: WORD_CLASSES,
    },
  },
  { _id: false },
);

const DictionarySchema = new Schema<IWordBase>({
  title: {
    type: String,
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  wordClass: {
    type: String,
    enum: WORD_CLASSES,
  },
  synonyms: {
    type: [WordShapeSchema],
    default: [],
  },
  opposites: {
    type: [WordShapeSchema],
    default: [],
  },
});

const Dictionary = models?.Dictionary || model("Dictionary", DictionarySchema);

export default Dictionary;
