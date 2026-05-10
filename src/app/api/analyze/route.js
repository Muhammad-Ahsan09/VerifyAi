import { NextResponse } from "next/server";
import { analyzeThreat } from "@/lib/ai/threatAnalyzer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { input, type } = body;

    if (!input) {
      return NextResponse.json(
        { error: "Input content is required" },
        { status: 400 }
      );
    }

    const result = await analyzeThreat(input, type || "message");

    return NextResponse.json(result);
  } catch (error) {
    console.error("API /analyze error:", error);
    return NextResponse.json(
      { error: "Failed to analyze threat" },
      { status: 500 }
    );
  }
}
