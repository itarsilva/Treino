import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { body, display } from "./fonts";

export const Lancamento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Lançamento" style={{ backgroundColor: "#F3F5F3", justifyContent: "center", alignItems: "center" }}>
      <Interactive.Div
        name="Lançamento"
        style={{
          fontFamily: body,
          fontSize: 120,
          fontWeight: 600,
          letterSpacing: -2,
          color: "#16211D",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          translate: interpolate(frame, [0, 0.8 * fps], ["0px 60px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }) }),
        }}
      >
        Lançamento
      </Interactive.Div>
      <Interactive.Div
        name="Da Casa Editorial"
        style={{
          marginTop: 24,
          fontFamily: body,
          fontSize: 60,
          color: "#5D6B66",
          opacity: interpolate(frame, [0.5 * fps, 1.1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        da Casa Editorial
      </Interactive.Div>
      <Interactive.Div
        name="Linha Editora"
        style={{
          marginTop: 80,
          fontFamily: display,
          fontWeight: 600,
          fontSize: 150,
          lineHeight: 1.05,
          textAlign: "center",
          color: "#16211D",
          opacity: interpolate(frame, [1 * fps, 1.7 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          scale: interpolate(frame, [1 * fps, 1.9 * fps], [0.92, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }), output: "perceptual-scale" }),
        }}
      >
        Linha
        <br />
        Editora
      </Interactive.Div>
      <Interactive.Div
        name="Linha da marca"
        style={{
          marginTop: 56,
          height: 10,
          width: 640,
          borderRadius: 5,
          backgroundColor: "#DCE3DF",
          opacity: interpolate(frame, [1.6 * fps, 2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <Interactive.Div
          name="Traço verde"
          style={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#1F6B53",
            width: interpolate(frame, [1.8 * fps, 2.8 * fps], [0, 245], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.65, 0, 0.35, 1) }),
          }}
        />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
