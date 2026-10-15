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

export function generateFrequenciesSvg() {
  const barsCount = 28;
  const barWidth = 6;
  const gap = 6;
  const startX = 300;
  
  let barsSvg = "";
  for (let i = 0; i < barsCount; i++) {
    const x = startX + i * (barWidth + gap);
    const dur = (0.7 + (i % 5) * 0.22).toFixed(2);
    const delay = ((i * 0.08) % 0.8).toFixed(2);
    const minH = 4 + (i % 3) * 3;
    const maxH = 26 + (i % 4) * 5;
    
    barsSvg += `
    <rect x="${x}" y="12" width="${barWidth}" height="${minH}" rx="2" fill="#ff1744" opacity="0.85">
      <animate attributeName="height" values="${minH};${maxH};${minH}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
      <animate attributeName="y" values="${32 - minH};${32 - maxH};${32 - minH}" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.45;1;0.45" dur="${dur}s" begin="-${delay}s" repeatCount="indefinite" />
    </rect>`;
  }

  return `<svg width="100%" height="48" viewBox="0 0 700 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="freqBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0e080a" />
      <stop offset="100%" stop-color="#14090c" />
    </linearGradient>
  </defs>
  <rect x="0.5" y="0.5" width="699" height="47" rx="8" fill="url(#freqBg)" stroke="#ef4444" stroke-opacity="0.4" />
  
  <!-- Left Telemetry Label -->
  <g transform="translate(20, 28)" font-family="monospace" font-size="11" font-weight="600" letter-spacing="1">
    <circle cx="0" cy="-4" r="3" fill="#ff1744" />
    <text x="12" y="0" fill="#f4f4f5">AUDIO_CORE: <tspan fill="#ff1744">SYNTHESIZING</tspan> [88.4 BPM]</text>
  </g>

  <!-- Animated Waveform Bars -->
  ${barsSvg}

  <!-- Right Status -->
  <g transform="translate(640, 28)" text-anchor="end" font-family="monospace" font-size="10" font-weight="700">
    <text x="0" y="0" fill="#10b981">LIVE ♫</text>
  </g>
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
