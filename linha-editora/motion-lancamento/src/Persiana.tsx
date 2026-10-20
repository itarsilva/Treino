import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill, useVideoConfig } from "remotion";

// Transição da marca: a cena nova entra por faixas verticais que se abrem da esquerda para a direita, como lombadas numa estante.
type Props = { faixas: number };

const Persiana: React.FC<TransitionPresentationComponentProps<Props>> = ({ children, presentationDirection, presentationProgress, passedProps }) => {
  const { width, height } = useVideoConfig();
  if (presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const n = passedProps.faixas, w = width / n;
  const d = Array.from({ length: n }).map((_, i) => {
    const t = Math.min(1, Math.max(0, presentationProgress * 1.8 - (i / n) * 0.8));
    const x = i * w;
    return `M${x} 0 H${x + w * t} V${height} H${x} Z`;
  }).join(" ");
  return <AbsoluteFill style={{ clipPath: `path('${d}')` }}>{children}</AbsoluteFill>;
};

export const persiana = (props: Props = { faixas: 18 }): TransitionPresentation<Props> => ({ component: Persiana, props });
