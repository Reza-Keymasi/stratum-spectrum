import mongoose, { Schema, model, models, Types } from "mongoose";

interface LearningPath {
  tasks: Types.ObjectId[];
  title: string;
  topic: string;
  summary?: string;
  difficulty: "easy" | "medium" | "hard";
  progress: number;
  targetDate: number;
}

const learningPathSchema = new Schema<LearningPath>(
  {
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    topic: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      trim: true,
      default: "",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    targetDate: {
      type: Number,
    },
  },
  {
    timestamps: false,
  },
);

const LearningPath =
  models.LearningPath || model("LearningPath", learningPathSchema);

export default LearningPath;
