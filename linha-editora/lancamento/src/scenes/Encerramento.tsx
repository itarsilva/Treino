import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { LancamentoProps } from "../data";
import { JOST, Lockup, Mono, NAVY, Reveal, Rule, SPECTRAL, WHITE, prog, useFormat } from "../brand";

// Take 8 — confirmação de presença, contatos e assinatura.
export const Encerramento: React.FC<LancamentoProps> = ({ qrcode, instagram, site }) => {
  const frame = useCurrentFrame();
  const { tall } = useFormat();
  const qr = tall ? 330 : 230;
  const q = prog(frame, 4, 28);

  return (
    <AbsoluteFill style={{ background: NAVY, alignItems: "center", justifyContent: "center", gap: tall ? 46 : 28 }}>
      <div style={{ background: WHITE, padding: tall ? 22 : 16, opacity: q, scale: String(0.9 + q * 0.1) }}>
        <Img src={staticFile(qrcode)} style={{ width: qr, height: qr, display: "block", imageRendering: "pixelated" }} />
      </div>

      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: SPECTRAL, fontWeight: 400, fontSize: tall ? 66 : 54, color: WHITE, lineHeight: 1.1 }}>
          <Reveal delay={14}>Confirme sua presença</Reveal>
        </div>
        <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
          <Reveal delay={22}>
            <Mono size={26} spacing={12}>Aponte a câmera</Mono>
          </Reveal>
        </div>
      </div>

      <Rule delay={28} width={tall ? 640 : 560} align="center" />

      <div style={{ textAlign: "center", fontFamily: JOST, fontWeight: 400, fontSize: tall ? 44 : 38, color: WHITE, lineHeight: 1.5 }}>
        <Reveal delay={34}>{instagram}</Reveal>
        <br />
        <Reveal delay={40}>{site}</Reveal>
      </div>

      <div style={{ marginTop: tall ? 40 : 10 }}>
        <Lockup size={tall ? 120 : 92} delay={46} />
      </div>
    </AbsoluteFill>
  );
};
