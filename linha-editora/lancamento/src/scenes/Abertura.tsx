import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LancamentoProps } from "../data";
import { LineField, MONO, MUTED, Mono, NAVY, WHITE, prog, useFormat } from "../brand";

// Take 1 — a estante se ergue e o "Save the date" é escrito letra a letra.
export const Abertura: React.FC<LancamentoProps> = ({ dia, mesNumero, ano }) => {
  const frame = useCurrentFrame();
  const { height, tall } = useFormat();
  const bandH = tall ? 300 : 210;
  const bandTop = height / 2 - bandH / 2 + (tall ? 40 : 30);
  const title = "SAVE THE DATE";

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <LineField top={bandTop} height={bandH} delay={4} exit={70} seed="abertura" />

      <AbsoluteFill style={{ top: bandTop - (tall ? 150 : 120), height: 80, alignItems: "center" }}>
        <div style={{ display: "flex", fontFamily: MONO, fontSize: tall ? 58 : 52, color: WHITE }}>
          {title.split("").map((ch, i) => {
            const p = prog(frame, 16 + i * 2.2, 16);
            return (
              <span key={i} style={{ opacity: p, translate: `0 ${(1 - p) * 18}px`, width: ch === " " ? 30 : undefined, letterSpacing: 20 }}>
                {ch}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      <AbsoluteFill style={{ top: bandTop + bandH + (tall ? 70 : 50), height: 60, alignItems: "center", opacity: prog(frame, 44, 20) }}>
        <Mono size={30} color={MUTED} spacing={12}>
          {dia} · {mesNumero} · {ano}
        </Mono>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
