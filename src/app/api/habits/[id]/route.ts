import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectToDB from "@/app/lib/db/connectToDB";
import Habit from "@/shared/lib/models/habit.model";
import { ToggleHabitCompletionSchema } from "@/features/habits/types/habit.schema";
import HabitEntry from "@/shared/lib/models/habit-entry.model";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;
    const habit = await Habit.findById(id);
    return NextResponse.json(habit);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectToDB();

  const session = await mongoose.startSession();
  try {
    const { id: habitId } = await params;

    let deletedHabit;

    await session.withTransaction(async () => {
      deletedHabit = await Habit.findByIdAndDelete(habitId, {
        session,
      });

      if (!deletedHabit) throw new Error("Habit not found");

      await HabitEntry.deleteMany({ habitId }, { session });
    });

    return NextResponse.json(
      { message: "Habit deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    session.endSession();
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: habitId } = await params;
    await connectToDB();
    const body = await req.json();

    const { completed } = ToggleHabitCompletionSchema.parse(body);

    const habitToUpdate = await Habit.findByIdAndUpdate(
      habitId,
      {
        completed,
        completedAt: completed ? new Date() : null,
      },
      { new: true },
    );

    await habitToUpdate.save();

    return NextResponse.json({ success: true, message: "Habit completed!" });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
