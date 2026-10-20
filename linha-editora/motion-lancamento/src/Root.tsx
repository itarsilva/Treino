import { Composition, Folder } from "remotion";
import { Amanha } from "./Amanha";
import { Convite } from "./Convite";
import { Lancamento } from "./Lancamento";
import { LancamentoVideo } from "./LancamentoVideo";
import { Livros } from "./Livros";

// Vertical 1080x1920 para Stories e Reels. Duração total: 90 + 110 + 110 + 150 − 3 transições de 15 = 415 quadros
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Cenas">
        <Composition id="Amanha" component={Amanha} width={1080} height={1920} fps={30} durationInFrames={90} />
        <Composition id="Lancamento" component={Lancamento} width={1080} height={1920} fps={30} durationInFrames={110} />
        <Composition id="Livros" component={Livros} width={1080} height={1920} fps={30} durationInFrames={110} />
        <Composition id="Convite" component={Convite} width={1080} height={1920} fps={30} durationInFrames={150} />
      </Folder>
      <Composition id="LancamentoLinhaEditora" component={LancamentoVideo} width={1080} height={1920} fps={30} durationInFrames={415} />
    </>
  );
};
