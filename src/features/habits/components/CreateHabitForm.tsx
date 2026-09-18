"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateHabitInput, CreateHabitSchema } from "../types/habit.schema";
import FormInput from "@/shared/forms/FormInput";
import FormToggleGroup from "@/shared/forms/FormToggleGroup";
import { useCreateHabit } from "../hooks/useHabitQueries";
import FormTextArea from "@/shared/forms/FormTextArea";
import { Button } from "@/components/ui/button";
import FormCheckbox from "@/shared/forms/FormCheckbox";
import FormCombobox from "@/shared/forms/FormCombobox";
import {
  DAYS_OF_WEEK_WITH_LABEL,
  FREQUENCY_TYPES,
  HABIT_CATEGORIES,
} from "../constants/habitConstants";

const CreateHabitForm = () => {
  const router = useRouter();

  const defaultFrequency = {
    frequencyType: "daily" as const,
    daysOfWeek: undefined,
    timesPerWeek: undefined,
    customInterval: undefined,
  };

  const methods = useForm<CreateHabitInput>({
    resolver: zodResolver(CreateHabitSchema),
    defaultValues: {
      title: "",
      description: "",
      isNegative: false,
      categories: [],
      goalType: "binary",
      targetValue: undefined,
      unit: undefined,
      frequency: defaultFrequency,
    },
  });

  const { mutate } = useCreateHabit();

  const handleSubmitHabit = (data: CreateHabitInput) => {
    mutate(data, {
      onSuccess: () => {
        methods.reset();
        router.push("/habits/list");
      },
    });
  };

  const watchFields = methods.watch();
  const disabledTargetValueAndUnit = watchFields.goalType !== "quantity";

  const enableFrequencyFields = {
    specificDaysOfWeek: watchFields.frequency.frequencyType === "specific_days",
    timesPerWeek: watchFields.frequency.frequencyType === "times_per_week",
    customInterval: watchFields.frequency.frequencyType === "custom_interval",
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitHabit)}
        className="flex flex-col gap-4 max-w-2xl mx-auto"
      >
        <p className="flex flex-col text-center my-5">
          <span className="py-3 px-4 text-lg font-semibold text-[#465992]">
            You want to do something?
          </span>
          <span className="py-3 px-4 text-2xl font-semibold text-[#465992] bg-sky-200 rounded-lg">
            Stop doing nothing here
          </span>
        </p>

        <div className="flex gap-3">
          <FormInput name="title" placeholder="Enter habit title" />
          <FormCombobox
            name="goalType"
            itemsArray={["binary", "quantity"].map((type) => ({
              value: type,
              label: type,
            }))}
            placeholder="Enter your goal type"
          />
        </div>

        {!disabledTargetValueAndUnit && (
          <div className="flex gap-3 animate-in fade-in duration-300">
            <FormInput
              name="targetValue"
              placeholder="Enter target value (e.g., 1, 2,...)"
            />
            <FormInput
              name="unit"
              type="text"
              placeholder="Enter unit (e.g., cups, mins, km, kg, ...)"
            />
          </div>
        )}

        <div className="flex gap-3">
          <div className="flex-1">
            <FormCombobox
              name="frequency.frequencyType"
              placeholder="Enter your habit frequency"
              itemsArray={FREQUENCY_TYPES}
            />
          </div>

          {enableFrequencyFields.specificDaysOfWeek ? (
            <div className="flex flex-1 animate-in fade-in duration-300">
              <FormCombobox
                name="frequency.daysOfWeek"
                placeholder="Enter days"
                isMultiple
                itemsArray={DAYS_OF_WEEK_WITH_LABEL}
              />
            </div>
          ) : enableFrequencyFields.timesPerWeek ? (
            <div className="flex flex-1 animate-in fade-in duration-300">
              <FormInput
                name="frequency.timesPerWeek"
                placeholder="Enter X per weeks"
              />
            </div>
          ) : enableFrequencyFields.customInterval ? (
            <div className="flex flex-1 animate-in fade-in duration-300">
              <FormInput
                name="frequency.customInterval"
                placeholder="Enter interval"
              />
            </div>
          ) : null}
        </div>

        <FormTextArea
          name="description"
          placeholder="Enter habit description"
        />
        <div className="w-full flex flex-col justify-center gap-1">
          <span className="text-gray-500">Add categires to your habit</span>
          <FormToggleGroup
            name="categories"
            items={HABIT_CATEGORIES}
            type="multiple"
          />
        </div>
        <div className="flex items-center gap-2">
          <FormCheckbox name="isNegative" />
          <span>Is it bad habit?</span>
        </div>

        <Button type="submit" className="py-5 my-5 cursor-pointer">
          Create
        </Button>
      </form>
    </FormProvider>
  );
};

export default CreateHabitForm;
