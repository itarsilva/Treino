import React from "react";
import { linearTiming, springTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { LancamentoProps } from "./data";
import { Abertura } from "./scenes/Abertura";
import { Data } from "./scenes/Data";
import { LivroScene } from "./scenes/LivroScene";
import { Estante } from "./scenes/Estante";
import { Servico } from "./scenes/Servico";
import { Encerramento } from "./scenes/Encerramento";

// Duração de cada take e de cada transição, em frames (30 fps)
const D = { abertura: 105, data: 140, livro: 100, estante: 120, servico: 130, encerramento: 170 };
const T = { wipe: 20, sobe: 22, livro: 18, fade: 18 };
const spring = (d: number) => springTiming({ config: { damping: 200 }, durationInFrames: d });

export const DURACAO_TOTAL =
  D.abertura + D.data + 3 * D.livro + D.estante + D.servico + D.encerramento -
  (T.wipe + T.sobe + 2 * T.livro + 3 * T.fade);

export const Lancamento: React.FC<LancamentoProps> = (props) => {
  const n = props.livros.length;
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence name="Abertura" durationInFrames={105}>
        <Abertura {...props} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe({ direction: "from-left" })} timing={linearTiming({ durationInFrames: 20 })} />

      <TransitionSeries.Sequence name="Data" durationInFrames={140}>
        <Data {...props} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={spring(22)} />

      {props.livros.map((livro, i) => (
        <React.Fragment key={livro.capa}>
          <TransitionSeries.Sequence name={`Livro ${i + 1}`} durationInFrames={100}>
            <LivroScene livro={livro} index={i} total={n} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={i < n - 1 ? slide({ direction: "from-right" }) : fade()}
            timing={i < n - 1 ? spring(18) : linearTiming({ durationInFrames: 18 })}
          />
        </React.Fragment>
      ))}

      <TransitionSeries.Sequence name="Estante" durationInFrames={120}>
        <Estante {...props} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      <TransitionSeries.Sequence name="Serviço" durationInFrames={130}>
        <Servico {...props} />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 18 })} />

      <TransitionSeries.Sequence name="Encerramento" durationInFrames={170}>
        <Encerramento {...props} />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
