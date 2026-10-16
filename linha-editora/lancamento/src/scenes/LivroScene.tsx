import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Livro } from "../data";
import { JOST, MUTED, Mono, NAVY, Reveal, Rule, SPECTRAL, Symbol, WHITE, prog, useFormat } from "../brand";

// Takes 3–5 — um livro por vez: capa entra, número gigante ao fundo, título e autor.
export const LivroScene: React.FC<{ livro: Livro; index: number; total: number }> = ({ livro, index, total }) => {
  const frame = useCurrentFrame();
  const { width, tall } = useFormat();
  const pad = 90;
  const headTop = tall ? 130 : 90;
  const bookW = tall ? 640 : 430;
  const bookH = bookW * (1020 / 760);
  const bookTop = tall ? 300 : 170;
  const enter = prog(frame, 0, 30);
  const num = String(index + 1).padStart(2, "0");

  return (
    <AbsoluteFill style={{ background: NAVY }}>
      {/* Número gigante ao fundo, deslizando devagar */}
      <div
        style={{
          position: "absolute",
          right: tall ? 60 : 50,
          bottom: tall ? 150 : 40,
          fontFamily: JOST,
          fontWeight: 300,
          fontSize: tall ? 460 : 300,
          lineHeight: 1,
          color: "rgba(168,169,173,.10)",
          translate: `${interpolate(frame, [0, 110], [-30, 30])}px 0`,
          letterSpacing: -10,
        }}
      >
        {num}
      </div>

      {/* Cabeçalho */}
      <div style={{ position: "absolute", left: pad, right: pad, top: headTop, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <Mono size={26} spacing={10}>
          Lançamento · {num} / {String(total).padStart(2, "0")}
        </Mono>
        <Symbol height={tall ? 60 : 50} delay={-100} />
      </div>

      {/* Capa */}
      <Img
        src={staticFile(livro.capa)}
        style={{
          position: "absolute",
          width: bookW,
          left: (width - bookW) / 2,
          top: bookTop,
          opacity: enter,
          translate: `0 ${(1 - enter) * 180}px`,
          scale: String(interpolate(frame, [0, 30, 110], [0.9, 1, 1.035], { extrapolateRight: "clamp" })),
        }}
      />

      {/* Prateleira */}
      <div style={{ position: "absolute", left: pad, right: pad, top: bookTop + bookH - (tall ? 34 : 22) }}>
        <Rule delay={8} width="100%" dur={26} />
      </div>

      {/* Texto */}
      <div style={{ position: "absolute", left: pad, right: pad, top: bookTop + bookH + (tall ? 30 : 22) }}>
        <Reveal delay={14}>
          <Mono size={tall ? 28 : 24} spacing={8}>
            {livro.autor}
          </Mono>
        </Reveal>
        <div style={{ fontFamily: SPECTRAL, fontWeight: 400, fontSize: tall ? 66 : 52, color: WHITE, lineHeight: 1.12, marginTop: tall ? 22 : 14 }}>
          {livro.titulo.split(" ").map((w, i) => (
            <React.Fragment key={i}>
              <Reveal delay={20 + i * 2}>{w}</Reveal>{" "}
            </React.Fragment>
          ))}
        </div>
        {livro.subtitulo ? (
          <div style={{ fontFamily: SPECTRAL, fontWeight: 300, fontStyle: "italic", fontSize: tall ? 46 : 38, color: MUTED, marginTop: 8 }}>
            <Reveal delay={30}>{livro.subtitulo}</Reveal>
          </div>
        ) : null}
        {livro.edicao ? (
          <div style={{ marginTop: tall ? 20 : 12 }}>
            <Reveal delay={32}>
              <Mono size={tall ? 24 : 22} spacing={8}>
                {livro.edicao}
              </Mono>
            </Reveal>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
