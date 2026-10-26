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
