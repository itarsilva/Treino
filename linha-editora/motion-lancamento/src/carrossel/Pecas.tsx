import { AbsoluteFill, Img, staticFile } from "remotion";
import { Assinatura } from "../Assinatura";
import { mono, spectral } from "../fonts";
import { Simbolo } from "../Simbolo";

// Peças comuns dos slides do carrossel (1080 × 1350), na identidade do manual da marca.

// Grafismo de apoio estático: linhas verticais em ritmo, alinhadas a uma base.
export const Linhas: React.FC<{ n: number; altura: number; cor: string; espaco: number }> = ({ n, altura, cor, espaco }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: espaco, height: altura }}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ width: 3, borderRadius: 2, backgroundColor: cor, height: altura * (i % 5 === 0 ? 1 : 0.55 + 0.35 * Math.abs(Math.sin(i * 1.3))) }} />
    ))}
  </div>
);

// Slide de foto: foto grande com margem off-white, numeração em mono, legenda em Spectral e o símbolo como assinatura discreta.
type FotoProps = { foto: string; posicao: string; numero: string; rotulo: string; legenda: React.ReactNode };

export const SlideFoto: React.FC<FotoProps> = ({ foto, posicao, numero, rotulo, legenda }) => (
  <AbsoluteFill style={{ backgroundColor: "#F8F8F8" }}>
    <div style={{ position: "absolute", left: 60, top: 60, right: 60, height: 960, overflow: "hidden", backgroundColor: "#001F3F" }}>
      <Img src={staticFile(foto)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: posicao }} />
    </div>
    <div style={{ position: "absolute", left: 60, top: 1060, display: "flex", gap: 22, alignItems: "baseline" }}>
      <span style={{ fontFamily: mono, fontSize: 26, letterSpacing: 6, color: "#001F3F" }}>{numero}</span>
      <span style={{ fontFamily: mono, fontSize: 26, letterSpacing: 6, color: "#A8A9AD" }}>{rotulo}</span>
    </div>
    <div style={{ position: "absolute", left: 60, right: 230, top: 1112, fontFamily: spectral, fontSize: 44, lineHeight: 1.3, color: "#001F3F" }}>{legenda}</div>
    <div style={{ position: "absolute", right: 60, bottom: 72 }}>
      <Simbolo altura={64} corLombada="#001F3F" corPrata="#A8A9AD" animar={false} />
    </div>
  </AbsoluteFill>
);

export { Assinatura };
