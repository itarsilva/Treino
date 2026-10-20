import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { jost, mono, spectral } from "./fonts";

export const Amanha: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill name="Amanhã" style={{ backgroundColor: "#F8F8F8", justifyContent: "center", paddingLeft: 90, paddingRight: 90 }}>
      <Interactive.Div
        name="Rótulo"
        style={{ fontFamily: mono, fontSize: 32, letterSpacing: 10, color: "#001F3F",
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        LANÇAMENTO
      </Interactive.Div>
      <Interactive.Div
        name="Amanhã"
        style={{ marginTop: 30, fontFamily: jost, fontWeight: 300, fontSize: 250, lineHeight: 1, letterSpacing: -4, color: "#001F3F",
          opacity: interpolate(frame, [0.15 * fps, 0.9 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          translate: interpolate(frame, [0.15 * fps, 1.1 * fps], ["0px 70px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        Amanhã
      </Interactive.Div>
      <Interactive.Div
        name="Linha"
        style={{ marginTop: 56, height: 2, backgroundColor: "#A8A9AD",
          width: interpolate(frame, [0.8 * fps, 1.8 * fps], [0, 900], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.65, 0, 0.35, 1) }) }}
      />
      <Interactive.Div
        name="Frase"
        style={{ marginTop: 56, fontFamily: spectral, fontStyle: "italic", fontSize: 60, lineHeight: 1.35, color: "#001F3F",
          opacity: interpolate(frame, [1.4 * fps, 2.1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        Toda história começa
        <br />
        por uma linha.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
