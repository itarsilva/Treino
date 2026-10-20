import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Tipografia do manual da marca (marca/README.md): Jost nos títulos, Spectral no texto, IBM Plex Mono nos rótulos.
// Arquivos locais em public/, para o vídeo renderizar sem internet.
export const jost = "Jost";
export const spectral = "Spectral";
export const mono = "IBM Plex Mono";

loadFont({ family: jost, url: staticFile("Jost.woff2"), weight: "100 900" });
loadFont({ family: spectral, url: staticFile("Spectral-Light.woff2"), weight: "300" });
loadFont({ family: spectral, url: staticFile("Spectral-Regular.woff2"), weight: "400" });
loadFont({ family: spectral, url: staticFile("Spectral-Italic.woff2"), weight: "400", style: "italic" });
loadFont({ family: mono, url: staticFile("IBMPlexMono-Regular.woff2"), weight: "400" });
