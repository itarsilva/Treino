import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Mesma tipografia do app da Linha Editora: Literata nos títulos, IBM Plex Sans no texto.
// Arquivos locais em public/ (fontes variáveis), para o vídeo renderizar sem internet.
export const display = "Literata";
export const body = "IBM Plex Sans";

loadFont({ family: display, url: staticFile("Literata.woff2"), weight: "200 900" });
loadFont({ family: body, url: staticFile("IBMPlexSans.woff2"), weight: "100 700" });
