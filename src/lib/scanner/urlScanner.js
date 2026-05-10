/**
 * URL Simulation Engine
 * Simulates advanced security scanning by extracting domain heuristics.
 */

export function simulateUrlScan(inputUrl) {
  let urlObj;
  try {
    urlObj = new URL(inputUrl.startsWith('http') ? inputUrl : `http://${inputUrl}`);
  } catch (e) {
    return null; // Invalid URL
  }

  const domain = urlObj.hostname;
  const protocol = urlObj.protocol;
  const path = urlObj.pathname;

  // Heuristic: Is the connection secure?
  const isSecure = protocol === "https:";

  // Heuristic: Typosquatting (multiple hyphens, weird subdomains, fake keywords)
  const suspiciousKeywords = ["secure", "auth", "login", "verify", "account", "update", "billing", "support", "free", "reward"];
  const hasSuspiciousKeywords = suspiciousKeywords.some(kw => domain.includes(kw) || path.includes(kw));
  const hasMultipleHyphens = (domain.match(/-/g) || []).length >= 2;
  const isTyposquatting = hasSuspiciousKeywords || hasMultipleHyphens;

  // Heuristic: Domain Age (Simulated)
  // If it looks suspicious, simulate a very young domain (1-14 days). Otherwise, simulate an older one.
  const domainAgeDays = isTyposquatting ? Math.floor(Math.random() * 14) + 1 : Math.floor(Math.random() * 3000) + 365;
  const registrarName = isTyposquatting ? "NameCheap, Inc. (Privacy Protected)" : "GoDaddy.com, LLC";

  // Heuristic: Redirects
  // Suspicious URLs often use multiple redirects to hide the final payload.
  const redirects = [];
  if (isTyposquatting) {
    redirects.push(`http://${domain}/track?id=xyz123`);
    redirects.push(`https://${domain}/auth-redirect`);
    redirects.push(`https://${domain}/login.php?session=active`);
  } else {
    redirects.push(`https://${domain}${path}`);
  }

  return {
    originalUrl: inputUrl,
    domain,
    protocol,
    isSecure,
    domainAgeDays,
    registrarName,
    isTyposquatting,
    redirectChain: redirects,
    simulatedChecks: {
      sslValid: isSecure,
      dnsResolves: true,
      blacklisted: isTyposquatting && domainAgeDays < 7
    }
  };
}
