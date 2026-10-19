// Gera uma apresentação comercial (.pptx) por nicho a partir de nichos.json.
// Uso: node gerar_apresentacoes.js <pasta_saida>
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const OUT = process.argv[2];
const NICHOS = JSON.parse(fs.readFileSync(path.join(__dirname, "nichos.json"), "utf8"));

const THEME = {
  name: "LedWave",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "140C2E", lt1: "FFFFFF", dk2: "2B1A63", lt2: "F3F0FA",
    accent1: "E0218A", accent2: "4F6BFF", accent3: "8B5CF6",
    accent4: "22C3A6", accent5: "FFB020", accent6: "6B6385",
    hlink: "4F6BFF", folHlink: "8B5CF6",
  },
};
const HEX = THEME.colors;

const ICONE_NICHO = {
  "Varejo de Moda e Vitrines": "FaTshirt",
  "Supermercados, Atacarejos e Home Centers": "FaShoppingCart",
  "Farmácias e Drogarias": "FaClinicMedical",
  "Postos de Combustível e Conveniência": "FaGasPump",
  "DOOH e Investidores de Mídia": "FaBullhorn",
  "Shopping Centers": "FaStore",
  "Concessionárias de Veículos": "FaCar",
  "Construtoras e Stands de Vendas": "FaBuilding",
  "Franquias e Redes": "FaStoreAlt",
  "Bares, Restaurantes e Food Service": "FaUtensils",
  "Igrejas e Centros Religiosos": "FaChurch",
  "Hotéis, Parques, Clubes e Piscinas": "FaHotel",
  "Eventos, Agências e Produtoras": "FaMicrophone",
  "Corporativo (Comunicação Interna e Recepções)": "FaBriefcase",
  "Educação (Escolas, Faculdades e Universidades)": "FaGraduationCap",
  "Saúde (Hospitais, Clínicas e Laboratórios)": "FaHospital",
  "Arenas, Estádios, Academias e Esportes": "FaFutbol",
  "Poder Público e Mobiliário Urbano": "FaCity",
};

const iconCache = {};
async function icon(name, color) {
  const key = name + color;
  if (!iconCache[key]) {
    const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[name], { color: "#" + color, size: 256 }));
    const buf = await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer();
    iconCache[key] = "image/png;base64," + buf.toString("base64");
  }
  return iconCache[key];
}

// Divide "a, b (x, y); c" em itens, sem quebrar dentro de parênteses.
function itens(texto) {
  const out = [];
  let depth = 0, cur = "";
  for (const ch of texto) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if ((ch === "," || ch === ";") && depth === 0) { out.push(cur); cur = ""; } else cur += ch;
  }
  out.push(cur);
  return out.map(s => s.trim().replace(/\.$/, "")).filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1));
}

function arquivo(nicho) {
  return "LedWave_" + nicho.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\(.*?\)/g, "")
    .replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "") + ".pptx";
}

async function deck(n) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "LedWave";
  pres.company = "LedWave";
  pres.title = "LedWave | " + n.nicho;
  const C = pres.SchemeColor;
  const W = 13.333;

  const marca = (cor) => ({ text: { text: "LedWave", options: { x: 0.6, y: 0.4, w: 3, h: 0.4, fontSize: 16, bold: true, color: cor, margin: 0, isTextBox: true } } });

  pres.defineSlideMaster({
    title: "Capa",
    background: { color: HEX.dk1 },
    objects: [
      marca(HEX.lt1),
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 2.3, w: 7.6, h: 1.9, fontSize: 40, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 4.35, w: 7.6, h: 1.2, fontSize: 20, color: "D9D2F0", valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Fechamento",
    background: { color: HEX.dk1 },
    objects: [
      marca(HEX.lt1),
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 1.6, w: 7.6, h: 2.7, fontSize: 34, bold: true, color: C.background1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 4.5, w: 7.6, h: 1.5, fontSize: 20, color: "D9D2F0", valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Destaque",
    background: { color: HEX.dk2 },
    objects: [
      marca(HEX.lt1),
      { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 1.5, w: 11.5, h: 0.5, fontSize: 18, bold: true, color: C.accent1, align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.9, y: 2.2, w: 9.0, h: 4.2, fontSize: 32, bold: true, color: C.background1, valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Conteudo",
    background: { color: HEX.lt1 },
    objects: [
      { text: { text: "LedWave  ·  " + n.nicho, options: { x: 0.6, y: 6.95, w: 9, h: 0.3, fontSize: 10, color: HEX.accent6, margin: 0, isTextBox: true } } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 12.1, h: 0.9, fontSize: 32, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 6.95, w: 0.5, h: 0.3, fontSize: 10, color: HEX.accent6, align: "right" },
  });

  const card = (s, x, y, w, h, name, fill = C.background2) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" }, objectName: name });
  const circleIcon = async (s, x, y, d, iconName, bg, fg, name) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" }, objectName: name + " círculo" });
    const p = d * 0.25;
    s.addImage({ data: await icon(iconName, fg), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name + " ícone" });
  };
  const txt = (s, text, opts) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, color: C.text1, fontSize: 16, valign: "top" }, opts));
  const iconeNicho = ICONE_NICHO[n.nicho] || "FaStore";

  // 1. Capa
  pres.addSection({ title: "Abertura" });
  let s = pres.addSlide({ masterName: "Capa", sectionTitle: "Abertura" });
  s.addText(n.nicho, { placeholder: "title" });
  s.addText(n.frase, { placeholder: "body" });
  txt(s, "Proposta para [Nome do cliente]  ·  [Data]", { x: 0.6, y: 6.6, w: 7.6, h: 0.4, fontSize: 14, color: "B8AED8", objectName: "Cliente e data" });
  await circleIcon(s, 9.2, 1.9, 3.3, iconeNicho, HEX.accent1, HEX.lt1, "Ícone do nicho");
  s.addNotes(`[Abertura · ~1 min] Cumprimente, combine o objetivo e o tempo da reunião (15 min) e peça permissão: "Posso começar com uma pergunta?"\nDecisor típico: ${n.decisor}.`);

  // 2. Gancho
  s = pres.addSlide({ masterName: "Destaque", sectionTitle: "Abertura" });
  s.addText("Uma pergunta para começar", { placeholder: "title" });
  s.addText(n.gancho, { placeholder: "body" });
  await circleIcon(s, 10.6, 2.3, 1.9, "FaQuestion", HEX.accent1, HEX.lt1, "Pergunta");
  s.addNotes(`[Gancho · ~1 min] Leia a pergunta, olhe nos olhos e espere 3 segundos. Deixe o cliente responder e anote as palavras dele.\nSe ele responder, aprofunde com: "${n.spin[0]}"`);

  // 3. Desafio
  pres.addSection({ title: "O seu cenário" });
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "O seu cenário" });
  s.addText("O desafio de hoje", { placeholder: "title" });
  const col = [
    ["Como é hoje", n.dor, "FaExclamationTriangle", HEX.accent2],
    ["O custo de esperar", n.inacao, "FaHourglassHalf", HEX.accent1],
  ];
  for (let i = 0; i < 2; i++) {
    const x = 0.6 + i * 6.2;
    card(s, x, 1.75, 5.9, 4.7, "Card " + col[i][0]);
    await circleIcon(s, x + 0.4, 2.1, 0.9, col[i][2], col[i][3], HEX.lt1, col[i][0]);
    txt(s, col[i][0], { x: x + 0.4, y: 3.2, w: 5.1, h: 0.5, fontSize: 22, bold: true, objectName: col[i][0] + " título" });
    txt(s, col[i][1], { x: x + 0.4, y: 3.8, w: 5.1, h: 2.4, fontSize: 17, objectName: col[i][0] + " texto" });
  }
  s.addNotes(`[Dor · ~2 min] Não leia o slide. Pergunte antes de mostrar:\nSituação: ${n.spin[0]}\nProblema: ${n.spin[1]}\nImplicação: ${n.spin[2]}\nUse os números que o cliente der no slide de fechamento.`);

  // 4. Quem é a LedWave
  pres.addSection({ title: "LedWave" });
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "LedWave" });
  s.addText("Quem é a LedWave", { placeholder: "title" });
  txt(s, [
    { text: "De uma ideia em Xangai à liderança no Brasil", options: { fontSize: 24, bold: true, color: C.accent1, breakLine: true } },
    { text: " ", options: { fontSize: 10, breakLine: true } },
    { text: "Uma viagem a Xangai mostrou ao nosso fundador, Tiago Brito, como as grandes capitais usam o LED para encantar pessoas. Com R$ 12 mil, essa ideia virou fábrica em Goiânia.", options: { fontSize: 17, breakLine: true } },
    { text: " ", options: { fontSize: 10, breakLine: true } },
    { text: "Hoje fabricamos, instalamos e operamos painéis de LED para marcas de todo o país, com unidades no Brasil e nos Estados Unidos.", options: { fontSize: 17 } },
  ], { x: 0.6, y: 1.8, w: 5.8, h: 4.6, objectName: "História LedWave" });
  const marcos = [
    ["2010/11", "Fundação em Goiânia, com fábrica própria"],
    ["4 anos", "Seguidos no ranking Exame Negócios em Expansão"],
    ["2025", "1ª colocada do segmento de painéis de LED no ranking"],
    ["2026", "Única empresa brasileira de LED com estande próprio na NRF, em Nova York"],
  ];
  s.addShape(pres.shapes.LINE, { x: 7.55, y: 2.1, w: 0, h: 4.0, line: { color: HEX.lt2, width: 3 }, objectName: "Linha do tempo" });
  for (let i = 0; i < marcos.length; i++) {
    const y = 1.85 + i * 1.18;
    s.addShape(pres.shapes.OVAL, { x: 7.37, y: y + 0.13, w: 0.36, h: 0.36, fill: { color: C.accent1 }, line: { color: HEX.lt1, width: 3 }, objectName: "Marco " + (i + 1) });
    txt(s, marcos[i][0], { x: 7.95, y: y, w: 4.7, h: 0.4, fontSize: 18, bold: true, color: C.accent1, objectName: "Marco ano " + (i + 1) });
    txt(s, marcos[i][1], { x: 7.95, y: y + 0.42, w: 4.7, h: 0.6, fontSize: 14, objectName: "Marco texto " + (i + 1) });
  }
  s.addNotes(`[LedWave · ~1,5 min] O cliente é o herói; a LedWave é o guia que já fez isso antes. Conte a origem em 20 segundos e siga.\nFrase-ponte: "E é por isso que estamos aqui."`);

  // 5. Números
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "LedWave" });
  s.addText("LedWave em números", { placeholder: "title" });
  const stats = [
    ["1.125 m²", "O maior painel de LED da América Latina (Boulevard.Live, Brasília)"],
    ["Nº 1", "do segmento de painéis de LED no ranking Exame Negócios em Expansão 2025"],
    ["4 anos", "seguidos entre as empresas que mais crescem no Brasil (Exame)"],
    ["4 bases", "Goiânia (sede e fábrica), São Paulo, Brasília e Orlando (EUA)"],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.08;
    card(s, x, 1.9, 2.85, 4.2, "Número " + (i + 1), i % 2 === 0 ? C.text2 : C.background2);
    txt(s, stats[i][0], { x: x + 0.3, y: 2.3, w: 2.3, h: 1.2, fontSize: 40, bold: true, color: i % 2 === 0 ? C.background1 : C.accent1, objectName: "Número valor " + (i + 1) });
    txt(s, stats[i][1], { x: x + 0.3, y: 3.65, w: 2.3, h: 2.2, fontSize: 15, color: i % 2 === 0 ? C.background1 : C.text1, objectName: "Número legenda " + (i + 1) });
  }
  txt(s, "Ranking Exame Negócios em Expansão com dados auditados pela PwC.", { x: 0.6, y: 6.35, w: 12, h: 0.3, fontSize: 11, color: HEX.accent6, objectName: "Fonte" });
  s.addNotes(`[Números · ~1 min] Escolha os 2 números que mais conversam com ${n.nicho} e fale só deles. Ex.: para mídia e grandes formatos, o Boulevard.Live; para redes, as 4 bases e a fábrica própria.`);

  // 6. Solução completa
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "LedWave" });
  s.addText("Solução completa, do projeto ao resultado", { placeholder: "title" });
  const etapas = [
    ["FaSearch", "Diagnóstico e projeto", "Estudo do seu espaço, do público e do objetivo"],
    ["FaIndustry", "Fabricação própria", "Linha de produção em Goiânia"],
    ["FaTools", "Instalação", "Estrutura, energia e entrega com equipe técnica"],
    ["FaPhotoVideo", "Conteúdo e gestão", "Telas atualizadas do celular ou do computador"],
    ["FaHeadset", "Suporte", "Assistência técnica para a tela não apagar"],
  ];
  for (let i = 0; i < etapas.length; i++) {
    const x = 0.6 + i * 2.48;
    await circleIcon(s, x + 0.62, 2.0, 1.0, etapas[i][0], HEX.dk2, HEX.lt1, etapas[i][1]);
    if (i < etapas.length - 1) s.addImage({ data: await icon("FaArrowRight", HEX.accent1), x: x + 2.05, y: 2.33, w: 0.32, h: 0.32, objectName: "Seta " + (i + 1) });
    txt(s, etapas[i][1], { x: x, y: 3.25, w: 2.25, h: 0.7, fontSize: 17, bold: true, align: "center", objectName: etapas[i][1] + " título" });
    txt(s, etapas[i][2], { x: x, y: 3.95, w: 2.25, h: 1.2, fontSize: 14, align: "center", color: C.text2, objectName: etapas[i][1] + " texto" });
  }
  card(s, 0.6, 5.55, 12.1, 0.95, "Faixa venda e locação", C.background2);
  txt(s, [
    { text: "Venda ou locação: ", options: { bold: true, color: C.accent1 } },
    { text: "o modelo se adapta ao seu uso, do evento de um dia à operação permanente." },
  ], { x: 0.95, y: 5.55, w: 11.4, h: 0.95, fontSize: 17, valign: "middle", objectName: "Venda ou locação" });
  s.addNotes(`[Solução completa · ~1 min] Mensagem central: "Não vendemos painel. Entregamos o resultado que o painel gera."`);

  // 7. Marcas
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "LedWave" });
  s.addText("Quem confia na LedWave", { placeholder: "title" });
  const marcas = ["Volkswagen", "Globo", "Riachuelo"];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.85, 3.8, 1.7, "Marca " + marcas[i]);
    txt(s, marcas[i], { x: x, y: 1.85, w: 3.8, h: 1.7, fontSize: 28, bold: true, align: "center", valign: "middle", color: C.text2, objectName: "Marca nome " + (i + 1) });
  }
  const credenciais = [
    ["FaTrophy", "Ranking Exame", "4 anos seguidos, nº 1 do segmento em 2025"],
    ["FaStore", "ABF Expo", "Parceira oficial da maior feira de franquias do país"],
    ["FaMapMarkerAlt", "NRF 2026, Nova York", "Estande próprio na maior feira de varejo do mundo"],
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    await circleIcon(s, x, 4.1, 0.85, credenciais[i][0], HEX.accent1, HEX.lt1, credenciais[i][1]);
    txt(s, credenciais[i][1], { x: x + 1.05, y: 4.1, w: 2.75, h: 0.45, fontSize: 17, bold: true, objectName: credenciais[i][1] + " título" });
    txt(s, credenciais[i][2], { x: x + 1.05, y: 4.6, w: 2.75, h: 1.0, fontSize: 14, color: C.text2, objectName: credenciais[i][1] + " texto" });
  }
  txt(s, "Substitua ou complete com logos de clientes do segmento " + n.nicho + ".", { x: 0.6, y: 6.25, w: 12, h: 0.3, fontSize: 11, italic: true, color: HEX.accent6, objectName: "Instrução logos" });
  s.addNotes(`[Prova social · ~1 min] Se houver cliente do mesmo segmento, troque um dos nomes por ele e conte o resultado em uma frase. Apague a linha de instrução antes de enviar o arquivo.`);

  // 8. Propósito
  pres.addSection({ title: "Por que digitalizar" });
  s = pres.addSlide({ masterName: "Destaque", sectionTitle: "Por que digitalizar" });
  s.addText("Por que digitalizar o seu espaço", { placeholder: "title" });
  s.addText(n.proposito, { placeholder: "body" });
  await circleIcon(s, 10.6, 2.3, 1.9, "FaLightbulb", HEX.accent1, HEX.lt1, "Propósito");
  s.addNotes(`[Propósito · ~1 min] Fale devagar. Este é o porquê da conversa. Pausa de 3 segundos no final.`);

  // 9. Imagine
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "Por que digitalizar" });
  s.addText("Imagine o seu espaço", { placeholder: "title" });
  txt(s, n.historia, { x: 0.6, y: 1.85, w: 5.4, h: 3.6, fontSize: 18, objectName: "História" });
  txt(s, n.frase, { x: 0.6, y: 5.5, w: 5.4, h: 1.0, fontSize: 20, bold: true, italic: true, color: C.accent1, objectName: "Frase de efeito" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.5, y: 1.75, w: 6.2, h: 4.75, rectRadius: 0.12, fill: { color: C.background2 }, line: { color: HEX.accent3, width: 1.5, dashType: "dash" }, objectName: "Área da simulação" });
  await circleIcon(s, 9.15, 3.0, 0.9, "FaPhotoVideo", HEX.accent3, HEX.lt1, "Simulação");
  txt(s, "Simulação do painel no espaço do cliente\n(insira aqui o mockup antes da reunião)", { x: 6.8, y: 4.1, w: 5.6, h: 0.9, fontSize: 14, align: "center", color: C.text2, objectName: "Instrução simulação" });
  s.addNotes(`[História · ~1,5 min] Conte a história como cena, no presente. Se tiver o mockup do espaço do cliente, este é o momento de mostrar: antes e depois.\nFrase de efeito: "${n.frase}"`);

  // 10. Três ganhos
  pres.addSection({ title: "Ganhos e solução" });
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "Ganhos e solução" });
  s.addText("Três ganhos para o seu negócio", { placeholder: "title" });
  const ganhos = [
    ["FaChartLine", "Mais receita", n.arg_receita, HEX.accent1],
    ["FaStar", "Mais experiência", n.arg_exp, HEX.accent2],
    ["FaCogs", "Menos custo", n.arg_oper, HEX.accent3],
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.75, 3.8, 4.8, "Ganho " + ganhos[i][1]);
    await circleIcon(s, x + 0.35, 2.1, 0.95, ganhos[i][0], ganhos[i][3], HEX.lt1, ganhos[i][1]);
    txt(s, ganhos[i][1], { x: x + 0.35, y: 3.25, w: 3.1, h: 0.5, fontSize: 21, bold: true, objectName: ganhos[i][1] + " título" });
    txt(s, ganhos[i][2], { x: x + 0.35, y: 3.85, w: 3.1, h: 2.5, fontSize: 15, objectName: ganhos[i][1] + " texto" });
  }
  s.addNotes(`[Ganhos · ~2,5 min] Um ganho por vez. Para cada um, conecte com o que o cliente disse na descoberta: "Você comentou que... é aqui que isso muda."`);

  // 11. Solução + KPIs
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "Ganhos e solução" });
  s.addText("A solução para o seu espaço", { placeholder: "title" });
  const sol = itens(n.solucao).slice(0, 5);
  txt(s, "O que propomos", { x: 0.6, y: 1.7, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1, objectName: "Título solução" });
  for (let i = 0; i < sol.length; i++) {
    const y = 2.3 + i * 0.85;
    await circleIcon(s, 0.6, y, 0.5, "FaCheck", HEX.dk2, HEX.lt1, "Item " + (i + 1));
    txt(s, sol[i], { x: 1.3, y: y - 0.05, w: 5.3, h: 0.75, fontSize: 15, valign: "middle", objectName: "Solução " + (i + 1) });
  }
  card(s, 7.2, 1.7, 5.5, 4.85, "Card indicadores", C.text2);
  txt(s, "O que você vai medir", { x: 7.6, y: 2.0, w: 4.8, h: 0.5, fontSize: 20, bold: true, color: C.background1, objectName: "Título indicadores" });
  const kpis = itens(n.kpi).slice(0, 5);
  txt(s, kpis.map((k, i) => ({ text: k, options: { bullet: true, breakLine: i < kpis.length - 1, paraSpaceAfter: 10 } })),
    { x: 7.6, y: 2.65, w: 4.8, h: 3.7, fontSize: 16, color: C.background1, objectName: "Indicadores" });
  s.addNotes(`[Solução · ~1,5 min] Mostre só o que faz sentido para o espaço do cliente; apague o resto.\nObjeção provável: ${n.objecao}\nResposta: ${n.resposta}`);

  // 12. Projeto em destaque
  s = pres.addSlide({ masterName: "Conteudo", sectionTitle: "Ganhos e solução" });
  s.addText("Projeto em destaque", { placeholder: "title" });
  card(s, 0.6, 1.75, 6.0, 4.8, "Card Boulevard", C.text1);
  txt(s, "Boulevard.Live", { x: 1.0, y: 2.1, w: 5.2, h: 0.5, fontSize: 18, bold: true, color: C.accent1, objectName: "Boulevard título" });
  txt(s, "1.125 m²", { x: 1.0, y: 2.65, w: 5.2, h: 1.2, fontSize: 60, bold: true, color: C.background1, objectName: "Boulevard número" });
  txt(s, "O maior painel de LED da América Latina, em Brasília. Inspirado na Times Square e instalado no ponto de maior fluxo de pessoas e veículos da cidade.", { x: 1.0, y: 4.05, w: 5.2, h: 2.2, fontSize: 16, color: C.background1, objectName: "Boulevard texto" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 6.9, y: 1.75, w: 5.8, h: 4.8, rectRadius: 0.12, fill: { color: C.background2 }, line: { color: HEX.accent3, width: 1.5, dashType: "dash" }, objectName: "Área case do segmento" });
  txt(s, "Case do seu segmento", { x: 7.3, y: 2.1, w: 5.0, h: 0.5, fontSize: 18, bold: true, color: C.accent1, objectName: "Case título" });
  txt(s, "[Nome do cliente do segmento]\n\n[Desafio em uma frase]\n\n[O que a LedWave entregou]\n\n[Resultado]", { x: 7.3, y: 2.75, w: 5.0, h: 3.5, fontSize: 15, color: C.text2, objectName: "Case conteúdo" });
  s.addNotes(`[Prova · ~1 min] Preencha o case do segmento com um cliente real antes da reunião. Sem case do segmento, apague o card da direita e fale só do Boulevard.Live.`);

  // 13. Fechamento
  pres.addSection({ title: "Próximo passo" });
  s = pres.addSlide({ masterName: "Fechamento", sectionTitle: "Próximo passo" });
  s.addText(n.frase, { placeholder: "title" });
  s.addText(n.fechamento, { placeholder: "body" });
  card(s, 8.8, 2.3, 3.9, 3.25, "Card próximo passo", C.accent1);
  txt(s, "Próximo passo", { x: 9.15, y: 2.6, w: 3.2, h: 0.45, fontSize: 18, bold: true, color: C.background1, objectName: "Próximo passo título" });
  txt(s, n.cta, { x: 9.15, y: 3.1, w: 3.2, h: 2.3, fontSize: 15, color: C.background1, objectName: "Próximo passo texto" });
  txt(s, "[Nome do executivo]  ·  [Telefone / WhatsApp]  ·  [E-mail]  ·  ledwave.com.br", { x: 0.6, y: 6.6, w: 12, h: 0.4, fontSize: 14, color: "B8AED8", objectName: "Contato" });
  s.addNotes(`[Fechamento · ~1,5 min] Termine no ponto alto: repita a frase de efeito e proponha o próximo passo com duas opções de data ("quinta ou sexta?"). Nunca termine com "alguma dúvida?".\nPergunta de necessidade: ${n.spin[3]}`);

  const file = path.join(OUT, arquivo(n.nicho));
  await pres.writeFile({ fileName: file });
  await applyTheme(file, THEME);
  return file;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const only = process.argv[3];
  for (const n of NICHOS) {
    if (only && n.nicho !== only) continue;
    console.log(await deck(n));
  }
})();
