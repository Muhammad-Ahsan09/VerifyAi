/**
 * Local Fallback Mock Classifier
 * Ensures the application never breaks if the OpenRouter API fails.
 */

export function mockClassifier(input, type) {
  const lowercaseInput = input.toLowerCase();
  
  let score = 0;
  let category = "Unknown";
  const flags = [];
  
  // Keyword mapping to detect heuristics
  const heuristics = {
    urgency: ["urgent", "verify now", "click immediately", "immediately", "within 24 hours"],
    fear: ["account suspended", "locked", "unauthorized login", "temporarily restricted"],
    credentials: ["otp", "password", "mpin", "verify your identity", "login"],
    reward: ["free money", "reward", "lottery", "subsidy grant", "double yield", "cash reward"],
    suspiciousDomains: ["http://", ".io/", ".net/form"] // simplistic check for mock
  };

  // Check heuristics
  if (heuristics.urgency.some(kw => lowercaseInput.includes(kw))) {
    score += 25;
    flags.push("High urgency tactics detected");
  }
  
  if (heuristics.fear.some(kw => lowercaseInput.includes(kw))) {
    score += 30;
    flags.push("Fear-based manipulation (account restriction threats)");
  }
  
  if (heuristics.credentials.some(kw => lowercaseInput.includes(kw))) {
    score += 35;
    flags.push("Requests sensitive credentials or OTP");
  }
  
  if (heuristics.reward.some(kw => lowercaseInput.includes(kw))) {
    score += 25;
    flags.push("Promises unrealistic financial rewards");
  }
  
  if (heuristics.suspiciousDomains.some(kw => lowercaseInput.includes(kw))) {
    score += 20;
    flags.push("Contains potentially suspicious or unencrypted URLs");
  }

  // Determine threat level and category
  let threatLevel = "Safe";
  if (score >= 80) threatLevel = "Critical";
  else if (score >= 50) threatLevel = "High Risk";
  else if (score >= 20) threatLevel = "Suspicious";

  if (lowercaseInput.includes("paypal") || lowercaseInput.includes("jazzcash") || lowercaseInput.includes("bank")) {
    category = "Financial Scam";
  } else if (lowercaseInput.includes("password") || lowercaseInput.includes("otp")) {
    category = "Phishing";
  } else if (lowercaseInput.includes("grant") || lowercaseInput.includes("lottery")) {
    category = "Social Engineering";
  } else if (type === "url" || lowercaseInput.includes("http")) {
    category = "Malware Link";
  }

  // Generate output matching the LLM schema
  return {
    threatLevel,
    threatScore: Math.min(score, 100),
    category: score > 0 ? category : "Safe Content",
    confidence: score > 0 ? "85%" : "95%",
    summary: score > 0 
      ? "This content exhibits patterns strongly associated with fraudulent activity." 
      : "No obvious malicious patterns were detected in this content.",
    explanation: score > 0 
      ? `The analyzer detected several common scam patterns in the provided ${type}. Scammers often use these specific triggers to manipulate targets.` 
      : "The input appears to be benign based on standard heuristic checks.",
    detectedTactics: flags,
    recommendations: score > 0 
      ? ["Do not click any links.", "Do not reply or provide OTPs.", "Block the sender immediately."] 
      : ["Always remain cautious with unexpected messages."],
    sourceCredibility: score > 0 ? "Low" : "High",
    emotionalManipulationScore: Math.min(score, 100)
  };
}
