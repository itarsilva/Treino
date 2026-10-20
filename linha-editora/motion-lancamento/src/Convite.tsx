import { AbsoluteFill, Easing, Img, Interactive, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Assinatura } from "./Assinatura";
import { jost, mono, spectral } from "./fonts";

// Linhas descem como uma cortina e se recolhem; a assinatura se monta e o convite fecha o vídeo.
const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const Convite: React.FC = () => {
  const frame = useCurrentFrame();
  const ease = Easing.bezier(0.16, 1, 0.3, 1);
  const op = (a: number) => interpolate(frame, [a, a + 16], [0, 1], { ...c, easing: ease });
  return (
    <AbsoluteFill name="Convite" style={{ backgroundColor: "#001F3F" }}>
      {Array.from({ length: 26 }).map((_, i) => {
        const t = 2 + Math.abs(i - 12.5) * 1.5;
        const cai = interpolate(frame, [t, t + 18, 34 + t, 52 + t], [0, 1, 1, 0.16], { ...c, easing: Easing.bezier(0.65, 0, 0.35, 1) });
        return <div key={i} style={{ position: "absolute", left: 90 + i * 36, top: 0, width: 3, borderRadius: 2, height: (i % 4 === 0 ? 1920 : 1200 + 500 * Math.abs(Math.sin(i))) * cai,
          backgroundColor: i % 4 === 0 ? "#FFFFFF" : "#A8A9AD", opacity: 0.55 }} />;
      })}
      <Interactive.Div name="Assinatura" style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: op(40) }}>
        <Assinatura escala={1.15} cor="#FFFFFF" corPrata="#A8A9AD" inicio={44} />
      </Interactive.Div>
      <Interactive.Div name="Convite" style={{ position: "absolute", top: 640, left: 0, right: 0, textAlign: "center", fontFamily: spectral, fontStyle: "italic", fontSize: 64, color: "#F8F8F8", opacity: op(78) }}>
        Esperamos você.
      </Interactive.Div>
      <Interactive.Div name="Quando" style={{ position: "absolute", top: 760, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontSize: 32, letterSpacing: 8, color: "#A8A9AD", opacity: op(84) }}>
        AMANHÃ · QUARTA · 21.10
      </Interactive.Div>
      <Interactive.Div name="WhatsApp" style={{ position: "absolute", top: 960, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 34, opacity: op(96) }}>
        <div style={{ backgroundColor: "#FFFFFF", padding: 22, borderRadius: 18 }}>
          <Img name="QR WhatsApp" src={staticFile("qrcode-whatsapp.png")} style={{ width: 330, height: 330, display: "block" }} />
        </div>
        <span style={{ fontFamily: mono, fontSize: 30, letterSpacing: 8, color: "#A8A9AD" }}>WHATSAPP</span>
        <span style={{ fontFamily: jost, fontWeight: 300, fontSize: 64, color: "#F8F8F8" }}>(11) 91331-1813</span>
      </Interactive.Div>
      <Interactive.Div name="Site" style={{ position: "absolute", bottom: 130, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontSize: 28, letterSpacing: 8, color: "#A8A9AD", opacity: op(110) }}>
        LINHAEDITORA.COM.BR
      </Interactive.Div>
    </AbsoluteFill>
  );
};
