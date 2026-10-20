import { Easing, interpolate, useCurrentFrame } from "remotion";
import { LENTO } from "./ritmo";
import simbolo from "./simbolo-paths.json";

// Símbolo oficial, com os vetores extraídos do manual da marca (página 4).
// Animado como um livro sendo posto na estante: as lombadas crescem a partir da base comum
// e as duas peças inclinadas pousam por último. Ao final fica idêntico ao manual.
type Props = { altura: number; corLombada: string; corPrata: string; inicio?: number; animar?: boolean };

const pecas = [
  ...simbolo.marinho.map((d) => ({ d, prata: false })),
  ...simbolo.prata.map((d) => ({ d, prata: true })),
].map((p) => {
  const nums = (p.d.match(/-?\d+(\.\d+)?/g) || []).map(Number);
  const xs = nums.filter((_, i) => i % 2 === 0);
  return { ...p, x: Math.min(...xs), inclinada: Math.max(...xs) - Math.min(...xs) > 10 };
}).sort((a, b) => a.x - b.x);

export const Simbolo: React.FC<Props> = ({ altura, corLombada, corPrata, inicio = 0, animar = true }) => {
  const frame = useCurrentFrame() / LENTO;
  const largura = (altura * simbolo.w) / simbolo.h;
  return (
    <svg width={largura} height={altura} viewBox={`0 0 ${simbolo.w} ${simbolo.h}`} style={{ overflow: "visible" }}>
      {pecas.map((p, i) => {
        const t0 = inicio + i * 3;
        const k = animar ? interpolate(frame, [t0, t0 + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }) : 1;
        return (
          <path
            key={i}
            d={p.d}
            fill={p.prata ? corPrata : corLombada}
            style={{
              transformBox: "fill-box",
              transformOrigin: p.inclinada ? "0% 100%" : "50% 100%",
              scale: p.inclinada ? 1 : `1 ${k}`,
              rotate: p.inclinada ? `${(1 - k) * -16}deg` : "0deg",
              opacity: p.inclinada ? k : 1,
            }}
          />
        );
      })}
    </svg>
  );
};
