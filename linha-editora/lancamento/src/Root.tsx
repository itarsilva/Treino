import React from "react";
import { Composition } from "remotion";
import { lancamentoPadrao } from "./data";
import { DURACAO_TOTAL, Lancamento } from "./Lancamento";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Lancamento-Reels"
        component={Lancamento}
        durationInFrames={DURACAO_TOTAL}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={lancamentoPadrao}
      />
      <Composition
        id="Lancamento-Feed"
        component={Lancamento}
        durationInFrames={DURACAO_TOTAL}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={lancamentoPadrao}
      />
    </>
  );
};
