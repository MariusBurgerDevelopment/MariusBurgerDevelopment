#!/usr/bin/env node
/**
 * Generates an animated "jet over contribution grid" SVG using a GitHub
 * user's REAL contribution calendar (34 weeks x 7 rows).
 *
 * Designed for MariusBurgerDevelopment.
 *
 * Env vars:
 *   GH_USERNAME  - GitHub login to fetch contributions for (default: MariusBurgerDevelopment)
 *   GH_TOKEN     - Token for GraphQL API (falls back to demo pattern if omitted)
 *   OUTPUT_PATH  - where to write the SVG (default: dist/github-jet.svg)
 */

import fs from "node:fs";
import path from "node:path";

const USERNAME = process.env.GH_USERNAME || "MariusBurgerDevelopment";
const TOKEN = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const OUTPUT = process.env.OUTPUT_PATH || "dist/github-jet.svg";
const COLS = 34; // weeks shown
const ROWS = 7;
const CELL = 11;
const STEP = 14; // cell + gap
const GRID_X = 20;
const GRID_Y = 15;
const WIDTH = 513;
const HEIGHT = 170;
const JET_X_START = 35;
const JET_X_END = 478;
const LOOP_DUR = 18; // seconds for a sleek, fast sweep
const MAX_TARGETS = 14; // how many high-activity days the jet fires on
const FLASH_COLOR = "#22d3ee"; // Neon Cyan flash
const BULLET_COLOR = "#38bdf8"; // Electric Sky Blue plasma
const BLAST_COLOR = "#10b981"; // Emerald shockwave blast
const PAD_Y = 128; // bullet launch origin

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

async function fetchWeeks() {
  if (!TOKEN) {
    console.log("No GH_TOKEN supplied - generating mock active contribution grid for offline preview.");
    return generateMockWeeks();
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "Marius-Jet-Heatmap-Generator",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME } }),
    });

    if (!res.ok) {
      console.warn(`GitHub API error ${res.status}: ${await res.text()}`);
      return generateMockWeeks();
    }

    const json = await res.json();
    if (json.errors || !json.data?.user?.contributionsCollection?.contributionCalendar?.weeks) {
      console.warn("GraphQL error or user not found, falling back to mock:", json.errors);
      return generateMockWeeks();
    }

    return json.data.user.contributionsCollection.contributionCalendar.weeks;
  } catch (err) {
    console.warn("Failed to fetch GitHub contributions:", err.message);
    return generateMockWeeks();
  }
}

function generateMockWeeks() {
  const weeks = [];
  const colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];
  
  for (let w = 0; w < COLS; w++) {
    const days = [];
    for (let r = 0; r < ROWS; r++) {
      // Create an authentic realistic high-activity developer pattern
      const rand = Math.random();
      let count = 0;
      let color = colors[0];
      if (rand > 0.45) {
        count = Math.floor(Math.random() * 8) + 1;
        color = colors[Math.min(Math.floor(count / 2) + 1, 4)];
      }
      days.push({
        date: `2026-${String(Math.floor(w / 4) + 1).padStart(2, "0")}-${String((w % 4) * 7 + r + 1).padStart(2, "0")}`,
        contributionCount: count,
        color,
      });
    }
    weeks.push({ contributionDays: days });
  }
  return weeks;
}

function buildCells(weeks) {
  const recent = weeks.slice(-COLS);
  const padCount = COLS - recent.length;
  const padded = Array.from({ length: padCount }, () => ({
    contributionDays: Array.from({ length: ROWS }, () => ({
      contributionCount: 0,
      color: "#161b22",
      date: null,
    })),
  })).concat(recent);

  const cells = [];
  padded.forEach((week, col) => {
    week.contributionDays.forEach((day, row) => {
      cells.push({
        col,
        row,
        x: GRID_X + col * STEP,
        y: GRID_Y + row * STEP,
        color: day.color || "#161b22",
        count: day.contributionCount || 0,
        date: day.date,
      });
    });
  });
  return cells;
}

function pickTargets(cells) {
  return [...cells]
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, MAX_TARGETS)
    .sort((a, b) => a.col - b.col || a.row - b.row);
}

function keyTimeForCol(col, direction) {
  const span = 0.46;
  const t = 0.02 + (col / (COLS - 1)) * span;
  return direction === "forward" ? t : 1 - t;
}

function fmt(n) {
  return Number(n.toFixed(4));
}

function buildGrid(cells, targets) {
  const targetKey = new Set(targets.map((t) => `${t.col}-${t.row}`));
  let svg = "";
  for (const c of cells) {
    const isTarget = targetKey.has(`${c.col}-${c.row}`);
    if (!isTarget) {
      svg += `<rect x="${c.x.toFixed(2)}" y="${c.y.toFixed(2)}" width="${CELL}" height="${CELL}" rx="2" ry="2" fill="${c.color}"/>\n`;
      continue;
    }
    const tFwd = keyTimeForCol(c.col, "forward");
    const tBack = keyTimeForCol(c.col, "backward");
    const [t1, t2] = [Math.min(tFwd, tBack), Math.max(tFwd, tBack)];
    const dur = 0.007;
    svg += `<rect x="${c.x.toFixed(2)}" y="${c.y.toFixed(2)}" width="${CELL}" height="${CELL}" rx="2" ry="2" fill="${c.color}">` +
      `<animate attributeName="fill" dur="${LOOP_DUR}s" repeatCount="indefinite" ` +
      `keyTimes="0;${fmt(t1)};${fmt(t1 + dur)};${fmt(t2)};${fmt(t2 + dur)};1" ` +
      `values="${c.color};${c.color};${FLASH_COLOR};${c.color};${FLASH_COLOR};${c.color}"/>` +
      `</rect>\n`;
  }
  return svg;
}

function buildBulletsAndBlasts(targets) {
  let bullets = "";
  let blasts = "";
  const dur = 0.007;

  for (const dir of ["forward", "backward"]) {
    const ordered = dir === "forward" ? targets : [...targets].reverse();
    for (const c of ordered) {
      const t = keyTimeForCol(c.col, dir);
      const rise = t - dur * 3;
      const arrive = t;
      const fadeEnd = t + dur;
      const cx = fmt(c.x + CELL / 2);
      const targetY = fmt(c.y + CELL / 2);

      bullets += `<circle cx="${cx}" cy="${PAD_Y}" r="2.5" fill="${BULLET_COLOR}">` +
        `<animate attributeName="cy" dur="${LOOP_DUR}s" repeatCount="indefinite" ` +
        `keyTimes="0;${fmt(rise)};${fmt(arrive)};1" values="${PAD_Y};${PAD_Y};${targetY};${targetY}"/>` +
        `<animate attributeName="opacity" dur="${LOOP_DUR}s" repeatCount="indefinite" ` +
        `keyTimes="0;${fmt(rise)};${fmt(arrive)};${fmt(fadeEnd)};1" values="0;1;1;0;0"/>` +
        `</circle>\n`;

      blasts += `<circle cx="${cx}" cy="${targetY}" r="0" fill="none" stroke="${BLAST_COLOR}" stroke-width="1.8" opacity="0">` +
        `<animate attributeName="r" dur="${LOOP_DUR}s" repeatCount="indefinite" ` +
        `keyTimes="0;${fmt(arrive)};${fmt(arrive + dur * 3)};1" values="0;1;10;10"/>` +
        `<animate attributeName="opacity" dur="${LOOP_DUR}s" repeatCount="indefinite" ` +
        `keyTimes="0;${fmt(arrive)};${fmt(arrive + dur * 3)};1" values="0;1;1;0"/>` +
        `</circle>\n`;
    }
  }
  return { bullets, blasts };
}

function buildStars() {
  const pts = [
    [8, 20, 1.2], [8, 60, 1.6], [8, 100, 2.0],
    [505, 25, 1.2], [505, 70, 1.6], [505, 110, 2.0],
    [30, 164, 1.2], [483, 164, 1.6], [250, 164, 1.4],
    [15, 140, 1.8], [498, 140, 1.5],
  ];
  return pts.map(([x, y, dur]) =>
    `<circle cx="${x}" cy="${y}" r="1.1" fill="#7dd3fc"><animate attributeName="opacity" values="0.15;0.9;0.15" dur="${dur}s" repeatCount="indefinite"/></circle>`
  ).join("\n");
}

function buildJet() {
  return `<g id="jet">
  <!-- Supersonic Stealth Fighter / Cyber Jet -->
  <g transform="translate(0,0)">
    <!-- Stealth Delta Wing -->
    <polygon points="0,-18 10,7 5,4 -5,4 -10,7" fill="#0284c7" stroke="#38bdf8" stroke-width="1"/>
    <!-- Wing Extensions -->
    <polygon points="-10,7 -16,13 -5,8" fill="#0369a1"/>
    <polygon points="10,7 16,13 5,8" fill="#0369a1"/>
    <!-- Cockpit Canopy Glass -->
    <ellipse cx="0" cy="-6" rx="2.5" ry="5" fill="#a5f3fc"/>
    <!-- Dual Afterburner Plasma Thrusters -->
    <polygon points="-5,8 -2,8 -3.5,18" fill="#22d3ee">
      <animate attributeName="opacity" values="0.6;1;0.7;1" dur="0.15s" repeatCount="indefinite"/>
    </polygon>
    <polygon points="2,8 5,8 3.5,18" fill="#22d3ee">
      <animate attributeName="opacity" values="0.7;1;0.6;1" dur="0.15s" repeatCount="indefinite"/>
    </polygon>
    <!-- Core Engine Flame -->
    <polygon points="-2,8 2,8 0,16" fill="#38bdf8">
      <animate attributeName="opacity" values="0.8;0.4;1;0.8" dur="0.12s" repeatCount="indefinite"/>
    </polygon>
  </g>
  <animateTransform attributeName="transform" attributeType="XML" type="translate"
    dur="${LOOP_DUR}s" repeatCount="indefinite"
    keyTimes="0;0.5;1"
    values="${JET_X_START}.00,140.00;${JET_X_END}.00,140.00;${JET_X_START}.00,140.00"/>
</g>`;
}

function buildSvg(weeks) {
  const cells = buildCells(weeks);
  const targets = pickTargets(cells);
  const { bullets, blasts } = buildBulletsAndBlasts(targets);

  return `<svg viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
<rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="#0b1120" rx="10"/>
<rect x="1" y="1" width="${WIDTH - 2}" height="${HEIGHT - 2}" fill="none" stroke="#1e293b" stroke-width="1" rx="9"/>
${buildStars()}
<g id="grid">
${buildGrid(cells, targets)}</g>
<g id="bullets">
${bullets}</g>
<g id="blasts">
${blasts}</g>
${buildJet()}
</svg>`;
}

async function main() {
  console.log(`Generating Supersonic Jet Heatmap for ${USERNAME}...`);
  const weeks = await fetchWeeks();
  const svg = buildSvg(weeks);
  const outPath = path.resolve(OUTPUT);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, svg, "utf8");
  console.log(`Successfully generated ${outPath}`);
}

main().catch((err) => {
  console.error("Error generating jet heatmap:", err);
  process.exit(1);
});
