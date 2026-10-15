import os
from pathlib import Path
from html import escape
import xml.etree.ElementTree as ET

# Read generated logo ASCII lines
with open("logo_ascii.txt", "r", encoding="utf-8") as f:
    portrait_lines = [l.rstrip("\r\n") for l in f.readlines()]

while len(portrait_lines) < 53:
    portrait_lines.append(" " * 91)
portrait_lines = portrait_lines[:53]

# Generate tspans for left panel
start_y = 79.98
y_step = 7.5479
tspans = []
for i, line in enumerate(portrait_lines):
    y = start_y + i * y_step
    line_esc = escape(line)
    tspans.append(f'<tspan x="30" y="{y:.2f}" xml:space="preserve">{line_esc}</tspan>')

portrait_tspans = "\n    ".join(tspans)

# Helper function to generate clean right-column lines without overflow
def make_line(y, key, val, max_key_len=14):
    dots_count = max(2, max_key_len - len(key))
    dots = "." * dots_count
    if "." in key:
        k1, k2 = key.split(".", 1)
        key_markup = f'<tspan class="key">{escape(k1)}</tspan><tspan class="cc">.</tspan><tspan class="key">{escape(k2)}</tspan>'
    else:
        key_markup = f'<tspan class="key">{escape(key)}</tspan>'
    return f'<tspan x="520" y="{y}" class="cc">. </tspan>{key_markup}<tspan class="cc">: {dots} </tspan><tspan class="value">{escape(val)}</tspan>'

y_coords = [
    42, 66, 88, 110, 132, 154, 176, 198,
    220, 242, 264, 286, 308, 330,
    352, 374, 396, 418, 440, 462,
    484, 506
]

right_lines = [
    # 0: header
    f'<tspan x="520" y="42" class="head">marius@devos</tspan><tspan class="cc"> -———————————————————————————————————-—-</tspan>',
    # 1-6: info
    make_line(66, "Subject", "Marius Burger"),
    make_line(88, "Role", "Creative Technologist · Full-Stack Eng"),
    make_line(110, "Focus", "3D Web Experiences · UI/UX · Systems"),
    make_line(132, "Status", "Architecting • Innovating • Shipping"),
    make_line(154, "ToolChain", "VS Code, Blender, Three.js, Docker, Git"),
    make_line(176, "Origin", "Earth / Cyberspace"),
    # 7: blank
    f'<tspan x="520" y="198" class="cc">. </tspan>',
    # 8-13: core stack
    make_line(220, "Core.Lang", "TypeScript, JavaScript, Python, C++, GLSL"),
    make_line(242, "Core.Frontend", "React, Next.js, Three.js, Tailwind CSS"),
    make_line(264, "Core.Backend", "Node.js, Express.js, REST APIs, GraphQL"),
    make_line(286, "Core.Database", "PostgreSQL, MongoDB, Supabase, Redis"),
    make_line(308, "Core.3D/Motion", "Blender 3D, WebGL Shaders, Motion Design"),
    make_line(330, "Core.Infra", "Docker, Vercel, CI/CD, Microservices"),
    # 14: subheader
    f'<tspan x="520" y="352" class="accent">- Neural Uplink</tspan><tspan class="cc"> -————————————————————————————————————-—-</tspan>',
    # 15-18: uplink
    make_line(374, "Grid.Mail", "info.mariusburger@gmail.com"),
    make_line(396, "Grid.Github", "MariusBurgerDevelopment"),
    make_line(418, "Grid.Portfolio", "marius-port.vercel.app"),
    make_line(440, "Grid.Status", "Available for Visionary Builds"),
    # 19: blank
    f'<tspan x="520" y="462" class="cc">. </tspan>',
    # 20: telemetry header
    f'<tspan x="520" y="484" class="accent">- Live Telemetry</tspan><tspan class="cc"> -————————————————————————————————————-—-</tspan>',
    # 21: telemetry info
    f'<tspan x="520" y="506" class="cc">. </tspan><tspan class="value">Radar locked on supersonic jet heatmap &amp; stats below ↓</tspan>',
]

right_col_dark = []
right_col_light = []
for i, line_content in enumerate(right_lines):
    right_col_dark.append(f'<g clip-path="url(#lc{i})"><text x="520" y="0" fill="#f4f4f5">{line_content}</text></g>')
    right_col_light.append(f'<g clip-path="url(#lc{i})"><text x="520" y="0" fill="#18181b">{line_content}</text></g>')

right_xml_dark = "\n  ".join(right_col_dark)
right_xml_light = "\n  ".join(right_col_light)

# Define Dark SVG in Crimson Red & Obsidian Logo Palette
dark_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="610" viewBox="0 0 1180 610">
<defs>
  <linearGradient id="asciiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#FF1E44">
      <animate attributeName="stop-color" values="#FF1E44;#DC2626;#FF4757;#B91C1C;#FF1E44" dur="7s" repeatCount="indefinite"/>
    </stop>
    <stop offset="100%" stop-color="#DC2626">
      <animate attributeName="stop-color" values="#DC2626;#B91C1C;#FF1E44;#FF4757;#DC2626" dur="7s" repeatCount="indefinite"/>
    </stop>
  </linearGradient>
  <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#FF1E44"/>
    <stop offset="50%" stop-color="#DC2626"/>
    <stop offset="100%" stop-color="#991B1B"/>
  </linearGradient>
  <radialGradient id="bgGlow" cx="30%" cy="20%" r="80%">
    <stop offset="0%" stop-color="#0E080A"/>
    <stop offset="100%" stop-color="#050304"/>
  </radialGradient>
  <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#FF1E44" stop-opacity="0"/>
    <stop offset="45%" stop-color="#FF1E44" stop-opacity="0.08"/>
    <stop offset="50%" stop-color="#FFA4B6" stop-opacity="0.8"/>
    <stop offset="55%" stop-color="#FF1E44" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="#DC2626" stop-opacity="0"/>
  </linearGradient>
  <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" fill="#FF1E44" opacity="0.035"/>
  </pattern>
  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
  <mask id="revealMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1180" height="620">
    <rect x="0" y="0" width="1180" height="0" fill="#fff">
      <animate attributeName="height" from="0" to="560" dur="2.4s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>
    </rect>
  </mask>
  <clipPath id="lc0"><rect x="500" y="26.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="0.70s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc1"><rect x="500" y="50.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="0.80s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc2"><rect x="500" y="72.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="0.90s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc3"><rect x="500" y="94.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.00s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc4"><rect x="500" y="116.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.10s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc5"><rect x="500" y="138.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.20s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc6"><rect x="500" y="160.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.30s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc7"><rect x="500" y="182.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.40s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc8"><rect x="500" y="204.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.50s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc9"><rect x="500" y="226.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.60s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc10"><rect x="500" y="248.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.70s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc11"><rect x="500" y="270.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.80s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc12"><rect x="500" y="292.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.90s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc13"><rect x="500" y="314.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.00s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc14"><rect x="500" y="336.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.10s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc15"><rect x="500" y="358.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.20s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc16"><rect x="500" y="380.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.30s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc17"><rect x="500" y="402.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.40s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc18"><rect x="500" y="424.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.50s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc19"><rect x="500" y="446.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.60s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc20"><rect x="500" y="468.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.70s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc21"><rect x="500" y="490.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.80s" fill="freeze"/></rect></clipPath>
  <style>
    .ascii  {{ font-family: 'Courier New', Consolas, monospace; font-size: 7.4px; fill: url(#asciiGrad); letter-spacing: -0.2px; }}
    .key    {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #FF3355; font-weight: bold; }}
    .value  {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #F4F4F5; }}
    .cc     {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #52525B; }}
    .head   {{ font-family: 'Courier New', Consolas, monospace; font-size: 16px; fill: #FF1E44; font-weight: bold; }}
    .accent {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #EF4444; font-weight: bold; }}
    text, tspan {{ white-space: pre; }}
    .term-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 12px; fill: #71717A; letter-spacing: 0.5px; }}
    .scan-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 10px; fill: #EF4444; letter-spacing: 1.5px; font-weight: bold; }}
    .panel-title {{ font-family: 'Courier New', Consolas, monospace; font-size: 11px; fill: #FF3355; letter-spacing: 2px; opacity: 0.85; font-weight: bold; }}
    .cursor-blink {{ fill: #FF1E44; }}
  </style>
</defs>

<rect width="1180" height="610" rx="18" fill="url(#bgGlow)"/>
<rect width="1180" height="610" rx="18" fill="url(#scanlines)"/>

<g id="titlebar">
  <rect x="3" y="3" width="1174" height="34" rx="16" fill="#120A0D" fill-opacity="0.9"/>
  <circle cx="24" cy="20" r="5" fill="#EF4444"><animate attributeName="opacity" values="1;0.55;1" dur="4s" repeatCount="indefinite"/></circle>
  <circle cx="42" cy="20" r="5" fill="#F59E0B"><animate attributeName="opacity" values="1;0.55;1" dur="4s" begin="0.3s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="20" r="5" fill="#10B981"><animate attributeName="opacity" values="1;0.55;1" dur="4s" begin="0.6s" repeatCount="indefinite"/></circle>
  <text x="590" y="25" text-anchor="middle" class="term-label">marius@devos ~ % ./profile.sh --live</text>
  <circle cx="1112" cy="20" r="4" fill="#EF4444">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/>
  </circle>
  <text x="1122" y="24" class="scan-label">ONLINE</text>
</g>

<g transform="translate(0,38)">
  <rect x="14" y="26" width="488" height="468" rx="14" fill="#0E080A" fill-opacity="0.5" stroke="url(#borderGrad)" stroke-width="1.2" opacity="0.6"/>
  <rect x="508" y="10" width="655" height="500" rx="14" fill="#0E080A" fill-opacity="0.5" stroke="url(#borderGrad)" stroke-width="1.2" opacity="0.6"/>
  <text x="30" y="24" class="panel-title">VISUAL.MAP // EMBLEM DECK</text>
  <text x="524" y="24" class="panel-title">SYSTEM.INFO // NEURAL DECK</text>

  <g mask="url(#revealMask)">
    <text x="30" y="0" class="ascii">
    {portrait_tspans}
    </text>
  </g>

  {right_xml_dark}

  <rect x="522" y="491.0" width="8" height="15" class="cursor-blink" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;1;0;1;0" keyTimes="0;0.01;0.02;0.3;0.5;0.7;0.85;1" dur="1.4s" begin="3.2s" repeatCount="indefinite"/>
  </rect>
</g>

<rect x="0" y="-70" width="1180" height="70" fill="url(#scanGrad)" opacity="0.7" style="mix-blend-mode:screen">
  <animateTransform attributeName="transform" type="translate" from="0 -70" to="0 680" dur="3.8s" repeatCount="indefinite"/>
</rect>

<rect x="3" y="3" width="1174" height="604" rx="16" fill="none" stroke="url(#borderGrad)" stroke-width="2" opacity="0.85">
  <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
</rect>
</svg>
'''

# Define Light SVG
light_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1180" height="610" viewBox="0 0 1180 610">
<defs>
  <linearGradient id="asciiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#DC2626">
      <animate attributeName="stop-color" values="#DC2626;#B91C1C;#EF4444;#991B1B;#DC2626" dur="7s" repeatCount="indefinite"/>
    </stop>
    <stop offset="100%" stop-color="#991B1B">
      <animate attributeName="stop-color" values="#991B1B;#DC2626;#B91C1C;#EF4444;#991B1B" dur="7s" repeatCount="indefinite"/>
    </stop>
  </linearGradient>
  <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#EF4444"/>
    <stop offset="50%" stop-color="#DC2626"/>
    <stop offset="100%" stop-color="#991B1B"/>
  </linearGradient>
  <radialGradient id="bgGlow" cx="30%" cy="20%" r="80%">
    <stop offset="0%" stop-color="#FFFFFF"/>
    <stop offset="100%" stop-color="#F4F4F5"/>
  </radialGradient>
  <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#EF4444" stop-opacity="0"/>
    <stop offset="45%" stop-color="#EF4444" stop-opacity="0.06"/>
    <stop offset="50%" stop-color="#DC2626" stop-opacity="0.5"/>
    <stop offset="55%" stop-color="#EF4444" stop-opacity="0.06"/>
    <stop offset="100%" stop-color="#991B1B" stop-opacity="0"/>
  </linearGradient>
  <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
    <rect width="4" height="1" fill="#DC2626" opacity="0.03"/>
  </pattern>
  <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="4" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
  <mask id="revealMask" maskUnits="userSpaceOnUse" x="0" y="0" width="1180" height="620">
    <rect x="0" y="0" width="1180" height="0" fill="#fff">
      <animate attributeName="height" from="0" to="560" dur="2.4s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>
    </rect>
  </mask>
  <clipPath id="lc0"><rect x="500" y="26.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="0.70s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc1"><rect x="500" y="50.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="0.80s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc2"><rect x="500" y="72.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="0.90s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc3"><rect x="500" y="94.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.00s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc4"><rect x="500" y="116.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.10s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc5"><rect x="500" y="138.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.20s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc6"><rect x="500" y="160.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.30s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc7"><rect x="500" y="182.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.40s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc8"><rect x="500" y="204.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.50s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc9"><rect x="500" y="226.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.60s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc10"><rect x="500" y="248.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.70s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc11"><rect x="500" y="270.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.80s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc12"><rect x="500" y="292.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="1.90s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc13"><rect x="500" y="314.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.00s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc14"><rect x="500" y="336.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.10s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc15"><rect x="500" y="358.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.20s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc16"><rect x="500" y="380.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.30s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc17"><rect x="500" y="402.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.40s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc18"><rect x="500" y="424.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.50s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc19"><rect x="500" y="446.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.60s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc20"><rect x="500" y="468.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.70s" fill="freeze"/></rect></clipPath>
  <clipPath id="lc21"><rect x="500" y="490.00" width="0" height="24"><animate attributeName="width" from="0" to="690" dur="0.35s" begin="2.80s" fill="freeze"/></rect></clipPath>
  <style>
    .ascii  {{ font-family: 'Courier New', Consolas, monospace; font-size: 7.4px; fill: url(#asciiGrad); letter-spacing: -0.2px; }}
    .key    {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #DC2626; font-weight: bold; }}
    .value  {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #18181B; }}
    .cc     {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #A1A1AA; }}
    .head   {{ font-family: 'Courier New', Consolas, monospace; font-size: 16px; fill: #B91C1C; font-weight: bold; }}
    .accent {{ font-family: 'Courier New', Consolas, monospace; font-size: 13.5px; fill: #DC2626; font-weight: bold; }}
    text, tspan {{ white-space: pre; }}
    .term-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 12px; fill: #71717A; letter-spacing: 0.5px; }}
    .scan-label {{ font-family: 'Courier New', Consolas, monospace; font-size: 10px; fill: #DC2626; letter-spacing: 1.5px; font-weight: bold; }}
    .panel-title {{ font-family: 'Courier New', Consolas, monospace; font-size: 11px; fill: #DC2626; letter-spacing: 2px; opacity: 0.85; font-weight: bold; }}
    .cursor-blink {{ fill: #DC2626; }}
  </style>
</defs>

<rect width="1180" height="610" rx="18" fill="url(#bgGlow)"/>
<rect width="1180" height="610" rx="18" fill="url(#scanlines)"/>

<g id="titlebar">
  <rect x="3" y="3" width="1174" height="34" rx="16" fill="#FFFFFF" fill-opacity="0.95"/>
  <circle cx="24" cy="20" r="5" fill="#EF4444"><animate attributeName="opacity" values="1;0.55;1" dur="4s" repeatCount="indefinite"/></circle>
  <circle cx="42" cy="20" r="5" fill="#FBBF24"><animate attributeName="opacity" values="1;0.55;1" dur="4s" begin="0.3s" repeatCount="indefinite"/></circle>
  <circle cx="60" cy="20" r="5" fill="#10B981"><animate attributeName="opacity" values="1;0.55;1" dur="4s" begin="0.6s" repeatCount="indefinite"/></circle>
  <text x="590" y="25" text-anchor="middle" class="term-label">marius@devos ~ % ./profile.sh --live</text>
  <circle cx="1112" cy="20" r="4" fill="#DC2626">
    <animate attributeName="opacity" values="1;0.2;1" dur="1.2s" repeatCount="indefinite"/>
  </circle>
  <text x="1122" y="24" class="scan-label">ONLINE</text>
</g>

<g transform="translate(0,38)">
  <rect x="14" y="26" width="488" height="468" rx="14" fill="#FFFFFF" fill-opacity="0.6" stroke="url(#borderGrad)" stroke-width="1.2" opacity="0.6"/>
  <rect x="508" y="10" width="655" height="500" rx="14" fill="#FFFFFF" fill-opacity="0.6" stroke="url(#borderGrad)" stroke-width="1.2" opacity="0.6"/>
  <text x="30" y="24" class="panel-title">VISUAL.MAP // EMBLEM DECK</text>
  <text x="524" y="24" class="panel-title">SYSTEM.INFO // NEURAL DECK</text>

  <g mask="url(#revealMask)">
    <text x="30" y="0" class="ascii">
    {portrait_tspans}
    </text>
  </g>

  {right_xml_light}

  <rect x="522" y="491.0" width="8" height="15" class="cursor-blink" opacity="0">
    <animate attributeName="opacity" values="0;0;1;0;1;0;1;0" keyTimes="0;0.01;0.02;0.3;0.5;0.7;0.85;1" dur="1.4s" begin="3.2s" repeatCount="indefinite"/>
  </rect>
</g>

<rect x="0" y="-70" width="1180" height="70" fill="url(#scanGrad)" opacity="0.5" style="mix-blend-mode:multiply">
  <animateTransform attributeName="transform" type="translate" from="0 -70" to="0 680" dur="3.8s" repeatCount="indefinite"/>
</rect>

<rect x="3" y="3" width="1174" height="604" rx="16" fill="none" stroke="url(#borderGrad)" stroke-width="2" opacity="0.85">
  <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
</rect>
</svg>
'''

with open("dark.svg", "w", encoding="utf-8") as f:
    f.write(dark_svg.strip())

with open("light.svg", "w", encoding="utf-8") as f:
    f.write(light_svg.strip())

# Validate both SVGs with ElementTree
ET.parse("dark.svg")
ET.parse("light.svg")

print("SUCCESS: dark.svg and light.svg XML validation passed 100%!")
