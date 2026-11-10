import { createContext, useContext } from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Assinatura } from "../Assinatura";
import { jost, mono, spectral } from "../fonts";

// Motion de engajamento do lançamento (1080 × 1920, 30 s).
// Tudo segue a trilha original (musica/compor.py): 120 BPM, um tempo = 15 quadros, um compasso = 60.
//   0–120    gancho: "Você estava lá?" flutuando sobre a festa
//   120–360  drop: uma cena por compasso, palavras gigantes em camadas
//   360–600  cortes a cada meio compasso, cada um com uma transição diferente
//   600–720  respiro: colagem em profundidade e a frase da marca
//   720–900  volta: assinatura, chamada para marcar quem estava lá

const AZUL = "#001F3F", PRATA = "#A8A9AD", OFF = "#F8F8F8";
const W = 1080, H = 1920;
const TEMPO = 15, COMPASSO = 60;
export const DURACAO_ENGAJA = 900;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const sai = Easing.bezier(0.16, 1, 0.3, 1);

// Ritmo: fator que estica o tempo das peças compartilhadas (1 = 120 BPM; 4/3 = 90 BPM).
export const Ritmo = createContext(1);
export const useQuadro = () => useCurrentFrame() / useContext(Ritmo);

// Batida: 1 no tempo forte, cai em seguida. Só nos trechos com bumbo.
export const temBumbo = (f: number) => (f >= 120 && f < 600) || (f >= 720 && f < 735);
export const batida = (f: number) => (temBumbo(f) ? Math.exp(-(f % TEMPO) / 3.5) : 0);

export type Midia = { foto: string } | { video: string; inicio: number; vel?: number };

// Camada de fundo: foto ou vídeo com zoom lento e um leve deslocamento (paralaxe).
export const Fundo: React.FC<{ m: Midia; dur: number; deriva?: number; zoom?: [number, number] }> = ({ m, dur, deriva = 30, zoom = [1.08, 1.16] }) => {
  const f = useQuadro();
  const z = interpolate(f, [0, dur], zoom);
  const x = interpolate(f, [0, dur], [-deriva, deriva]);
  const s = { width: "100%", height: "100%", objectFit: "cover" as const, objectPosition: "50% 18%" };
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}px) scale(${z})`, transformOrigin: "50% 0%" }}>
      {"foto" in m
        ? <Img src={staticFile(m.foto)} style={s} />
        : <OffthreadVideo src={staticFile(`videos/${m.video}.mp4`)} startFrom={m.inicio} playbackRate={m.vel ?? 1} muted style={s} />}
    </AbsoluteFill>
  );
};

// Texto grande que entra desfocado de baixo e depois flutua; uma cópia vazada em prata fica atrás, em outra profundidade.
export const Flutua: React.FC<{ texto: string; tam: number; x: number; y: number; atraso?: number; fase?: number; italico?: boolean; vazado?: boolean; cor?: string; corVazado?: string }> = ({ texto, tam, x, y, atraso = 0, fase = 0, italico, vazado = true, cor = OFF, corVazado = PRATA }) => {
  const f = useQuadro();
  const { fps } = useVideoConfig();
  const e = spring({ frame: f - atraso, fps, config: { damping: 14, stiffness: 120 } });
  const boia = Math.sin((f + fase) / 22) * 14;
  const gira = Math.sin((f + fase) / 37) * 1.2;
  const fonte = italico ? spectral : jost;
  const base: React.CSSProperties = { position: "absolute", left: x, top: y, fontFamily: fonte, fontWeight: 300, fontStyle: italico ? "italic" : "normal", fontSize: tam, lineHeight: 1, letterSpacing: italico ? 0 : -tam * 0.03, whiteSpace: "nowrap" };
  return (
    <>
      {vazado && <div style={{ ...base, color: "transparent", WebkitTextStroke: `2px ${corVazado}`, opacity: e * 0.7, transform: `translate(${18 + boia * 0.6}px, ${-22 - boia * 1.6}px) rotate(${-gira}deg)` }}>{texto}</div>}
      <div style={{ ...base, color: cor, opacity: e, filter: `blur(${(1 - e) * 18}px)`, textShadow: cor === OFF ? "0 12px 40px rgba(0,31,63,0.55)" : "none", transform: `translateY(${(1 - e) * 120 + boia}px) rotate(${gira}deg)` }}>{texto}</div>
    </>
  );
};

// Linhas verticais em primeiro plano, que correm mais rápido que o fundo (dá a profundidade).
export const LinhasFrente: React.FC<{ n?: number; vel?: number; opacidade?: number }> = ({ n = 7, vel = 2.2, opacidade = 0.5 }) => {
  const f = useQuadro();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {Array.from({ length: n }).map((_, i) => {
        const x = ((i * 173 + f * vel * (i % 2 ? 1 : 0.6)) % (W + 200)) - 100;
        const h = 300 + ((i * 97) % 500);
        const y = (i * 311) % (H - h);
        return <div key={i} style={{ position: "absolute", left: x, top: y, width: i % 3 === 0 ? 4 : 2, height: h, backgroundColor: i % 3 === 0 ? OFF : PRATA, opacity: opacidade }} />;
      })}
    </AbsoluteFill>
  );
};

const Veu: React.FC<{ forca?: number }> = ({ forca = 1 }) => (
  <AbsoluteFill style={{ background: `linear-gradient(to top, ${AZUL}f0 0%, ${AZUL}aa ${30 * forca}%, ${AZUL}22 60%, ${AZUL}55 100%)` }} />
);

export const Rotulo: React.FC<{ texto: string; y?: number; cor?: string }> = ({ texto, y = 110, cor = OFF }) => (
  <div style={{ position: "absolute", left: 80, right: 80, top: y, display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 24, letterSpacing: 6, color: cor }}>
    <span>LINHA EDITORA</span><span style={{ color: PRATA }}>{texto}</span>
  </div>
);

// ── Entradas de corte, uma por estilo ────────────────────────────────────────
export type Entrada = "zoom" | "desliza" | "fatias" | "linha" | "abre" | "gira";
export const ENTRA = 10;

export const Corte: React.FC<{ tipo: Entrada; children: React.ReactNode }> = ({ tipo, children }) => {
  const f = useQuadro();
  const p = interpolate(f, [0, ENTRA], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  if (tipo === "zoom") {
    return <AbsoluteFill style={{ transform: `scale(${1.35 - 0.35 * p})`, opacity: Math.min(1, p * 2), filter: `brightness(${1 + (1 - p) * 0.8})` }}>{children}</AbsoluteFill>;
  }
  if (tipo === "desliza") {
    return <AbsoluteFill style={{ transform: `translateX(${(1 - p) * W}px) skewX(${(1 - p) * -8}deg)` }}>{children}</AbsoluteFill>;
  }
  if (tipo === "gira") {
    return <AbsoluteFill style={{ transform: `rotate(${(1 - p) * 8}deg) scale(${1.2 - 0.2 * p})`, opacity: p }}>{children}</AbsoluteFill>;
  }
  if (tipo === "abre") {
    const m = (1 - p) * 50;
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{ clipPath: `inset(${m}% 0 ${m}% 0)` }}>{children}</AbsoluteFill>
        {p < 1 && <><div style={{ position: "absolute", left: 0, right: 0, top: H * m / 100 - 3, height: 6, backgroundColor: OFF }} /><div style={{ position: "absolute", left: 0, right: 0, bottom: H * m / 100 - 3, height: 6, backgroundColor: OFF }} /></>}
      </AbsoluteFill>
    );
  }
  if (tipo === "linha") {
    return (
      <AbsoluteFill>
        <AbsoluteFill style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>{children}</AbsoluteFill>
        {p < 1 && <div style={{ position: "absolute", top: 0, bottom: 0, left: p * W - 3, width: 6, backgroundColor: OFF }} />}
      </AbsoluteFill>
    );
  }
  // fatias: seis lombadas caem em sequência
  const n = 6, lw = W / n;
  const d = Array.from({ length: n }).map((_, i) => {
    const q = interpolate(f, [i * 1.3, i * 1.3 + ENTRA * 0.8], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
    return `M${i * lw} 0 H${(i + 1) * lw} V${H * q} H${i * lw} Z`;
  }).join(" ");
  return <AbsoluteFill style={{ clipPath: `path('${d}')` }}>{children}</AbsoluteFill>;
};

// ── 1 · Gancho ───────────────────────────────────────────────────────────────
const Gancho: React.FC = () => {
  const f = useCurrentFrame();
  const sobe = interpolate(f, [90, 120], [1, 1.25], { ...clamp, easing: Easing.in(Easing.cubic) });
  const clarao = interpolate(f, [112, 120], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <AbsoluteFill style={{ transform: `scale(${sobe})`, filter: "blur(3px)", opacity: 0.55 }}><Fundo m={{ video: "v195734", inicio: 0 }} dur={130} /></AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: AZUL, opacity: 0.55 }} />
      <LinhasFrente n={9} vel={1.4} opacidade={0.35} />
      <div style={{ position: "absolute", left: 80, top: 520, fontFamily: mono, fontSize: 30, letterSpacing: 10, color: PRATA, opacity: interpolate(f, [4, 14], [0, 1], clamp) }}>21.10.2026 · LIVRARIA DA VILA</div>
      <Flutua texto="Você" tam={250} x={70} y={640} atraso={0} />
      <Flutua texto="estava" tam={250} x={150} y={900} atraso={TEMPO} fase={20} />
      <Flutua texto="lá?" tam={300} x={90} y={1150} atraso={TEMPO * 2} fase={40} italico />
      <AbsoluteFill style={{ backgroundColor: OFF, opacity: clarao }} />
    </AbsoluteFill>
  );
};

// ── 2 · Drop: uma cena por compasso ─────────────────────────────────────────
// `justo`: cena em que a cabeça está perto do topo do quadro original; sem zoom nem deslocamento, para não cortar.
type CenaDrop = { m: Midia; palavra: [string, string]; rotulo: string; detalhe?: string; entrada: Entrada; justo?: boolean };
const DROP: CenaDrop[] = [
  { m: { video: "v184803", inicio: 0 }, palavra: ["Uma", "noite."], rotulo: "01", entrada: "zoom" },
  { m: { foto: "fotos/foto10.jpg" }, palavra: ["Três", "títulos."], rotulo: "02", entrada: "fatias" },
  { m: { foto: "fotos/f19.jpg" }, palavra: ["Muitos", "leitores."], rotulo: "03", entrada: "abre" },
  { m: { video: "v192106", inicio: 245, vel: 0.45 }, palavra: ["Um", "autor."], rotulo: "04", detalhe: "MARCELO GRILLO", entrada: "linha", justo: true },
];

const Drop: React.FC<{ c: CenaDrop }> = ({ c }) => {
  const f = useCurrentFrame();
  const pulso = batida(f + 120);
  return (
    <Corte tipo={c.entrada}>
      <AbsoluteFill style={{ backgroundColor: AZUL, transform: `scale(${1 + pulso * 0.025})`, transformOrigin: "50% 100%" }}>
        {c.justo ? <Fundo m={c.m} dur={COMPASSO + ENTRA} deriva={0} zoom={[1, 1]} /> : <Fundo m={c.m} dur={COMPASSO + ENTRA} />}
        <Veu />
        <Flutua texto={c.palavra[0]} tam={190} x={70} y={1200} atraso={4} />
        <Flutua texto={c.palavra[1]} tam={190} x={110} y={1400} atraso={4 + TEMPO} fase={30} italico={c.rotulo === "02"} />
        {c.detalhe && <div style={{ position: "absolute", left: 80, top: 1630, fontFamily: mono, fontSize: 30, letterSpacing: 10, color: PRATA, opacity: interpolate(f, [24, 34], [0, 1], clamp) }}>{c.detalhe}</div>}
        <LinhasFrente n={5} vel={3} opacidade={0.35 + pulso * 0.4} />
        <Rotulo texto={`${c.rotulo} / 04`} />
      </AbsoluteFill>
    </Corte>
  );
};

// ── 3 · Cortes a cada meio compasso ─────────────────────────────────────────
const RAPIDO: { m: Midia; entrada: Entrada }[] = [
  { m: { foto: "fotos/f22.jpg" }, entrada: "desliza" },
  { m: { foto: "fotos/f24.jpg" }, entrada: "gira" },
  { m: { foto: "fotos/f21.jpg" }, entrada: "fatias" },
  { m: { foto: "fotos/f25.jpg" }, entrada: "linha" },
  { m: { video: "v183108", inicio: 30 }, entrada: "zoom" },
  { m: { foto: "fotos/foto13.jpg" }, entrada: "abre" },
  { m: { foto: "fotos/f20.jpg" }, entrada: "desliza" },
  { m: { foto: "fotos/f26.jpg" }, entrada: "gira" },
];
const VERBOS = ["ler.", "encontrar.", "conversar.", "celebrar."];

const Rapido: React.FC = () => {
  const f = useCurrentFrame();
  const k = Math.min(VERBOS.length - 1, Math.floor(f / COMPASSO));
  const pulso = batida(f + 360);
  return (
    <AbsoluteFill>
      {RAPIDO.map((r, i) => (
        <Sequence key={i} from={i * 30} durationInFrames={30 + ENTRA}>
          <Corte tipo={r.entrada}><AbsoluteFill style={{ transform: `scale(${1 + pulso * 0.03})` }}><Fundo m={r.m} dur={40} deriva={50} /></AbsoluteFill></Corte>
        </Sequence>
      ))}
      <Veu forca={0.8} />
      <div style={{ position: "absolute", left: 80, top: 1180, fontFamily: mono, fontSize: 30, letterSpacing: 10, color: PRATA }}>A NOITE FOI PARA</div>
      {VERBOS.map((v, i) => (
        <Sequence key={v} from={i * COMPASSO} durationInFrames={COMPASSO}>
          <Flutua texto={v} tam={170} x={70} y={1260} fase={i * 25} italico={i % 2 === 1} />
        </Sequence>
      ))}
      <LinhasFrente n={6} vel={4} opacidade={0.3 + pulso * 0.5} />
      <Rotulo texto={`${String(k + 5).padStart(2, "0")} / 08`} />
    </AbsoluteFill>
  );
};

// ── 4 · Respiro: colagem em profundidade ────────────────────────────────────
const CARTAS = [
  { foto: "fotos/f20.jpg", x: 60, y: 260, w: 360, z: 0.45, gira: -6 },
  { foto: "fotos/f24.jpg", x: 640, y: 180, w: 380, z: 0.6, gira: 5 },
  { foto: "fotos/f25.jpg", x: 700, y: 1240, w: 330, z: 0.4, gira: -4 },
  { foto: "fotos/f22.jpg", x: 80, y: 1300, w: 380, z: 0.7, gira: 4 },
  { foto: "fotos/f26.jpg", x: 380, y: 700, w: 300, z: 0.3, gira: -2 },
];

const Respiro: React.FC = () => {
  const f = useCurrentFrame();
  const mergulho = interpolate(f, [90, 120], [1, 1.8], { ...clamp, easing: Easing.in(Easing.cubic) });
  const some = interpolate(f, [100, 120], [1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${mergulho})`, opacity: some }}>
        {CARTAS.map((c, i) => {
          const entra = interpolate(f, [i * 4, i * 4 + 24], [0, 1], { ...clamp, easing: sai });
          const dy = Math.sin((f + i * 40) / 30) * 20 * (1 + c.z) - f * c.z * 1.2;
          return (
            <div key={i} style={{ position: "absolute", left: c.x, top: c.y + (1 - entra) * 200, width: c.w, height: c.w * 1.4, padding: 12, backgroundColor: OFF, opacity: entra * (0.45 + c.z * 0.6), filter: `blur(${(1 - c.z) * 3}px)`, transform: `translateY(${dy}px) rotate(${c.gira + Math.sin((f + i * 20) / 40) * 2}deg) scale(${0.8 + c.z * 0.4})`, boxShadow: "0 30px 60px rgba(0,0,0,0.4)" }}>
              <Img src={staticFile(c.foto)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%" }} />
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, ${AZUL}ee 0%, ${AZUL}99 45%, ${AZUL}00 75%)`, opacity: some }} />
      <div style={{ opacity: some }}>
        <Flutua texto="Toda história" tam={130} x={110} y={760} atraso={0} italico vazado={false} />
        <Flutua texto="começa por" tam={130} x={170} y={910} atraso={TEMPO * 2} fase={20} italico vazado={false} />
        <Flutua texto="uma linha." tam={190} x={90} y={1060} atraso={TEMPO * 4} fase={40} />
        <div style={{ position: "absolute", left: 90, top: 1290, height: 4, width: interpolate(f, [70, 100], [0, 900], { ...clamp, easing: sai }), backgroundColor: OFF }} />
      </div>
    </AbsoluteFill>
  );
};

// ── 5 · Volta e final ───────────────────────────────────────────────────────
const Final: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pulso = batida(f + 720);
  const entra = spring({ frame: f, fps, config: { damping: 15, stiffness: 110 } });
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {/* lombadas que crescem do chão e pulsam no bumbo */}
      {Array.from({ length: 18 }).map((_, i) => {
        const k = spring({ frame: f - i * 1.5, fps, config: { damping: 12, stiffness: 140 } });
        const h = (260 + ((i * 131) % 420)) * k * (1 + pulso * 0.15);
        return <div key={i} style={{ position: "absolute", left: 30 + i * 58, bottom: 0, width: i % 4 === 0 ? 10 : 4, height: h, backgroundColor: i % 4 === 0 ? OFF : PRATA, opacity: 0.25 }} />;
      })}
      <div style={{ position: "absolute", left: 0, right: 0, top: 360, display: "flex", justifyContent: "center", transform: `scale(${0.85 + entra * 0.15})`, opacity: entra }}>
        <Assinatura escala={1.25} cor={OFF} corPrata={PRATA} inicio={0} />
      </div>
      <Flutua texto="Marque" tam={170} x={80} y={820} atraso={20} />
      <Flutua texto="quem estava" tam={150} x={80} y={1010} atraso={20 + TEMPO} fase={25} italico />
      <Flutua texto="com você." tam={170} x={80} y={1180} atraso={20 + TEMPO * 2} fase={50} />
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 200, borderTop: `2px solid ${PRATA}`, paddingTop: 26, display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 28, letterSpacing: 7, color: OFF, opacity: interpolate(f, [70, 85], [0, 1], clamp) }}>
        <span>LINHAEDITORA.COM.BR</span><span style={{ color: PRATA }}>21.10</span>
      </div>
      <AbsoluteFill style={{ backgroundColor: OFF, opacity: interpolate(f, [0, 8], [0.9, 0], clamp) }} />
    </AbsoluteFill>
  );
};

export const MotionEngaja: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: AZUL }}>
    <Audio src={staticFile("musica-lancamento.wav")} volume={(f) => interpolate(f, [DURACAO_ENGAJA - 45, DURACAO_ENGAJA], [1, 0], clamp)} />
    <Sequence durationInFrames={120}><Gancho /></Sequence>
    {DROP.map((c, i) => (
      <Sequence key={i} from={120 + i * COMPASSO} durationInFrames={COMPASSO + ENTRA}><Drop c={c} /></Sequence>
    ))}
    <Sequence from={360} durationInFrames={240}><Rapido /></Sequence>
    <Sequence from={600} durationInFrames={120}><Respiro /></Sequence>
    <Sequence from={720} durationInFrames={180}><Final /></Sequence>
  </AbsoluteFill>
);
