// shortcut: sketch of the mascot from the design canvas, replace with the illustrator's final art when it arrives.
const c = {
  navy: "#1A2740", navyLight: "#2A3B63", deep: "#0E1626", gold: "#C8A24C", goldDark: "#9C7C2C",
  cream: "#ECE5D5", white: "#FBF8F1", wood: "#8B5E34", woodDark: "#5E3D20", blush: "#D9A47A", toolbox: "#C8452E",
};

const variants = {
  keystone: { tilt: 0, label: "Aedis beaver holding a gold keystone" },
  dotnet: { tilt: -3, label: "Aedis beaver stacking hexagonal blocks" },
  ui: { tilt: 2, label: "Aedis beaver painting with a roller" },
  platform: { tilt: -2, label: "Aedis beaver carrying a toolbox and waving" },
};

export type BeaverVariant = keyof typeof variants;

/** The Aedis beaver, in the pose of one product. */
export function Beaver({ variant = "keystone", size = 340 }: { variant?: BeaverVariant; size?: number }) {
  const { tilt, label } = variants[variant];
  return (
    <svg width={size} height={Math.round((size * 280) / 240)} viewBox="0 0 240 280" role="img" aria-label={label}>
      <g transform={`rotate(${tilt} 120 200)`} stroke={c.deep} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <polygon points="150,236 204,180 226,174 238,194 186,252 158,254" fill={c.wood} />
        <g stroke={c.woodDark} strokeWidth="2">
          <line x1="166" y1="238" x2="212" y2="190" />
          <line x1="178" y1="246" x2="226" y2="194" />
          <line x1="192" y1="204" x2="206" y2="222" />
          <line x1="206" y1="192" x2="220" y2="206" />
          <line x1="178" y1="220" x2="192" y2="236" />
        </g>
        <polygon points="70,150 120,128 170,150 184,214 162,254 78,254 56,214" fill={c.navy} />
        <polygon points="70,150 56,214 96,196" fill={c.navyLight} stroke="none" />
        <polygon points="94,176 146,176 158,224 140,248 100,248 82,224" fill={c.cream} />
        <polygon points="76,250 106,250 104,264 70,264" fill={c.cream} />
        <polygon points="134,250 164,250 170,264 136,264" fill={c.cream} />
        <polygon points="72,84 76,54 102,62" fill={c.navy} />
        <polygon points="168,84 164,54 138,62" fill={c.navy} />
        <polygon points="80,72 82,61 93,65" fill={c.cream} stroke="none" />
        <polygon points="160,72 158,61 147,65" fill={c.cream} stroke="none" />
        <polygon points="78,72 120,52 162,72 174,112 150,142 90,142 66,112" fill={c.navy} />
        <polygon points="120,52 162,72 142,98" fill={c.navyLight} stroke="none" />
        <polygon points="96,104 120,94 144,104 148,124 120,138 92,124" fill={c.cream} />
        <polygon points="111,102 129,102 125,111 115,111" fill={c.deep} />
        <polyline points="111,113 115.5,117.5 120,114 124.5,117.5 129,113" fill="none" strokeWidth="2.5" />
        <rect x="113" y="117" width="6.5" height="10" fill={c.white} strokeWidth="2" />
        <rect x="120.5" y="117" width="6.5" height="10" fill={c.white} strokeWidth="2" />
        <polygon points="98,112 104,115 98,118 92,115" fill={c.blush} stroke="none" />
        <polygon points="142,112 148,115 142,118 136,115" fill={c.blush} stroke="none" />
        <polygon points="92,81 100,81 105,86 105,94 100,99 92,99 87,94 87,86" fill={c.cream} stroke="none" />
        <polygon points="95,84 103,84 103,96 95,96" fill={c.deep} stroke="none" />
        <rect x="99" y="85.5" width="3" height="3" fill={c.white} stroke="none" />
        <polygon points="140,81 148,81 153,86 153,94 148,99 140,99 135,94 135,86" fill={c.cream} stroke="none" />
        <polygon points="137,84 145,84 145,96 137,96" fill={c.deep} stroke="none" />
        <rect x="141" y="85.5" width="3" height="3" fill={c.white} stroke="none" />
        <polyline points="85,77 95,72 105,74" fill="none" stroke={c.gold} strokeWidth="3" />
        <polyline points="155,77 145,72 135,74" fill="none" stroke={c.gold} strokeWidth="3" />

        {variant === "keystone" ? (
          <g>
            <polygon points="74,166 100,170 102,194 80,198" fill={c.navy} />
            <polygon points="166,166 140,170 138,194 160,198" fill={c.navy} />
            <polygon points="96,156 144,156 136,206 104,206" fill={c.gold} />
            <polygon points="144,156 136,206 129,156" fill={c.goldDark} stroke="none" />
            <circle cx="120" cy="175" r="6" fill={c.deep} stroke="none" />
            <rect x="117.5" y="177" width="5" height="15" rx="1.5" fill={c.deep} stroke="none" />
            <polygon points="96,170 106,172 106,190 96,190" fill={c.cream} strokeWidth="2" />
            <polygon points="144,170 134,172 134,190 144,190" fill={c.cream} strokeWidth="2" />
          </g>
        ) : null}

        {variant === "dotnet" ? (
          <g>
            <polygon points="13,247 19.5,236 32.5,236 39,247 32.5,258 19.5,258" fill={c.navyLight} />
            <polygon points="39,247 45.5,236 58.5,236 65,247 58.5,258 45.5,258" fill={c.cream} />
            <polygon points="26,225 32.5,214 45.5,214 52,225 45.5,236 32.5,236" fill={c.gold} />
            <polygon points="166,164 186,184 172,204 160,196 170,184" fill={c.navy} />
            <polygon points="74,160 84,170 58,196 46,188" fill={c.navy} />
            <polygon points="26,190 32.5,179 45.5,179 52,190 45.5,201 32.5,201" fill={c.gold} />
            <line x1="32" y1="207" x2="46" y2="207" stroke={c.goldDark} strokeWidth="2" />
            <polygon points="44,180 56,184 54,196 42,194" fill={c.cream} strokeWidth="2" />
          </g>
        ) : null}

        {variant === "ui" ? (
          <g>
            <polygon points="74,166 60,184 70,202 82,196 72,186" fill={c.navy} />
            <rect x="176" y="24" width="54" height="20" rx="5" fill={c.gold} />
            <line x1="186" y1="30" x2="220" y2="30" stroke={c.goldDark} strokeWidth="2" />
            <polygon points="212,44 216,52 212,56 208,52" fill={c.gold} strokeWidth="2" />
            <polyline points="203,44 203,58 190,78" fill="none" strokeWidth="3.5" />
            <line x1="190" y1="78" x2="184" y2="130" strokeWidth="7" />
            <polygon points="160,162 170,150 182,122 194,128 180,168" fill={c.navy} />
            <polygon points="178,118 192,120 192,134 178,132" fill={c.cream} strokeWidth="2" />
          </g>
        ) : null}

        {variant === "platform" ? (
          <g>
            <polygon points="74,160 84,168 52,198 40,192" fill={c.navy} />
            <polyline points="28,208 28,196 58,196 58,208" fill="none" strokeWidth="5" />
            <rect x="60" y="192" width="6" height="16" fill={c.gold} strokeWidth="2" />
            <rect x="12" y="206" width="62" height="40" rx="3" fill={c.toolbox} />
            <line x1="12" y1="218" x2="74" y2="218" strokeWidth="2" />
            <rect x="39" y="214" width="8" height="8" rx="1" fill={c.gold} strokeWidth="2" />
            <polygon points="38,186 50,190 48,202 36,200" fill={c.cream} strokeWidth="2" />
            <polygon points="166,160 176,150 190,118 200,124 182,166" fill={c.navy} />
            <polygon points="186,104 198,106 202,118 190,122 184,112" fill={c.cream} strokeWidth="2" />
          </g>
        ) : null}
      </g>
    </svg>
  );
}
