import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { Assinatura } from "../Assinatura";
import { jost, mono, spectral } from "../fonts";
import { persiana } from "../Persiana";

// Reels do lançamento (1080 × 1920): vídeos da noite costurados pela persiana de linhas da marca,
// com rótulos em IBM Plex Mono, frases em Spectral e abertura e fechamento em azul marinho.

const AZUL = "#001F3F", PRATA = "#A8A9AD", OFF = "#F8F8F8";
const T = 18; // duração da transição

type Clipe = { video: string; inicio: number; dur: number; numero: string; rotulo: string; frase?: string; vel?: number };

export const CLIPES: Clipe[] = [
  { video: "v184803", inicio: 0, dur: 120, numero: "01", rotulo: "LIVRARIA DA VILA", frase: "A noite do lançamento." },
  { video: "v195734", inicio: 0, dur: 165, numero: "02", rotulo: "A CASA CHEIA", frase: "Leitores, colegas e amigos." },
  { video: "v183108", inicio: 30, dur: 150, numero: "03", rotulo: "A FILA DE AUTÓGRAFOS" },
  // No vídeo do autógrafo a câmera corta o rosto entre 1 s e 7 s: esse trecho entra só como detalhe do livro,
  // e o Marcelo aparece inteiro no final do vídeo (7,4 s em diante), em câmera lenta.
  { video: "v192106", inicio: 90, dur: 100, numero: "04", rotulo: "AUTÓGRAFOS", frase: "Dedicatórias da primeira noite." },
  { video: "v192106", inicio: 222, dur: 95, vel: 0.6, numero: "05", rotulo: "MARCELO GRILLO", frase: "Autor de Instituições de Direito Público e Privado." },
  { video: "v184803", inicio: 240, dur: 180, numero: "06", rotulo: "ENCONTROS", frase: "Toda história começa por uma linha." },
];
export const ABERTURA = 105, FECHAMENTO = 150;
export const DURACAO = ABERTURA + FECHAMENTO + CLIPES.reduce((s, c) => s + c.dur, 0) - (CLIPES.length + 1) * T;

const sobe = (f: number, a: number) => interpolate(f, [a, a + 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

// Linhas verticais que crescem da base, em ritmo irregular, como lombadas.
const Linhas: React.FC<{ n: number; altura: number; cor: string; inicio: number }> = ({ n, altura, cor, inicio }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: altura }}>
      {Array.from({ length: n }).map((_, i) => {
        const h = altura * (i % 5 === 0 ? 1 : 0.5 + 0.4 * Math.abs(Math.sin(i * 1.3)));
        return <div key={i} style={{ width: 3, borderRadius: 2, backgroundColor: cor, height: h * sobe(f, inicio + i * 1.5) }} />;
      })}
    </div>
  );
};

const Abertura: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL, padding: 90, justifyContent: "center" }}>
      <div style={{ fontFamily: mono, fontSize: 30, letterSpacing: 8, color: PRATA, opacity: sobe(f, 8) }}>21.10.2026 · LIVRARIA DA VILA</div>
      <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 170, letterSpacing: -4, color: OFF, marginTop: 30, opacity: sobe(f, 18), transform: `translateY(${(1 - sobe(f, 18)) * 40}px)` }}>Lançamento</div>
      <div style={{ fontFamily: spectral, fontStyle: "italic", fontSize: 52, color: OFF, marginTop: 20, opacity: sobe(f, 32) }}>A primeira linha da nossa história.</div>
      <div style={{ position: "absolute", left: 90, bottom: 160 }}>
        <Linhas n={30} altura={70} cor={PRATA} inicio={10} />
      </div>
    </AbsoluteFill>
  );
};

const CenaVideo: React.FC<{ c: Clipe }> = ({ c }) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, c.dur], [1.0, 1.06]);
  const volume = interpolate(f, [0, 12, c.dur - 12, c.dur], [0, 0.45, 0.45, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const linha = interpolate(f, [10, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 0%" }}>
        <OffthreadVideo src={staticFile(`videos/${c.video}.mp4`)} startFrom={c.inicio} playbackRate={c.vel ?? 1} volume={volume} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      {/* véu azul na base para a leitura do texto */}
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${AZUL}e6 0%, ${AZUL}99 22%, ${AZUL}00 42%)` }} />
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 190 }}>
        <div style={{ display: "flex", gap: 22, fontFamily: mono, fontSize: 28, letterSpacing: 7, opacity: sobe(f, 8) }}>
          <span style={{ color: OFF }}>{c.numero}</span>
          <span style={{ color: PRATA }}>{c.rotulo}</span>
        </div>
        <div style={{ height: 2, backgroundColor: PRATA, marginTop: 22, width: `${linha * 100}%` }} />
        {c.frase && (
          <div style={{ fontFamily: spectral, fontSize: 58, lineHeight: 1.25, color: OFF, marginTop: 26, opacity: sobe(f, 20), transform: `translateY(${(1 - sobe(f, 20)) * 24}px)` }}>{c.frase}</div>
        )}
      </div>
      {/* régua de tempo no topo: avança durante a cena */}
      <div style={{ position: "absolute", top: 110, left: 80, right: 80, height: 2, backgroundColor: `${OFF}40` }}>
        <div style={{ height: 2, backgroundColor: OFF, width: `${(f / (c.dur - 1)) * 100}%` }} />
      </div>
      <div style={{ position: "absolute", top: 136, left: 80, fontFamily: mono, fontSize: 24, letterSpacing: 6, color: OFF, opacity: 0.85 }}>LINHA EDITORA</div>
      <div style={{ position: "absolute", top: 136, right: 80, fontFamily: mono, fontSize: 24, letterSpacing: 6, color: OFF, opacity: 0.85 }}>21.10.2026</div>
    </AbsoluteFill>
  );
};

const Fechamento: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL, padding: 90 }}>
      <div style={{ position: "absolute", top: 200, left: 90 }}>
        <Linhas n={30} altura={70} cor={PRATA} inicio={0} />
      </div>
      <div style={{ position: "absolute", top: 560, left: 90, right: 90 }}>
        <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: 7, color: PRATA, opacity: sobe(f, 8) }}>OBRIGADO</div>
        <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 92, lineHeight: 1.1, letterSpacing: -2, color: OFF, marginTop: 30, opacity: sobe(f, 16) }}>
          A todos que escreveram essa linha com a gente.
        </div>
        <div style={{ fontFamily: spectral, fontStyle: "italic", fontSize: 46, color: PRATA, marginTop: 40, opacity: sobe(f, 34) }}>Toda história começa por uma linha.</div>
      </div>
      <div style={{ position: "absolute", right: 90, bottom: 300, opacity: sobe(f, 40) }}>
        <Assinatura escala={0.9} cor={OFF} corPrata={PRATA} inicio={40} />
      </div>
      <div style={{ position: "absolute", left: 90, right: 90, bottom: 170, borderTop: `2px solid ${PRATA}`, paddingTop: 24, fontFamily: mono, fontSize: 28, letterSpacing: 7, color: OFF, opacity: sobe(f, 60) }}>
        LINHAEDITORA.COM.BR
      </div>
    </AbsoluteFill>
  );
};

export const ReelsLancamento: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence name="Abertura" durationInFrames={ABERTURA}>
      <Abertura />
    </TransitionSeries.Sequence>
    {CLIPES.flatMap((c, i) => [
      <TransitionSeries.Transition key={`t${i}`} presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: T })} />,
      <TransitionSeries.Sequence key={`s${i}`} name={c.rotulo} durationInFrames={c.dur}>
        <CenaVideo c={c} />
      </TransitionSeries.Sequence>,
    ])}
    <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: T })} />
    <TransitionSeries.Sequence name="Fechamento" durationInFrames={FECHAMENTO}>
      <Fechamento />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
