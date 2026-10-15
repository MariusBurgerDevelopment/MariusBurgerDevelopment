export function generateDividerSvg() {
  return `<svg width="100%" height="16" viewBox="0 0 1000 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff1744" stop-opacity="0" />
      <stop offset="35%" stop-color="#ff1744" stop-opacity="0.3" />
      <stop offset="50%" stop-color="#ff1744" stop-opacity="1" />
      <stop offset="65%" stop-color="#ff1744" stop-opacity="0.3" />
      <stop offset="100%" stop-color="#ff1744" stop-opacity="0" />
    </linearGradient>
  </defs>
  <line x1="50" y1="8" x2="950" y2="8" stroke="url(#divGrad)" stroke-width="1.5" />
  <polygon points="500,3 505,8 500,13 495,8" fill="#ff1744" />
  <circle cx="500" cy="8" r="1.5" fill="#ffffff" />
</svg>`;
}

export function generateSpotlightSvg() {
  return `<svg width="100%" height="210" viewBox="0 0 850 210" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="spotBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e080a" />
      <stop offset="50%" stop-color="#14080b" />
      <stop offset="100%" stop-color="#1c0a0e" />
    </linearGradient>
    <filter id="spotGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ff1744" flood-opacity="0.25" />
    </filter>
  </defs>

  <!-- Main Card -->
  <rect x="0.5" y="0.5" width="849" height="209" rx="14" fill="url(#spotBg)" stroke="#ef4444" stroke-opacity="0.75" filter="url(#spotGlow)" />

  <!-- Corner Tech Brackets -->
  <path d="M 2 20 L 2 2 L 20 2 M 848 20 L 848 2 L 830 2 M 2 190 L 2 208 L 20 208 M 848 190 L 848 208 L 830 208" stroke="#ff1744" stroke-width="2" />

  <!-- Status Pill -->
  <g transform="translate(35, 36)">
    <rect x="0" y="0" width="180" height="22" rx="4" fill="#200d11" stroke="#ff1744" stroke-width="1" />
    <circle cx="12" cy="11" r="3.5" fill="#10b981" />
    <text x="24" y="15" fill="#ffffff" font-family="monospace" font-size="10" font-weight="700" letter-spacing="1">ONLINE // PRODUCTION</text>
  </g>

  <!-- Project Title & Subtitle -->
  <g transform="translate(35, 90)">
    <text x="0" y="0" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" letter-spacing="0.5">3D Interactive Portfolio</text>
    <text x="0" y="24" fill="#a1a1aa" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500">Immersive spatial web application with Three.js, procedural GLSL shaders &amp; dynamic motion.</text>
  </g>

  <!-- Tech Badges -->
  <g transform="translate(35, 160)" font-family="monospace" font-size="11" font-weight="600">
    <!-- Pill 1 -->
    <rect x="0" y="0" width="80" height="24" rx="4" fill="#181416" stroke="#331c22" stroke-width="1" />
    <text x="40" y="16" text-anchor="middle" fill="#f4f4f5">Three.js</text>

    <!-- Pill 2 -->
    <rect x="90" y="0" width="85" height="24" rx="4" fill="#181416" stroke="#331c22" stroke-width="1" />
    <text x="132" y="16" text-anchor="middle" fill="#f4f4f5">React 19</text>

    <!-- Pill 3 -->
    <rect x="185" y="0" width="105" height="24" rx="4" fill="#181416" stroke="#331c22" stroke-width="1" />
    <text x="237" y="16" text-anchor="middle" fill="#f4f4f5">WebGL/GLSL</text>

    <!-- Pill 4 -->
    <rect x="300" y="0" width="105" height="24" rx="4" fill="#181416" stroke="#331c22" stroke-width="1" />
    <text x="352" y="16" text-anchor="middle" fill="#f4f4f5">Tailwind CSS</text>

    <!-- Pill 5 -->
    <rect x="415" y="0" width="115" height="24" rx="4" fill="#181416" stroke="#331c22" stroke-width="1" />
    <text x="472" y="16" text-anchor="middle" fill="#f4f4f5">Framer Motion</text>
  </g>

  <!-- Right Hologram Wireframe Cube & Launch Button -->
  <g transform="translate(680, 105)">
    <!-- Rotating/Static Wireframe Isometric Cube -->
    <path d="M 0 -45 L 45 -22 L 45 22 L 0 45 L -45 22 L -45 -22 Z" fill="#200d11" stroke="#ff1744" stroke-width="1.5" />
    <line x1="0" y1="-45" x2="0" y2="0" stroke="#ff1744" stroke-width="1.5" />
    <line x1="-45" y1="-22" x2="0" y2="0" stroke="#ff1744" stroke-width="1.5" />
    <line x1="45" y1="-22" x2="0" y2="0" stroke="#ff1744" stroke-width="1.5" />
    <line x1="0" y1="0" x2="0" y2="45" stroke="#ff1744" stroke-width="1.5" />
    <circle cx="0" cy="0" r="4" fill="#ffffff" />
  </g>

  <!-- Action CTA Link Box -->
  <g transform="translate(680, 168)" text-anchor="middle">
    <rect x="-85" y="-14" width="170" height="30" rx="6" fill="#ff1744" />
    <text x="0" y="6" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" letter-spacing="1">LAUNCH LIVE ↗</text>
  </g>
</svg>`;
}

export function generatePowerMatrixSvg() {
  const bars = [
    { label: "SPATIAL & 3D COMPUTING", tech: "Three.js · WebGL · GLSL · R3F", pct: 96, val: "96%", w: 412, dur: "3.2s" },
    { label: "FULL-STACK ARCHITECTURE", tech: "Next.js · Node.js · TypeScript · Supabase", pct: 94, val: "94%", w: 404, dur: "2.8s" },
    { label: "AUTONOMOUS AGENTS & BOTS", tech: "Python · Automation · Multi-Agent Systems", pct: 92, val: "92%", w: 395, dur: "3.6s" },
    { label: "GRAPHICS PIPELINE & ASSETS", tech: "Blender · Procedural Shaders · Realtime Assets", pct: 88, val: "88%", w: 378, dur: "3.0s" },
  ];

  let barsSvg = "";
  const startY = 72;
  const rowH = 40;
  const maxW = 430;

  bars.forEach((b, idx) => {
    const y = startY + idx * rowH;
    const runnerMaxX = Math.max(0, b.w - 30);
    barsSvg += `
    <!-- Bar ${idx + 1}: ${b.label} -->
    <g transform="translate(35, ${y})">
      <!-- Title & Tech -->
      <text x="0" y="0" fill="#f4f4f5" font-family="monospace" font-size="11" font-weight="700" letter-spacing="0.5">${b.label.replace(/&/g, "&amp;")}</text>
      <text x="210" y="0" fill="#71717a" font-family="monospace" font-size="10" font-weight="500">[${b.tech.replace(/&/g, "&amp;")}]</text>
      <text x="${maxW + 18}" y="13" fill="#ff1744" font-family="monospace" font-size="12" font-weight="800" text-anchor="start">${b.val}</text>
      
      <!-- Track -->
      <rect x="0" y="6" width="${maxW}" height="8" rx="4" fill="#181416" stroke="#331c22" stroke-width="1" />
      
      <!-- Fill -->
      <rect x="0" y="6" width="${b.w}" height="8" rx="4" fill="url(#barGrad)" />
      
      <!-- Laser Runner -->
      <g>
        <rect x="0" y="6" width="28" height="8" rx="4" fill="#ffffff" opacity="0.85">
          <animate attributeName="x" values="0;${runnerMaxX};0" dur="${b.dur}" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="${b.dur}" repeatCount="indefinite" />
        </rect>
      </g>
    </g>`;
  });

  return `<svg width="100%" height="240" viewBox="0 0 850 240" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="matrixBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0e080a" />
      <stop offset="50%" stop-color="#14080b" />
      <stop offset="100%" stop-color="#1c0a0e" />
    </linearGradient>
    <linearGradient id="barGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#871523" />
      <stop offset="60%" stop-color="#ff1744" />
      <stop offset="100%" stop-color="#ff4d6d" />
    </linearGradient>
    <filter id="matrixGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#ff1744" flood-opacity="0.25" />
    </filter>
    <radialGradient id="radarSweep" cx="0%" cy="0%" r="100%">
      <stop offset="0%" stop-color="#ff1744" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#ff1744" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Main Card Container -->
  <rect x="0.5" y="0.5" width="849" height="239" rx="14" fill="url(#matrixBg)" stroke="#ef4444" stroke-opacity="0.75" filter="url(#matrixGlow)" />

  <!-- Corner Tech Brackets -->
  <path d="M 2 20 L 2 2 L 20 2 M 848 20 L 848 2 L 830 2 M 2 220 L 2 238 L 20 238 M 848 220 L 848 238 L 830 238" stroke="#ff1744" stroke-width="2" />

  <!-- Status Pill Header -->
  <g transform="translate(35, 26)">
    <rect x="0" y="0" width="195" height="22" rx="4" fill="#200d11" stroke="#ff1744" stroke-width="1" />
    <circle cx="12" cy="11" r="3.5" fill="#ff1744">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
    </circle>
    <text x="24" y="15" fill="#ffffff" font-family="monospace" font-size="10" font-weight="700" letter-spacing="1">TELEMETRY // DISCIPLINES</text>
  </g>
  <text x="245" y="41" fill="#71717a" font-family="monospace" font-size="11" font-weight="600" letter-spacing="0.5">CORE CAPABILITY MATRIX v4.2</text>

  <!-- Progress Bars -->
  ${barsSvg}

  <!-- Right Section: Cybernetic Radar & Reticle -->
  <g transform="translate(710, 110)">
    <!-- Outer dashed reticle ring -->
    <circle cx="0" cy="0" r="66" stroke="#ff1744" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="6 4" />
    
    <!-- Middle ring -->
    <circle cx="0" cy="0" r="46" stroke="#ff1744" stroke-opacity="0.4" stroke-width="1" />
    
    <!-- Inner ring -->
    <circle cx="0" cy="0" r="24" stroke="#ff1744" stroke-opacity="0.6" stroke-width="1" />
    
    <!-- Reticle Crosshairs -->
    <line x1="-74" y1="0" x2="74" y2="0" stroke="#ff1744" stroke-opacity="0.35" stroke-width="1" />
    <line x1="0" y1="-74" x2="0" y2="74" stroke="#ff1744" stroke-opacity="0.35" stroke-width="1" />
    
    <!-- Center Core -->
    <circle cx="0" cy="0" r="3.5" fill="#ffffff" />
    
    <!-- Rotating Radar Sweep Beam -->
    <g>
      <path d="M 0 0 L 0 -66 A 66 66 0 0 1 52 -40 Z" fill="url(#radarSweep)" opacity="0.6" />
      <line x1="0" y1="0" x2="0" y2="-66" stroke="#ff1744" stroke-width="1.5" />
      <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite" />
    </g>

    <!-- Radar Target Blips -->
    <circle cx="28" cy="-24" r="3.5" fill="#ff1744">
      <animate attributeName="opacity" values="0.1;1;0.1" dur="2s" begin="-0.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="-32" cy="18" r="3" fill="#ff4d6d">
      <animate attributeName="opacity" values="0.1;1;0.1" dur="2s" begin="-1.2s" repeatCount="indefinite" />
    </circle>
  </g>

  <!-- Avionics Telemetry Coordinates -->
  <g transform="translate(710, 202)" text-anchor="middle" font-family="monospace" font-size="9" font-weight="700" letter-spacing="1">
    <text x="0" y="0" fill="#a1a1aa">LOC: <tspan fill="#ff1744">33.92°S 18.42°E</tspan></text>
    <text x="0" y="14" fill="#71717a">RADAR: <tspan fill="#10b981">SWEEP ACTIVE</tspan> [ZA]</text>
  </g>
</svg>`;
}
