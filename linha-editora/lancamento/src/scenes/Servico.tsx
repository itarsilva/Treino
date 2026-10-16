import React from "react";
import { AbsoluteFill } from "remotion";
import { LancamentoProps } from "../data";
import { JOST, Mono, NAVY, Reveal, Rule, WHITE, useFormat } from "../brand";

// Take 7 — serviço do evento, em linhas como o sumário do manual.
export const Servico: React.FC<LancamentoProps> = ({ dia, mes, semana, local, localDetalhe, horario }) => {
  const { height, tall } = useFormat();
  const pad = 90;
  const rows = [
    ["Quando", `${dia} de ${mes}, ${semana}`],
    ["Onde", `${local} · ${localDetalhe}`],
    ["Horário", horario],
  ];

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <div style={{ position: "absolute", left: pad, right: pad, top: tall ? height * 0.2 : height * 0.13 }}>
        <Reveal delay={0}>
          <Mono size={28} spacing={12}>O encontro</Mono>
        </Reveal>
        <div style={{ fontFamily: JOST, fontWeight: 300, fontStyle: "italic", fontSize: tall ? 112 : 92, color: WHITE, lineHeight: 1.1, marginTop: 20, marginBottom: tall ? 90 : 56 }}>
          <Reveal delay={6} dur={28}>Esperamos você.</Reveal>
        </div>

        {rows.map(([label, value], i) => (
          <div key={label}>
            <Rule delay={18 + i * 12} width="100%" />
            <div style={{ padding: tall ? "34px 0 38px" : "24px 0 28px" }}>
              <Reveal delay={24 + i * 12}>
                <Mono size={24} spacing={10}>{`0${i + 1} — ${label}`}</Mono>
              </Reveal>
              <div style={{ fontFamily: JOST, fontWeight: 300, fontSize: tall ? 68 : 56, color: WHITE, marginTop: 12, lineHeight: 1.1 }}>
                <Reveal delay={28 + i * 12}>{value}</Reveal>
              </div>
            </div>
          </div>
        ))}
        <Rule delay={54} width="100%" />
      </div>
    </AbsoluteFill>
  );
};
