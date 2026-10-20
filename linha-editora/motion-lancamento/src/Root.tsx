import { Composition, Folder } from "remotion";
import { Abertura } from "./Abertura";
import { Amanha } from "./Amanha";
import { Convite } from "./Convite";
import { Lancamento } from "./Lancamento";
import { LancamentoVideo } from "./LancamentoVideo";
import { Titulos } from "./Titulos";

// Vertical 1080x1920 para Stories e Reels. Duração: 75 + 95 + 115 + 130 + 165 − 4 transições de 15 = 520 quadros
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Cenas">
        <Composition id="Abertura" component={Abertura} width={1080} height={1920} fps={30} durationInFrames={75} />
        <Composition id="Amanha" component={Amanha} width={1080} height={1920} fps={30} durationInFrames={95} />
        <Composition id="Lancamento" component={Lancamento} width={1080} height={1920} fps={30} durationInFrames={115} />
        <Composition id="Titulos" component={Titulos} width={1080} height={1920} fps={30} durationInFrames={130} />
        <Composition id="Convite" component={Convite} width={1080} height={1920} fps={30} durationInFrames={165} />
      </Folder>
      <Composition id="LancamentoLinhaEditora" component={LancamentoVideo} width={1080} height={1920} fps={30} durationInFrames={520} />
    </>
  );
};
