import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { jost, mono } from "./fonts";
import { Grafismo } from "./Grafismo";

// Os três títulos como um índice editorial (numeração em mono e filetes em prata, como no manual)
export const Titulos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill name="Títulos" style={{ backgroundColor: "#001F3F", paddingLeft: 90, paddingRight: 90, paddingTop: 170 }}>
      <Interactive.Div name="Grafismo" style={{ opacity: 0.55 }}>
        <Grafismo quantidade={30} altura={150} cor="#A8A9AD" espaco={27} inicio={0} />
      </Interactive.Div>
      <Interactive.Div
        name="Rótulo"
        style={{ marginTop: 130, fontFamily: mono, fontSize: 32, letterSpacing: 10, color: "#A8A9AD",
          opacity: interpolate(frame, [0.4 * fps, 1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        NOVOS TÍTULOS
      </Interactive.Div>
      <Interactive.Div
        name="Chamada"
        style={{ marginTop: 28, marginBottom: 80, fontFamily: jost, fontWeight: 300, fontSize: 100, lineHeight: 1.08, color: "#F8F8F8",
          opacity: interpolate(frame, [0.5 * fps, 1.2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        Três livros,
        <br />
        uma estante.
      </Interactive.Div>
      <Interactive.Div
        name="Livro 1"
        style={{ display: "flex", gap: 40, alignItems: "baseline", padding: "36px 0", borderTop: "1px solid rgba(168,169,173,0.45)",
          opacity: interpolate(frame, [1.1 * fps, 1.7 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [1.1 * fps, 1.7 * fps], ["0px 30px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        <span style={{ fontFamily: mono, fontSize: 30, color: "#A8A9AD" }}>01</span>
        <span style={{ fontFamily: jost, fontWeight: 300, fontSize: 60, lineHeight: 1.2, color: "#F8F8F8" }}>Maquiavel: um renascentista hoje</span>
      </Interactive.Div>
      <Interactive.Div
        name="Livro 2"
        style={{ display: "flex", gap: 40, alignItems: "baseline", padding: "36px 0", borderTop: "1px solid rgba(168,169,173,0.45)",
          opacity: interpolate(frame, [1.5 * fps, 2.1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [1.5 * fps, 2.1 * fps], ["0px 30px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        <span style={{ fontFamily: mono, fontSize: 30, color: "#A8A9AD" }}>02</span>
        <span style={{ fontFamily: jost, fontWeight: 300, fontSize: 60, lineHeight: 1.2, color: "#F8F8F8" }}>Direito processual e capitalismo</span>
      </Interactive.Div>
      <Interactive.Div
        name="Livro 3"
        style={{ display: "flex", gap: 40, alignItems: "baseline", padding: "36px 0", borderTop: "1px solid rgba(168,169,173,0.45)", borderBottom: "1px solid rgba(168,169,173,0.45)",
          opacity: interpolate(frame, [1.9 * fps, 2.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          translate: interpolate(frame, [1.9 * fps, 2.5 * fps], ["0px 30px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        <span style={{ fontFamily: mono, fontSize: 30, color: "#A8A9AD" }}>03</span>
        <span style={{ fontFamily: jost, fontWeight: 300, fontSize: 60, lineHeight: 1.2, color: "#F8F8F8" }}>Instituições de direito público e privado</span>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
