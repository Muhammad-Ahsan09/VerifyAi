import { NextResponse } from "next/server";
import { extractTextFromBase64 } from "@/lib/ocr/ocrSpace";

// Optional: you can increase the max body size for large images
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb',
//     },
//   },
// }
// Note: App Router uses NextRequest so the config above is primarily for Page Router. 
// App Router body size limit is generally 2MB-4MB by default which is fine for screenshots.

export async function POST(request) {
  try {
    const body = await request.json();
    const { base64Image } = body;

    if (!base64Image) {
      return NextResponse.json(
        { error: "base64Image is required" },
        { status: 400 }
      );
    }

    const text = await extractTextFromBase64(base64Image);

    return NextResponse.json({ text });
  } catch (error) {
    console.error("API /ocr error:", error);
    
    // Check if it's our explicit missing key error
    if (error.message.includes("OCR_SPACE_API_KEY is missing")) {
       return NextResponse.json(
        { error: "OCR API Key is not configured." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Failed to process image" },
      { status: 500 }
    );
  }
}
