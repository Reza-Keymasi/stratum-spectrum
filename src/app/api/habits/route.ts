import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import { CreateHabitSchema } from "@/features/habits/types/habit.schema";
import Habit from "@/shared/lib/models/habit.model";
import HabitEntry from "@/shared/lib/models/habit-entry.model";
import { buildInitialEntryData } from "@/features/habits/utils/utils";

export async function GET() {
  try {
    await connectToDB();

    const habits = await Habit.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(habits, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const parsedBody = CreateHabitSchema.parse(body);
    const habit = await Habit.create(parsedBody);
    const initialEntryData = buildInitialEntryData(habit);

    await HabitEntry.create({
      ...initialEntryData,
      habitId: habit._id,
      weekNumber: 1,
      frequencyType: habit.frequency.frequencyType,
      completed: false,
      completionRate: 0,
    });

    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
