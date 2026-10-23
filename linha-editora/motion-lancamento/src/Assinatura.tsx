import { jost } from "./fonts";
import { Simbolo } from "./Simbolo";

// Assinatura principal horizontal do manual: símbolo + "Linha" com "editora" menor, alinhado à direita, embaixo.
type Props = { escala: number; cor: string; corPrata: string; inicio?: number; animar?: boolean };

export const Assinatura: React.FC<Props> = ({ escala, cor, corPrata, inicio = 0, animar = true }) => (
  <div style={{ display: "flex", alignItems: "flex-end", gap: 64 * escala }}>
    <Simbolo altura={150 * escala} corLombada={cor} corPrata={corPrata} inicio={inicio} animar={animar} />
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", fontFamily: jost, fontWeight: 300, color: cor, lineHeight: 1 }}>
      <div style={{ fontSize: 150 * escala, letterSpacing: -1 * escala }}>Linha</div>
      <div style={{ fontSize: 56 * escala, letterSpacing: 2 * escala, marginTop: -6 * escala }}>editora</div>
    </div>
  </div>
);
