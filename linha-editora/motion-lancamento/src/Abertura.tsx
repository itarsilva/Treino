import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { mono } from "./fonts";
import { Simbolo } from "./Simbolo";

export const Abertura: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill name="Abertura" style={{ backgroundColor: "#001F3F", justifyContent: "center", alignItems: "center" }}>
      <Interactive.Div
        name="Rótulo"
        style={{ position: "absolute", top: 150, left: 90, fontFamily: mono, fontSize: 30, letterSpacing: 9, color: "#F8F8F8",
          opacity: interpolate(frame, [0.2 * fps, 0.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        LINHA EDITORA
      </Interactive.Div>
      <Interactive.Div name="Símbolo">
        <Simbolo altura={330} corLombada="#FFFFFF" corPrata="#A8A9AD" inicio={6} />
      </Interactive.Div>
      <Interactive.Div
        name="Conceito"
        style={{ position: "absolute", bottom: 150, right: 90, fontFamily: mono, fontSize: 30, letterSpacing: 6, lineHeight: 1.6, textAlign: "right", color: "#A8A9AD",
          opacity: interpolate(frame, [1.2 * fps, 1.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        A LINHA QUE
        <br />
        CONECTA HISTÓRIAS
      </Interactive.Div>
    </AbsoluteFill>
  );
};
