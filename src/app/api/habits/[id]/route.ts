import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import Habit from "@/shared/lib/models/habit.model";

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
