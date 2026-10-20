import { Composition, Folder } from "remotion";
import { Convite } from "./Convite";
import { Estante } from "./Estante";
import { LancamentoVideo } from "./LancamentoVideo";
import { LinhaEscreve } from "./LinhaEscreve";
import { PrimeiraLinha } from "./PrimeiraLinha";
import { Regua } from "./Regua";
import { dur } from "./ritmo";

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
      <Composition id="LancamentoLinhaEditora" component={LancamentoVideo} width={1080} height={1920} fps={30} durationInFrames={dur(140) + dur(110) + dur(125) + dur(140) + dur(200) - 4 * dur(18)} />
    </>
  );
};
