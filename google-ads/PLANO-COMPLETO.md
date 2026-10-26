# LedWave — Plano completo (Google Ads + RD Station + Site + SEO)

Atualizado em 26/10/2026. Marque `[x]` conforme for concluindo.

Arquivos de apoio (nesta pasta e em `site/`):
- `landing-pages-rd-station.md` — textos das 8 landing pages por vertical
- `anuncios-titulos-descricoes.md` — 15 títulos + 4 descrições por vertical (já no limite de caracteres)
- `passo-a-passo-rd-e-google-ads.md` — detalhes de cada clique no RD e no Google Ads
- `../site/pagina-quanto-custa-painel-de-led.html` — página de preços (SEO)
- `../site/contato-v8-com-whatsapp.html` e `../site/whatsapp-botao-mobile.html` — WhatsApp no celular

---

## Mapa: vertical → campanha → página

| # | Vertical | Campanha | Ação | Landing page RD | Prioridade |
|---|---|---|---|---|---|
| 1 | Geral ("painel de led") | PSQ \| Painel de LED - Topo | Já ativa — trocar URL para /contato/ e títulos novos | — (site) | 🔴 Semana 1 |
| 2 | Postos | Conversão - Posto de Gasolina | Já ativa — trocar URL e títulos | Postos | 🔴 Semana 2 |
| 3 | Parques, clubes e hotéis | PSQ - Parques, Clubes e Hotéis | Já ativa — trocar URL e títulos | Parques, clubes e hotéis | 🔴 Semana 2 |
| 4 | Varejo / supermercado | APAS / Painel LED Supermercado | Reativar (se for Pesquisa) | Varejo | 🟠 Semana 2 |
| 5 | Igrejas | Pesquisa \| Igreja | Reativar | Igrejas | 🟠 Semana 2 |
| 6 | Eventos (aluguel) | Painéis de LED - Compra e Locação | Revisar e reativar só com termos de aluguel | Eventos | 🟠 Semana 3 |
| 7 | Farmácias | Pesquisa \| Farmácia | Reativar | Farmácias | 🟡 Semana 3 |
| 8 | Corporativo | Pesquisa \| Corporativo | Reativar | Corporativo | 🟡 Semana 4 |
| 9 | Arquitetura / home | Display \| Arquitetura - LHD | Avaliar depois (Display) | Arquitetura | ⚪ Depois |

Regra para TODA campanha reativada: aplicar a lista **"Não vendemos"** + negativas `"ledwave"`, `"led wave"`, `[painel de led]`, `[painel led]` (os scripts 01 e 03 só cobriram as campanhas que estavam ativas).

---

## Semana 1 — Arrumar a base (sem isso o resto não converte)

### Site
- [ ] WhatsApp no celular na página /contato/ (`site/contato-v8-com-whatsapp.html` ou o botão flutuante)
- [ ] WhatsApp no celular no site inteiro (Elementor → Código personalizado ou plugin WPCode com `site/whatsapp-botao-mobile.html`)
- [ ] Testar no celular: home, /contato/, /painel-de-led-outdoor-2/

### Google Ads
- [ ] Topo: URL final dos anúncios → `https://ledwave.com.br/contato/`
- [ ] Topo: títulos e descrições do grupo **Geral** (`anuncios-titulos-descricoes.md`)
- [ ] Topo e PSQ \| Painel de LED: adicionar recurso **Formulário de lead** e **Mensagem (WhatsApp)**
- [ ] Sufixo do URL final da conta: `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}`
- [ ] Conversão "Botão WhatsApp das LPs": conferir **valor 30** salvo
- [ ] Pausar campanhas ativas sem gasto: [Search] LedWave venda de painel · Campanha Tráfego - Nova · Campanha Display PDV
- [ ] Remover "[B/300] Saldão de Lâmpadas"
- [ ] Script 02 agendado: Semanal, segunda, 7h

### RD Station
- [ ] Página de obrigado criada
- [ ] Código do GTM nas landing pages (Configurações → Scripts)
- [ ] GTM: gatilho na página de obrigado → conversão "Conversão - Formulários do Site"
- [ ] (Recomendado) Domínio próprio `lp.ledwave.com.br`

---

## Semana 2 — Primeiras 4 verticais

Para cada uma: criar a LP no RD → testar no celular → apontar a campanha → títulos novos.

- [ ] **Postos** — LP + campanha Conversão - Posto de Gasolina
- [ ] **Postos - Topo** — criar campanha conforme `campanha-postos-topo.md` (só depois da LP pronta)
- [ ] **Parques, clubes e hotéis** — LP + campanha PSQ - Parques, Clubes e Hotéis
- [ ] **Varejo** — LP + reativar APAS / Painel LED Supermercado (conferir tipo antes)
- [ ] **Igrejas** — LP + reativar Pesquisa \| Igreja

Palavras-chave sugeridas (correspondência de frase) estão no `passo-a-passo-rd-e-google-ads.md`. Para postos, parques e as demais, usar:
- Postos: "painel de led para posto", "totem de preço posto", "painel de preço combustível", "placa de preço posto de gasolina"
- Parques/clubes/hotéis: "telão de led para clube", "painel de led para piscina", "telão área externa", "painel de led para hotel"
- Farmácias: "painel de led para farmácia", "fachada de led farmácia", "tv para farmácia"
- Corporativo: "videowall de led", "painel de led para auditório", "painel de led para recepção", "painel de led para empresa"

---

## Semana 3 — Mais verticais + SEO

- [ ] **Eventos** — abrir "Painéis de LED - Compra e Locação", deixar só termos de aluguel, LP Eventos, reativar
- [ ] **Farmácias** — LP + reativar Pesquisa \| Farmácia
- [ ] **SEO — consolidação:** seguir `../seo/plano-consolidacao-urls.md`. Fase 1: 301 dos temas preço (fica `/preco-de-painel-de-led/`), outdoor e telão área externa. Fase 2: noindex em tags, `/nova-home/`, UTMs nos links internos
- [ ] **SEO — loja:** testar 1 página de produto em search.google.com/test/rich-results (precisa aparecer "Snippets de produto" ou "Listagens do comerciante" com preço) e cadastrar a loja no Merchant Center com listagens gratuitas
- [ ] **SEO:** Yoast → padrão de título `%%title%% | LedWave` (tirar "- Aluguel e Venda de Painel de LED - LedWave - Inovando Experiências")

---

## Semana 4 — Corporativo + limpeza

- [ ] **Corporativo** — LP + reativar Pesquisa \| Corporativo
- [ ] **SEO:** resolver páginas duplicadas (`/` × `/ledwave/`, `/aluguel-de-painel-de-led-goiania/` × `/ledwave-goiania/`, `/painel-de-led-outdoor-2/` × `/teloes-de-led-outdoor/`) com redirecionamento 301 ou noindex
- [ ] **SEO local:** padronizar endereço (site diz "Av. Vereador José Monteiro, 1390"; cadastro diz "Quinta Avenida, 1390") no Google Meu Negócio e diretórios
- [ ] Pausar anúncios antigos que perderam para os novos (comparar 2–3 semanas de dados)

---

## Toda segunda-feira

- [ ] Script 02 rodou (planilha "LedWave – Relatório Google Ads" com data de hoje)
- [ ] Pedir ao Claude: "analisa a conta" — termos novos para negativar, custo por conversão por vertical, Topo em 1º lugar
- [ ] No RD: leads por campanha (utm_campaign) — quais viraram orçamento

---

## Pendências de confirmação interna (⚠️ nos textos)

- [ ] Preços atuais da loja (página de preços)
- [ ] A LedWave tem **showroom** em SP/Goiânia? **Pronta entrega**? **Garantia de 2 anos** em todos os painéis?
- [ ] Equipe opera o painel durante o evento? Prazo mínimo para reservar aluguel?
- [ ] Cases com autorização: igrejas, postos, farmácias, clubes/hotéis, empresas, residências
- [ ] Certificação de proteção (IP) para uso perto de piscina
- [ ] Como funciona o software para o cliente trocar conteúdo
