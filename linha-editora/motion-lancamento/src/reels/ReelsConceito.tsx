import { linearTiming, TransitionSeries } from "@remotion/transitions";
import type { TransitionPresentation, TransitionPresentationComponentProps } from "@remotion/transitions";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Assinatura } from "../Assinatura";
import { jost, mono, spectral } from "../fonts";
import { persiana } from "../Persiana";

// Reels conceito (1080 × 1920): a noite do lançamento contada como um livro.
// A linha da marca é o fio condutor: abre o livro, vira as páginas, liga as pessoas que se encontram
// e vira o traço da assinatura. Ritmo calmo; o movimento está nas transições, não na velocidade.

const AZUL = "#001F3F", PRATA = "#A8A9AD", OFF = "#F8F8F8";
const W = 1080, H = 1920;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const suave = Easing.bezier(0.65, 0, 0.35, 1);
const sai = Easing.bezier(0.16, 1, 0.3, 1);
const faixa = (p: number, a: number, b: number, e = suave) => interpolate(p, [a, b], [0, 1], { ...clamp, easing: e });

// ── Transições, todas feitas de linha ──────────────────────────────────────────

// Abrir o livro: uma linha atravessa o meio da tela e se abre para cima e para baixo.
const AbrirLivro: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const risca = faixa(p, 0, 0.4), abre = faixa(p, 0.35, 1);
  const meio = (1 - abre) * 50;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(${meio}% 0 ${meio}% 0)` }}>{children}</AbsoluteFill>
      {abre < 1 && <>
        <div style={{ position: "absolute", left: (W - W * risca) / 2, width: W * risca, top: H * (meio / 100) - 2, height: 4, backgroundColor: OFF }} />
        <div style={{ position: "absolute", left: (W - W * risca) / 2, width: W * risca, bottom: H * (meio / 100) - 2, height: 4, backgroundColor: OFF }} />
      </>}
    </AbsoluteFill>
  );
};

// Virar a página: a cena nova entra pela direita com uma borda de papel; a anterior recua e escurece.
const Pagina: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({ children, presentationDirection, presentationProgress: p }) => {
  const e = suave(p);
  if (presentationDirection === "exiting") {
    return (
      <AbsoluteFill style={{ transform: `translateX(${-e * W * 0.3}px)` }}>
        {children}
        <AbsoluteFill style={{ backgroundColor: AZUL, opacity: e * 0.7 }} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ transform: `translateX(${(1 - e) * W}px)`, boxShadow: "-40px 0 80px rgba(0,0,0,0.45)" }}>
      {children}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, backgroundColor: OFF, opacity: 1 - e }} />
    </AbsoluteFill>
  );
};

// Lombada: a cena nova nasce de uma lombada vertical no centro, que se alarga até ocupar a tela.
const Lombada: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") {
    return <AbsoluteFill style={{ transform: `scale(${1 - 0.06 * suave(p)})` }}>{children}</AbsoluteFill>;
  }
  const sobe = faixa(p, 0, 0.35, sai), abre = faixa(p, 0.3, 1);
  const lado = (1 - abre) * 50 - (abre === 0 ? 0 : 0);
  const larg = Math.max(6, W * abre);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(${(1 - sobe) * 100}% ${lado}% 0 ${lado}%)` }}>{children}</AbsoluteFill>
      {abre < 1 && <>
        <div style={{ position: "absolute", left: (W - larg) / 2 - 3, bottom: 0, width: 4, height: H * sobe, backgroundColor: OFF }} />
        <div style={{ position: "absolute", left: (W + larg) / 2 - 1, bottom: 0, width: 4, height: H * sobe, backgroundColor: OFF }} />
      </>}
    </AbsoluteFill>
  );
};

// Traço: uma linha à mão atravessa a tela, engrossa até virar página em branco e revela a cena nova.
const TRACO = "M -80 1180 C 160 980, 300 1320, 520 1080 S 860 820, 1160 1000";
const Traco: React.FC<TransitionPresentationComponentProps<Record<string, never>>> = ({ children, presentationDirection, presentationProgress: p }) => {
  if (presentationDirection === "exiting") return <AbsoluteFill>{children}</AbsoluteFill>;
  const desenha = faixa(p, 0, 0.4), engrossa = faixa(p, 0.35, 0.65, Easing.in(Easing.cubic)), some = faixa(p, 0.6, 1);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: engrossa >= 1 ? 1 : 0 }}>{children}</AbsoluteFill>
      <svg width={W} height={H} style={{ position: "absolute", opacity: 1 - some }}>
        <path d={TRACO} fill="none" stroke={OFF} strokeLinecap="round" strokeWidth={6 + engrossa * 2600} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - desenha} />
      </svg>
    </AbsoluteFill>
  );
};

const t = (component: React.FC<TransitionPresentationComponentProps<Record<string, never>>>): TransitionPresentation<Record<string, never>> => ({ component, props: {} });
const abrirLivro = t(AbrirLivro), pagina = t(Pagina), lombada = t(Lombada), traco = t(Traco);

// ── Peças das cenas ────────────────────────────────────────────────────────────

type Midia = { foto: string } | { video: string; inicio: number; vel?: number };

const Fundo: React.FC<{ m: Midia; dur: number }> = ({ m, dur }) => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, dur], [1.0, 1.07]);
  const s = { width: "100%", height: "100%", objectFit: "cover" as const, objectPosition: "50% 20%" };
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 0%" }}>
      {"foto" in m
        ? <Img src={staticFile(m.foto)} style={s} />
        : <OffthreadVideo src={staticFile(`videos/${m.video}.mp4`)} startFrom={m.inicio} playbackRate={m.vel ?? 1} muted style={s} />}
    </AbsoluteFill>
  );
};

// Cabeçalho corrido de livro: nome da casa à esquerda, capítulo à direita, fio prata embaixo.
const Cabecalho: React.FC<{ capitulo: string }> = ({ capitulo }) => (
  <div style={{ position: "absolute", left: 80, right: 80, top: 110 }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 24, letterSpacing: 6, color: OFF }}>
      <span>LINHA EDITORA</span><span style={{ color: PRATA }}>{capitulo}</span>
    </div>
    <div style={{ height: 1, backgroundColor: `${OFF}80`, marginTop: 18 }} />
  </div>
);

// Texto da cena: rótulo em mono, fio que se estende, frase em Spectral.
const Texto: React.FC<{ rotulo?: string; frase: string; grande?: boolean }> = ({ rotulo, frase, grande }) => {
  const f = useCurrentFrame();
  return (
    <>
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${AZUL}e6 0%, ${AZUL}8c 22%, ${AZUL}00 42%)` }} />
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 200 }}>
        {rotulo && <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: 8, color: PRATA, opacity: faixa(f, 20, 40) }}>{rotulo}</div>}
        <div style={{ height: 2, backgroundColor: PRATA, marginTop: 20, width: `${faixa(f, 26, 70, sai) * 100}%` }} />
        <div style={{ fontFamily: grande ? jost : spectral, fontWeight: grande ? 300 : 400, fontSize: grande ? 110 : 60, letterSpacing: grande ? -3 : 0, lineHeight: 1.15, color: OFF, marginTop: 24, opacity: faixa(f, 34, 60), transform: `translateY(${(1 - faixa(f, 34, 64, sai)) * 30}px)` }}>{frase}</div>
      </div>
    </>
  );
};

// A linha que conecta: dois pontos acima das cabeças e um fio que se desenha entre eles.
const Conecta: React.FC<{ a: [number, number]; b: [number, number] }> = ({ a, b }) => {
  const f = useCurrentFrame();
  const pa = faixa(f, 30, 42, sai), pb = faixa(f, 40, 52, sai), fio = faixa(f, 48, 90);
  const meio: [number, number] = [(a[0] + b[0]) / 2, Math.min(a[1], b[1]) - 140];
  const d = `M ${a[0]} ${a[1]} Q ${meio[0]} ${meio[1]} ${b[0]} ${b[1]}`;
  return (
    <svg width={W} height={H} style={{ position: "absolute" }}>
      <path d={d} fill="none" stroke={OFF} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - fio} />
      <circle cx={a[0]} cy={a[1]} r={12 * pa} fill={OFF} />
      <circle cx={b[0]} cy={b[1]} r={12 * pb} fill={OFF} />
      <circle cx={a[0]} cy={a[1]} r={12 + 30 * pa} fill="none" stroke={OFF} strokeWidth={2} opacity={1 - pa} />
    </svg>
  );
};

type Cena = { m: Midia; dur: number; capitulo: string; rotulo?: string; frase: string; grande?: boolean; liga?: [[number, number], [number, number]] };

const CenaFoto: React.FC<{ c: Cena }> = ({ c }) => (
  <AbsoluteFill style={{ backgroundColor: AZUL }}>
    <Fundo m={c.m} dur={c.dur} />
    {c.liga && <Conecta a={c.liga[0]} b={c.liga[1]} />}
    <Texto rotulo={c.rotulo} frase={c.frase} grande={c.grande} />
    <Cabecalho capitulo={c.capitulo} />
  </AbsoluteFill>
);

// ── Prólogo e epílogo em azul marinho ─────────────────────────────────────────

const Prologo: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <div style={{ position: "absolute", left: 80, top: 760, fontFamily: spectral, fontStyle: "italic", fontSize: 64, color: OFF, opacity: faixa(f, 10, 40) }}>Toda história</div>
      <div style={{ position: "absolute", left: 0, top: H / 2 - 2, height: 4, width: W * faixa(f, 30, 90), backgroundColor: OFF }} />
      <div style={{ position: "absolute", left: 80, top: 1000, fontFamily: spectral, fontStyle: "italic", fontSize: 64, color: OFF, opacity: faixa(f, 60, 90) }}>começa por uma linha.</div>
      <div style={{ position: "absolute", left: 80, bottom: 160, fontFamily: mono, fontSize: 26, letterSpacing: 8, color: PRATA, opacity: faixa(f, 20, 50) }}>21.10.2026 · LIVRARIA DA VILA</div>
    </AbsoluteFill>
  );
};

const Estante: React.FC<{ dur: number; lombadas: string[] }> = ({ dur, lombadas: LOMBADAS }) => {
  const f = useCurrentFrame();
  const n = LOMBADAS.length, vao = 12, lw = (W - vao * (n - 1)) / n;
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {LOMBADAS.map((foto, i) => {
        const entra = faixa(f, i * 6, i * 6 + 40, sai);
        const dir = i % 2 === 0 ? 1 : -1;
        const corre = interpolate(f, [0, dur], [-120, 120]) * dir;
        return (
          <div key={i} style={{ position: "absolute", left: i * (lw + vao), top: 0, width: lw, height: H, overflow: "hidden", clipPath: `inset(${dir > 0 ? (1 - entra) * 100 : 0}% 0 ${dir < 0 ? (1 - entra) * 100 : 0}% 0)` }}>
            <Img src={staticFile(foto)} style={{ position: "absolute", left: -lw * 1.6, top: -140 + corre, width: lw * 4.2, height: H + 280, objectFit: "cover", objectPosition: "50% 20%" }} />
          </div>
        );
      })}
      <Texto rotulo="EPÍLOGO" frase="Leitores, autores, amigos." />
      <Cabecalho capitulo="EPÍLOGO" />
    </AbsoluteFill>
  );
};

const Fechamento: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <div style={{ position: "absolute", left: 80, top: 640, right: 80 }}>
        <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: 8, color: PRATA, opacity: faixa(f, 10, 30) }}>OBRIGADO</div>
        <div style={{ height: 2, backgroundColor: PRATA, marginTop: 22, width: `${faixa(f, 14, 60, sai) * 100}%` }} />
        <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 100, lineHeight: 1.1, letterSpacing: -3, color: OFF, marginTop: 30, opacity: faixa(f, 24, 50) }}>A linha que conecta histórias.</div>
      </div>
      <div style={{ position: "absolute", right: 80, bottom: 300 }}>
        <Assinatura escala={0.9} cor={OFF} corPrata={PRATA} inicio={30} />
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 170, borderTop: `2px solid ${PRATA}`, paddingTop: 24, fontFamily: mono, fontSize: 28, letterSpacing: 7, color: OFF, opacity: faixa(f, 70, 90) }}>
        LINHAEDITORA.COM.BR
      </div>
    </AbsoluteFill>
  );
};

// ── Roteiro ───────────────────────────────────────────────────────────────────

const CENAS: Cena[] = [
  { m: { video: "v184803", inicio: 0 }, dur: 150, capitulo: "CAPÍTULO I", rotulo: "CAPÍTULO I · A CHEGADA", frase: "Lançamento", grande: true },
  { m: { video: "v195734", inicio: 30 }, dur: 135, capitulo: "CAPÍTULO I", frase: "Uma livraria cheia para a primeira página." },
  { m: { foto: "fotos/f20.jpg" }, dur: 150, capitulo: "CAPÍTULO II", rotulo: "CAPÍTULO II · OS ENCONTROS", frase: "A linha que conecta histórias.", liga: [[355, 470], [900, 745]] },
  { m: { foto: "fotos/f19.jpg" }, dur: 135, capitulo: "CAPÍTULO II", frase: "Conversas que viram capítulos.", liga: [[300, 630], [675, 640]] },
  { m: { foto: "fotos/f21.jpg" }, dur: 135, capitulo: "CAPÍTULO II", frase: "Quem lê, quem escreve.", liga: [[221, 540], [562, 580]] },
  { m: { video: "v192106", inicio: 90 }, dur: 110, capitulo: "CAPÍTULO III", rotulo: "CAPÍTULO III · A ASSINATURA", frase: "Instituições de Direito Público e Privado." },
  { m: { video: "v192106", inicio: 222, vel: 0.4 }, dur: 144, capitulo: "CAPÍTULO III", rotulo: "AUTOR", frase: "Marcelo Grillo", grande: true },
];
// Transição de entrada de cada cena (a primeira é a que sai do prólogo).
type Qualquer = TransitionPresentation<Record<string, unknown>>;
type Roteiro = { cenas: Cena[]; entradas: Qualquer[]; lombadas: string[]; som: boolean };

const ROTEIROS: Record<"completa" | "ultimos", Roteiro> = {
  // Versão com os vídeos da noite e as fotos.
  completa: {
    cenas: CENAS,
    entradas: [abrirLivro, pagina, lombada, persiana({ faixas: 14 }), pagina, lombada, traco] as unknown as Qualquer[],
    lombadas: ["fotos/foto9.jpg", "fotos/f20.jpg", "fotos/foto11.jpg", "fotos/f22.jpg", "fotos/foto12.jpg", "fotos/f19.jpg"],
    som: true,
  },
  // Versão só com o último material enviado (f19 a f22); sem som, porque chegou como imagem.
  ultimos: {
    cenas: [
      { m: { foto: "fotos/f20.jpg" }, dur: 165, capitulo: "CAPÍTULO I", rotulo: "CAPÍTULO I · OS ENCONTROS", frase: "A linha que conecta histórias.", liga: [[355, 470], [900, 745]] },
      { m: { foto: "fotos/f19.jpg" }, dur: 150, capitulo: "CAPÍTULO I", frase: "Conversas que viram capítulos.", liga: [[300, 630], [675, 640]] },
      { m: { foto: "fotos/f22.jpg" }, dur: 150, capitulo: "CAPÍTULO II", rotulo: "CAPÍTULO II · AS VOZES", frase: "Cada leitor traz a sua história.", liga: [[403, 620], [720, 600]] },
      { m: { foto: "fotos/f21.jpg" }, dur: 165, capitulo: "CAPÍTULO III", rotulo: "CAPÍTULO III · QUEM ESCREVE", frase: "Quem lê, quem escreve.", liga: [[221, 540], [562, 580]] },
    ],
    entradas: [abrirLivro, pagina, lombada, traco] as unknown as Qualquer[],
    lombadas: ["fotos/f20.jpg", "fotos/f19.jpg", "fotos/f22.jpg", "fotos/f21.jpg"],
    som: false,
  },
};
const TR = 34, PROLOGO = 130, ESTANTE = 150, FECHA = 180;
export const duracaoConceito = (versao: keyof typeof ROTEIROS) => {
  const c = ROTEIROS[versao].cenas;
  return PROLOGO + c.reduce((s, x) => s + x.dur, 0) + ESTANTE + FECHA - (c.length + 2) * TR;
};
export const DURACAO_CONCEITO = duracaoConceito("completa");

export const ReelsConceito: React.FC<{ versao?: keyof typeof ROTEIROS }> = ({ versao = "completa" }) => {
  const f = useCurrentFrame();
  const r = ROTEIROS[versao], total = duracaoConceito(versao);
  const vol = interpolate(f, [0, 30, total - 50, total], [0, 0.3, 0.3, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {/* som ambiente da festa, contínuo e baixo */}
      {r.som && <>
        <Audio src={staticFile("videos/v184803.mp4")} volume={vol} />
        <Sequence from={450}><Audio src={staticFile("videos/v195734.mp4")} volume={vol} /></Sequence>
        <Sequence from={880}><Audio src={staticFile("videos/v183108.mp4")} volume={vol} /></Sequence>
      </>}
      <TransitionSeries>
        <TransitionSeries.Sequence name="Prólogo" durationInFrames={PROLOGO}><Prologo /></TransitionSeries.Sequence>
        {r.cenas.flatMap((c, i) => [
          <TransitionSeries.Transition key={`t${i}`} presentation={r.entradas[i]} timing={linearTiming({ durationInFrames: TR })} />,
          <TransitionSeries.Sequence key={`c${i}`} name={c.frase} durationInFrames={c.dur}><CenaFoto c={c} /></TransitionSeries.Sequence>,
        ])}
        <TransitionSeries.Transition presentation={abrirLivro as unknown as Qualquer} timing={linearTiming({ durationInFrames: TR })} />
        <TransitionSeries.Sequence name="Epílogo" durationInFrames={ESTANTE}><Estante dur={ESTANTE} lombadas={r.lombadas} /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={persiana({ faixas: 18 })} timing={linearTiming({ durationInFrames: TR })} />
        <TransitionSeries.Sequence name="Fechamento" durationInFrames={FECHA}><Fechamento /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
