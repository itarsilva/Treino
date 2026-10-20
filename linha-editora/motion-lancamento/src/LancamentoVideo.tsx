import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { Convite } from "./Convite";
import { dur } from "./ritmo";
import { Estante } from "./Estante";
import { LinhaEscreve } from "./LinhaEscreve";
import { persiana } from "./Persiana";
import { PrimeiraLinha } from "./PrimeiraLinha";
import { Regua } from "./Regua";

// As cenas se ligam por uma persiana de linhas verticais, o grafismo de apoio da marca.
export const LancamentoVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Primeira linha" durationInFrames={dur(140)}>
      <PrimeiraLinha />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: dur(18) })} />
    <TransitionSeries.Sequence name="A linha escreve" durationInFrames={dur(110)}>
      <LinhaEscreve />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: dur(18) })} />
    <TransitionSeries.Sequence name="Régua" durationInFrames={dur(125)}>
      <Regua />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: dur(18) })} />
    <TransitionSeries.Sequence name="Estante" durationInFrames={dur(140)}>
      <Estante />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: dur(18) })} />
    <TransitionSeries.Sequence name="Convite" durationInFrames={dur(200)}>
      <Convite />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
