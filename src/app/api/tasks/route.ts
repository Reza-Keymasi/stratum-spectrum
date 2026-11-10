import { NextResponse } from "next/server";
import { Types } from "mongoose";

import connectToDB from "@/app/lib/db/connectToDB";
import { Task } from "@/shared/lib/models/task.model";
import { CreateTaskSchema } from "@/features/task-management/types/task.schema";
import { attachTaskToLearningPath } from "@/shared/services/taskLinker";
import { requireAuth } from "@/features/auth/lib/session";
import { Project } from "@/shared/lib/models/project.model";
import { Label } from "@/shared/lib/models/label.model";

export async function GET() {
  await connectToDB();
  try {
    const { userId } = await requireAuth();
    const tasks = await Task.find({ userId })
      .sort({ createdAt: -1 })
      .populate({ path: "learningPath", select: "title" })
      .lean();
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { messgae: "Internal server error", error },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const { userId } = await requireAuth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const parsedBody = CreateTaskSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          error: "Validation error",
          fields: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const {
      labels: names,
      project: projectId,
      learningPathId,
      ...rest
    } = parsedBody.data;

    await connectToDB();

    let project = projectId
      ? await Project.findOne({ _id: projectId, userId })
      : await Project.findOne({ userId, archived: false }).sort({
          position: 1,
        });

    if (!project) {
      project = await Project.create({
        userId,
        name: "Inbox",
        archived: false,
        position: 1,
      });
    }

    const labels = await Promise.all(
      names.map((name) =>
        Label.findOneAndUpdate(
          { userId, name },
          { $setOnInsert: { userId, name } },
          { upsert: true, new: true },
        ),
      ),
    );

    let task = await Task.create({
      ...rest,
      userId: new Types.ObjectId(userId),
      project: project._id,
      labels: labels.map((label) => label._id),
      learningPath: learningPathId || null,
    });

    // if (learningPathId) {
    //   task = await attachTaskToLearningPath(task._id, learningPathId);
    // }

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid task payload", error },
      { status: 400 },
    );
  }
}
