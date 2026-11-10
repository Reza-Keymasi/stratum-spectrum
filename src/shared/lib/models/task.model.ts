import {
  Schema,
  model,
  models,
  Types,
  type InferSchemaType,
  type HydratedDocument,
  type Model,
} from "mongoose";

const PRIORITIES = ["low", "medium", "high"] as const;
const STATUSES = ["todo", "in_progress", "review", "done"];

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

type Priority = (typeof PRIORITIES)[number];
type Status = (typeof STATUSES)[number];

interface SubTask {
  title: string;
  done: boolean;
}

interface Task {
  userId: Types.ObjectId;
  project: Types.ObjectId;
  learningPath?: Types.ObjectId;
  title: string;
  labels: Types.ObjectId[];
  notes: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  estimateMinutes: number;
  subTasks: SubTask[];
  starred: boolean;
  completedAt: Date;
  boardPosition: number;
}

const SubTaskSchema = new Schema<SubTask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    done: {
      type: Boolean,
      default: false,
    },
  },
  { _id: true },
);

const TaskSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    labels: [
      {
        type: Schema.Types.ObjectId,
        ref: "Label",
      },
    ],
    notes: {
      type: String,
      default: "",
      maxLength: 20000,
    },
    status: {
      type: String,
      enum: STATUSES,
      default: "todo",
    },
    priority: {
      type: String,
      enum: PRIORITIES,
      default: "medium",
    },
    dueDate: {
      type: String,
      match: DATE_ONLY,
    },
    estimateMinutes: { type: Number, min: 1, max: 60 * 24 },
    subTasks: {
      type: [SubTaskSchema],
      default: [],
      validate: [
        (v: unknown[]) => v.length <= 100,
        "A task can have at most 100 subtasks",
      ],
    },
    boardPosition: { type: Number, default: 0 },
    learningPath: {
      type: Schema.Types.ObjectId,
      ref: "LearningPath",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export type ITask = InferSchemaType<typeof TaskSchema>;
export type TaskDoc = HydratedDocument<ITask>;
export const Task: Model<ITask> =
  (models.Task as Model<ITask>) || model<ITask>("Task", TaskSchema);
