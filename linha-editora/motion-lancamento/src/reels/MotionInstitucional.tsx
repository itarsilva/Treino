import { AbsoluteFill, Audio, Easing, interpolate, Sequence, spring, staticFile, useVideoConfig } from "remotion";
import { Assinatura } from "../Assinatura";
import { jost, mono } from "../fonts";
import { Simbolo } from "../Simbolo";
import { batida, Corte, ENTRA, Flutua, LinhasFrente, Ritmo, Rotulo, useQuadro, type Entrada } from "./MotionEngaja";

// Motion institucional da Linha Editora (1080 × 1920, 30 s), só com a linguagem gráfica da marca.
// Trilha original (musica/compor.py) a 90 BPM. Os tempos abaixo estão em quadros-base de 120 BPM
// (um tempo = 15, um compasso = 60) e são esticados por L = 4/3 no vídeo final (40 s).
//   0–120    gancho: "Qual história você quer contar?" sobre letreiros vazados em profundidade
//   120–360  drop: símbolo, estante, páginas e a linha que escreve, um por compasso
//   360–600  os atributos da marca, um a cada meio compasso, alternando azul e branco
//   600–720  respiro: lombadas dos títulos flutuando e o conceito da marca
//   720–900  final: assinatura e pergunta para os comentários

const AZUL = "#001F3F", PRATA = "#A8A9AD", OFF = "#F8F8F8";
const W = 1080, H = 1920;
const TEMPO = 15, COMPASSO = 60;
const L = 4 / 3;
const q = (n: number) => Math.round(n * L);
export const DURACAO_INSTITUCIONAL = q(900);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const sai = Easing.bezier(0.16, 1, 0.3, 1);

// Letreiro vazado gigante que atravessa a tela devagar, como camada de fundo.
const Letreiro: React.FC<{ texto: string; y: number; tam: number; vel: number; cor: string; opacidade: number }> = ({ texto, y, tam, vel, cor, opacidade }) => {
  const f = useQuadro();
  return (
    <div style={{ position: "absolute", top: y, left: 0, whiteSpace: "nowrap", fontFamily: jost, fontWeight: 300, fontSize: tam, lineHeight: 1, letterSpacing: -tam * 0.03, color: "transparent", WebkitTextStroke: `2px ${cor}`, opacity: opacidade, transform: `translateX(${(vel > 0 ? -W : 0) + f * vel}px)` }}>
      {`${texto} ${texto} ${texto}`}
    </div>
  );
};

// ── 1 · Gancho ───────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const f = useQuadro();
  const risco = interpolate(f, [96, 116], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const clarao = interpolate(f, [112, 120], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <Letreiro texto="Linha" y={120} tam={620} vel={1.6} cor={PRATA} opacidade={0.18} />
      <Letreiro texto="editora" y={1420} tam={420} vel={-1.1} cor={PRATA} opacidade={0.14} />
      <LinhasFrente n={8} vel={1.2} opacidade={0.3} />
      <div style={{ position: "absolute", left: 80, top: 470, fontFamily: mono, fontSize: 30, letterSpacing: 10, color: PRATA, opacity: interpolate(f, [4, 14], [0, 1], clamp) }}>LINHA EDITORA · CASA EDITORIAL</div>
      <Flutua texto="Qual" tam={230} x={70} y={580} />
      <Flutua texto="história" tam={230} x={120} y={800} atraso={TEMPO} fase={20} />
      <Flutua texto="você quer" tam={190} x={70} y={1030} atraso={TEMPO * 2} fase={40} italico />
      <Flutua texto="contar?" tam={230} x={150} y={1220} atraso={TEMPO * 3} fase={60} />
      <div style={{ position: "absolute", left: 0, top: 1500, height: 6, width: W * risco, backgroundColor: OFF }} />
      <AbsoluteFill style={{ backgroundColor: OFF, opacity: clarao }} />
    </AbsoluteFill>
  );
};

// ── 2 · Drop: quatro quadros gráficos ───────────────────────────────────────
const QuadroSimbolo: React.FC = () => {
  const f = useQuadro();
  const pulso = batida(120 + f);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <Letreiro texto="Linha" y={1560} tam={360} vel={-2.5} cor={PRATA} opacidade={0.12} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center", transform: `scale(${1 + pulso * 0.04})` }}>
        <Simbolo altura={560} corLombada={OFF} corPrata={PRATA} inicio={0} />
      </div>
      <Flutua texto="Somos a" tam={150} x={80} y={1000} atraso={6} italico />
      <Flutua texto="Linha Editora." tam={150} x={80} y={1170} atraso={6 + TEMPO} fase={30} />
      <LinhasFrente n={5} vel={3} opacidade={0.25 + pulso * 0.4} />
      <Rotulo texto="01 / 04" />
    </AbsoluteFill>
  );
};

// Estante em três profundidades: a fileira do fundo é pequena e lenta, a da frente é grande e rápida.
const Fileira: React.FC<{ y: number; alt: number; vel: number; cor: string; opacidade: number; semente: number }> = ({ y, alt, vel, cor, opacidade, semente }) => {
  const f = useQuadro();
  const n = 40, passo = alt * 0.16;
  return (
    <div style={{ position: "absolute", left: 0, top: y, height: alt, width: n * passo, transform: `translateX(${-((f * vel) % (passo * 10))}px)`, opacity: opacidade }}>
      {Array.from({ length: n }).map((_, i) => {
        const h = alt * (0.6 + 0.4 * Math.abs(Math.sin((i + semente) * 1.7)));
        const inclinada = (i + semente) % 9 === 4;
        return <div key={i} style={{ position: "absolute", left: i * passo, bottom: 0, width: passo * (i % 4 === 0 ? 0.55 : 0.32), height: h, backgroundColor: i % 3 === 0 ? PRATA : cor, transformOrigin: "0% 100%", transform: inclinada ? "rotate(14deg)" : "none" }} />;
      })}
    </div>
  );
};

const QuadroEstante: React.FC = () => {
  const f = useQuadro();
  const pulso = batida(180 + f);
  return (
    <AbsoluteFill style={{ backgroundColor: OFF }}>
      <Fileira y={240} alt={260} vel={1.2} cor={AZUL} opacidade={0.25} semente={3} />
      <Fileira y={560} alt={420} vel={2.4} cor={AZUL} opacidade={0.55} semente={7} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 980, height: 4, backgroundColor: AZUL }} />
      <Flutua texto="Uma casa" tam={170} x={80} y={1110} atraso={4} cor={AZUL} corVazado={PRATA} />
      <Flutua texto="editorial." tam={170} x={140} y={1300} atraso={4 + TEMPO} fase={30} cor={AZUL} corVazado={PRATA} italico />
      <AbsoluteFill style={{ transform: `translateY(${pulso * -6}px)` }}>
        <Fileira y={1560} alt={360} vel={4.5} cor={AZUL} opacidade={1} semente={11} />
      </AbsoluteFill>
      <Rotulo texto="02 / 04" cor={AZUL} />
    </AbsoluteFill>
  );
};

// Páginas que se abrem em leque a partir da lombada, com o bumbo empurrando cada folha.
const QuadroPaginas: React.FC = () => {
  const f = useQuadro();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <div style={{ position: "absolute", left: 150, top: 220, width: 0, height: 0, transform: "scale(0.8)", transformOrigin: "0% 0%" }}>
        {Array.from({ length: 9 }).map((_, i) => {
          const k = spring({ frame: f - i * 2.5, fps, config: { damping: 14, stiffness: 90 } });
          const ang = -4 - k * (8 + i * 7.5) + Math.sin((f + i * 10) / 25) * 1.5;
          return <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 640, height: 820, backgroundColor: i === 8 ? OFF : `rgba(248,248,248,${0.12 + i * 0.07})`, border: `2px solid ${PRATA}`, transformOrigin: "0% 100%", transform: `rotate(${-ang}deg)`, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
            {i === 8 && Array.from({ length: 12 }).map((__, l) => <div key={l} style={{ position: "absolute", left: 60, right: 60 + ((l * 53) % 140), top: 90 + l * 52, height: 4, backgroundColor: l === 0 ? AZUL : PRATA, opacity: interpolate(f, [10 + l * 2, 16 + l * 2], [0, 1], clamp) }} />)}
          </div>;
        })}
      </div>
      <Flutua texto="Livros feitos" tam={150} x={80} y={1430} atraso={6} />
      <Flutua texto="com cuidado." tam={150} x={80} y={1600} atraso={6 + TEMPO} fase={30} italico />
      <Rotulo texto="03 / 04" />
    </AbsoluteFill>
  );
};

// A linha que escreve: um traço contínuo atravessa a tela e as palavras pousam sobre ele.
const ESCRITA = "M -40 980 C 140 860, 260 1100, 420 980 S 700 860, 860 980 S 1060 1060, 1140 960";
const QuadroLinha: React.FC = () => {
  const f = useQuadro();
  const t = interpolate(f, [0, 40], [0, 1], { ...clamp, easing: sai });
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <Letreiro texto="ideias" y={260} tam={440} vel={2} cor={PRATA} opacidade={0.12} />
      <svg width={W} height={H} style={{ position: "absolute" }}>
        <path d={ESCRITA} fill="none" stroke={OFF} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - t} />
      </svg>
      <Flutua texto="Direito," tam={170} x={80} y={700} atraso={4} />
      <Flutua texto="pensamento" tam={150} x={80} y={1080} atraso={4 + TEMPO} fase={25} italico />
      <Flutua texto="e repertório." tam={150} x={80} y={1250} atraso={4 + TEMPO * 2} fase={50} />
      <Rotulo texto="04 / 04" />
    </AbsoluteFill>
  );
};

const DROP: { C: React.FC; entrada: Entrada }[] = [
  { C: QuadroSimbolo, entrada: "zoom" },
  { C: QuadroEstante, entrada: "fatias" },
  { C: QuadroPaginas, entrada: "abre" },
  { C: QuadroLinha, entrada: "linha" },
];

// ── 3 · Atributos, um a cada meio compasso ──────────────────────────────────
const ATRIBUTOS: { palavra: string; entrada: Entrada }[] = [
  { palavra: "Clareza.", entrada: "desliza" },
  { palavra: "Precisão.", entrada: "gira" },
  { palavra: "Repertório.", entrada: "fatias" },
  { palavra: "Permanência.", entrada: "linha" },
  { palavra: "Cuidado.", entrada: "zoom" },
  { palavra: "Autores.", entrada: "abre" },
  { palavra: "Leitores.", entrada: "desliza" },
  { palavra: "Histórias.", entrada: "gira" },
];

const Atributo: React.FC<{ i: number }> = ({ i }) => {
  const f = useQuadro();
  const claro = i % 2 === 1;
  const fundo = claro ? OFF : AZUL, frente = claro ? AZUL : OFF;
  const a = ATRIBUTOS[i];
  const tam = Math.min(230, Math.floor(1700 / a.palavra.length));
  const pulso = batida(360 + i * 30 + f);
  return (
    <AbsoluteFill style={{ backgroundColor: fundo, transform: `scale(${1 + pulso * 0.03})` }}>
      {/* textura: a mesma palavra repetida em linhas vazadas, correndo em sentidos opostos */}
      {Array.from({ length: 7 }).map((_, l) => (
        <div key={l} style={{ position: "absolute", top: 40 + l * 270, left: 0, whiteSpace: "nowrap", fontFamily: jost, fontWeight: 300, fontSize: 230, lineHeight: 1, color: "transparent", WebkitTextStroke: `1.5px ${PRATA}`, opacity: 0.35, transform: `translateX(${(l % 2 ? -600 : -200) + (l % 2 ? 1 : -1) * f * 6}px)` }}>
          {`${a.palavra} ${a.palavra} ${a.palavra}`}
        </div>
      ))}
      <div style={{ position: "absolute", left: 80, top: 760, fontFamily: mono, fontSize: 30, letterSpacing: 10, color: claro ? AZUL : PRATA }}>{String(i + 1).padStart(2, "0")} · O QUE NOS MOVE</div>
      <Flutua texto={a.palavra} tam={tam} x={70} y={840} italico={i % 3 === 2} cor={frente} corVazado={PRATA} />
      <div style={{ position: "absolute", left: 80, top: 840 + tam * 1.15, height: 4, width: interpolate(f, [4, 20], [0, 920], { ...clamp, easing: sai }), backgroundColor: frente }} />
      <Rotulo texto={`${String(i + 1).padStart(2, "0")} / 08`} cor={frente} />
    </AbsoluteFill>
  );
};

// ── 4 · Respiro: lombadas dos títulos flutuando em profundidade ─────────────
const LIVROS = [
  { titulo: "INSTITUIÇÕES DE DIREITO PÚBLICO E PRIVADO", x: 120, w: 150, h: 1100, z: 0.9, cor: OFF, gira: -3 },
  { titulo: "DIREITO PROCESSUAL E CAPITALISMO", x: 330, w: 130, h: 980, z: 0.6, cor: PRATA, gira: 4 },
  { titulo: "LINHA EDITORA", x: 520, w: 110, h: 820, z: 0.35, cor: "#16365a", gira: -2 },
  { titulo: "TODA HISTÓRIA COMEÇA POR UMA LINHA", x: 690, w: 140, h: 1050, z: 0.75, cor: OFF, gira: 3 },
  { titulo: "", x: 880, w: 100, h: 760, z: 0.3, cor: "#16365a", gira: -5 },
];

const Respiro: React.FC = () => {
  const f = useQuadro();
  const mergulho = interpolate(f, [92, 120], [1, 2.2], { ...clamp, easing: Easing.in(Easing.cubic) });
  const some = interpolate(f, [104, 120], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${mergulho})`, opacity: some }}>
        {LIVROS.map((l, i) => {
          const entra = interpolate(f, [i * 5, i * 5 + 28], [0, 1], { ...clamp, easing: sai });
          const dy = Math.sin((f + i * 35) / 28) * 24 * (1 + l.z) - f * l.z * 1.1;
          const escuro = l.cor !== OFF && l.cor !== PRATA;
          return (
            <div key={i} style={{ position: "absolute", left: l.x, top: 380 + (1 - entra) * 600, width: l.w, height: l.h, backgroundColor: l.cor, opacity: entra * (0.35 + l.z * 0.65), filter: `blur(${(1 - l.z) * 4}px)`, transform: `translateY(${dy}px) rotate(${l.gira + Math.sin((f + i * 20) / 40) * 1.5}deg) scale(${0.75 + l.z * 0.35})`, boxShadow: "0 30px 70px rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", top: 40, left: 20, right: 20, height: 2, backgroundColor: escuro ? PRATA : AZUL, opacity: 0.6 }} />
              <div style={{ position: "absolute", bottom: 40, left: 20, right: 20, height: 2, backgroundColor: escuro ? PRATA : AZUL, opacity: 0.6 }} />
              <div style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: mono, fontSize: l.w * 0.17, letterSpacing: 6, color: escuro ? OFF : AZUL, whiteSpace: "nowrap" }}>{l.titulo}</div>
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${AZUL}f5 0%, ${AZUL}cc 28%, ${AZUL}00 55%)`, opacity: some }} />
      <div style={{ opacity: some }}>
        <Flutua texto="A linha que" tam={140} x={80} y={1360} italico vazado={false} />
        <Flutua texto="conecta histórias." tam={110} x={80} y={1520} atraso={TEMPO * 2} fase={30} />
        <div style={{ position: "absolute", left: 80, top: 1670, height: 4, width: interpolate(f, [60, 95], [0, 920], { ...clamp, easing: sai }), backgroundColor: OFF }} />
      </div>
    </AbsoluteFill>
  );
};

// ── 5 · Final ───────────────────────────────────────────────────────────────
const Final: React.FC = () => {
  const f = useQuadro();
  const { fps } = useVideoConfig();
  const pulso = batida(720 + f);
  const entra = spring({ frame: f, fps, config: { damping: 15, stiffness: 110 } });
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {Array.from({ length: 18 }).map((_, i) => {
        const k = spring({ frame: f - i * 1.5, fps, config: { damping: 12, stiffness: 140 } });
        const h = (240 + ((i * 131) % 400)) * k * (1 + pulso * 0.15);
        return <div key={i} style={{ position: "absolute", left: 30 + i * 58, bottom: 0, width: i % 4 === 0 ? 10 : 4, height: h, backgroundColor: i % 4 === 0 ? OFF : PRATA, opacity: 0.22 }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", transform: `scale(${0.85 + entra * 0.15})`, opacity: entra }}>
        <Assinatura escala={1.25} cor={OFF} corPrata={PRATA} inicio={0} />
      </div>
      <Flutua texto="Qual livro" tam={170} x={80} y={780} atraso={20} />
      <Flutua texto="mudou a sua" tam={150} x={80} y={970} atraso={20 + TEMPO} fase={25} italico />
      <Flutua texto="história?" tam={170} x={80} y={1140} atraso={20 + TEMPO * 2} fase={50} />
      <div style={{ position: "absolute", left: 80, top: 1390, fontFamily: mono, fontSize: 32, letterSpacing: 10, color: PRATA, opacity: interpolate(f, [60, 72], [0, 1], clamp) }}>CONTE NOS COMENTÁRIOS ↓</div>
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 200, borderTop: `2px solid ${PRATA}`, paddingTop: 26, fontFamily: mono, fontSize: 28, letterSpacing: 7, color: OFF, opacity: interpolate(f, [80, 95], [0, 1], clamp) }}>
        LINHAEDITORA.COM.BR
      </div>
      <AbsoluteFill style={{ backgroundColor: OFF, opacity: interpolate(f, [0, 8], [0.9, 0], clamp) }} />
    </AbsoluteFill>
  );
};

export const MotionInstitucional: React.FC = () => (
  <Ritmo.Provider value={L}>
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <Audio src={staticFile("musica-institucional-90bpm.wav")} volume={(f) => interpolate(f, [DURACAO_INSTITUCIONAL - 60, DURACAO_INSTITUCIONAL], [1, 0], clamp)} />
      <Sequence durationInFrames={q(120)}><Gancho /></Sequence>
      {DROP.map(({ C, entrada }, i) => (
        <Sequence key={i} from={q(120 + i * COMPASSO)} durationInFrames={q(COMPASSO + ENTRA)}><Corte tipo={entrada}><C /></Corte></Sequence>
      ))}
      {ATRIBUTOS.map((a, i) => (
        <Sequence key={a.palavra} from={q(360 + i * 30)} durationInFrames={q(30 + ENTRA)}><Corte tipo={a.entrada}><Atributo i={i} /></Corte></Sequence>
      ))}
      <Sequence from={q(600)} durationInFrames={q(120)}><Respiro /></Sequence>
      <Sequence from={q(720)} durationInFrames={DURACAO_INSTITUCIONAL - q(720)}><Final /></Sequence>
    </AbsoluteFill>
  </Ritmo.Provider>
);
