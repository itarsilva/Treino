import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { jost, mono } from "./fonts";

// Os três títulos viram lombadas que deslizam para a prateleira; a última pousa inclinada, como no símbolo.
const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const PRATELEIRA = 1700, LARGURA = 172, GAP = 14, X0 = 228;
const LIVROS = [
  { titulo: "Maquiavel: um renascentista hoje", altura: 930, fundo: "#001F3F", texto: "#F8F8F8", entra: 30 },
  { titulo: "Direito processual e capitalismo", altura: 860, fundo: "#A8A9AD", texto: "#001F3F", entra: 44 },
  { titulo: "Instituições de direito público e privado", altura: 990, fundo: "#001F3F", texto: "#F8F8F8", entra: 58 },
];

export const Estante: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  return (
    <AbsoluteFill name="Estante" style={{ backgroundColor: "#F8F8F8" }}>
      <Interactive.Div name="Rótulo" style={{ position: "absolute", top: 170, left: 90, fontFamily: mono, fontSize: 32, letterSpacing: 10, color: "#001F3F",
        opacity: interpolate(frame, [0, 12], [0, 1], c) }}>
        NOVOS TÍTULOS
      </Interactive.Div>
      <Interactive.Div name="Chamada" style={{ position: "absolute", top: 225, left: 90, fontFamily: jost, fontWeight: 300, fontSize: 96, lineHeight: 1.08, color: "#001F3F",
        opacity: interpolate(frame, [6, 24], [0, 1], { ...c, easing: ease }) }}>
        Três livros,
        <br />
        uma estante.
      </Interactive.Div>
      <div style={{ position: "absolute", top: PRATELEIRA, left: 90, height: 4, borderRadius: 2, backgroundColor: "#A8A9AD",
        width: interpolate(frame, [10, 34], [0, 900], { ...c, easing: Easing.bezier(0.65, 0, 0.35, 1) }) }} />
      {LIVROS.map((l, i) => {
        const chega = interpolate(frame, [l.entra, l.entra + 22], [0, 1], { ...c, easing: ease });
        const xFinal = X0 + i * (LARGURA + GAP);
        const inclina = i === 2 ? interpolate(frame, [l.entra + 20, l.entra + 38], [0, 9], { ...c, easing: Easing.bezier(0.5, 0, 0.2, 1.4) }) : 0;
        return (
          <div key={i} style={{ position: "absolute", left: xFinal + (1 - chega) * 900, top: PRATELEIRA - l.altura, width: LARGURA, height: l.altura,
            backgroundColor: l.fundo, borderRadius: 6, transformOrigin: "0% 100%", rotate: `${inclina}deg`,
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 34, fontFamily: mono, fontSize: 22, letterSpacing: 5, color: l.texto, opacity: 0.8 }}>LINHA</div>
            <div style={{ rotate: "-90deg", whiteSpace: "nowrap", fontFamily: jost, fontWeight: 300, fontSize: 44, color: l.texto }}>{l.titulo}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
