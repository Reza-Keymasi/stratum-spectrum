import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import Dictionary from "@/shared/lib/models/dictionary.model";
import { UpdateWordSchema } from "@/features/dictionary/types/word.schema";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) throw new Error("Word does not found!");

  const body = await request.json();

  const validatedData = UpdateWordSchema.parse(body);

  try {
    await connectToDB();

    const word = await Dictionary.findByIdAndUpdate(
      id,
      { $set: validatedData },
      { new: true },
    );

    if (!word) return NextResponse.json({ success: false }, { status: 404 });
    return NextResponse.json({ success: true, data: word }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!id) throw new Error("Word does not found!");

  try {
    await connectToDB();

    const word = await Dictionary.findByIdAndDelete(id);
    if (!word) {
      return NextResponse.json(
        { success: false, error: "Word not found" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, data: word }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
