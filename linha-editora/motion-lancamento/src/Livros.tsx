import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { body, display } from "./fonts";

// Cada título entra como uma lombada de livro deslizando para a estante
export const Livros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill name="Livros" style={{ backgroundColor: "#16211D", justifyContent: "center", paddingLeft: 90, paddingRight: 90 }}>
      <Interactive.Div
        name="Chamada"
        style={{
          fontFamily: display,
          fontWeight: 600,
          fontSize: 96,
          lineHeight: 1.1,
          color: "#F3F5F3",
          marginBottom: 80,
          opacity: interpolate(frame, [0, 0.6 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) }),
        }}
      >
        Três títulos
        <br />
        para conhecer
      </Interactive.Div>
      <Interactive.Div
        name="Livro 1"
        style={{
          backgroundColor: "#1F6B53",
          color: "#F3F5F3",
          borderRadius: 14,
          padding: "38px 44px",
          marginBottom: 28,
          fontFamily: body,
          fontSize: 50,
          fontWeight: 600,
          lineHeight: 1.2,
          translate: interpolate(frame, [0.5 * fps, 1.3 * fps], ["-1100px 0px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }) }),
        }}
      >
        Maquiavel: um renascentista hoje
      </Interactive.Div>
      <Interactive.Div
        name="Livro 2"
        style={{
          backgroundColor: "#F3F5F3",
          color: "#16211D",
          borderRadius: 14,
          padding: "38px 44px",
          marginBottom: 28,
          fontFamily: body,
          fontSize: 50,
          fontWeight: 600,
          lineHeight: 1.2,
          translate: interpolate(frame, [0.9 * fps, 1.7 * fps], ["1100px 0px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }) }),
        }}
      >
        Direito processual e capitalismo
      </Interactive.Div>
      <Interactive.Div
        name="Livro 3"
        style={{
          backgroundColor: "#5DBF9A",
          color: "#0B1411",
          borderRadius: 14,
          padding: "38px 44px",
          fontFamily: body,
          fontSize: 50,
          fontWeight: 600,
          lineHeight: 1.2,
          translate: interpolate(frame, [1.3 * fps, 2.1 * fps], ["-1100px 0px", "0px 0px"], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.spring({ damping: 200 }) }),
        }}
      >
        Instituições de direito público e privado
      </Interactive.Div>
    </AbsoluteFill>
  );
};
