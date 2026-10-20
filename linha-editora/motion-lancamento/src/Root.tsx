import { Composition, Folder } from "remotion";
import { Convite } from "./Convite";
import { Estante } from "./Estante";
import { LancamentoVideo } from "./LancamentoVideo";
import { LinhaEscreve } from "./LinhaEscreve";
import { PrimeiraLinha } from "./PrimeiraLinha";
import { Regua } from "./Regua";

// Vertical 1080x1920 para Stories e Reels. Duração: 140 + 110 + 125 + 140 + 200 − 4 transições de 18 = 643 quadros
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Cenas">
        <Composition id="PrimeiraLinha" component={PrimeiraLinha} width={1080} height={1920} fps={30} durationInFrames={140} />
        <Composition id="LinhaEscreve" component={LinhaEscreve} width={1080} height={1920} fps={30} durationInFrames={110} />
        <Composition id="Regua" component={Regua} width={1080} height={1920} fps={30} durationInFrames={125} />
        <Composition id="Estante" component={Estante} width={1080} height={1920} fps={30} durationInFrames={140} />
        <Composition id="Convite" component={Convite} width={1080} height={1920} fps={30} durationInFrames={200} />
      </Folder>
      <Composition id="LancamentoLinhaEditora" component={LancamentoVideo} width={1080} height={1920} fps={30} durationInFrames={643} />
    </>
  );
};
