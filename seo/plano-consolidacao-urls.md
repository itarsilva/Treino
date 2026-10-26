# LedWave: consolidação de URLs e limpeza de indexação (SEO)

Base: Search Console de ledwave.com.br, 12 meses até 26/10/2026, por página. Geral: 14,1 mil cliques, 1,74 mi impressões, CTR 0,8%, posição média 6,6.

**Regra de escolha:** em cada tema fica a URL com **melhor posição**. Em caso de empate, fica a que tem **mais cliques**. As outras recebem **redirecionamento 301** para ela, e os links internos passam a apontar direto para a URL que fica.

Onde está "confirmar", abra o Search Console → Desempenho → filtro Página "contém" o tema → aba Páginas e escolha pela regra acima.

---

## Fase 1: consolidar os temas de dinheiro (fazer primeiro)

| Tema | URL que FICA | URLs que recebem 301 | Por quê |
|---|---|---|---|
| Preço de painel de LED | `/preco-de-painel-de-led/` | `/quanto-custa-um-painel-de-led-guia-de-precos/`, `/quanto-custa-painel-tipos-usos/`, `/blog/quanto-custa-painel-tipos-usos/`, `/blog/quanto-custa-um-led/` | Posição 4,3 e 112 mil impressões, a mais forte do grupo |
| Quanto custa outdoor | `/blog/quanto-custa-outdoor-valor/` | `/quanto-custa-outdoor-valor/`, `/quanto-custa-outdoor/`, `/blog/quanto-custa-outdoor/`, `/blog/aluguel-de-outdoor-preco/` | Posição 2,1 |
| Telão para área externa | `/telao-para-area-externa/` | `/blog/telao-para-area-externa/` | Posição 2,8 |
| Igrejas (~10 URLs) | confirmar | as demais | Várias em posição 24 a 45 |
| Piscinas (3 URLs) | confirmar | as demais | — |
| Vídeos para painel de LED | confirmar (`/videos-para-painel-de-led/` ou `/blog/…`) | a outra | — |

Depois: clínicas, cinema, óticas, auditórios e qualquer outro par `/slug/` × `/blog/slug/`.

**Ao consolidar:** antes de redirecionar, copie para a URL que fica o que houver de útil nas outras (FAQ, tabela, fotos, cases).

## Fase 2: limpeza de indexação

| Item | Ação | Onde |
|---|---|---|
| Páginas de **tag** (`/tag/paineis-de-led-em-goiania/` 22,9 mil impressões e 0% de cliques; `/tag/painel-de-led-4x2/`; `/tag/new-zone-importados/`) | noindex em todas as tags | Yoast → Configurações → Taxonomias → Tags → desligar "Mostrar tags nos resultados de pesquisa" |
| `/nova-home/` (3,2 mil impressões) | 301 para `/` (ou excluir, se for teste) | Plugin Redirection ou Yoast Premium |
| URLs com `?utm_source=Direto&utm_medium=Organico…` indexadas | Tirar UTM dos **links internos** (menu, botões, rodapé, WhatsApp). Conferir se o canonical aponta para a URL sem parâmetros | Elementor (buscar "utm_" nos botões) + Inspeção de URL |
| `/blog/inovacao-com-paineis-de-led-new-zone-importados/` | Rever: ranqueia para a marca de outra empresa (tráfego sem cliente) | Avaliar noindex |
| Landing pages do RD (`conteudo.ledwave.com.br/lp-google-ads-*`) | Ver se o RD permite marcar como "não indexar". São páginas para anúncio e não devem competir com o site | RD → LP → Publicação/SEO |

## Fase 3: títulos e descrições das páginas de preço (CTR)

Páginas bem posicionadas com CTR muito baixo (o resultado não convence ou a resposta de IA do Google responde antes):

| Página | Posição | CTR | Novo título (≤ 60) | Nova descrição (≤ 155) |
|---|---|---|---|---|
| `/preco-de-painel-de-led/` | 4,3 | 0,5% | Preço de Painel de LED 2026: a partir de R$ 14 mil/m² | Veja quanto custa um painel de LED indoor e outdoor em 2026, com tabela por tamanho e resolução. Fábrica própria. Peça seu orçamento. |
| `/blog/quanto-custa-outdoor-valor/` | 2,1 | 0,4% | Quanto Custa um Outdoor de LED em 2026? Valores | Preços de outdoor de LED para compra, aluguel e assinatura em 2026, com exemplos reais de tamanho e valor. Orçamento direto da fábrica. |
| `/telao-para-area-externa/` | 2,8 | 0,6% | Telão para Área Externa: Painel de LED à Prova d'Água | Telão de LED para piscina, clube, fachada e eventos ao ar livre. Alto brilho para o sol, à prova de chuva. Veja modelos e preços. |

⚠️ Os valores "a partir de" só entram depois de confirmados os preços atuais da loja.

**Conteúdo em formato de resposta** (para ser citado na resposta de IA do Google): logo abaixo do H1, um parágrafo de 2 frases com a faixa de preço; depois uma tabela de preços; depois as perguntas frequentes (`site/pagina-quanto-custa-painel-de-led.html` já tem esse modelo).

## Fase 4: páginas perto da 1ª página (posição 9 a 16)

Depois da consolidação, reforçar com conteúdo e links internos:
- `/aluguel-de-painel-de-led-goiania/`: posição 13,7, 10,6 mil impressões. Juntar com `/ledwave-goiania/` e `/painel-de-led-goiania-ledwave/` (33,7 mil impressões, 8 cliques).
- `/painel-de-led-para-clinicas/`: posição 11,0.
- `/blog/painel-de-led-para-propaganda-outdoor/`: posição 12,6, 15 mil impressões.
- `painel-em-led-para-propaganda` (blog): posição 15,6.

## A investigar

- `/rentall/`: 24,7 mil impressões e 8 cliques. Ver em Consultas para quais buscas ela aparece.
- `/ledwave-painel-de-led/`: 12,9 mil impressões e 6 cliques. Possível duplicata da home.
- Comparar os últimos 3 meses com os 3 anteriores, para confirmar se há queda desde março/2026.
- Separar marca de não-marca: na aba Consultas, filtro → Consulta → "não contém" → `ledwave`.

## Como medir

Anotar hoje e comparar a cada 4 semanas:
- impressões e cliques de "painel de led" (hoje 109.319 impressões e 289 cliques em 12 meses);
- CTR das 3 páginas da Fase 3;
- número de páginas indexadas (Indexação → Páginas).

Depois de um 301, o Google leva de 2 a 8 semanas para transferir a posição.

---

# Passo a passo

> Antes de começar qualquer passo: **faça um backup do site** (UpdraftPlus ou o backup da hospedagem). Mudanças de redirecionamento e de indexação são fáceis de desfazer, mas o backup garante.

## Passo 0: instalar as ferramentas (uma vez só, ~10 min)

1. No WordPress: **Plugins → Adicionar novo**.
2. Busque **Redirection** (autor John Godley) → **Instalar** → **Ativar**.
3. Abra **Ferramentas → Redirection** e siga o assistente:
   - marque **"Monitor permalink changes in WordPress posts and pages"**;
   - marque **"Keep a log of all redirects and 404 errors"**;
   - clique em **Continue Setup** → **Finish Setup**.
4. (Para o Passo 3) Busque e instale também **Better Search Replace** (autor WP Engine) → **Ativar**.

## Passo 1: descobrir qual URL fica em cada tema "confirmar" (Igrejas, Piscinas, Vídeos)

1. Search Console → propriedade `https://ledwave.com.br/` → **Desempenho → Resultados da pesquisa**.
2. **Data:** 12 meses. Ative os 4 quadros (cliques, impressões, CTR, posição).
3. **+ Adicionar filtro → Página → URLs que contêm** → digite `igreja` → **Aplicar**.
4. Aba **Páginas**: anote cada URL com cliques e posição.
5. Escolha a que **fica**: a de **melhor posição** (menor número). Em caso de empate, a que tiver mais cliques.
6. Anote na tabela da Fase 1 e repita com `piscina` e `videos-para-painel`.

## Passo 2: juntar as páginas repetidas (Fase 1), um tema por vez

Exemplo com **preço** (fica `/preco-de-painel-de-led/`):

**2.1 Levar o que presta para a página que fica**
1. Abra cada página que vai sair (ex.: `/quanto-custa-um-painel-de-led-guia-de-precos/`).
2. Copie o que for útil e não existir na página que fica: perguntas frequentes, tabela, fotos, cases.
3. Abra `/preco-de-painel-de-led/` no **Elementor** e cole esses blocos. **Atualizar**.

**2.2 Criar os redirecionamentos 301**
1. **Ferramentas → Redirection → Add New**.
2. **Source URL:** só o caminho da página que sai, ex.: `/quanto-custa-um-painel-de-led-guia-de-precos/`.
3. **Target URL:** `https://ledwave.com.br/preco-de-painel-de-led/`.
4. Clique na engrenagem e confira **HTTP code: 301 - Moved Permanently**.
5. **Add Redirect**.
6. Repita para cada URL da coluna "recebem 301" daquele tema.

**2.3 Testar**
1. Abra numa aba anônima a URL antiga (ex.: `https://ledwave.com.br/quanto-custa-um-painel-de-led-guia-de-precos/`).
2. Ela precisa abrir **sozinha** a `/preco-de-painel-de-led/`.
3. Se abrir a página antiga, o cache está segurando: limpe o cache do site (plugin de cache ou hospedagem) e teste de novo.

**2.4 Despublicar as páginas antigas**
1. **Páginas** (ou **Posts**, se for do blog) → passe o mouse na página antiga → **Lixeira**.
2. O redirecionamento continua funcionando mesmo com a página na lixeira.
3. ⚠️ **Não esvazie a lixeira** nas primeiras semanas, para poder voltar atrás se precisar.

**2.5 Avisar o Google**
1. Search Console → barra de cima → cole `https://ledwave.com.br/preco-de-painel-de-led/` → Enter.
2. **Solicitar indexação**.

**2.6 Esperar**
- Espere **2 a 3 semanas**, veja no Search Console se a página que ficou ganhou impressões e só então passe para o próximo tema.
- Ordem: **preço → outdoor → telão área externa → igrejas → piscinas → vídeos → demais**.

## Passo 3: corrigir os links internos

Depois do 301 os links antigos ainda funcionam, mas cada um passa por um redirecionamento. O certo é apontar direto para a página que fica.

1. **Ferramentas → Better Search Replace**.
2. **Search for:** o caminho antigo, ex.: `/quanto-custa-um-painel-de-led-guia-de-precos/`.
3. **Replace with:** o caminho novo, ex.: `/preco-de-painel-de-led/`.
4. **Select tables:** selecione `wp_posts` e `wp_postmeta` (o Elementor guarda os textos em `wp_postmeta`).
5. Deixe marcado **"Run as dry run?"** → **Run Search/Replace**. Ele só **mostra quantas trocas faria**, sem mudar nada.
6. Se o número fizer sentido, desmarque **dry run** e rode de novo.
7. **Elementor → Ferramentas → Regenerar arquivos e dados** → **Regenerar**. Limpe o cache.

⚠️ Esta é a única etapa que mexe direto no banco de dados. Faça o backup antes e sempre rode o dry run primeiro.

## Passo 4: tirar as tags do Google (Fase 2)

1. **Yoast SEO → Configurações** → menu da esquerda **Categorias e tags → Tags**.
2. Desligue **"Mostrar tags nos resultados de pesquisa"** → **Salvar alterações**.
3. Na mesma área, veja se **Formatos** (formatos de post) e **Arquivos de autor** (em **Avançado**) também estão desligados. Normalmente não trazem cliente.
4. Não precisa remover nada manualmente: o Google tira as tags conforme volta a visitar (algumas semanas).

## Passo 5: `/nova-home/`

1. Abra `https://ledwave.com.br/nova-home/` e confira se é só uma cópia/teste da home.
2. Se for: **Redirection → Add New** → Source `/nova-home/` → Target `https://ledwave.com.br/` → 301.
3. **Páginas** → `nova-home` → **Lixeira**.

## Passo 6: tirar UTM dos links internos

UTM serve para medir campanhas **de fora** (Google Ads, e-mail, redes sociais). Em link de uma página do site para outra, ela cria URLs duplicadas no Google e bagunça o Analytics.

1. **Ferramentas → Better Search Replace** → **Search for:** `utm_source=Direto` → tabelas `wp_posts` e `wp_postmeta` → **dry run**.
2. O resultado mostra em quantos lugares aparece. Para ver **quais** páginas, abra as páginas principais (home, menu, rodapé, contato) no Elementor e procure botões e links com `?utm_` no endereço.
3. Lugares comuns: **menu** (Aparência → Menus), **rodapé** e **botão de WhatsApp** (Elementor → Templates → Theme Builder → Cabeçalho/Rodapé).
4. Apague tudo do `?` em diante nesses links internos. Exemplo: `https://ledwave.com.br/contato/?utm_source=Direto&utm_medium=Organico` vira `https://ledwave.com.br/contato/`.
5. ⚠️ **Não mexa** nas UTMs dos anúncios do Google Ads. Essas estão certas e não ficam no site.
6. **Conferir o canonical:** Search Console → inspecione uma URL com UTM que apareceu no relatório → **Indexação da página** → "**URL canônico selecionado pelo usuário**" precisa ser a URL **sem** `?utm`. Se vier com UTM, me mande o print.

## Passo 7: página da New Zone (marca de outra empresa)

1. Abra `/blog/inovacao-com-paineis-de-led-new-zone-importados/`.
2. Se o texto não fizer sentido para os clientes da LedWave: no editor, caixa **Yoast SEO → Avançado** → **"Permitir que mecanismos de busca mostrem este conteúdo nos resultados?"** → **Não** → **Atualizar**.

## Passo 8: landing pages do RD Station fora do Google

1. RD Station → **Conversão → Landing Pages** → abra uma LP do Google Ads (ex.: Varejo) → **Editar**.
2. Na etapa **Publicação** (ou **Configurações**), procure uma opção de **indexação**/**mecanismos de busca**/**SEO** e marque para **não indexar**.
3. Se não achar a opção, me mande um print da tela de Publicação.
4. Repita em cada LP `lp-google-ads-*`. As LPs de conteúdo (e-books, materiais) podem continuar indexadas.

## Passo 9: novos títulos e descrições (Fase 3), depois de confirmar os preços

1. **Páginas** → abra `/preco-de-painel-de-led/` → **Editar com Elementor**.
2. No canto inferior esquerdo, clique no ícone do **Yoast** (ou feche o Elementor e role até a caixa Yoast SEO no editor do WordPress).
3. **Título SEO:** apague o que está lá (inclusive as variáveis `%%sep%% %%sitename%%`) e cole o título da tabela da Fase 3.
4. **Meta descrição:** cole a descrição da tabela.
5. **Frase-chave em foco:** `preço de painel de led`.
6. **Atualizar**.
7. Search Console → inspecionar a URL → **Solicitar indexação**.
8. Repita para `/blog/quanto-custa-outdoor-valor/` e `/telao-para-area-externa/`.

**Conteúdo em formato de resposta** (mesma página, no Elementor):
1. Logo abaixo do título (H1), um parágrafo de **2 frases** com a faixa de preço. Ex.: "Um painel de LED profissional custa de R$ 14 mil a R$ 38 mil por m² na compra. Outdoor fica perto de R$ 14–15 mil/m²; indoor de alta resolução, entre R$ 21 e R$ 38 mil/m²."
2. Abaixo, a **tabela de preços** e as **perguntas frequentes** (modelo pronto em `site/pagina-quanto-custa-painel-de-led.html`).
3. Em cada linha da tabela, link para o produto na loja (`loja.ledwave.com.br/...`).

**Padrão de título do site inteiro** (resolve o sufixo longo):
1. **Yoast SEO → Configurações → Tipos de conteúdo → Páginas**.
2. **Título SEO:** deixe `%%title%% %%sep%% LedWave`. Faça o mesmo em **Posts**.
3. **Configurações gerais → Aparência do site**: separador `|`.
4. **Salvar alterações**.

## Passo 10: reforçar as páginas perto da 1ª página (Fase 4)

Para cada página (`/aluguel-de-painel-de-led-goiania/`, `/painel-de-led-para-clinicas/`, `/blog/painel-de-led-para-propaganda-outdoor/`):
1. **Search Console** → filtro Página = a URL → aba **Consultas**. As buscas com mais impressões são o que a página precisa responder.
2. Garanta que a busca principal está no **título SEO**, no **H1** e no **primeiro parágrafo**.
3. Acrescente uma seção com **perguntas frequentes** usando as perguntas que aparecerem nas consultas.
4. **Links internos:** de 3 a 5 páginas fortes do site (home, `/preco-de-painel-de-led/`, posts de blog do mesmo tema), coloque um link com texto descritivo. Ex.: "aluguel de painel de LED em Goiânia".
5. Solicite indexação no Search Console.

## Passo 11: acompanhar (toda 4ª semana)

1. Search Console → Desempenho → compare **últimas 4 semanas × 4 semanas anteriores** (Data → Comparar).
2. Anote: cliques e impressões de "painel de led", CTR das 3 páginas da Fase 3, posição das páginas da Fase 4.
3. **Indexação → Páginas**: o total de páginas indexadas deve **cair** (tags e duplicadas saindo). Isso é bom.
4. **Ferramentas → Redirection → 404s**: se aparecer alguma página antiga dando erro, crie o 301 dela.
5. Mande os números para atualizar o documento da gerência.
