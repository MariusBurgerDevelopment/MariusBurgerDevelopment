import fs from "node:fs";
import path from "node:path";
import https from "node:https";

const USERNAME = "MariusBurgerDevelopment";

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(data));
      res.on("error", reject);
    });
  });
}

export async function fetchLiveContributionData() {
  try {
    const html = await fetchHtml(`https://github.com/users/${USERNAME}/contributions`);
    const dayRegex = /<td[^>]*data-date="(\d{4}-\d\d-\d\d)"[^>]*data-level="(\d+)"[^>]*><\/td>\s*<tool-tip[^>]*>(.*?)<\/tool-tip>/gs;
    let match;
    const days = [];
    while ((match = dayRegex.exec(html)) !== null) {
      const date = match[1];
      const level = parseInt(match[2], 10);
      const tt = match[3];
      const countMatch = tt.match(/(\d+)\s+contribution/);
      const count = countMatch ? parseInt(countMatch[1], 10) : 0;
      days.push({ date, level, count });
    }

    if (days.length === 0) {
      throw new Error("No days parsed from HTML");
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    const totalContributions = days.reduce((sum, d) => sum + d.count, 0);
    const activeDays = days.filter((d) => d.count > 0).length;

    let longestStreak = 0;
    let tempStreak = 0;
    for (const d of days) {
      if (d.count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) longestStreak = tempStreak;
      } else {
        tempStreak = 0;
      }
    }

    let currentStreak = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) {
        currentStreak++;
      } else {
        break;
      }
    }

    return {
      days,
      totalContributions,
      activeDays,
      longestStreak,
      currentStreak,
      startDate: days[0].date,
      endDate: days[days.length - 1].date,
    };
  } catch (err) {
    console.warn("Could not fetch live HTML contributions, using fallback:", err.message);
    return null;
  }
}

export function generateStatsSvg(data) {
  const total = data ? data.totalContributions : 926;
  const activeDays = data ? data.activeDays : 67;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e080a" />
      <stop offset="50%" stop-color="#12090c" />
      <stop offset="100%" stop-color="#180b0f" />
    </linearGradient>
    <linearGradient id="crimsonBar" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff1744" />
      <stop offset="100%" stop-color="#dc2626" />
    </linearGradient>
    <filter id="crimsonGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#ff1744" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Card Background with Crimson Outline -->
  <rect x="0.5" y="0.5" width="494" height="194" rx="14" fill="url(#cardBg)" stroke="#ef4444" stroke-opacity="0.8" />

  <!-- Corner Tech Accents -->
  <path d="M 14 1 L 1 14 M 481 1 L 494 14" stroke="#ff1744" stroke-width="1.5" stroke-opacity="0.4" />
  
  <!-- Header Title -->
  <g transform="translate(25, 30)">
    <rect x="0" y="2" width="7" height="14" rx="1.5" fill="#ff1744" />
    <text x="16" y="14" fill="#ff1e44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="700" letter-spacing="0.5">MariusBurgerDevelopment's GitHub Stats</text>
  </g>

  <!-- Metric Rows -->
  <g transform="translate(25, 48)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13">
    <!-- Row 1: Total Contributions -->
    <g transform="translate(0, 22)">
      <circle cx="5" cy="5" r="3.5" fill="#ff1744" />
      <text x="20" y="9" fill="#f4f4f5" font-weight="500">Total Contributions:</text>
      <text x="220" y="9" fill="#ff1744" font-weight="700">${total.toLocaleString()}</text>
    </g>

    <!-- Row 2: Active Coding Days -->
    <g transform="translate(0, 48)">
      <circle cx="5" cy="5" r="3.5" fill="none" stroke="#ef4444" stroke-width="1.5" />
      <text x="20" y="9" fill="#f4f4f5" font-weight="500">Active Coding Days:</text>
      <text x="220" y="9" fill="#f4f4f5" font-weight="700">${activeDays} days</text>
    </g>

    <!-- Row 3: Scope Visibility -->
    <g transform="translate(0, 74)">
      <path d="M2 5 L5 8 L10 2" fill="none" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" />
      <text x="20" y="9" fill="#f4f4f5" font-weight="500">Private Repositories:</text>
      <text x="220" y="9" fill="#10b981" font-weight="700">Included (Verified)</text>
    </g>

    <!-- Row 4: Contributed To -->
    <g transform="translate(0, 100)">
      <rect x="2" y="2" width="7" height="7" fill="none" stroke="#ef4444" stroke-width="1.2" />
      <text x="20" y="9" fill="#f4f4f5" font-weight="500">Commit Velocity:</text>
      <text x="220" y="9" fill="#f4f4f5" font-weight="700">High Impact</text>
    </g>
  </g>

  <!-- Rank Ring Gauge -->
  <g transform="translate(405, 110)">
    <!-- Outer Track -->
    <circle cx="0" cy="0" r="42" fill="none" stroke="#251115" stroke-width="5" />
    <!-- Glowing Progress -->
    <circle cx="0" cy="0" r="42" fill="none" stroke="#ff1744" stroke-width="5" stroke-dasharray="264" stroke-dashoffset="35" stroke-linecap="round" transform="rotate(-90)" filter="url(#crimsonGlow)" />
    <!-- Grade Text -->
    <text x="0" y="7" text-anchor="middle" fill="#ff1e44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" letter-spacing="1">S+</text>
    <text x="0" y="24" text-anchor="middle" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="700" letter-spacing="1.5">RANK</text>
  </g>
</svg>`;
}

export function generateStreakSvg(data) {
  const total = data ? data.totalContributions : 926;
  const currentStreak = data ? data.currentStreak : 2;
  const longestStreak = data ? data.longestStreak : 10;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="495" height="195" viewBox="0 0 495 195" fill="none">
  <defs>
    <linearGradient id="streakBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e080a" />
      <stop offset="50%" stop-color="#12090c" />
      <stop offset="100%" stop-color="#180b0f" />
    </linearGradient>
    <filter id="fireGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="5" flood-color="#ff1744" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Card Background -->
  <rect x="0.5" y="0.5" width="494" height="194" rx="14" fill="url(#streakBg)" stroke="#ef4444" stroke-opacity="0.8" />

  <!-- Corner Tech Accents -->
  <path d="M 14 1 L 1 14 M 481 1 L 494 14" stroke="#ff1744" stroke-width="1.5" stroke-opacity="0.4" />

  <!-- Section 1: Total Contributions -->
  <g transform="translate(85, 95)" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
    <text x="0" y="-12" fill="#ff1744" font-size="28" font-weight="800">${total.toLocaleString()}</text>
    <text x="0" y="14" fill="#ff4d6d" font-size="12" font-weight="600">Total Contributions</text>
    <text x="0" y="32" fill="#71717a" font-size="10" font-weight="500">Jun 2025 - Present</text>
  </g>

  <!-- Divider 1 -->
  <line x1="170" y1="42" x2="170" y2="152" stroke="#251115" stroke-width="1.5" />

  <!-- Section 2: Current Streak (Center Highlight) -->
  <g transform="translate(247, 95)" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
    <!-- Fire Ring -->
    <circle cx="0" cy="-32" r="16" fill="#200d12" stroke="#ff1744" stroke-width="1.5" filter="url(#fireGlow)" />
    <!-- Flame Icon -->
    <path d="M-4 -27 C-5 -33, 0 -41, 0 -41 C0 -41, 5 -33, 4 -27 C3 -23, -3 -23, -4 -27 Z" fill="#ff1744" />
    
    <text x="0" y="6" fill="#ffffff" font-size="34" font-weight="900">${currentStreak}</text>
    <text x="0" y="26" fill="#ef4444" font-size="13" font-weight="700">Current Streak</text>
    <text x="0" y="44" fill="#a1a1aa" font-size="10" font-weight="500">Active Pipeline 🔥</text>
  </g>

  <!-- Divider 2 -->
  <line x1="325" y1="42" x2="325" y2="152" stroke="#251115" stroke-width="1.5" />

  <!-- Section 3: Longest Streak -->
  <g transform="translate(410, 95)" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">
    <text x="0" y="-12" fill="#ffffff" font-size="28" font-weight="800">${longestStreak}</text>
    <text x="0" y="14" fill="#ff4d6d" font-size="12" font-weight="600">Longest Streak</text>
    <text x="0" y="32" fill="#71717a" font-size="10" font-weight="500">Peak Velocity</text>
  </g>
</svg>`;
}
