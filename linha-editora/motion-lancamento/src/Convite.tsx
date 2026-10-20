import { AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Assinatura } from "./Assinatura";
import { jost, mono, spectral } from "./fonts";

export const Convite: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill name="Convite" style={{ backgroundColor: "#F8F8F8", paddingLeft: 90, paddingRight: 90, paddingTop: 230 }}>
      <Interactive.Div
        name="Dia da semana"
        style={{ fontFamily: mono, fontSize: 32, letterSpacing: 10, color: "#001F3F",
          opacity: interpolate(frame, [0, 0.5 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        QUARTA-FEIRA
      </Interactive.Div>
      <Interactive.Div
        name="Data"
        style={{ marginTop: 24, fontFamily: jost, fontWeight: 300, fontSize: 190, lineHeight: 1, letterSpacing: -3, color: "#001F3F",
          opacity: interpolate(frame, [0.1 * fps, 0.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
          translate: interpolate(frame, [0.1 * fps, 1 * fps], ["0px 50px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        21 de
        <br />
        outubro
      </Interactive.Div>
      <Interactive.Div
        name="Convite"
        style={{ marginTop: 48, fontFamily: spectral, fontStyle: "italic", fontSize: 60, color: "#001F3F",
          opacity: interpolate(frame, [0.8 * fps, 1.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        Esperamos você.
      </Interactive.Div>
      <Interactive.Div
        name="WhatsApp"
        style={{ marginTop: 90, display: "flex", alignItems: "center", gap: 44, paddingTop: 56, borderTop: "2px solid #A8A9AD",
          opacity: interpolate(frame, [1.4 * fps, 2 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        <Img name="QR WhatsApp" src={staticFile("qrcode-whatsapp.png")} style={{ width: 270, height: 270 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontFamily: mono, fontSize: 30, letterSpacing: 8, color: "#001F3F" }}>WHATSAPP</span>
          <span style={{ fontFamily: jost, fontWeight: 300, fontSize: 58, color: "#001F3F" }}>(11) 91331-1813</span>
          <span style={{ fontFamily: spectral, fontSize: 44, color: "#001F3F" }}>Aponte a câmera</span>
        </div>
      </Interactive.Div>
      <Interactive.Div
        name="Assinatura"
        style={{ position: "absolute", left: 90, bottom: 150,
          opacity: interpolate(frame, [2 * fps, 2.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        <Assinatura escala={0.55} cor="#001F3F" corPrata="#A8A9AD" inicio={2 * 30} />
      </Interactive.Div>
    </AbsoluteFill>
  );
};
