import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { jost, mono } from "./fonts";

// Uma régua de dias desliza até o 21; a marca do dia se ergue como a linha principal.
const c = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const DIA = 180, Y = 1300, PRIMEIRO = 8, ULTIMO = 28;

export const Regua: React.FC = () => {
  const frame = useCurrentFrame();
  const desliza = interpolate(frame, [0, 58], [0, 1], { ...c, easing: Easing.bezier(0.33, 0, 0.1, 1) });
  const centroDia = 12 + (21 - 12) * desliza;
  const ofs = 540 - (centroDia - PRIMEIRO) * DIA;
  const ergue = interpolate(frame, [58, 82], [0, 1], { ...c, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const txt = (a: number) => interpolate(frame, [a, a + 18], [0, 1], { ...c, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  return (
    <AbsoluteFill name="Régua" style={{ backgroundColor: "#001F3F" }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: Y, height: 2, backgroundColor: "rgba(168,169,173,0.5)" }} />
      {Array.from({ length: (ULTIMO - PRIMEIRO) * 5 + 1 }).map((_, k) => {
        const dia = PRIMEIRO + k / 5, ehDia = k % 5 === 0, x = ofs + (dia - PRIMEIRO) * DIA;
        const e21 = ehDia && dia === 21;
        const h = e21 ? 90 + 560 * ergue : ehDia ? 90 : 34;
        return (
          <div key={k}>
            <div style={{ position: "absolute", left: x - (e21 ? 4 : 1.5), top: Y - h, width: e21 ? 8 : 3, height: h, borderRadius: 4,
              backgroundColor: e21 ? "#FFFFFF" : "#A8A9AD", opacity: ehDia ? 1 : 0.6 }} />
            {ehDia ? (
              <div style={{ position: "absolute", left: x - 60, width: 120, top: Y + 28, textAlign: "center", fontFamily: mono, fontSize: e21 ? 48 : 34,
                color: e21 ? "#FFFFFF" : "#A8A9AD", opacity: e21 ? 1 : 0.8 }}>{String(dia).padStart(2, "0")}</div>
            ) : null}
          </div>
        );
      })}
      <Interactive.Div name="Mês" style={{ position: "absolute", top: Y + 110, left: 0, right: 0, textAlign: "center", fontFamily: mono, fontSize: 30, letterSpacing: 10, color: "#A8A9AD" }}>
        OUTUBRO · 2026
      </Interactive.Div>
      <Interactive.Div name="Dia da semana" style={{ position: "absolute", top: 220, left: 90, fontFamily: mono, fontSize: 32, letterSpacing: 10, color: "#A8A9AD", opacity: txt(70) }}>
        QUARTA-FEIRA
      </Interactive.Div>
      <Interactive.Div name="Data" style={{ position: "absolute", top: 280, left: 90, fontFamily: jost, fontWeight: 300, fontSize: 180, lineHeight: 1, letterSpacing: -3, color: "#F8F8F8",
        opacity: txt(76), translate: `0px ${(1 - txt(76)) * 40}px` }}>
        21 de
        <br />
        outubro
      </Interactive.Div>
    </AbsoluteFill>
  );
};
