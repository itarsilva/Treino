import { Composition, Folder } from "remotion";
import { Convite } from "./Convite";
import { Estante } from "./Estante";
import { LancamentoVideo } from "./LancamentoVideo";
import { LinhaEscreve } from "./LinhaEscreve";
import { PrimeiraLinha } from "./PrimeiraLinha";
import { Regua } from "./Regua";
import { dur } from "./ritmo";
import { DURACAO, ReelsLancamento } from "./reels/ReelsLancamento";
import { DURACAO_RITMO, ReelsRitmo } from "./reels/ReelsRitmo";
import { Capa, Foto1, Foto2, Foto3, Foto4, Obrigado } from "./carrossel/Slides";

// Vertical 1080x1920 para Stories e Reels. Durações base multiplicadas por LENTO (ritmo.ts): cenas menos as 4 transições
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Cenas">
        <Composition id="PrimeiraLinha" component={PrimeiraLinha} width={1080} height={1920} fps={30} durationInFrames={dur(140)} />
        <Composition id="LinhaEscreve" component={LinhaEscreve} width={1080} height={1920} fps={30} durationInFrames={dur(110)} />
        <Composition id="Regua" component={Regua} width={1080} height={1920} fps={30} durationInFrames={dur(125)} />
        <Composition id="Estante" component={Estante} width={1080} height={1920} fps={30} durationInFrames={dur(140)} />
        <Composition id="Convite" component={Convite} width={1080} height={1920} fps={30} durationInFrames={dur(200)} />
      </Folder>
      <Folder name="Carrossel-lancamento">
        <Composition id="Carrossel-01-capa" component={Capa} width={1080} height={1350} fps={30} durationInFrames={1} />
        <Composition id="Carrossel-02" component={Foto1} width={1080} height={1350} fps={30} durationInFrames={1} />
        <Composition id="Carrossel-03" component={Foto2} width={1080} height={1350} fps={30} durationInFrames={1} />
        <Composition id="Carrossel-04" component={Foto3} width={1080} height={1350} fps={30} durationInFrames={1} />
        <Composition id="Carrossel-05" component={Foto4} width={1080} height={1350} fps={30} durationInFrames={1} />
        <Composition id="Carrossel-06-obrigado" component={Obrigado} width={1080} height={1350} fps={30} durationInFrames={1} />
      </Folder>
      <Composition id="ReelsLancamento" component={ReelsLancamento} width={1080} height={1920} fps={30} durationInFrames={DURACAO} />
      <Composition id="ReelsRitmo" component={ReelsRitmo} width={1080} height={1920} fps={30} durationInFrames={DURACAO_RITMO} />
      <Composition id="LancamentoLinhaEditora" component={LancamentoVideo} width={1080} height={1920} fps={30} durationInFrames={dur(140) + dur(110) + dur(125) + dur(140) + dur(200) - 4 * dur(18)} />
    </>
  );
};
