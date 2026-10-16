import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LancamentoProps } from "../data";
import { JOST, LineField, Mono, NAVY, Reveal, Rule, Symbol, WHITE, prog, useFormat } from "../brand";

// Take 2 — "Lançamento", a data e o dia da semana, como na arte do convite.
export const Data: React.FC<LancamentoProps> = ({ dia, mes, ano, semana }) => {
  const frame = useCurrentFrame();
  const { height, tall } = useFormat();
  const pad = 90;
  const headTop = tall ? 130 : 90;
  const word = "Lançamento";

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      {/* Cabeçalho: mono à esquerda, símbolo à direita, fio de largura total */}
      <div style={{ position: "absolute", left: pad, right: pad, top: headTop, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ opacity: prog(frame, 4, 20) }}>
          <Mono size={30} spacing={14}>Save the date</Mono>
        </div>
        <Symbol height={tall ? 86 : 70} delay={2} speed={1.3} />
      </div>
      <div style={{ position: "absolute", left: pad, right: pad, top: headTop + (tall ? 104 : 88) }}>
        <Rule delay={6} width="100%" />
      </div>

      {/* Bloco principal */}
      <div style={{ position: "absolute", left: pad, right: pad, top: tall ? height * 0.27 : height * 0.3 }}>
        <Rule delay={12} width={110} color={WHITE} thickness={5} dur={20} />
        <div style={{ fontFamily: JOST, fontWeight: 600, fontSize: tall ? 166 : 158, color: WHITE, lineHeight: 1.05, marginTop: 36, letterSpacing: -3, display: "flex" }}>
          {word.split("").map((ch, i) => (
            <Reveal key={i} delay={16 + i * 1.8} dur={26}>
              {ch}
            </Reveal>
          ))}
        </div>
        <div style={{ fontFamily: JOST, fontWeight: 300, fontStyle: "italic", fontSize: tall ? 118 : 104, color: WHITE, lineHeight: 1.1, marginTop: 10 }}>
          <Reveal delay={40} dur={28}>
            {dia} de {mes}
          </Reveal>
        </div>
        <div style={{ marginTop: 26 }}>
          <Reveal delay={54}>
            <Mono size={34} spacing={12}>
              {ano} · {semana}
            </Mono>
          </Reveal>
        </div>
      </div>

      {/* Grafismo: estante no rodapé */}
      <LineField top={tall ? height * 0.74 : height * 0.79} height={tall ? 250 : 150} delay={50} seed="data" opacity={0.9} />
    </AbsoluteFill>
  );
};
