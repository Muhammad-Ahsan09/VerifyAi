/**
 * OCR.space API Service
 * Handles extracting text from base64 images.
 */

export async function extractTextFromBase64(base64Image) {
  const apiKey = process.env.OCR_SPACE_API_KEY;

  if (!apiKey) {
    throw new Error("OCR_SPACE_API_KEY is missing. Cannot perform OCR.");
  }

  // OCR.space expects form data
  const formData = new FormData();
  formData.append("base64Image", base64Image);
  formData.append("apikey", apiKey);
  formData.append("isOverlayRequired", "false");
  formData.append("OCREngine", "2"); // Engine 2 is usually better for receipts/documents

  const response = await fetch("https://api.ocr.space/parse/image", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`OCR.space API error: ${response.status}`);
  }

  const data = await response.json();

  if (data.IsErroredOnProcessing) {
    throw new Error(`OCR Processing Error: ${data.ErrorMessage[0]}`);
  }

  // Extract the parsed text from the first page
  if (data.ParsedResults && data.ParsedResults.length > 0) {
    return data.ParsedResults[0].ParsedText.trim();
  }

  return "";
}
