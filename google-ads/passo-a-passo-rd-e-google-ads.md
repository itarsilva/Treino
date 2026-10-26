# LedWave — Passo a passo: landing pages do RD Station nas campanhas do Google Ads

## Situação das campanhas
| Segmento | Campanha existente | Status | Plano |
|---|---|---|---|
| Igrejas | Pesquisa \| Igreja | Pausada | Reativar (Parte C) |
| Supermercado/varejo | APAS / Painel LED Supermercado | Pausada | Reativar se for Pesquisa (Parte D) |
| Eventos/aluguel | — (buscas caem na Parques e na Painéis e Telões) | — | Novo grupo na Parques (Parte E) |

⚠️ Campanhas reativadas NÃO têm a lista "Não vendemos" nem as negativas de marca/"painel de led" (scripts 01 e 03 só pegaram as ativas). Ver C2.

## Parte A — RD Station
A1. Conversão → Landing Pages → Criar. Textos de `landing-pages-rd-station.md`. Mesmo formulário do site. Botão WhatsApp com o mesmo link do site. Conferir no modo celular.
A2. Página de obrigado + Configurações → Pós-conversão → redirecionar para ela.
A3. Configurações → Scripts → código do GTM no head (todas as LPs e a de obrigado). Publicar.
A4. (Recomendado) Domínio próprio lp.ledwave.com.br.
A5. GTM: gatilho de visualização da página de obrigado → tag "Conversão - Formulários do Site". Testar no Tag Assistant.

## Parte B — Google Ads (uma vez)
Administrador → Configurações da conta → Rastreamento → Sufixo do URL final:
`utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}`

## Parte C — Igrejas (Pesquisa | Igreja)
C1. Locais Brasil; sem Parceiros de pesquisa e Display; orçamento R$ 30–50/dia; Maximizar conversões. Palavras (frase): "painel de led para igreja", "telão para igreja", "telão de led para igreja", "tela de led para igreja", "painel para igreja".
C2. Aplicar lista "Não vendemos". Negativas de campanha: "ledwave", "led wave", [painel de led], [painel led].
C3. Anúncio responsivo novo → URL final = LP Igrejas; caminho igreja/painel-de-led; títulos/descrições do grupo Igrejas (`anuncios-titulos-descricoes.md`); fixar título 1. Pausar anúncios antigos após aprovação.
C4. Ativar a campanha.

## Parte D — Varejo (APAS / Painel LED Supermercado)
Se for Pesquisa: C1–C4 com palavras "painel de led para supermercado", "painel de led para loja", "painel de led para vitrine", "tv para supermercado", "retail media", "midia em supermercado"; LP e anúncios de Varejo.
Se não for Pesquisa: criar grupo "Varejo" na PSQ | Painel de LED (como na Parte E).

## Parte E — Eventos (grupo novo na PSQ - Parques, Clubes e Hotéis)
Grupo "Aluguel – Eventos". Palavras (frase): "aluguel de painel de led", "aluguel painel de led", "locação de painel de led", "aluguel de telão", "telão de led para eventos", "painel de led para eventos". Anúncio → LP Eventos; títulos do grupo Eventos; fixar título 1.

## Parte F — Conferir em 2–3 dias
Anúncios "Qualificado"; termos de pesquisa do segmento certo; leads no RD com origem google / cpc.
