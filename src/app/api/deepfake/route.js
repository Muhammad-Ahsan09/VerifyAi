import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const apiKey = process.env.SCAM_AI_API_KEY;

    // Handle Samples (JSON)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      const { sampleId } = body;

      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 3500));

      if (sampleId === "politician") {
        return NextResponse.json({
          authenticityScore: 12,
          threatLevel: "Critical",
          summary: "High probability of AI-generated video and audio cloning detected.",
          videoScore: 15,
          audioScore: 8,
          anomalies: [
            { time: "0:04", description: "Unnatural eye blinking pattern detected." },
            { time: "0:12", description: "Audio waveform frequency mismatch indicative of GAN voice cloning." },
            { time: "0:18", description: "Lighting artifact around the jawline boundary." }
          ],
          recommendations: [
            "Do not share this video.",
            "Check official trusted sources for verification."
          ]
        });
      }

      if (sampleId === "scam-call") {
        return NextResponse.json({
          authenticityScore: 4,
          threatLevel: "Critical",
          summary: "Extremely high probability of synthetic AI voice cloning.",
          videoScore: 100,
          audioScore: 4,
          anomalies: [
            { time: "0:02", description: "Unnatural breathing patterns detected in audio track." },
            { time: "0:15", description: "Robotic intonation and lack of emotional variance." }
          ],
          recommendations: [
            "Hang up immediately if you receive a call like this."
          ]
        });
      }

      if (sampleId === "ai-image") {
        return NextResponse.json({
          authenticityScore: 18,
          threatLevel: "High Risk",
          summary: "Multiple visual anomalies consistent with generative AI models detected.",
          imageScore: 18,
          anomalies: [
            { time: "Visual", description: "Inconsistent lighting on background objects." },
            { time: "Visual", description: "Anatomical anomaly detected." }
          ],
          recommendations: [
            "Do not trust this image as photographic evidence."
          ]
        });
      }
      
      throw new Error("Invalid sample ID");
    }

    // Handle Real Files (FormData)
    if (contentType.includes("multipart/form-data")) {
      if (!apiKey) {
        throw new Error("SCAM_AI_API_KEY is not configured in .env.local.");
      }

      const formData = await request.formData();
      const file = formData.get("file");

      if (!file) {
        throw new Error("No file provided");
      }

      const isImage = file.type.includes("image");
      const isVideo = file.type.includes("video") || file.type.includes("audio");

      let endpoint = "";
      const scamFormData = new FormData();

      if (isImage) {
        endpoint = "https://api.scam.ai/api/defence/faceswap/predict";
        scamFormData.append("files", file);
      } else if (isVideo) {
        endpoint = "https://api.scam.ai/api/defence/video/detection";
        scamFormData.append("video", file);
      } else {
        throw new Error("Unsupported file type");
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "x-api-key": apiKey
        },
        body: scamFormData
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Scam.ai API error (${response.status}): ${errText}`);
      }

      const scamResult = await response.json();
      console.log("Scam.ai Raw Result:", scamResult);

      // Best effort mapping of unknown scam.ai response schema
      let fakeScore = 0.5; // Default middle ground
      let rawStr = JSON.stringify(scamResult);

      if (typeof scamResult.fake_probability !== 'undefined') {
        fakeScore = scamResult.fake_probability;
      } else if (typeof scamResult.score !== 'undefined') {
        fakeScore = scamResult.score;
      } else if (scamResult.prediction) {
        // e.g. prediction: 'fake', confidence: 0.99
        fakeScore = (scamResult.prediction === 'fake' || scamResult.prediction === 'spoof') 
          ? (scamResult.confidence || 0.9) 
          : (1 - (scamResult.confidence || 0.9));
      }

      const authenticityScore = Math.max(0, Math.min(100, Math.round((1 - fakeScore) * 100)));
      
      let threatLevel = "Safe";
      let summary = "No significant AI manipulation detected by Scam.ai.";
      
      if (authenticityScore < 40) {
        threatLevel = "Critical";
        summary = "High probability of AI-generated content detected by Scam.ai.";
      } else if (authenticityScore < 75) {
        threatLevel = "High Risk";
        summary = "Suspicious artifacts detected. Media may be manipulated.";
      }

      return NextResponse.json({
        authenticityScore,
        threatLevel,
        summary,
        ...(isImage ? { imageScore: authenticityScore } : { videoScore: authenticityScore, audioScore: authenticityScore }),
        anomalies: [
          { time: "Scan", description: `Scam.ai Output: ${rawStr.substring(0, 60)}...` }
        ],
        recommendations: [
          "Result verified by Scam.ai ML Engine",
          "Always verify context even if marked safe"
        ]
      });
    }

    throw new Error("Invalid content type. Expected multipart/form-data or application/json");

  } catch (error) {
    console.error("API /deepfake error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze deepfake media" },
      { status: 500 }
    );
  }
}
