import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { LENTO } from "./ritmo";
import { jost, mono, spectral } from "./fonts";

// Uma linha atravessa a tela como um cursor e, por onde passa, escreve "Amanhã".
const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const X0 = 90, LARGURA = 860;

export const LinhaEscreve: React.FC = () => {
  const frame = useCurrentFrame() / LENTO;
  const corre = interpolate(frame, [8, 46], [0, 1], { ...c, easing: Easing.bezier(0.45, 0, 0.2, 1) });
  const x = X0 + LARGURA * corre;
  return (
    <AbsoluteFill name="A linha escreve" style={{ backgroundColor: "#F8F8F8" }}>
      <Interactive.Div name="Rótulo" style={{ position: "absolute", top: 640, left: X0, fontFamily: mono, fontSize: 32, letterSpacing: 10, color: "#001F3F",
        opacity: interpolate(frame, [0, 10], [0, 1], c) }}>
        É AMANHÃ
      </Interactive.Div>
      <div style={{ position: "absolute", top: 700, left: X0, width: x - X0, height: 300, overflow: "hidden" }}>
        <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 250, lineHeight: "300px", letterSpacing: -4, color: "#001F3F", whiteSpace: "nowrap" }}>Amanhã</div>
      </div>
      <div style={{ position: "absolute", left: x - 4, top: 715, width: 8, borderRadius: 4, backgroundColor: "#001F3F",
        height: interpolate(frame, [2, 10, 46, 60], [0, 270, 270, 0], c), opacity: interpolate(frame, [52, 62], [1, 0], c) }} />
      {Array.from({ length: 22 }).map((_, i) => (
        <div key={i} style={{ position: "absolute", left: X0 + i * 41, top: 1060, width: 3, borderRadius: 2, backgroundColor: i % 3 === 0 ? "#001F3F" : "#A8A9AD",
          height: interpolate(frame, [48 + i * 1.2, 62 + i * 1.2], [0, i % 3 === 0 ? 70 : 44], { ...c, easing: Easing.bezier(0.16, 1, 0.3, 1) }) }} />
      ))}
      <Interactive.Div name="Frase" style={{ position: "absolute", top: 1200, left: X0, right: 90, fontFamily: spectral, fontSize: 58, lineHeight: 1.35, color: "#001F3F",
        opacity: interpolate(frame, [62, 80], [0, 1], c) }}>
        lançamos a Casa Editorial
        <br />
        <span style={{ fontStyle: "italic" }}>Linha Editora</span>.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
