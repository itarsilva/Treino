import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { LancamentoProps } from "../data";
import { Mono, NAVY, Reveal, Rule, SPECTRAL, Symbol, WHITE, prog, useFormat } from "../brand";

// Take 6 — os três títulos lado a lado na prateleira.
export const Estante: React.FC<LancamentoProps> = ({ livros, chamada, dia, mesNumero, ano }) => {
  const frame = useCurrentFrame();
  const { height, tall } = useFormat();
  const pad = 90;
  const headTop = tall ? 130 : 90;
  const bookW = tall ? 296 : 270;
  const bookH = bookW * (1020 / 760);
  const rowTop = tall ? height * 0.27 : height * 0.2;

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      <div style={{ position: "absolute", left: pad, right: pad, top: headTop, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ opacity: prog(frame, 0, 20) }}>
          <Mono size={26} spacing={10}>Três primeiros títulos</Mono>
        </div>
        <Symbol height={tall ? 60 : 50} delay={-100} />
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, top: rowTop, display: "flex", justifyContent: "center", gap: tall ? 12 : 24 }}>
        {livros.map((l, i) => {
          const p = prog(frame, 4 + i * 6, 30);
          return (
            <Img key={l.capa} src={staticFile(l.capa)}
              style={{ width: bookW, opacity: p, translate: `0 ${(1 - p) * 220}px` }} />
          );
        })}
      </div>

      <div style={{ position: "absolute", left: pad, right: pad, top: rowTop + bookH - (tall ? 16 : 14) }}>
        <Rule delay={10} width="100%" dur={30} />
      </div>

      <div style={{ position: "absolute", left: 50, right: 50, top: rowTop + bookH + (tall ? 90 : 60), textAlign: "center",
        fontFamily: SPECTRAL, fontWeight: 400, fontSize: tall ? 52 : 46, lineHeight: 1.2, color: WHITE }}>
        <Reveal delay={34}>{chamada[0]}</Reveal>
        <br />
        <Reveal delay={40}>{chamada[1]}</Reveal>
      </div>

      <div style={{ position: "absolute", left: 0, right: 0, bottom: tall ? 170 : 90, display: "flex", justifyContent: "center", opacity: prog(frame, 52, 20) }}>
        <Mono size={28} spacing={12}>
          {dia} · {mesNumero} · {ano}
        </Mono>
      </div>
    </AbsoluteFill>
  );
};
