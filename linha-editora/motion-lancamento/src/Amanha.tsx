import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { body, display } from "./fonts";

export const Amanha: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Amanhã" style={{ backgroundColor: "#16211D", justifyContent: "center", alignItems: "center" }}>
      <Interactive.Div
        name="Marca"
        style={{
          position: "absolute",
          top: 160,
          fontFamily: body,
          fontSize: 44,
          fontWeight: 600,
          letterSpacing: 10,
          textTransform: "uppercase",
          color: "#93A39C",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        Linha Editora
      </Interactive.Div>
      <Interactive.Div
        name="Amanhã"
        style={{
          fontFamily: display,
          fontWeight: 600,
          fontSize: 210,
          lineHeight: 1,
          color: "#F3F5F3",
          opacity: interpolate(frame, [0.2 * fps, 1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          translate: interpolate(frame, [0.2 * fps, 1.2 * fps], ["0px 120px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }) }),
        }}
      >
        Amanhã
      </Interactive.Div>
      <Interactive.Div
        name="Linha"
        style={{
          height: 10,
          marginTop: 48,
          backgroundColor: "#5DBF9A",
          borderRadius: 5,
          width: interpolate(frame, [0.9 * fps, 1.8 * fps], [0, 640], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.65, 0, 0.35, 1) }),
        }}
      />
      <Interactive.Div
        name="Subtítulo"
        style={{
          marginTop: 56,
          fontFamily: body,
          fontSize: 64,
          color: "#E4ECE8",
          opacity: interpolate(frame, [1.5 * fps, 2.2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          translate: interpolate(frame, [1.5 * fps, 2.2 * fps], ["0px 30px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        é o grande dia
      </Interactive.Div>
    </AbsoluteFill>
  );
};
