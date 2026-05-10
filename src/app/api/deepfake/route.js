import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { fileType, sampleId } = body;

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 3500));

    // Return different mock data based on input
    if (sampleId === "politician") {
      return NextResponse.json({
        authenticityScore: 12, // 12% authentic -> 88% fake
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
          "Check official trusted sources for verification.",
          "Report this media on the platform where it was found."
        ]
      });
    }

    if (sampleId === "scam-call") {
      return NextResponse.json({
        authenticityScore: 4,
        threatLevel: "Critical",
        summary: "Extremely high probability of synthetic AI voice cloning.",
        videoScore: 100, // No video, N/A
        audioScore: 4,
        anomalies: [
          { time: "0:02", description: "Unnatural breathing patterns detected in audio track." },
          { time: "0:15", description: "Robotic intonation and lack of emotional variance." }
        ],
        recommendations: [
          "Hang up immediately if you receive a call like this.",
          "Do not provide any personal or financial information.",
          "Establish a safe word with family members."
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
          { time: "Visual", description: "Anatomical anomaly detected (extra digits/blurry boundaries)." },
          { time: "Metadata", description: "Missing standard camera EXIF data." }
        ],
        recommendations: [
          "Do not trust this image as photographic evidence.",
          "Perform a reverse image search to find the original context."
        ]
      });
    }

    // Default simulation for uploaded files
    const isLikelyFake = Math.random() > 0.5;
    const isImage = fileType && fileType.includes("image");
    
    if (isLikelyFake) {
      return NextResponse.json({
        authenticityScore: 24,
        threatLevel: "High Risk",
        summary: "Analysis indicates multiple artifacts consistent with AI generation.",
        ...(isImage ? { imageScore: 28 } : { videoScore: 28, audioScore: 45 }),
        anomalies: [
          { time: "0:00", description: "Initial frame metadata shows suspicious compression artifacts." },
          { time: "Unknown", description: "Background noise profile does not match environment." }
        ],
        recommendations: [
          "Treat this media with extreme skepticism.",
          "Verify the source before engaging."
        ]
      });
    } else {
      return NextResponse.json({
        authenticityScore: 94,
        threatLevel: "Safe",
        summary: "No significant AI manipulation detected. Media appears authentic.",
        ...(isImage ? { imageScore: 94 } : { videoScore: 92, audioScore: 96 }),
        anomalies: [],
        recommendations: [
          "This media passes basic authenticity checks.",
          "Always maintain a baseline of critical thinking."
        ]
      });
    }

  } catch (error) {
    console.error("API /deepfake error:", error);
    return NextResponse.json(
      { error: "Failed to analyze deepfake media" },
      { status: 500 }
    );
  }
}
