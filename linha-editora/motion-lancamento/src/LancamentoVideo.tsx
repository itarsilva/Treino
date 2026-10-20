import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Abertura } from "./Abertura";
import { Amanha } from "./Amanha";
import { Convite } from "./Convite";
import { Lancamento } from "./Lancamento";
import { Titulos } from "./Titulos";

// Transições sóbrias (fade), de acordo com a personalidade da marca: editorial e silenciosa.
export const LancamentoVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Abertura" durationInFrames={75}>
      <Abertura />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Amanhã" durationInFrames={95}>
      <Amanha />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Lançamento" durationInFrames={115}>
      <Lancamento />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Títulos" durationInFrames={130}>
      <Titulos />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Convite" durationInFrames={165}>
      <Convite />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
