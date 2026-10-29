// Apresentação da jornada do lead para as SDRs (Pryscila e Kelly).
// Uso: node gerar_jornada_sdr.js <arquivo.pptx>
const path = require("path");
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");

const OUT = process.argv[2];
const THEME = {
  name: "LedWave",
  headFontFace: "Arial",
  bodyFontFace: "Arial",
  colors: {
    dk1: "3D3D3D", lt1: "FFFFFF", dk2: "5F5F5F", lt2: "F2F3F7",
    accent1: "E011FF", accent2: "12D9FF", accent3: "658DFF",
    accent4: "8A5CF6", accent5: "3EB1FE", accent6: "7A7A7A",
    hlink: "658DFF", folHlink: "8A5CF6",
  },
};
const HEX = THEME.colors;
const ASSETS = path.join(__dirname, "assets");
const LOGO = path.join(ASSETS, "logo-ledwave.png"); // 829 x 284
const PIXELS = path.join(ASSETS, "pixels-capa.png"); // 542 x 634
const FAIXA = path.join(ASSETS, "pixels-faixa.png"); // 542 x 128

const iconCache = {};
async function icon(name, color) {
  const key = name + color;
  if (!iconCache[key]) {
    const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[name], { color: "#" + color, size: 256 }));
    iconCache[key] = "image/png;base64," + (await sharp(Buffer.from(svg)).resize(256, 256).png().toBuffer()).toString("base64");
  }
  return iconCache[key];
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.author = "LedWave";
  pres.company = "LedWave";
  pres.title = "LedWave | Jornada do lead (SDR)";
  const C = pres.SchemeColor;
  const marca = (w) => ({ image: { path: LOGO, x: 0.6, y: 0.45, w, h: w * 284 / 829 } });

  pres.defineSlideMaster({
    title: "Capa",
    background: { color: HEX.lt1 },
    objects: [
      marca(3.0),
      { image: { path: PIXELS, x: 8.6, y: 1.0, w: 4.27, h: 5.0 } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 2.3, w: 7.3, h: 1.9, fontSize: 40, bold: true, color: C.text1, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.6, y: 4.35, w: 7.3, h: 1.2, fontSize: 20, color: C.text2, valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Destaque",
    background: { color: HEX.lt2 },
    objects: [
      marca(1.8),
      { image: { path: FAIXA, x: 9.95, y: 6.45, w: 2.75, h: 0.65 } },
      { placeholder: { options: { name: "title", type: "title", x: 0.9, y: 1.5, w: 11.5, h: 0.5, fontSize: 18, bold: true, color: C.accent1, align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.9, y: 2.2, w: 11.0, h: 3.6, fontSize: 34, bold: true, color: C.text1, valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Conteudo",
    background: { color: HEX.lt1 },
    objects: [
      { image: { path: LOGO, x: 0.6, y: 6.86, w: 1.05, h: 1.05 * 284 / 829 } },
      { text: { text: "Playbook SDR · Jornada do lead", options: { x: 1.85, y: 6.92, w: 9, h: 0.3, fontSize: 10, color: HEX.accent6, margin: 0, isTextBox: true } } },
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.45, w: 12.1, h: 0.9, fontSize: 32, bold: true, color: C.text1, valign: "middle", align: "left", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.2, y: 6.95, w: 0.5, h: 0.3, fontSize: 10, color: HEX.accent6, align: "right" },
  });

  const card = (s, x, y, w, h, name, fill = C.background2) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: fill }, line: { type: "none" }, objectName: name });
  const circleIcon = async (s, x, y, d, iconName, bg, name) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" }, objectName: name + " círculo" });
    const p = d * 0.25;
    s.addImage({ data: await icon(iconName, HEX.lt1), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p, objectName: name + " ícone" });
  };
  const num = (s, x, y, d, n, bg, name) => {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { type: "none" }, objectName: name + " círculo" });
    s.addText(String(n), { x, y, w: d, h: d, fontSize: d * 26, bold: true, color: HEX.lt1, align: "center", valign: "middle", margin: 0, isTextBox: true, objectName: name + " número" });
  };
  const txt = (s, text, opts) => s.addText(text, Object.assign({ isTextBox: true, margin: 0, color: C.text1, fontSize: 16, valign: "top" }, opts));
  const GRAD = [HEX.accent2, HEX.accent5, HEX.accent3, HEX.accent4, "B43CF8", HEX.accent1];
  const content = (title, section) => { const s = pres.addSlide({ masterName: "Conteudo", sectionTitle: section }); s.addText(title, { placeholder: "title" }); return s; };

  // 1. Capa
  pres.addSection({ title: "Abertura" });
  let s = pres.addSlide({ masterName: "Capa", sectionTitle: "Abertura" });
  s.addText("Jornada do lead: playbook das SDRs", { placeholder: "title" });
  s.addText("Do primeiro contato à oportunidade no Salesforce", { placeholder: "body" });
  txt(s, "Pryscila Almeida  ·  Kelly  ·  Time de Growth e Comercial", { x: 0.6, y: 6.6, w: 7.3, h: 0.4, fontSize: 14, color: HEX.accent6, objectName: "Equipe" });
  await circleIcon(s, 8.05, 4.55, 1.8, "FaHeadset", HEX.dk2, "Ícone SDR");
  s.addNotes("Abertura: o objetivo é que todo lead seja respondido em até 5 minutos no horário comercial, qualificado em uma conversa e registrado como oportunidade no Salesforce, para o gerente da vertical indicar o executivo.");

  // 2. Ponto de partida
  s = content("Onde estamos hoje", "Abertura");
  const stats = [
    ["58%", "dos leads nunca recebem contato, por falta de capacidade de atendimento", C.text2, C.background1],
    ["1.441", "leads parados há mais de 30 dias (873 na fila da Pryscila)", C.background2, C.accent1],
    ["811 → 204", "MQL que viraram SQL no digital em junho", C.text2, C.background1],
    ["8", "negócios ganhos desses 1.139 leads de junho", C.background2, C.accent1],
  ];
  for (let i = 0; i < 4; i++) {
    const x = 0.6 + i * 3.08;
    card(s, x, 1.75, 2.85, 4.2, "Número " + (i + 1), stats[i][2]);
    const dark = stats[i][2] === C.text2;
    txt(s, stats[i][0], { x: x + 0.3, y: 2.15, w: 2.3, h: 1.2, fontSize: stats[i][0].length > 6 ? 30 : 44, bold: true, color: dark ? C.background1 : C.accent1, objectName: "Valor " + (i + 1) });
    txt(s, stats[i][1], { x: x + 0.3, y: 3.5, w: 2.3, h: 2.2, fontSize: 15, color: dark ? C.background1 : C.text1, objectName: "Legenda " + (i + 1) });
  }
  txt(s, "O gargalo não é a qualidade do lead: é a velocidade e a ordem do atendimento.", { x: 0.6, y: 6.2, w: 12, h: 0.4, fontSize: 16, bold: true, color: C.text1, objectName: "Conclusão" });
  txt(s, "Fontes: Plano de Growth 2º semestre, Plano Limbo e Convenção de Vendas 2026.", { x: 0.6, y: 6.55, w: 12, h: 0.3, fontSize: 10, color: HEX.accent6, objectName: "Fonte" });
  s.addNotes("Números internos: 58%+ dos leads nunca contatados (plano de growth), 1.441 leads parados (Plano Limbo), funil do digital de junho: 1.139 leads, 811 MQL, 204 SQL, 8 ganhos.");

  // 3. Princípios
  s = content("Os 5 princípios do atendimento", "Abertura");
  const princ = [
    ["FaBolt", "Velocidade vence", "Lead quente respondido em até 5 minutos"],
    ["FaStore", "Fale do negócio dele", "Abra com o nicho e a origem do lead"],
    ["FaSearch", "SDR qualifica", "O executivo vende; o SDR entende e gera a oportunidade"],
    ["FaCalendarCheck", "Sempre um próximo passo", "Toda conversa termina com uma data"],
    ["FaDatabase", "Está no Salesforce", "O que não foi registrado não aconteceu"],
  ];
  for (let i = 0; i < 5; i++) {
    const x = 0.6 + i * 2.46;
    card(s, x, 1.8, 2.26, 4.3, "Princípio " + (i + 1));
    await circleIcon(s, x + 0.65, 2.15, 0.95, princ[i][0], GRAD[i + 1], princ[i][1]);
    txt(s, princ[i][1], { x: x + 0.2, y: 3.35, w: 1.86, h: 0.9, fontSize: 18, bold: true, align: "center", objectName: princ[i][1] + " título" });
    txt(s, princ[i][2], { x: x + 0.2, y: 4.3, w: 1.86, h: 1.5, fontSize: 15, align: "center", color: C.text2, objectName: princ[i][1] + " texto" });
  }

  // 4. Jornada
  pres.addSection({ title: "Jornada" });
  s = content("A jornada em 7 etapas", "Jornada");
  const etapas = [
    ["Entrada e prioridade", "quente, morno, frio"],
    ["1º contato", "ligação + WhatsApp"],
    ["Qualificação", "6 perguntas, 15 min"],
    ["Oportunidade", "Salesforce + gerente da vertical"],
    ["Cadência", "7 toques em 10 dias"],
    ["Nutrição ou saída", "sempre com motivo"],
    ["Salesforce", "em todas as etapas"],
  ];
  for (let i = 0; i < 7; i++) {
    const x = 0.6 + i * 1.75;
    num(s, x + 0.45, 2.0, 0.75, i + 1, i === 3 ? HEX.accent1 : GRAD.at(Math.min(i, 5)), "Etapa " + (i + 1));
    if (i < 6) s.addShape(pres.shapes.LINE, { x: x + 1.28, y: 2.375, w: 0.6, h: 0, line: { color: HEX.accent6, width: 1.25, endArrowType: "triangle" }, objectName: "Seta " + (i + 1) });
    txt(s, etapas[i][0], { x: x, y: 3.0, w: 1.65, h: 0.75, fontSize: 15, bold: true, align: "center", objectName: "Etapa nome " + (i + 1) });
    txt(s, etapas[i][1], { x: x, y: 3.75, w: 1.65, h: 0.8, fontSize: 13, align: "center", color: C.text2, objectName: "Etapa texto " + (i + 1) });
  }
  card(s, 0.6, 5.0, 12.1, 1.2, "Faixa regra", C.background2);
  txt(s, [
    { text: "Regra de ouro: ", options: { bold: true, color: C.accent4 } },
    { text: "o lead só sai da fila como oportunidade passada ao gerente da vertical ou com motivo registrado. Respondeu na cadência? Volta para a qualificação." },
  ], { x: 0.95, y: 5.0, w: 11.4, h: 1.2, fontSize: 17, valign: "middle", objectName: "Regra de ouro" });

  // 5. Priorização
  s = content("Etapa 1: quem atender primeiro", "Jornada");
  const temp = [
    ["Quente", "até 5 min", "Pediu orçamento ou visita; tem projeto, local ou data; veio de página de segmento ou do Ledson com nota alta", "Ligação + WhatsApp", HEX.accent1],
    ["Morno", "até 2 h", "Pediu informação geral, sem prazo; veio de feira ou evento; empresa do perfil sem projeto definido", "WhatsApp + ligação no dia", HEX.accent4],
    ["Frio", "até 24 h", "Baixou conteúdo, pesquisa de estudante, pessoa física sem projeto, contato incompleto", "WhatsApp ou e-mail", HEX.accent3],
  ];
  for (let i = 0; i < 3; i++) {
    const x = 0.6 + i * 4.1;
    card(s, x, 1.75, 3.8, 4.5, "Temperatura " + temp[i][0]);
    s.addShape(pres.shapes.OVAL, { x: x + 0.3, y: 2.05, w: 0.5, h: 0.5, fill: { color: temp[i][4] }, line: { type: "none" }, objectName: temp[i][0] + " marcador" });
    txt(s, temp[i][0], { x: x + 0.95, y: 2.05, w: 2.6, h: 0.5, fontSize: 22, bold: true, valign: "middle", objectName: temp[i][0] + " nome" });
    txt(s, temp[i][1], { x: x + 0.3, y: 2.8, w: 3.2, h: 0.6, fontSize: 28, bold: true, color: C.accent1, objectName: temp[i][0] + " prazo" });
    txt(s, temp[i][2], { x: x + 0.3, y: 3.5, w: 3.2, h: 1.9, fontSize: 14, objectName: temp[i][0] + " critério" });
    txt(s, temp[i][3], { x: x + 0.3, y: 5.55, w: 3.2, h: 0.5, fontSize: 14, bold: true, color: C.text2, objectName: temp[i][0] + " canal" });
  }
  txt(s, "Antes de falar: 2 minutos de pesquisa (origem, site e Instagram, nicho na planilha comercial, histórico no Salesforce).", { x: 0.6, y: 6.4, w: 12.1, h: 0.4, fontSize: 13, color: C.text2, objectName: "Pesquisa" });
  s.addNotes("Lead fora do horário comercial: o Ledson responde na hora e o SDR liga na primeira hora do dia seguinte, quentes primeiro.");

  // 6. Primeiro contato: ligação
  s = content("Etapa 2: a ligação de 2 minutos", "Jornada");
  const call = [
    ["Abertura", "\"Oi, [Nome]? Aqui é a [Pryscila], da LedWave. Você pediu um orçamento de painel de LED há poucos minutos. Tem 2 minutinhos?\""],
    ["Motivo", "\"Quero entender o seu projeto para te conectar com o especialista certo e não te mandar nada genérico.\""],
    ["Primeira pergunta", "\"Onde você pensa em usar o painel e o que você quer que ele resolva?\""],
    ["Não pode agora", "\"Sem problema. Qual o melhor horário hoje ou amanhã? Te mando um WhatsApp para combinar.\""],
  ];
  for (let i = 0; i < 4; i++) {
    const y = 1.6 + i * 1.15;
    num(s, 0.6, y + 0.1, 0.6, i + 1, GRAD.at(i + 2), "Passo ligação " + (i + 1));
    txt(s, call[i][0], { x: 1.45, y: y, w: 2.6, h: 0.8, fontSize: 17, bold: true, valign: "middle", objectName: "Passo nome " + (i + 1) });
    txt(s, call[i][1], { x: 4.1, y: y, w: 8.6, h: 0.9, fontSize: 15, italic: true, valign: "middle", objectName: "Passo fala " + (i + 1) });
  }
  card(s, 0.6, 6.25, 12.1, 0.42, "Faixa WhatsApp", C.background2);
  txt(s, "Não atendeu? WhatsApp na mesma hora (próximo slide).", { x: 0.85, y: 6.25, w: 11.6, h: 0.42, fontSize: 14, bold: true, valign: "middle", color: C.text2, objectName: "Não atendeu" });

  // 7. WhatsApp por origem
  s = content("Etapa 2: o WhatsApp certo para cada origem", "Jornada");
  const wpp = [
    ["FaFileInvoiceDollar", "Pediu orçamento", "Recebi seu pedido de orçamento. É para qual espaço (fachada, loja, evento, igreja...) e em qual cidade?"],
    ["FaRobot", "Veio pelo Ledson", "Vi que você conversou com o Ledson sobre [tema]. Vou cuidar do seu atendimento. Posso te ligar em 5 minutos?"],
    ["FaUsers", "Feira ou evento", "Foi ótimo te conhecer na [feira]. Que tal 15 minutos esta semana? Terça ou quinta fica melhor?"],
    ["FaBookOpen", "Baixou conteúdo", "Vi seu interesse em [tema]. Está pensando em um projeto com LED ou ainda pesquisando?"],
    ["FaHistory", "Parado há 30+ dias", "Há um tempo você falou com a gente. O projeto ainda está de pé? Te ajudo a retomar."],
  ];
  for (let i = 0; i < 5; i++) {
    const x = 0.6 + i * 2.46;
    card(s, x, 1.75, 2.26, 4.2, "WhatsApp " + wpp[i][1]);
    await circleIcon(s, x + 0.25, 2.0, 0.7, wpp[i][0], GRAD[i + 1], wpp[i][1]);
    txt(s, wpp[i][1], { x: x + 0.25, y: 2.85, w: 1.86, h: 0.6, fontSize: 16, bold: true, objectName: wpp[i][1] + " título" });
    txt(s, wpp[i][2], { x: x + 0.25, y: 3.5, w: 1.86, h: 2.3, fontSize: 13, italic: true, color: C.text2, objectName: wpp[i][1] + " texto" });
  }
  txt(s, "Regras: até 4 linhas · uma pergunta por mensagem · sem preço nem catálogo no 1º contato · áudio só se o lead mandar primeiro.", { x: 0.6, y: 6.2, w: 12.1, h: 0.5, fontSize: 14, bold: true, color: C.text1, objectName: "Regras WhatsApp" });
  s.addNotes("Os textos completos estão no documento do playbook. Todos começam com: Oi, [Nome]! Aqui é a [Pryscila/Kelly], da LedWave.");

  // 8. Qualificação
  s = content("Etapa 3: qualificação em 6 perguntas", "Jornada");
  const quals = [
    ["Projeto", "Onde o painel vai ficar e qual o tamanho do espaço?"],
    ["Propósito", "O que você quer que mude: vender mais, chamar atenção, vender mídia?"],
    ["Dor", "Como você comunica isso hoje? O que não está funcionando?"],
    ["Prazo", "Para quando precisa funcionando? Tem inauguração ou evento?"],
    ["Decisor", "Além de você, quem participa dessa decisão?"],
    ["Modelo", "Pensa em comprar ou alugar? Tem uma faixa de investimento?"],
  ];
  for (let i = 0; i < 6; i++) {
    const x = 0.6 + (i % 3) * 4.1, y = 1.7 + Math.floor(i / 3) * 1.85;
    card(s, x, y, 3.8, 1.65, "Pergunta " + quals[i][0]);
    num(s, x + 0.25, y + 0.25, 0.5, i + 1, GRAD[i], "Pergunta " + (i + 1));
    txt(s, quals[i][0], { x: x + 0.9, y: y + 0.25, w: 2.7, h: 0.5, fontSize: 17, bold: true, valign: "middle", objectName: quals[i][0] + " nome" });
    txt(s, quals[i][1], { x: x + 0.25, y: y + 0.85, w: 3.35, h: 0.75, fontSize: 13, italic: true, color: C.text2, objectName: quals[i][0] + " pergunta" });
  }
  card(s, 0.6, 5.5, 12.1, 1.2, "Critério SQL", C.text2);
  txt(s, [
    { text: "Vira SQL quando tem: ", options: { bold: true, color: C.accent2 } },
    { text: "local definido + propósito claro + decisor identificado + prazo de até 6 meses ou evento. Investimento não é obrigatório: o executivo monta as opções.", options: { color: C.background1 } },
  ], { x: 0.95, y: 5.5, w: 11.4, h: 1.2, fontSize: 15, valign: "middle", objectName: "Critério texto" });
  s.addNotes("Faça uma pergunta por vez e anote as palavras do lead: o executivo vai usá-las na reunião. Perfil bom sem projeto ou prazo = MQL em nutrição, com retorno marcado.");

  // 8b. Aluguel para eventos (vertical pausada)
  s = content("Aluguel de painel para eventos: vertical pausada", "Jornada");
  card(s, 0.6, 1.6, 12.1, 0.95, "Aviso pausa", C.background2);
  await circleIcon(s, 0.85, 1.75, 0.65, "FaPause", HEX.accent1, "Pausa");
  txt(s, [
    { text: "No momento, a locação de painéis para eventos está pausada. ", options: { bold: true } },
    { text: "Vamos retomar em breve, então nenhum desses leads se perde: todos ficam registrados para o retorno." },
  ], { x: 1.75, y: 1.6, w: 10.7, h: 0.95, fontSize: 16, valign: "middle", objectName: "Aviso texto" });
  card(s, 0.6, 2.8, 6.6, 3.85, "Mensagem evento", C.text2);
  await circleIcon(s, 0.9, 3.05, 0.55, "FaWhatsapp", HEX.accent2, "Mensagem evento");
  txt(s, "Mensagem para o lead", { x: 1.6, y: 3.05, w: 5.3, h: 0.55, fontSize: 18, bold: true, color: C.accent2, valign: "middle", objectName: "Mensagem evento título" });
  txt(s, "\"Oi, [Nome]! Aqui é a [Pryscila/Kelly], da LedWave. Obrigada pelo contato! No momento, a locação de painéis para eventos está pausada, mas vamos retomar em breve. Posso guardar seu contato e te avisar assim que voltarmos? E se você tiver um projeto de painel fixo, como fachada, loja ou igreja, já consigo te ajudar agora.\"", { x: 0.9, y: 3.8, w: 6.0, h: 2.7, fontSize: 18, italic: true, color: C.background1, objectName: "Mensagem evento texto" });
  txt(s, "O que fazer", { x: 7.6, y: 2.8, w: 5.1, h: 0.5, fontSize: 20, bold: true, color: C.accent1, objectName: "Evento passos título" });
  const passosEvento = [
    "Enviar a mensagem e anotar data, cidade e tipo do evento",
    "Perguntar se há projeto de painel fixo: se sim, segue a qualificação",
    "Salesforce: Nutrição, motivo \"Locação de eventos pausada\"",
    "Na volta da vertical, essa lista é a primeira a ser chamada",
  ];
  for (let i = 0; i < 4; i++) {
    const y = 3.45 + i * 0.8;
    num(s, 7.6, y, 0.5, i + 1, GRAD[i + 2], "Passo evento " + (i + 1));
    txt(s, passosEvento[i], { x: 8.3, y: y - 0.1, w: 4.4, h: 0.7, fontSize: 14, valign: "middle", objectName: "Passo evento texto " + (i + 1) });
  }
  s.addNotes("Vale para quem pede telão ou painel para um evento pontual (show, casamento, formatura, feira). Seja gentil e rápida: o lead precisa sair da conversa sabendo que vamos voltar e que o contato dele está guardado. Não indique concorrentes nem passe previsão de data de retorno.");

  // 9. Agendamento e passagem
  s = content("Etapa 4: gerar a oportunidade e passar o bastão", "Jornada");
  txt(s, "Na conversa", { x: 0.6, y: 1.7, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1, objectName: "Na conversa título" });
  txt(s, "\"Faz sentido uma conversa de 30 minutos com um especialista nosso em [nicho]. Vou registrar tudo e passar para o nosso gerente de [nicho], que indica o especialista ideal para o seu projeto. Assim você não repete nada. Qual o melhor dia e período para ele te chamar?\"", { x: 0.6, y: 2.25, w: 5.9, h: 1.65, fontSize: 15, italic: true, objectName: "Script agenda" });
  txt(s, "Depois", { x: 0.6, y: 4.0, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1, objectName: "Depois título" });
  txt(s, [
    { text: "Gerar a oportunidade no Salesforce com a nota completa", options: { bullet: true, breakLine: true } },
    { text: "Passar ao gerente da vertical, que indica o executivo", options: { bullet: true, breakLine: true } },
    { text: "Confirmar no WhatsApp e pedir uma foto do espaço", options: { bullet: true, breakLine: true } },
    { text: "Acompanhar: executivo indicado e contato feito", options: { bullet: true } },
  ], { x: 0.6, y: 4.5, w: 5.9, h: 2.0, fontSize: 15, paraSpaceAfter: 6, objectName: "Depois lista" });
  card(s, 7.0, 1.7, 5.7, 4.95, "Nota de passagem", C.text2);
  txt(s, "Nota da oportunidade no Salesforce", { x: 7.35, y: 1.95, w: 5.0, h: 0.5, fontSize: 18, bold: true, color: C.accent2, objectName: "Nota título" });
  const nota = ["Empresa, nicho e contato", "Decisor(es)", "Projeto: local, medidas, indoor/outdoor", "Propósito de compra", "Dor nas palavras do cliente", "Prazo ou evento", "Compra ou locação e investimento", "Objeções que apareceram", "Origem, TAG e melhor dia para o contato"];
  txt(s, nota.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < nota.length - 1 } })), { x: 7.35, y: 2.6, w: 5.0, h: 3.9, fontSize: 15, color: C.background1, paraSpaceAfter: 5, objectName: "Nota campos" });

  // 10. Cadência
  s = content("Etapa 5: cadência de 7 toques em 10 dias", "Jornada");
  const cad = [
    ["D0", "Ligação + WhatsApp", "Primeiro contato", "FaPhoneAlt"],
    ["D1", "Ligação", "Outro horário", "FaPhoneAlt"],
    ["D2", "WhatsApp", "Ideia do nicho", "FaWhatsapp"],
    ["D4", "E-mail", "Case ou antes/depois", "FaEnvelope"],
    ["D6", "Ligação", "Citar o e-mail", "FaPhoneAlt"],
    ["D8", "Áudio ou vídeo", "Ideia para o espaço", "FaVideo"],
    ["D10", "Encerramento", "\"Encerro ou volto em [mês]?\"", "FaFlagCheckered"],
  ];
  s.addShape(pres.shapes.LINE, { x: 0.95, y: 2.6, w: 11.4, h: 0, line: { color: HEX.lt2, width: 4 }, objectName: "Linha do tempo" });
  for (let i = 0; i < 7; i++) {
    const x = 0.6 + i * 1.75;
    await circleIcon(s, x + 0.475, 2.25, 0.7, cad[i][3], i === 6 ? HEX.dk2 : GRAD.at(Math.min(i, 5)), "Toque " + cad[i][0]);
    txt(s, cad[i][0], { x: x, y: 3.1, w: 1.65, h: 0.5, fontSize: 22, bold: true, align: "center", color: C.accent1, objectName: "Toque dia " + (i + 1) });
    txt(s, cad[i][1], { x: x, y: 3.65, w: 1.65, h: 0.6, fontSize: 14, bold: true, align: "center", objectName: "Toque canal " + (i + 1) });
    txt(s, cad[i][2], { x: x, y: 4.3, w: 1.65, h: 0.9, fontSize: 13, align: "center", color: C.text2, objectName: "Toque ação " + (i + 1) });
  }
  card(s, 0.6, 5.5, 12.1, 1.1, "Faixa cadência", C.background2);
  txt(s, [
    { text: "Cada toque traz algo novo. ", options: { bold: true, color: C.accent4 } },
    { text: "Nunca \"só passando para saber\". Respondeu? Volta para a qualificação. Sem resposta no D10? Nutrição com motivo." },
  ], { x: 0.95, y: 5.5, w: 11.4, h: 1.1, fontSize: 16, valign: "middle", objectName: "Regra cadência" });

  // 11. Objeções
  pres.addSection({ title: "Conversa" });
  s = content("Objeções na etapa de SDR", "Conversa");
  const objs = [
    ["\"Só quero o preço.\"", "O valor muda com tamanho, local e modelo. Com 3 perguntas te passo ao especialista para uma proposta certa."],
    ["\"Me manda por WhatsApp.\"", "Mando sim. Para não ser genérico: é para qual espaço e qual o tamanho?"],
    ["\"Estou só pesquisando.\"", "Ótimo momento para conversar. O que te fez começar a pesquisar agora?"],
    ["\"Não sou eu que decido.\"", "Sem problema. Quem decide? Marcamos uma conversa com vocês dois."],
    ["\"Já tenho fornecedor.\"", "Que bom. O que você melhoraria no atendimento de hoje?"],
    ["\"Agora não é o momento.\"", "Quando seria? Anoto aqui e te chamo na data."],
  ];
  for (let i = 0; i < 6; i++) {
    const x = 0.6 + (i % 2) * 6.15, y = 1.65 + Math.floor(i / 2) * 1.6;
    card(s, x, y, 5.95, 1.45, "Objeção " + (i + 1));
    txt(s, objs[i][0], { x: x + 0.3, y: y + 0.15, w: 5.4, h: 0.45, fontSize: 16, bold: true, color: C.accent4, objectName: "Objeção frase " + (i + 1) });
    txt(s, objs[i][1], { x: x + 0.3, y: y + 0.62, w: 5.4, h: 0.75, fontSize: 14, objectName: "Objeção resposta " + (i + 1) });
  }
  txt(s, "Acolha, pergunte o motivo e leve ao próximo passo. Preço, crédito e contrato ficam com o executivo.", { x: 0.6, y: 6.5, w: 12.1, h: 0.35, fontSize: 13, color: C.text2, objectName: "Método objeções" });

  // 12. Nutrição e Salesforce
  s = content("Etapas 6 e 7: ninguém fica sem status", "Conversa");
  txt(s, "Saídas da fila", { x: 0.6, y: 1.7, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1, objectName: "Saídas título" });
  const saidas = [
    ["Bom perfil, sem prazo", "Nutrição com retorno em 30, 60 ou 90 dias"],
    ["Sem resposta na cadência", "Nutrição por e-mail (automação)"],
    ["Fora do perfil", "Desqualificado, com motivo"],
    ["Contato errado ou duplicado", "Corrigir ou mesclar"],
  ];
  for (let i = 0; i < 4; i++) {
    const y = 2.3 + i * 1.05;
    card(s, 0.6, y, 5.9, 0.9, "Saída " + (i + 1));
    txt(s, saidas[i][0], { x: 0.85, y: y + 0.08, w: 5.4, h: 0.4, fontSize: 15, bold: true, objectName: "Saída situação " + (i + 1) });
    txt(s, saidas[i][1], { x: 0.85, y: y + 0.47, w: 5.4, h: 0.38, fontSize: 13, color: C.text2, objectName: "Saída destino " + (i + 1) });
  }
  card(s, 7.0, 1.7, 5.7, 4.95, "Salesforce", C.text2);
  await circleIcon(s, 7.35, 1.95, 0.7, "FaDatabase", HEX.accent3, "Salesforce");
  txt(s, "Salesforce, na hora", { x: 8.2, y: 2.05, w: 4.3, h: 0.5, fontSize: 18, bold: true, color: C.accent2, objectName: "Salesforce título" });
  const sf = ["Status: Novo → Em contato → MQL → Oportunidade (SQL) → Gerente → Executivo", "Cada ligação, WhatsApp e e-mail como atividade", "TAG obrigatória (Prospecção Ativa ou evento)", "Nicho, origem, temperatura, propósito, prazo, decisor", "Motivo de perda sempre preenchido", "Todo lead aberto com uma próxima tarefa e data"];
  txt(s, sf.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < sf.length - 1 } })), { x: 7.35, y: 2.85, w: 5.0, h: 3.6, fontSize: 14, color: C.background1, paraSpaceAfter: 6, objectName: "Salesforce regras" });

  // 13. Indicadores
  pres.addSection({ title: "Gestão" });
  s = content("Indicadores e metas", "Gestão");
  const kpis = [
    ["5 min", "Tempo até o 1º contato dos leads quentes", "sugestão"],
    ["15%", "Taxa de resposta no WhatsApp", "Plano Limbo"],
    ["10%", "Taxa de agendamento sobre contatados", "Plano Limbo"],
    ["30%", "Conversão em MQL dos leads com conversa", "Plano Limbo"],
    ["80%", "Comparecimento às reuniões agendadas", "sugestão"],
    ["zero", "Leads sem status ou sem próxima tarefa", "sugestão"],
  ];
  for (let i = 0; i < 6; i++) {
    const x = 0.6 + (i % 3) * 4.1, y = 1.7 + Math.floor(i / 3) * 2.35;
    card(s, x, y, 3.8, 2.15, "Indicador " + (i + 1), i % 2 === 0 ? C.background2 : C.text2);
    const dark = i % 2 === 1;
    txt(s, kpis[i][0], { x: x + 0.3, y: y + 0.2, w: 3.2, h: 0.8, fontSize: 36, bold: true, color: dark ? C.accent2 : C.accent1, objectName: "Indicador valor " + (i + 1) });
    txt(s, kpis[i][1], { x: x + 0.3, y: y + 1.05, w: 3.2, h: 0.7, fontSize: 14, color: dark ? C.background1 : C.text1, objectName: "Indicador nome " + (i + 1) });
    txt(s, kpis[i][2], { x: x + 0.3, y: y + 1.75, w: 3.2, h: 0.3, fontSize: 11, italic: true, color: dark ? C.background2 : HEX.accent6, objectName: "Indicador fonte " + (i + 1) });
  }
  txt(s, "Revisão semanal: números da Pryscila e da Kelly lado a lado e 2 ou 3 conversas ouvidas juntas.", { x: 0.6, y: 6.45, w: 12.1, h: 0.35, fontSize: 13, color: C.text2, objectName: "Revisão" });

  // 14. Rotina e próximos passos
  s = content("Rotina do dia e próximos passos", "Gestão");
  const rotina = [["8h30", "Fila da noite, quentes primeiro"], ["9h", "Ligações e qualificações"], ["13h30", "Cadência e confirmações"], ["16h", "Novos leads e Plano Limbo"], ["17h30", "Salesforce em dia"]];
  txt(s, "Rotina sugerida", { x: 0.6, y: 1.7, w: 6, h: 0.45, fontSize: 20, bold: true, color: C.accent1, objectName: "Rotina título" });
  for (let i = 0; i < 5; i++) {
    const y = 2.3 + i * 0.82;
    txt(s, rotina[i][0], { x: 0.6, y: y, w: 1.2, h: 0.6, fontSize: 18, bold: true, color: C.accent4, valign: "middle", objectName: "Rotina hora " + (i + 1) });
    txt(s, rotina[i][1], { x: 1.85, y: y, w: 4.6, h: 0.6, fontSize: 15, valign: "middle", objectName: "Rotina atividade " + (i + 1) });
  }
  card(s, 7.0, 1.7, 5.7, 4.95, "Próximos passos");
  txt(s, "Próximos passos", { x: 7.35, y: 1.95, w: 5.0, h: 0.5, fontSize: 18, bold: true, objectName: "Próximos título" });
  const prox = ["Validar a divisão: uma SDR com site, Google e Ledson; a outra com feiras, eventos e Plano Limbo", "Rebalancear os 873 leads parados da fila da Pryscila", "Criar no Salesforce os campos de temperatura e propósito", "Salvar os WhatsApps como respostas rápidas", "Roleplay de cada script com o comercial", "Revisar os indicadores em 2 semanas"];
  txt(s, prox.map((t, i) => ({ text: t, options: { bullet: { type: "number" }, breakLine: i < prox.length - 1 } })), { x: 7.35, y: 2.6, w: 5.0, h: 3.9, fontSize: 14, paraSpaceAfter: 6, objectName: "Próximos lista" });

  // 15. Fechamento
  s = pres.addSlide({ masterName: "Destaque", sectionTitle: "Gestão" });
  s.addText("Para lembrar", { placeholder: "title" });
  s.addText("Responder rápido, conversar sobre o negócio do cliente e entregar ao gerente da vertical uma oportunidade com tudo anotado.", { placeholder: "body" });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log(OUT);
})();
