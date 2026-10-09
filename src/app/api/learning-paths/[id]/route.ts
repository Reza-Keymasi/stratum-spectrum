import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import LearningPath from "@/shared/lib/models/learning-path.model";
import Task from "@/shared/lib/models/task.model";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const { id: _id } = await params;

    const path = await LearningPath.findById(_id).lean();
    const relatedTasks = await Task.find({ learningPath: _id });

    if (!path) throw Error("Learning path not found");
    if (!relatedTasks) throw new Error("No tasks in this path yet");

    return NextResponse.json({ path, tasks: relatedTasks });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    // const payload = learningPathUpdateSchema.parse(body);
    await connectToDB();
    const updatedLearningPath = await LearningPath.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLearningPath) {
      return NextResponse.json(
        { message: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedLearningPath);
  } catch (error) {
    return NextResponse.json(
      { message: "Could not update learning path", error },
      { status: 400 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  await connectToDB();
  const deletedLearningPath = await LearningPath.findByIdAndDelete(id);
  if (!deletedLearningPath) {
    return NextResponse.json(
      { message: "Learning path not found" },
      { status: 404 },
    );
  }
  return NextResponse.json({ ok: true });
}
