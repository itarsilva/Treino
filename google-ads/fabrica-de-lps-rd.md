# LedWave: construção de todas as LPs no RD Station

Objetivo: deixar **todas as landing pages publicadas e testadas** antes de o saldo do Google Ads voltar, para que no dia seguinte ao pagamento seja só trocar a URL dos anúncios.

- **Textos de cada página:** `landing-pages-rd-station.md`. Lá estão título, subtítulo, benefícios, prova, perguntas e botão de cada segmento.
- **Modelo para duplicar:** a **LP Varejo**, que é a mais completa e tem formulário, WhatsApp e showroom.

---

## Painel de controle

| # | LP | Nome no RD | Endereço (`conteudo.ledwave.com.br/...`) | Obrigado | Campanha | Status |
|---|---|---|---|---|---|---|
| 1 | Painel de LED (geral) | LP Google Ads – Painel de LED | `lp-google-ads-painel-de-led` | já criada | PSQ \| Painel de LED - Topo | ✅ criada (conferir checklist) |
| 2 | Postos | LP Google Ads – Postos | `lp-google-ads-postos` | já criada | Conversão - Posto de Gasolina | ✅ criada (conferir checklist) |
| 3 | Varejo | LP Google Ads – Varejo | `lp-google-ads-varejo` | `obrigado-mercados-e-atacados` | PSQ \| Varejo e Supermercados | 🟡 terminar e publicar |
| 4 | Parques, clubes e hotéis | LP Google Ads – Clubes e Hotéis | `lp-google-ads-clubes-hoteis` | `obrigado-google-ads` | PSQ - Parques, Clubes e Hotéis | ✅ publicada 26/10 · campanha ativada 27/10 (R$ 50/dia) |
| 5 | Igrejas | Digitalize: Igrejas e Celebrações Religiosas (página original, ajustada) | `digitalize-igrejas-e-celebracoes-religiosas` | `obrigado-igreja` | Pesquisa \| Igreja | ✅ publicada 26/10 · campanha ativada 27/10 (R$ 40/dia) |
| 6 | Eventos (aluguel) | LP Google Ads – Eventos | `lp-google-ads-eventos` | `obrigado-google-ads` | Painéis de LED - Compra e Locação | ⛔ não vamos fazer (decisão 26/10) |
| 7 | Farmácias | LP Google Ads – Farmácias | `lp-google-ads-farmacias` | `obrigado-google-ads` | Pesquisa \| Farmácia | ✅ publicada 26/10 (página Digitalize ajustada; confirmar URL) |
| 8 | Corporativo | LP Google Ads – Corporativo | `lp-google-ads-corporativo` | `obrigado-google-ads` | Pesquisa \| Corporativo | ⬜ |
| 9 | Arquitetura | LP Google Ads – Arquitetura | `lp-google-ads-arquitetura` | `obrigado-google-ads` | Display \| Arquitetura - LHD | ⬜ |

**Ordem:** 3 → 4 → 5 → 6 → 7 → 8 → 9. A ordem segue o peso das campanhas: Parques já está ativa e gasta, Igreja vem logo em seguida. Cada página nova deve levar de **30 a 40 minutos**.

**Uma página de obrigado para as novas:** em vez de criar 6, crie **uma** (`obrigado-google-ads`) e use em todas. O gatilho do GTM (URL contém `obrigado`) já cobre todas. Para saber o segmento de cada lead, o RD usa o **identificador de conversão** de cada formulário (Passo 3).

---

## Passo 1: criar a página de obrigado (uma vez só) ✅ feito em 26/10

1. RD Station → **Conversão → Landing Pages** → abra a página `obrigado-mercados-e-atacados` → **⋮ → Duplicar**.
2. Nome: **Obrigado – Google Ads**.
3. Texto:
   - **Título:** Recebemos seu pedido!
   - **Texto:** Um especialista da LedWave vai falar com você pelo WhatsApp em breve. Se preferir adiantar, chame agora:
   - **Botão:** Chamar no WhatsApp (link do WhatsApp da LedWave)
   - **Abaixo:** bloco "Showroom" (Av. Nove de Julho, 3624 – São Paulo/SP).
4. **Publicação → Endereço:** `obrigado-google-ads` → **Publicar**.

## Passo 2: duplicar o modelo

1. **Conversão → Landing Pages** → na LP **Varejo**: **⋮ → Duplicar**.
2. Renomeie com o **Nome no RD** da tabela (ex.: *LP Google Ads – Igrejas*).
3. **Editar**.

## Passo 3: trocar os textos, bloco por bloco

Abra o segmento em `landing-pages-rd-station.md` e vá trocando de cima para baixo:

| Bloco da página | O que colar |
|---|---|
| Título (H1) | **Título** do segmento |
| Subtítulo | **Subtítulo** |
| Formulário → campo "O que você precisa?" | **Opções** do segmento + "Quero visitar o showroom em SP" |
| Formulário → botão | **Botão** do segmento |
| 3 benefícios | **Benefícios** |
| Prova | **Prova** (linhas com ⚠️: apague se não tiver o dado confirmado) |
| Como funciona | **Como funciona** |
| Perguntas frequentes | **Perguntas frequentes** |
| Showroom | não muda |
| Imagens | troque pela foto do segmento (igreja, clube, farmácia...). Sem foto, use a de um painel genérico, nunca a de supermercado |

**Configurar o formulário** (clique no formulário → engrenagem/configurações):
1. **Identificador da conversão:** o endereço da página (ex.: `lp-google-ads-igrejas`). É assim que você vai separar os leads por segmento no RD.
2. **Ação após conversão:** **Redirecionar para uma página** → `https://conteudo.ledwave.com.br/obrigado-google-ads`.
3. **Proteção contra spam:** reCAPTCHA ligado.
4. **Eventos:** confira se o campo "Celular/WhatsApp" é **obrigatório**.

**Botão de WhatsApp:** confira se ele está visível **no celular**. No editor, troque para a visualização de celular, no ícone do celular no topo.

**Rodapé:** troque "WhatsApp: 0800..." pelo número de WhatsApp correto, se ainda estiver assim.

## Passo 4: publicar

Na etapa **Publicação**:

1. **Domínio:** `conteudo.ledwave.com.br`. **Endereço:** coluna "Endereço" da tabela.
2. **Título da página** e **Descrição**: use a tabela abaixo.
3. **Indexação / mecanismos de busca:** se houver a opção, marque **não indexar**. Estas páginas são para anúncio e não devem competir com o site no Google.
4. **Compartilhamento (redes sociais):** mesmo título e descrição + uma imagem do segmento.
5. **Publicar**.

| LP | Título da página (≤ 60) | Descrição (≤ 155) |
|---|---|---|
| Igrejas | Painel de LED para Igrejas \| LedWave | Painel de LED para igrejas: letras de louvor, transmissões e avisos nítidos para toda a congregação. Compra, aluguel ou assinatura. Peça seu orçamento. |
| Eventos | Aluguel de Painel de LED para Eventos \| LedWave | Aluguel de telão de LED para shows, feiras, convenções e eventos esportivos, com entrega e montagem em todo o Brasil. Consulte a disponibilidade. |
| Farmácias | Painel de LED para Farmácias \| LedWave | Fachadas, vitrines e telas de LED para farmácias e redes. Ofertas trocadas na hora, direto da fábrica. Peça um projeto para sua farmácia. |
| Clubes e hotéis | Telão de LED para Clubes, Hotéis e Parques \| LedWave | Telões de LED para piscina, quadras, salões e recepção de clubes, hotéis e parques. Feitos para área externa e sol forte. Peça seu orçamento. |
| Corporativo | Painel e Videowall de LED para Empresas \| LedWave | Painéis e videowalls de LED para recepções, auditórios, showrooms e salas de reunião. Imagem nítida de perto. Peça um projeto para sua empresa. |
| Arquitetura | Painel de LED para Projetos de Arquitetura \| LedWave | Painéis de LED sob medida para residências, home theater e interiores de alto padrão. Projeto com arquitetos, do briefing à instalação. |

## Passo 5: testar (cada página, ~5 min)

No **celular**, com a página publicada:

- [ ] A página abre no endereço `conteudo.ledwave.com.br/lp-google-ads-...`
- [ ] Título e subtítulo são do segmento certo (nada de "supermercado" na página de igreja)
- [ ] O botão de **WhatsApp aparece** e abre a conversa
- [ ] Preencha o formulário com seus dados e um nome de teste, ex.: "TESTE Igrejas"
- [ ] Depois de enviar, abre a página **obrigado-google-ads**
- [ ] No RD, em **Contatos**, o lead "TESTE Igrejas" aparece com a conversão `lp-google-ads-igrejas`
- [ ] (Uma vez, em qualquer página) **GTM:** abra a página pelo **Tag Assistant** (tagassistant.google.com), envie o formulário e confira se a tag de conversão do Google Ads **disparou** na página de obrigado

Depois apague os leads de teste no RD.

## Passo 6: preparar os anúncios (pode fazer já, com a conta sem saldo)

Para cada campanha da tabela:

1. Google Ads → campanha → **Anúncios** → **+ Anúncio responsivo de pesquisa** no grupo da campanha.
2. **URL final:** `https://conteudo.ledwave.com.br/lp-google-ads-<segmento>`
3. **Caminhos:** `Painel-de-LED` / segmento (≤ 15 caracteres cada), ex.: `Igrejas`, `Eventos`, `Farmacias`, `Clubes-Hoteis`, `Empresas`, `Arquitetura`.
4. **Títulos e descrições:** grupo do segmento em `anuncios-titulos-descricoes.md`. Título 1 = "Painel de LED para <segmento>", fixado na posição 1. "Visite Nosso Showroom em SP" fixado na posição 2.
5. **Salvar**. Fica em análise e começa a rodar sozinho quando a campanha estiver ativa e com saldo.
6. O **anúncio antigo** (com a URL do site) **não é removido agora**. Ele é pausado quando o novo tiver 2 a 3 semanas de dados.

**Campanhas pausadas (Igreja, Farmácia, Corporativo, Compra e Locação):** dá para criar o anúncio novo com elas pausadas. Antes de reativar, aplique as proteções:
- lista **"Não vendemos"**: Ferramentas → Biblioteca compartilhada → Listas de palavras-chave negativas → Não vendemos → Aplicar a campanhas;
- negativas na campanha: `"ledwave"`, `"led wave"`, `[painel de led]`, `[painel led]`.

## Dia em que o saldo voltar

1. Ativar: **Topo**, **LEADS (marca)**, **PMX** e **PSQ | Varejo e Supermercados**.
2. Reativar as campanhas por segmento **uma por dia**, para acompanhar o gasto.
3. Primeira semana: olhar **Termos de pesquisa** a cada 2 dias e negativar o que não for cliente.
4. Toda segunda: relatório do script 02 + leads no RD por identificador de conversão.

---

## Pendências que melhoram as páginas (não travam a publicação)

- Fotos reais por segmento (igreja, clube, farmácia, empresa, residência)
- Cases com autorização: 1 ou 2 por segmento
- Prazo mínimo para reservar aluguel e se a equipe opera o painel no evento (LP Eventos)
- Certificação IP para piscina (LP Clubes e Hotéis)
- Como o cliente troca o conteúdo do painel (pergunta frequente de Varejo e Farmácias)
