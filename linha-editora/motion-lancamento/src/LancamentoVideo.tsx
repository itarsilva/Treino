import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { Convite } from "./Convite";
import { Estante } from "./Estante";
import { LinhaEscreve } from "./LinhaEscreve";
import { persiana } from "./Persiana";
import { PrimeiraLinha } from "./PrimeiraLinha";
import { Regua } from "./Regua";

// As cenas se ligam por uma persiana de linhas verticais, o grafismo de apoio da marca.
export const LancamentoVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Primeira linha" durationInFrames={140}>
      <PrimeiraLinha />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: 18 })} />
    <TransitionSeries.Sequence name="A linha escreve" durationInFrames={110}>
      <LinhaEscreve />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: 18 })} />
    <TransitionSeries.Sequence name="Régua" durationInFrames={125}>
      <Regua />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: 18 })} />
    <TransitionSeries.Sequence name="Estante" durationInFrames={140}>
      <Estante />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: 18 })} />
    <TransitionSeries.Sequence name="Convite" durationInFrames={200}>
      <Convite />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
