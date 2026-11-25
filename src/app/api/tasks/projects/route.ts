import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import { requireAuth } from "@/features/auth/lib/session";
import { Project } from "@/shared/lib/models/project.model";

export async function GET(_: Request) {
  const { userId } = await requireAuth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDB();

    const projects = await Project.find({ userId }).lean();

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
