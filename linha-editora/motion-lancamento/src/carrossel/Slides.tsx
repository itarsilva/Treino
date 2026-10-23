import { AbsoluteFill, Img, staticFile } from "remotion";
import { jost, mono, spectral } from "../fonts";
import { Simbolo } from "../Simbolo";
import { Assinatura, Linhas, SlideFoto } from "./Pecas";

// 01 · Capa: o lançamento, com a foto dos dois títulos em mãos.
export const Capa: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#001F3F" }}>
    <div style={{ position: "absolute", top: 80, left: 80, right: 80, display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 26, letterSpacing: 7 }}>
      <span style={{ color: "#F8F8F8" }}>LINHA EDITORA</span>
      <span style={{ color: "#A8A9AD" }}>21.10.2026</span>
    </div>
    <div style={{ position: "absolute", top: 170, left: 80, fontFamily: jost, fontWeight: 300, fontSize: 150, lineHeight: 1, letterSpacing: -3, color: "#F8F8F8" }}>Lançamento</div>
    <div style={{ position: "absolute", top: 345, left: 80, fontFamily: spectral, fontStyle: "italic", fontSize: 46, lineHeight: 1.3, color: "#F8F8F8" }}>
      A primeira linha da nossa história.
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, top: 450, height: 780, overflow: "hidden" }}>
      <Img src={staticFile("fotos/foto10.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 0%" }} />
    </div>
    <div style={{ position: "absolute", left: 80, bottom: 60 }}>
      <Linhas n={24} altura={42} cor="#A8A9AD" espaco={14} />
    </div>
    <div style={{ position: "absolute", right: 80, bottom: 60 }}>
      <Simbolo altura={52} corLombada="#FFFFFF" corPrata="#A8A9AD" animar={false} />
    </div>
  </AbsoluteFill>
);

// 02 a 05 · Fotos do lançamento
export const Foto1: React.FC = () => (
  <SlideFoto foto="fotos/foto11.jpg" posicao="50% 0%" numero="02" rotulo="O LANÇAMENTO"
    legenda={<>O lançamento da casa e dos seus <i>três primeiros títulos</i>, na Livraria da Vila.</>} />
);
export const Foto2: React.FC = () => (
  <SlideFoto foto="fotos/foto9.jpg" posicao="50% 0%" numero="03" rotulo="ENCONTROS"
    legenda={<>Toda história começa por uma linha, e por quem está ao lado.</>} />
);
export const Foto3: React.FC = () => (
  <SlideFoto foto="fotos/foto12.jpg" posicao="50% 0%" numero="04" rotulo="LEITORES"
    legenda={<>Leitores, colegas e amigos que vieram celebrar com a gente.</>} />
);
export const Foto4: React.FC = () => (
  <SlideFoto foto="fotos/foto13.jpg" posicao="50% 0%" numero="05" rotulo="NOVOS TÍTULOS"
    legenda={<><i>Direito Processual e Capitalismo</i>, 2ª edição, nas mãos de quem lê.</>} />
);

// 06 · Agradecimento e assinatura
export const Obrigado: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#001F3F" }}>
    <div style={{ position: "absolute", top: 0, left: 80 }}>
      <Linhas n={28} altura={260} cor="#A8A9AD" espaco={30} />
    </div>
    <div style={{ position: "absolute", top: 400, left: 80, fontFamily: mono, fontSize: 28, letterSpacing: 8, color: "#A8A9AD" }}>06 · OBRIGADO</div>
    <div style={{ position: "absolute", top: 460, left: 80, right: 80, fontFamily: jost, fontWeight: 300, fontSize: 104, lineHeight: 1.08, color: "#F8F8F8" }}>
      Obrigado a todos que escreveram essa linha com a gente.
    </div>
    <div style={{ position: "absolute", top: 830, left: 80, fontFamily: spectral, fontStyle: "italic", fontSize: 46, color: "#F8F8F8" }}>
      Toda história começa por uma linha.
    </div>
    <div style={{ position: "absolute", left: 80, bottom: 190 }}>
      <Assinatura escala={0.85} cor="#FFFFFF" corPrata="#A8A9AD" animar={false} />
    </div>
    <div style={{ position: "absolute", left: 80, right: 80, bottom: 80, paddingTop: 28, borderTop: "1px solid rgba(168,169,173,0.45)", fontFamily: mono, fontSize: 26, letterSpacing: 6, color: "#A8A9AD" }}>
      LINHAEDITORA.COM.BR
    </div>
  </AbsoluteFill>
);
