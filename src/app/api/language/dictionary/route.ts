import { NextResponse } from "next/server";

import connectToDB from "@/app/lib/db/connectToDB";
import Dictionary, {
  IWord,
  IWordBase,
} from "@/shared/lib/models/dictionary.model";

export async function GET(_: Request) {
  try {
    await connectToDB();
    const words: IWord[] = await Dictionary.find()
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json({ success: true, data: words }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true, error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const body = await request.json();
    const word: IWordBase = await Dictionary.create(body);
    return NextResponse.json(word, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
