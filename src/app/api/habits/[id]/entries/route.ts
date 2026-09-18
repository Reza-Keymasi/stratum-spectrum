import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import HabitEntry from "@/shared/lib/models/habit-entry.model";
import { buildNextWeekEntryData } from "@/features/habits/utils/utils";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;

    const entry = await HabitEntry.find({ habitId: id });

    if (!entry)
      return NextResponse.json({ message: "Entry not found" }, { status: 404 });

    return NextResponse.json(entry);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id: habitId } = await params;

    const currentEntry = await HabitEntry.findOne({ habitId }).sort({
      weekNumber: -1,
    });

    if (!currentEntry)
      return NextResponse.json({ message: "Entry not found" }, { status: 404 });

    const newWeekEntryData = buildNextWeekEntryData(currentEntry);

    const newWeek = await HabitEntry.create({ habitId, ...newWeekEntryData });

    return NextResponse.json(newWeek, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
