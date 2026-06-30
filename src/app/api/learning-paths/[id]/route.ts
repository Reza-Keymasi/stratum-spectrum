import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import LearningPath from "@/shared/lib/models/learning-path.model";
import { learningPathUpdateSchema } from "@/lib/validators/planner";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const { id: _id } = await params;

    const path = await LearningPath.findById(_id).lean();

    if (!path) throw Error("Learning path not found");

    return NextResponse.json(path);
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
    const payload = learningPathUpdateSchema.parse(body);
    await connectToDB();
    const updatedLearningPath = await LearningPath.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

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
