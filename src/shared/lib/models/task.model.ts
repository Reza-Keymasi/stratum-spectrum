import mongoose, { Schema, model, models, Types } from "mongoose";

interface Step {
  text: string;
  done: boolean;
}

interface Task {
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "low" | "medium" | "high";
  category: "planning" | "learning" | "personal";
  dueDate?: number;
  learningPath?: Types.ObjectId;
  steps?: Step[];
}

const stepSchema = new Schema<Step>(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      enum: ["planning", "learning", "personal"],
      default: "personal",
    },
    dueDate: {
      type: Number,
    },
    steps: {
      type: [stepSchema],
      default: [],
    },
    learningPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningPath",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Task = models.Task || model("Task", taskSchema);

export default Task;
