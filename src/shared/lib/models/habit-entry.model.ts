import { Schema, model, models } from "mongoose";

type DaysOfWeek = "sat" | "sun" | "mon" | "tue" | "wed" | "thu" | "fri";
const DaysOfWeek = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

type FrequencyType =
  | "daily"
  | "specific_days"
  | "times_per_week"
  | "custom_interval";

const frequencyTypes = [
  "daily",
  "specific_days",
  "times_per_week",
  "custom_interval",
];

export interface DayEntry {
  index: number;
  date: Date;
  done: boolean;
  active: boolean;
  value?: number | null;
}

const DayEntrySchema = new Schema<DayEntry>(
  {
    index: { type: Number, required: true },
    done: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    date: { type: Date, required: true },
    value: { type: Number, min: 0 },
  },
  { _id: false },
);

const HabitEntrySchema = new Schema({
  habitId: { type: Schema.Types.ObjectId, ref: "Habit", required: true },
  weekNumber: { type: Number, required: true, min: 1 },
  frequencyType: { type: String, enum: frequencyTypes, required: true },
  // activeDays: [
  //   {
  //     type: String,
  //     enum: DaysOfWeek,
  //   },
  // ],
  // requiredCount: { type: Number, min: 1, max: 7 },
  // interval: { type: Number, min: 2 },
  days: {
    type: [DayEntrySchema],
    validate: {
      validator: (days: any[]) => days.length === 7,
      message: "A week must have exactly 7 days",
    },
  },
});

HabitEntrySchema.index({ habitId: 1, weekNumber: 1 }, { unique: true });

const HabitEntry = models?.HabitEntry || model("HabitEntry", HabitEntrySchema);

export default HabitEntry;
