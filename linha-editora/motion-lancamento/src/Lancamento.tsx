import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Assinatura } from "./Assinatura";
import { mono, spectral } from "./fonts";

export const Lancamento: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill name="Lançamento" style={{ backgroundColor: "#F8F8F8", justifyContent: "center", alignItems: "center" }}>
      <Interactive.Div
        name="Rótulo"
        style={{ fontFamily: mono, fontSize: 32, letterSpacing: 8, textAlign: "center", lineHeight: 1.7, color: "#001F3F",
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        LANÇAMENTO DA
        <br />
        CASA EDITORIAL
      </Interactive.Div>
      <Interactive.Div
        name="Assinatura"
        style={{ marginTop: 110,
          opacity: interpolate(frame, [0.3 * fps, 0.9 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}
      >
        <Assinatura escala={1.25} cor="#001F3F" corPrata="#A8A9AD" inicio={10} />
      </Interactive.Div>
      <Interactive.Div
        name="Conceito"
        style={{ marginTop: 120, fontFamily: spectral, fontWeight: 300, fontSize: 56, color: "#001F3F",
          opacity: interpolate(frame, [1.7 * fps, 2.4 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) }}
      >
        A linha que conecta histórias.
      </Interactive.Div>
    </AbsoluteFill>
  );
};
