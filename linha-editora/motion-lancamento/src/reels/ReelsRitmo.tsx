import { AbsoluteFill, Audio, Easing, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Assinatura } from "../Assinatura";
import { jost, mono, spectral } from "../fonts";

// Reels "Ritmo" (1080 × 1920): versão rápida do lançamento. Cortes curtos abertos por uma linha que
// atravessa a tela, palavras grandes no compasso, uma estante de lombadas com as fotos da noite,
// o Marcelo em destaque, uma grade que se desenha com linhas e o fechamento com a assinatura.

const AZUL = "#001F3F", PRATA = "#A8A9AD", OFF = "#F8F8F8";
const W = 1080, H = 1920;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const sai = Easing.bezier(0.16, 1, 0.3, 1);

type Midia = { foto: string } | { video: string; inicio: number; vel?: number };

// Foto ou vídeo preenchendo o quadro; o recorte é ancorado no alto para não cortar cabeças.
const Quadro: React.FC<{ m: Midia; pos?: string }> = ({ m, pos = "50% 15%" }) => {
  const s = { width: "100%", height: "100%", objectFit: "cover" as const, objectPosition: pos };
  return "foto" in m
    ? <Img src={staticFile(m.foto)} style={s} />
    : <OffthreadVideo src={staticFile(`videos/${m.video}.mp4`)} startFrom={m.inicio} playbackRate={m.vel ?? 1} muted style={s} />;
};

// ── A · Abertura: nove lombadas sobem, "21.10" entra e as lombadas se abrem para o primeiro corte
const Abertura: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const largura = interpolate(f, [44, 62], [10, W / 9], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {Array.from({ length: 9 }).map((_, i) => {
        const h = spring({ frame: f - i * 2, fps, config: { damping: 14, stiffness: 140 } });
        const x = (W / 9) * i + W / 18 - largura / 2;
        return <div key={i} style={{ position: "absolute", left: x, bottom: 0, width: largura, height: H * (0.35 + 0.65 * (i % 3 === 0 ? 1 : 0.7)) * h, backgroundColor: i % 4 === 3 ? PRATA : OFF, opacity: 0.12 + (largura / (W / 9)) * 0.88 }} />;
      })}
      <div style={{ position: "absolute", left: 80, top: 640, fontFamily: jost, fontWeight: 300, fontSize: 300, letterSpacing: -10, color: OFF, lineHeight: 1, opacity: interpolate(f, [8, 18, 40, 48], [0, 1, 1, 0], clamp), transform: `translateX(${interpolate(f, [8, 26], [-120, 0], { ...clamp, easing: sai })}px)` }}>21.10</div>
      <div style={{ position: "absolute", left: 88, top: 960, fontFamily: mono, fontSize: 34, color: PRATA, letterSpacing: interpolate(f, [14, 40], [4, 22], clamp), opacity: interpolate(f, [14, 22, 40, 48], [0, 1, 1, 0], clamp) }}>LANÇAMENTO</div>
    </AbsoluteFill>
  );
};

// ── B · Montagem: cada corte entra com uma linha off-white que varre a tela da esquerda para a direita
const CORTE = 20, VARRE = 8;
const MONTAGEM: Midia[] = [
  { video: "v184803", inicio: 0 },
  { foto: "fotos/f22.jpg" },
  { video: "v195734", inicio: 60 },
  { foto: "fotos/foto10.jpg" },
  { video: "v183108", inicio: 60 },
  { foto: "fotos/f19.jpg" },
  { video: "v184803", inicio: 270 },
  { foto: "fotos/foto13.jpg" },
  { video: "v195734", inicio: 250 },
];
const PALAVRAS = ["Uma noite.", "Três títulos.", "Uma linha."];

const Corte: React.FC<{ m: Midia }> = ({ m }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, VARRE], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const zoom = interpolate(f, [0, CORTE + VARRE], [1.14, 1.0], { ...clamp, easing: sai });
  return (
    <AbsoluteFill style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 0)` }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 0%" }}><Quadro m={m} /></AbsoluteFill>
      {p < 1 && <div style={{ position: "absolute", top: 0, bottom: 0, left: p * W - 3, width: 6, backgroundColor: OFF }} />}
    </AbsoluteFill>
  );
};

const Montagem: React.FC = () => {
  const f = useCurrentFrame();
  const i = Math.min(PALAVRAS.length - 1, Math.floor(f / 60));
  const g = f - i * 60;
  const sobe = interpolate(g, [0, 10], [1, 0], { ...clamp, easing: sai });
  return (
    <AbsoluteFill>
      {MONTAGEM.map((m, k) => (
        <Sequence key={k} from={k * CORTE} durationInFrames={CORTE + VARRE * (k === MONTAGEM.length - 1 ? 2 : 1)}><Corte m={m} /></Sequence>
      ))}
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${AZUL}d9 0%, ${AZUL}00 38%)` }} />
      <div style={{ position: "absolute", left: 80, bottom: 260, overflow: "hidden", height: 170 }}>
        <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 140, letterSpacing: -4, color: OFF, lineHeight: 1.15, transform: `translateY(${sobe * 170}px)` }}>{PALAVRAS[i]}</div>
      </div>
      <div style={{ position: "absolute", left: 84, bottom: 200, display: "flex", gap: 10 }}>
        {MONTAGEM.map((_, k) => <div key={k} style={{ width: 3, height: k <= f / CORTE ? 34 : 14, backgroundColor: k <= f / CORTE ? OFF : PRATA }} />)}
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 110, display: "flex", justifyContent: "space-between", fontFamily: mono, fontSize: 24, letterSpacing: 6, color: OFF }}>
        <span>LINHA EDITORA</span><span>LIVRARIA DA VILA</span>
      </div>
    </AbsoluteFill>
  );
};

// ── C · Estante: cinco lombadas com fotos que correm em sentidos alternados; no fim saem e revelam o Marcelo
const LOMBADAS = ["fotos/foto9.jpg", "fotos/f20.jpg", "fotos/foto11.jpg", "fotos/f22.jpg", "fotos/foto12.jpg"];
const VAO = 14, LW = (W - VAO * 4) / 5;

const Estante: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <AbsoluteFill style={{ transform: `scale(${interpolate(f, [dur - 30, dur], [1.08, 1], clamp)})`, transformOrigin: "50% 0%" }}>
        <Img src={staticFile("fotos/f21.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
      </AbsoluteFill>
      {LOMBADAS.map((foto, i) => {
        const entra = spring({ frame: f - i * 3, fps, config: { damping: 18, stiffness: 120 } });
        const saida = interpolate(f, [dur - 34 + i * 3, dur - 16 + i * 3], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
        const dir = i % 2 === 0 ? 1 : -1;
        const y = (1 - entra) * H * dir - saida * H * dir;
        const corre = interpolate(f, [0, dur], [0, 220]) * dir;
        return (
          <div key={i} style={{ position: "absolute", left: i * (LW + VAO), top: 0, width: LW, height: H, overflow: "hidden", transform: `translateY(${y}px)`, backgroundColor: AZUL }}>
            <Img src={staticFile(foto)} style={{ position: "absolute", left: -LW * 1.4, top: -160 + corre, width: LW * 3.8, height: H + 320, objectFit: "cover", objectPosition: "50% 20%" }} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: 80, bottom: 200, fontFamily: mono, fontSize: 30, letterSpacing: 8, color: OFF, opacity: interpolate(f, [10, 20, dur - 40, dur - 30], [0, 1, 1, 0], clamp), backgroundColor: AZUL, padding: "18px 22px" }}>
        QUEM ESCREVEU ESSA LINHA
      </div>
    </AbsoluteFill>
  );
};

// ── D · Marcelo: a foto revelada pela estante e o autógrafo em câmera lenta
const Marcelo: React.FC = () => {
  const f = useCurrentFrame();
  const linha = interpolate(f, [6, 30], [0, 1], { ...clamp, easing: sai });
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <Sequence durationInFrames={45}>
        <AbsoluteFill style={{ transform: `scale(${interpolate(f, [0, 45], [1, 1.06])})`, transformOrigin: "50% 0%" }}>
          <Img src={staticFile("fotos/f21.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={45}>
        <Corte m={{ video: "v192106", inicio: 222, vel: 0.5 }} />
      </Sequence>
      <AbsoluteFill style={{ background: `linear-gradient(to top, ${AZUL}e6 0%, ${AZUL}00 35%)` }} />
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 220 }}>
        <div style={{ fontFamily: mono, fontSize: 28, letterSpacing: 8, color: PRATA }}>AUTOR</div>
        <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 120, letterSpacing: -3, color: OFF, lineHeight: 1.05, marginTop: 12, opacity: interpolate(f, [4, 16], [0, 1], clamp) }}>Marcelo Grillo</div>
        <div style={{ height: 2, backgroundColor: PRATA, width: `${linha * 100}%`, marginTop: 24 }} />
        <div style={{ fontFamily: spectral, fontStyle: "italic", fontSize: 44, color: OFF, marginTop: 20, opacity: interpolate(f, [20, 32], [0, 1], clamp) }}>Instituições de Direito Público e Privado</div>
      </div>
    </AbsoluteFill>
  );
};

// ── E · Grade: quatro quadros entram um a um e as linhas da grade se desenham entre eles
const GRADE: Midia[] = [{ foto: "fotos/f19.jpg" }, { video: "v195734", inicio: 120 }, { video: "v184803", inicio: 330 }, { foto: "fotos/f20.jpg" }];
const PALAVRAS_GRADE = ["LEITORES", "AUTORES", "AMIGOS"];

const Grade: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cw = W / 2, ch = H / 2;
  const traco = interpolate(f, [0, 24], [0, 1], { ...clamp, easing: sai });
  const palavra = PALAVRAS_GRADE[Math.min(2, Math.floor(Math.max(0, f - 30) / 28))];
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {GRADE.map((m, i) => {
        const k = spring({ frame: f - i * 4, fps, config: { damping: 18, stiffness: 260 } });
        return (
          <div key={i} style={{ position: "absolute", left: (i % 2) * cw, top: Math.floor(i / 2) * ch, width: cw, height: ch, overflow: "hidden", clipPath: `inset(${(1 - k) * 50}% 0 ${(1 - k) * 50}% 0)` }}>
            <div style={{ width: "100%", height: "100%", transform: `scale(${1.2 - 0.2 * k})`, transformOrigin: "50% 0%" }}><Quadro m={m} pos="50% 20%" /></div>
          </div>
        );
      })}
      <div style={{ position: "absolute", left: cw - 5, top: 0, width: 10, height: H * traco, backgroundColor: AZUL }} />
      <div style={{ position: "absolute", left: 0, top: ch - 5, width: W * traco, height: 10, backgroundColor: AZUL }} />
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", backgroundColor: AZUL, padding: "26px 40px", fontFamily: mono, fontSize: 40, letterSpacing: 12, color: OFF, opacity: interpolate(f, [26, 34], [0, 1], clamp) }}>
        {palavra}
      </div>
    </AbsoluteFill>
  );
};

// ── F · Fechamento: as linhas caem em ritmo e a assinatura se forma
const Fechamento: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      {Array.from({ length: 34 }).map((_, i) => {
        const k = spring({ frame: f - i * 0.8, fps, config: { damping: 20, stiffness: 160 } });
        const h = 120 * (i % 5 === 0 ? 1 : 0.5 + 0.4 * Math.abs(Math.sin(i * 1.3)));
        return <div key={i} style={{ position: "absolute", left: 80 + i * 27, top: 260 - (1 - k) * 400, width: 3, height: h, borderRadius: 2, backgroundColor: i % 5 === 0 ? OFF : PRATA }} />;
      })}
      <div style={{ position: "absolute", left: 80, right: 80, top: 620 }}>
        <div style={{ fontFamily: jost, fontWeight: 300, fontSize: 104, lineHeight: 1.08, letterSpacing: -3, color: OFF, opacity: interpolate(f, [8, 20], [0, 1], clamp), transform: `translateY(${interpolate(f, [8, 24], [40, 0], { ...clamp, easing: sai })}px)` }}>
          Obrigado por escrever essa linha com a gente.
        </div>
        <div style={{ fontFamily: spectral, fontStyle: "italic", fontSize: 48, color: PRATA, marginTop: 40, opacity: interpolate(f, [26, 38], [0, 1], clamp) }}>Toda história começa por uma linha.</div>
      </div>
      <div style={{ position: "absolute", right: 80, bottom: 300 }}>
        <Assinatura escala={0.9} cor={OFF} corPrata={PRATA} inicio={20} />
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, bottom: 170, borderTop: `2px solid ${PRATA}`, paddingTop: 24, fontFamily: mono, fontSize: 28, letterSpacing: 7, color: OFF, opacity: interpolate(f, [50, 62], [0, 1], clamp) }}>
        LINHAEDITORA.COM.BR
      </div>
    </AbsoluteFill>
  );
};

const A = 62, B = MONTAGEM.length * CORTE + VARRE, C = 110, D = 140, E = 115, F = 150;
export const DURACAO_RITMO = A + B + C + D + E + F;

export const ReelsRitmo: React.FC = () => {
  const f = useCurrentFrame();
  // som ambiente da festa como fundo contínuo, baixo, com entrada e saída suaves
  const vol = interpolate(f, [0, 20, DURACAO_RITMO - 40, DURACAO_RITMO], [0, 0.35, 0.35, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: AZUL }}>
      <Audio src={staticFile("videos/v184803.mp4")} volume={vol} />
      <Sequence from={450}><Audio src={staticFile("videos/v195734.mp4")} volume={vol} /></Sequence>
      <Sequence durationInFrames={A}><Abertura /></Sequence>
      <Sequence from={A - VARRE} durationInFrames={B + VARRE}><Montagem /></Sequence>
      <Sequence from={A + B} durationInFrames={C}><Estante dur={C} /></Sequence>
      <Sequence from={A + B + C} durationInFrames={D}><Marcelo /></Sequence>
      <Sequence from={A + B + C + D} durationInFrames={E}><Grade /></Sequence>
      <Sequence from={A + B + C + D + E} durationInFrames={F}><Fechamento /></Sequence>
    </AbsoluteFill>
  );
};
