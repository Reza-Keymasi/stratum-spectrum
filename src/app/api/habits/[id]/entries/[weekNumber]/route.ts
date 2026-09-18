import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import { UpdateDaySchema } from "@/features/habits/types/habit-entry.schema";
import HabitEntry from "@/shared/lib/models/habit-entry.model";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; weekNumber: string }> },
) {
  try {
    await connectToDB();
    const { id: habitId, weekNumber } = await params;
    const body = await req.json();

    const { dayIndex, value } = UpdateDaySchema.parse(body);

    const entry = await HabitEntry.findOne({ habitId, weekNumber });

    if (!entry) throw new Error("HabitEntry not found");

    const day = entry.days[dayIndex];
    if (day && day.active) {
      day.done = !day.done;
      if (value !== undefined && value !== null) {
        day.value = value;
      }
    }

    await entry.save();

    return NextResponse.json(entry);
  } catch (error) {
    console.log("PATCH", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
