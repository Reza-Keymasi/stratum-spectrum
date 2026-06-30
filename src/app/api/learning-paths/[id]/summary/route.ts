import connectToDB from "@/app/lib/db/connectToDB";
import LearningPath from "@/shared/lib/models/learning-path.model";
import { NextResponse } from "next/server";
import { json } from "zod";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();

    const { id } = await params;
    const body = await req.json();

    const updatedSummary = await LearningPath.findByIdAndUpdate(id, body, {
      new: true,
    }).lean();

    if (!updatedSummary) {
      return NextResponse.json(
        { message: "Learning path not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedSummary);
  } catch (error) {}
}
