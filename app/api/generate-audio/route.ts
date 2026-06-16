import { NextResponse } from "next/server";
import { processDocument } from "../lib/documentProcessor";

interface BookResponse {
  title: string;
  chunks: Array<string>[];
}

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    const response = (await processDocument(file)) as BookResponse[];

    return NextResponse.json(
      {
        status: "success",
        data: response,
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          status: "failed",
          error: error.message,
        },
        { status: 401 },
      );
    }

    return NextResponse.json({ error: error }, { status: 500 });
  }
};
