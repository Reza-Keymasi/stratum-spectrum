import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import Task from "@/shared/lib/models/task.model";
import { CreateAndEditTaskSchema } from "@/features/task-management/types/task.schema";
import { attachTaskToLearningPath } from "@/shared/services/taskLinker";

export async function GET() {
  await connectToDB();
  const tasks = await Task.find()
    .sort({ createdAt: -1 })
    .populate({ path: "learningPath", select: "title" })
    .lean();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();

    const parsedBody = CreateAndEditTaskSchema.parse(body);
    const { learningPathId, ...taskData } = parsedBody;
    let task = await Task.create({
      ...taskData,
      learningPath: learningPathId || null,
    });

    if (learningPathId) {
      task = await attachTaskToLearningPath(task._id, learningPathId);
    }

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid task payload", error },
      { status: 400 },
    );
  }
}
