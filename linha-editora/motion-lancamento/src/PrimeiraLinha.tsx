import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { LENTO } from "./ritmo";
import { mono, spectral } from "./fonts";
import { ESPESSURA, PECAS, SIMBOLO_W } from "./geometria";

// Uma linha nasce, vira o ritmo de linhas do grafismo e as linhas se organizam no símbolo da marca.
const BASE = 1180, CENTRO = 540, ESCALA = 2.7, N = 23, PASSO = 38;
const ease = Easing.bezier(0.16, 1, 0.3, 1), suave = Easing.bezier(0.65, 0, 0.35, 1);
const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const PrimeiraLinha: React.FC = () => {
  const frame = useCurrentFrame() / LENTO;
  const { fps } = useVideoConfig();
  const morph = interpolate(frame, [52, 88], [0, 1], { ...c, easing: suave });
  return (
    <AbsoluteFill name="Primeira linha" style={{ backgroundColor: "#001F3F" }}>
      {Array.from({ length: N }).map((_, i) => {
        const dist = Math.abs(i - (N - 1) / 2);
        const x0 = CENTRO + (i - (N - 1) / 2) * PASSO;
        const h0 = i === (N - 1) / 2 ? 560 : 180 + 340 * Math.abs(Math.sin(i * 0.9));
        const t0 = i === (N - 1) / 2 ? 4 : 22 + dist * 2.2;
        const nasce = interpolate(frame, [t0, t0 + 16], [0, 1], { ...c, easing: ease });
        const p = PECAS[i - 6];
        const x1 = p ? CENTRO - (SIMBOLO_W * ESCALA) / 2 + p.cx * ESCALA : x0;
        const h1 = p ? p.comprimento * ESCALA : 0;
        const x = x0 + (x1 - x0) * morph, h = (h0 + (h1 - h0) * morph) * nasce;
        const w = 4 + ((p ? ESPESSURA * ESCALA : 4) - 4) * morph;
        const cor = p ? (p.prata ? "#A8A9AD" : "#FFFFFF") : i % 2 ? "#A8A9AD" : "#FFFFFF";
        return (
          <div key={i} style={{ position: "absolute", left: x - w / 2, top: BASE - h, width: w, height: h, borderRadius: w / 2, backgroundColor: cor,
            transformOrigin: "50% 100%", rotate: `${(p ? p.angulo : 0) * morph}deg`, opacity: p ? 1 : 1 - morph * 0.2 }} />
        );
      })}
      <Interactive.Div
        name="Rótulo"
        style={{ position: "absolute", top: 150, left: 90, fontFamily: mono, fontSize: 30, letterSpacing: 9, color: "#F8F8F8",
          opacity: interpolate(frame, [80, 100], [0, 1], c) }}
      >
        LINHA EDITORA
      </Interactive.Div>
      <Interactive.Div
        name="Frase"
        style={{ position: "absolute", top: 1300, left: 0, right: 0, textAlign: "center", fontFamily: spectral, fontStyle: "italic", fontSize: 62, lineHeight: 1.35, color: "#F8F8F8",
          opacity: interpolate(frame, [3.1 * fps, 3.7 * fps], [0, 1], { ...c, easing: ease }),
          translate: interpolate(frame, [3.1 * fps, 3.8 * fps], ["0px 24px", "0px 0px"], { ...c, easing: ease }) }}
      >
        Toda história começa
        <br />
        por uma linha.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
