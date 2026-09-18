import { Schema, model, models } from "mongoose";

const habitCategories = [
  "Health",
  "Fitness",
  "Study",
  "Work",
  "Finance",
  "Social",
  "Profession",
  "Other",
] as const;

const frequencyTypes = [
  "daily",
  "specific_days",
  "times_per_week",
  "custom_interval",
] as const;
const daysOfWeek = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"] as const;
const goalType = ["binary", "quantity"] as const;

type HabitCategory = (typeof habitCategories)[number];
type DaysOfWeek = (typeof daysOfWeek)[number];
type FrequencyType = (typeof frequencyTypes)[number];

interface Frequency {
  frequencyType: FrequencyType;
  daysOfWeek?: DaysOfWeek[];
  timesPerWeek?: number;
  customInterval?: number;
}

interface Habit {
  title: string;
  description?: string;
  categories: HabitCategory[];
  isNegative?: boolean;

  goalType: "binary" | "quantity";
  targetValue?: number;
  unit?: string;

  frequency: Frequency;
  completed?: boolean;
  completedAt: Date | null;
}

const HabitSchema = new Schema<Habit>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    categories: {
      type: [String],
      enum: habitCategories,
      default: [],
    },
    isNegative: {
      type: Boolean,
      default: true,
    },

    frequency: {
      frequencyType: {
        type: String,
        enum: frequencyTypes,
        required: true,
      },
      daysOfWeek: {
        type: [String],
        enum: daysOfWeek,
        validate: {
          validator: function (value) {
            if (this?.frequency.frequencyType === "specific_days") {
              return Array.isArray(value) && value.length >= 1;
            }
            return true;
          },
          message: "At least one day must be chosen.",
        },
      },
      timesPerWeek: {
        type: Number,
        min: 1,
        max: 7,
        validate: {
          validator: function (value) {
            if (this?.frequency.frequencyType === "times_per_week") {
              return value >= 1 && value <= 7;
            }
            return true;
          },
          message: "Times per week must be an integer between 1 and 7.",
        },
      },
      customInterval: {
        type: Number,
        min: 2,
        validate: {
          validator: function (value) {
            if (this?.frequency.frequencyType === "custom_interval") {
              return value >= 2;
            }
            return true;
          },
          message: "Interval must be at least 2 days.",
        },
      },
    },

    goalType: {
      type: String,
      enum: goalType,
      required: true,
    },
    targetValue: {
      type: Number,
      required: function () {
        return this.goalType === "quantity";
      },
      validate: {
        validator: function (value) {
          if (this.goalType === "quantity") {
            return value !== undefined && value !== null && value >= 1;
          }
          return true;
        },
        message: "Target value must be at least 1 when goalType is quantity.",
      },
    },
    unit: {
      type: String,
      required: function () {
        return this.goalType === "quantity";
      },
      trim: true,
      validate: {
        validator: function (value) {
          if (this.goalType === "quantity") {
            return typeof value === "string" && value.trim().length > 0;
          }
          return true;
        },
        message: "Unit (e.g., cups, mins) is required for quantity habits.",
      },
    },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const Habit = models.Habit || model("Habit", HabitSchema);

export default Habit;
