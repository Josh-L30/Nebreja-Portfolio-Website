// Same-origin, read-only GitHub activity endpoint for Vercel's Node runtime.
// No token, visitor data, arbitrary URLs or third-party activity service.
const SOURCE = "https://github.com/users/Josh-L30/contributions";
let cached = null;

function parseContributions(html, minimumDays = 300) {
  const tooltips = new Map();
  for (const match of html.matchAll(
    /<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g,
  )) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    if (id) tooltips.set(id, match[2].replace(/<[^>]*>/g, "").trim());
  }
  const contributions = [];
  const seen = new Set();
  for (const match of html.matchAll(/<td\b([^>]*\bdata-date="[^"]+"[^>]*)>/g)) {
    const attrs = match[1];
    const date = attrs.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const id = attrs.match(/\bid="([^"]+)"/)?.[1];
    const level = Number(attrs.match(/\bdata-level="([0-4])"/)?.[1]);
    const text = tooltips.get(id);
    const countText = text?.match(/^(No|[\d,]+) contributions?\b/)?.[1];
    if (!date || !Number.isInteger(level) || !countText || seen.has(date))
      throw new Error("Unexpected GitHub calendar format");
    const count =
      countText === "No" ? 0 : Number(countText.replaceAll(",", ""));
    if (!Number.isSafeInteger(count) || count < 0)
      throw new Error("Invalid contribution count");
    seen.add(date);
    contributions.push({ date, count, level });
  }
  if (contributions.length < minimumDays)
    throw new Error("Incomplete GitHub calendar");
  contributions.sort((a, b) => a.date.localeCompare(b.date));
  return {
    username: "Josh-L30",
    source: SOURCE,
    updatedAt: new Date().toISOString(),
    total: contributions.reduce((sum, day) => sum + day.count, 0),
    contributions,
  };
}

async function handler(request, response) {
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }
  try {
    if (!cached || Date.now() - cached.time > 3600000) {
      const upstream = await fetch(SOURCE, {
        headers: {
          "User-Agent": "Josh-Nebreja-Portfolio",
          Accept: "text/html",
        },
        signal: AbortSignal.timeout(8000),
      });
      if (!upstream.ok) throw new Error("Activity unavailable");
      cached = {
        time: Date.now(),
        data: parseContributions(await upstream.text()),
      };
    }
    response.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    response.end(request.method === "HEAD" ? "" : JSON.stringify(cached.data));
  } catch {
    response.statusCode = 503;
    response.setHeader("Cache-Control", "no-store");
    response.end(
      JSON.stringify({
        error: "Current GitHub activity is temporarily unavailable.",
      }),
    );
  }
}

module.exports = handler;
module.exports.parseContributions = parseContributions;
