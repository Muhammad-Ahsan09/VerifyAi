import { mockClassifier } from "./mockClassifier";
import { simulateUrlScan } from "../scanner/urlScanner";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const PRIMARY_MODEL = "google/gemma-3-27b-it:free";
const FALLBACK_MODEL = "meta-llama/llama-3.3-70b-instruct:free";

const SYSTEM_PROMPT = `You are the VerifyAI Threat Analysis Engine, a highly advanced security AI. 
Your job is to analyze the provided content and determine if it is a scam, phishing attempt, fake news, or malicious.

You must respond ONLY with a valid JSON object matching this exact schema:
{
  "threatLevel": "Safe" | "Suspicious" | "High Risk" | "Critical",
  "threatScore": number (0-100),
  "category": "Phishing" | "Financial Scam" | "Fake News" | "Impersonation" | "Malware Link" | "Propaganda" | "Social Engineering" | "Safe Content",
  "confidence": string (e.g. "95%"),
  "summary": string (1-2 sentences),
  "explanation": string (detailed explanation of why it was flagged),
  "detectedTactics": array of strings (e.g. ["Urgency tactic", "Credential request"]),
  "recommendations": array of strings (e.g. ["Do not click the link", "Block sender"]),
  "sourceCredibility": "Low" | "Medium" | "High",
  "emotionalManipulationScore": number (0-100)
}

If the user provides technical metadata (like domain age or redirects), use it to inform your summary and explanation.
Do not include any markdown formatting like \`\`\`json. Return strictly the raw JSON object.`;

async function callOpenRouter(input, type, model, urlData = null) {
  let promptContent = `Please analyze this ${type}:\n\n${input}`;
  
  if (urlData) {
    promptContent += `\n\nTechnical Metadata (Use this to inform your analysis):
- Domain: ${urlData.domain}
- Domain Age: ${urlData.domainAgeDays} days
- Protocol Secure: ${urlData.isSecure}
- Registrar: ${urlData.registrarName}
- Typosquatting Detected: ${urlData.isTyposquatting}
- Redirect Chain: ${urlData.redirectChain.join(" -> ")}`;
  }
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "VerifyAI",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: promptContent }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  // Clean up potential markdown formatting if the model ignored instructions
  const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  
  return JSON.parse(cleanedContent);
}

export async function analyzeThreat(input, type) {
  let urlData = null;
  if (type === "url") {
    urlData = simulateUrlScan(input);
  }

  if (!OPENROUTER_API_KEY) {
    console.warn("OPENROUTER_API_KEY is missing. Falling back to mock classifier.");
    const res = await mockClassifier(input, type);
    if (urlData) res.urlData = urlData;
    return res;
  }

  try {
    // Try Primary Model
    const res = await callOpenRouter(input, type, PRIMARY_MODEL, urlData);
    if (urlData) res.urlData = urlData;
    res.type = type; // Ensure type is passed through
    return res;
  } catch (error) {
    console.error(`Primary model (${PRIMARY_MODEL}) failed:`, error);
    
    try {
      // Try Fallback Model
      const res = await callOpenRouter(input, type, FALLBACK_MODEL, urlData);
      if (urlData) res.urlData = urlData;
      res.type = type;
      return res;
    } catch (fallbackError) {
      console.error(`Fallback model (${FALLBACK_MODEL}) failed:`, fallbackError);
      
      // Ultimate Fallback to Mock Classifier
      console.warn("All AI models failed. Falling back to mock classifier.");
      const res = await mockClassifier(input, type);
      if (urlData) res.urlData = urlData;
      res.type = type;
      return res;
    }
  }
}
