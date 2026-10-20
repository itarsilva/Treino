import { AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { body, display } from "./fonts";

export const Convite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Convite" style={{ backgroundColor: "#1F6B53", justifyContent: "center", alignItems: "center" }}>
      <Interactive.Div
        name="Dia da semana"
        style={{
          fontFamily: body,
          fontSize: 56,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#CFE8DD",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        Quarta-feira
      </Interactive.Div>
      <Interactive.Div
        name="Data"
        style={{
          marginTop: 16,
          fontFamily: display,
          fontWeight: 600,
          fontSize: 190,
          lineHeight: 1,
          textAlign: "center",
          color: "#FFFFFF",
          opacity: interpolate(frame, [0.2 * fps, 0.9 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          scale: interpolate(frame, [0.2 * fps, 1.1 * fps], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }), output: "perceptual-scale" }),
        }}
      >
        21 de
        <br />
        outubro
      </Interactive.Div>
      <Interactive.Div
        name="Convite"
        style={{
          marginTop: 56,
          fontFamily: body,
          fontSize: 68,
          fontWeight: 600,
          color: "#FFFFFF",
          opacity: interpolate(frame, [0.9 * fps, 1.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        Esperamos você!
      </Interactive.Div>
      <Interactive.Div
        name="Cartão do WhatsApp"
        style={{
          marginTop: 90,
          backgroundColor: "#FFFFFF",
          borderRadius: 28,
          padding: 32,
          display: "flex",
          alignItems: "center",
          gap: 32,
          opacity: interpolate(frame, [1.5 * fps, 2.1 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          translate: interpolate(frame, [1.5 * fps, 2.1 * fps], ["0px 50px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        <Img name="QR WhatsApp" src={staticFile("qrcode-whatsapp.png")} style={{ width: 260, height: 260 }} />
        <Interactive.Div name="Texto do WhatsApp" style={{ fontFamily: body, color: "#16211D", fontSize: 44, lineHeight: 1.3 }}>
          Fale com a gente
          <br />
          no WhatsApp
          <br />
          <b>(11) 91331-1813</b>
        </Interactive.Div>
      </Interactive.Div>
    </AbsoluteFill>
  );
};
