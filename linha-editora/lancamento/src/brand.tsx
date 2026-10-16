import React from "react";
import { Easing, interpolate, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/fonts";

/* ---------- Identidade (brandbook Linha Editora) ---------- */
export const NAVY = "#001F3F";
export const SILVER = "#A8A9AD";
export const WHITE = "#F8F8F8";
export const MUTED = "#8E98A8"; // prata sobre marinho

// Fontes do manual, guardadas em public/fonts (o vídeo não depende de internet)
export const JOST = "Jost";
export const SPECTRAL = "Spectral";
export const MONO = "IBM Plex Mono";
const FONTS: [string, string, string, "normal" | "italic"][] = [
  [JOST, "Jost-300.woff2", "300", "normal"],
  [JOST, "Jost-400.woff2", "400", "normal"],
  [JOST, "Jost-600.woff2", "600", "normal"],
  [JOST, "Jost-300-italic.woff2", "300", "italic"],
  [SPECTRAL, "Spectral-300.woff2", "300", "normal"],
  [SPECTRAL, "Spectral-400.woff2", "400", "normal"],
  [SPECTRAL, "Spectral-300-italic.woff2", "300", "italic"],
  [MONO, "IBMPlexMono-400.woff2", "400", "normal"],
];
FONTS.forEach(([family, file, weight, style]) =>
  loadFont({ family, url: staticFile(`fonts/${file}`), weight, style, display: "block" }),
);

/* ---------- Tempo ---------- */
export const EASE = Easing.bezier(0.16, 1, 0.3, 1);
export const IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const IN = Easing.bezier(0.55, 0, 1, 0.45);

/** 0→1 entre `start` e `start + dur` (em frames). */
export const prog = (frame: number, start: number, dur: number, easing = EASE) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Formato atual: vertical (9:16) ou feed (4:5). */
export const useFormat = () => {
  const { width, height } = useVideoConfig();
  return { width, height, tall: height / width > 1.5 };
};

/* ---------- Texto que sobe por trás de uma máscara ---------- */
export const Reveal: React.FC<{ delay: number; dur?: number; children: React.ReactNode; out?: number }> = ({
  delay,
  dur = 24,
  children,
  out,
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, dur);
  const o = out === undefined ? 0 : prog(frame, out, 14, IN);
  return (
    <span style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top", paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
      <span style={{ display: "inline-block", translate: `0 ${(1 - p) * 110 - o * 110}%` }}>{children}</span>
    </span>
  );
};

/* ---------- Símbolo: lombadas que sobem e duas peças que se inclinam ---------- */
const BASE = 228;
const SPINES: [number, number, "w" | "g"][] = [
  [4, 8, "w"], [25, 23, "g"], [45, 5, "w"], [66, 50, "g"], [86, 5, "w"],
  [107, 96, "g"], [125, 96, "g"], [145, 5, "w"], [166, 31, "g"],
];
const LEANERS: [number, number, number, "w" | "g"][] = [
  [196, 219, 8.9, "w"],
  [214, 213, 15.8, "g"],
];

export const Symbol: React.FC<{ height: number; delay?: number; speed?: number }> = ({ height, delay = 0, speed = 1 }) => {
  const frame = useCurrentFrame();
  const f = (frame - delay) * speed;
  const color = (c: "w" | "g") => (c === "w" ? WHITE : MUTED);
  const outBack = Easing.bezier(0.34, 1.4, 0.64, 1);
  return (
    <svg viewBox="-4 -4 288 240" height={height} width={(height * 288) / 240} style={{ overflow: "visible", display: "block" }}>
      {SPINES.map(([x, top, c], i) => {
        const p = prog(f, i * 2.4, 20);
        return p > 0 ? (
          <line key={i} x1={x} x2={x} y1={BASE} y2={BASE - (BASE - top) * p} stroke={color(c)} strokeWidth={8} strokeLinecap="round" />
        ) : null;
      })}
      {LEANERS.map(([x, len, ang, c], i) => {
        const grow = prog(f, 22 + i * 3, 20);
        const lean = prog(f, 36 + i * 5, 22, outBack);
        const a = (ang * lean * Math.PI) / 180;
        return grow > 0 ? (
          <line key={i} x1={x} y1={BASE} x2={x + Math.sin(a) * len * grow} y2={BASE - Math.cos(a) * len * grow}
            stroke={color(c)} strokeWidth={8} strokeLinecap="round" />
        ) : null;
      })}
    </svg>
  );
};

/** Duração do desenho do símbolo, em frames (com speed = 1). */
export const SYMBOL_FRAMES = 60;

/* ---------- Assinatura horizontal ---------- */
export const Lockup: React.FC<{ size: number; delay?: number }> = ({ size, delay = 0 }) => {
  const frame = useCurrentFrame();
  const t = prog(frame, delay + 26, 26);
  const e = prog(frame, delay + 34, 30);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: size * 0.62 }}>
      <Symbol height={size * 0.82} delay={delay} speed={1.4} />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", color: WHITE, fontFamily: JOST, fontWeight: 300 }}>
        <div style={{ fontSize: size, lineHeight: 0.74, letterSpacing: -1, opacity: t, translate: `0 ${(1 - t) * 14}px` }}>Linha</div>
        <div style={{ fontSize: size * 0.32, lineHeight: 1, marginTop: size * 0.03, opacity: e, letterSpacing: `${0.06 + (1 - e) * 0.3}em` }}>
          editora
        </div>
      </div>
    </div>
  );
};

/* ---------- Grafismo de apoio: linhas verticais como ritmo ---------- */
export const LineField: React.FC<{
  top: number;
  height: number;
  delay?: number;
  exit?: number;
  gap?: number;
  seed?: string;
  opacity?: number;
}> = ({ top, height, delay = 0, exit, gap = 22, seed = "f", opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const n = Math.floor((width - 2 * 40) / gap);
  const left = (width - (n - 1) * gap) / 2;
  const levels = [1, 1, 0.93, 0.86, 0.78, 0.6];
  return (
    <svg width={width} height={height + 20} style={{ position: "absolute", left: 0, top: top - 10, overflow: "visible", opacity }}>
      {Array.from({ length: n }).map((_, i) => {
        const r = random(seed + i);
        const h = levels[Math.floor(r * levels.length)] * height;
        const g = prog(frame, delay + i * 0.9, 22);
        const fromEdge = Math.abs(i - (n - 1) / 2) / ((n - 1) / 2);
        const x = exit === undefined ? 0 : prog(frame, exit + (1 - fromEdge) * 10, 16, IN);
        const vis = g * (1 - x);
        if (vis <= 0) return null;
        const y2 = height + 10 - h * vis;
        return (
          <line key={i} x1={left + i * gap} x2={left + i * gap} y1={height + 10} y2={y2}
            stroke={random(seed + "c" + i) < 0.4 ? WHITE : MUTED} strokeOpacity={0.85} strokeWidth={3} strokeLinecap="round" />
        );
      })}
    </svg>
  );
};

/* ---------- Fio horizontal que se desenha ---------- */
export const Rule: React.FC<{ delay: number; width: number | string; color?: string; thickness?: number; dur?: number; align?: "left" | "center" }> = ({
  delay,
  width,
  color = "rgba(168,169,173,.35)",
  thickness = 2,
  dur = 30,
  align = "left",
}) => {
  const frame = useCurrentFrame();
  const p = prog(frame, delay, dur, IN_OUT);
  return (
    <div style={{ width, height: thickness, display: "flex", justifyContent: align === "center" ? "center" : "flex-start" }}>
      <div style={{ width: `${p * 100}%`, height: "100%", background: color }} />
    </div>
  );
};

/* ---------- Rótulo mono, como os cabeçalhos do manual ---------- */
export const Mono: React.FC<{ children: React.ReactNode; size?: number; color?: string; spacing?: number; style?: React.CSSProperties }> = ({
  children,
  size = 26,
  color = MUTED,
  spacing = 6,
  style,
}) => (
  <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: spacing, textTransform: "uppercase", color, whiteSpace: "nowrap", ...style }}>
    {children}
  </div>
);
