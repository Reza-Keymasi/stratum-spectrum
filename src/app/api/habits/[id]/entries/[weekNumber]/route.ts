import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import { UpdateDaySchema } from "@/features/habits/types/habit-entry.schema";
import HabitEntry from "@/shared/lib/models/habit-entry.model";

interface DayActionParams {
  habitId: string;
  weekNumber: string;
  dayIndex: number;
}

const dayActionHandlers = {
  toggle: ({ habitId, weekNumber, dayIndex }: DayActionParams) =>
    HabitEntry.findOneAndUpdate(
      {
        habitId,
        weekNumber,
        "days.index": dayIndex,
      },
      [
        {
          $set: {
            days: {
              $map: {
                input: "$days",
                as: "d",
                in: {
                  $cond: [
                    { $eq: ["$$d.index", dayIndex] },
                    { $mergeObjects: ["$$d", { done: { $not: "$$d.done" } }] },
                    "$$d",
                  ],
                },
              },
            },
          },
        },
      ],
      { new: true },
    ),

  increment: ({ habitId, weekNumber, dayIndex }: DayActionParams) =>
    HabitEntry.findOneAndUpdate(
      {
        habitId,
        weekNumber,
        "days.index": dayIndex,
      },
      { $inc: { "days.$.value": 1 }, $set: { "days.$.done": true } },
    ),

  decrement: ({ habitId, weekNumber, dayIndex }: DayActionParams) =>
    HabitEntry.findOneAndUpdate(
      { habitId, weekNumber, "days.index": dayIndex },
      [
        {
          $set: {
            days: {
              $map: {
                input: "$days",
                as: "d",
                in: {
                  $cond: [
                    { $eq: ["$$d.index", dayIndex] },
                    {
                      $let: {
                        vars: {
                          newValue: {
                            $max: [
                              {
                                $subtract: [{ $ifNull: ["$$d.value", 0] }, 1],
                              },
                              0,
                            ],
                          },
                        },
                        in: {
                          $mergeObjects: [
                            "$$d",
                            {
                              value: "$$newValue",
                              done: { $gt: ["$$newValue", 0] },
                            },
                          ],
                        },
                      },
                    },
                    "$$d",
                  ],
                },
              },
            },
          },
        },
      ],
      { new: true },
    ),
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; weekNumber: string }> },
) {
  try {
    await connectToDB();
    const { id: habitId, weekNumber } = await params;
    const body = await req.json();

    const parsed = UpdateDaySchema.parse(body);

    const actionKey = "action" in parsed ? parsed.action : "toggle";
    const handler = dayActionHandlers[actionKey];

    const updated = await handler({
      habitId,
      weekNumber: weekNumber,
      dayIndex: parsed.dayIndex,
    });

    const withDayFilter = await HabitEntry.findOne({
      habitId: "6aaf93929ac3016b979a595b",
      weekNumber: 1,
      "days.index": 4,
    });
    console.log(
      "Match including days.index filter?",
      !!withDayFilter,
      withDayFilter,
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Habit Entry or day not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.log("PATCH", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
