import { Easing, interpolate, useCurrentFrame } from "remotion";
import { LENTO } from "./ritmo";

// Grafismo de apoio do manual: linhas verticais em ritmo, alinhadas a uma base comum.
type Props = { quantidade: number; altura: number; cor: string; espaco: number; inicio?: number };

export const Grafismo: React.FC<Props> = ({ quantidade, altura, cor, espaco, inicio = 0 }) => {
  const frame = useCurrentFrame() / LENTO;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: espaco, height: altura }}>
      {Array.from({ length: quantidade }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            borderRadius: 2,
            backgroundColor: cor,
            height: altura,
            transformOrigin: "50% 100%",
            scale: `1 ${interpolate(frame, [inicio + i * 1.2, inicio + i * 1.2 + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}`,
          }}
        />
      ))}
    </div>
  );
};
