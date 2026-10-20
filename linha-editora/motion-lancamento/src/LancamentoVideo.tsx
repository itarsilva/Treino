import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Amanha } from "./Amanha";
import { Convite } from "./Convite";
import { Lancamento } from "./Lancamento";
import { Livros } from "./Livros";

export const LancamentoVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Amanhã" durationInFrames={90}>
      <Amanha />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Lançamento" durationInFrames={110}>
      <Lancamento />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Livros" durationInFrames={110}>
      <Livros />
    </TransitionSeries.Sequence>
    <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 15 })} />
    <TransitionSeries.Sequence name="Convite" durationInFrames={150}>
      <Convite />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
