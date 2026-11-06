# LedWave: passo a passo do SEO que falta

Atualizado em 06/11/2026. Marque `[x]` conforme for concluindo.

A limpeza técnica (páginas repetidas, tags, UTMs, `/nova-home/`, títulos) já está em `plano-consolidacao-urls.md`, Passos 0 a 11. **Faça aquele arquivo primeiro**: não adianta criar conteúdo novo enquanto 3 a 5 páginas disputam a mesma busca. Este arquivo cobre o resto.

| Bloco | O que resolve | Quando | Tempo |
|---|---|---|---|
| 1. Velocidade e celular | SXO, experiência na página | Semana 1 | 2–4 h |
| 2. Dados estruturados (schema) | Schema markup, entity signals | Semana 2 | 1–2 h |
| 3. Empresa no Google | Entity signals, E-E-A-T, busca local | Semana 2 | 1 h |
| 4. Cluster "painel de LED" | Search intent, topic clusters, semantic search, internal linking | Semanas 3–8 | 1 dia por página |
| 5. Respostas diretas | Featured snippets, zero-click, AI Overviews, passage ranking | Junto com o bloco 4 | 30 min por página |
| 6. Prova e autoria | E-E-A-T | Mês 2 em diante | contínuo |
| 7. Links de fora | Link building | Mês 2 em diante | 2 h por mês |
| 8. Busca com IA | GEO, AEO, AIO, citações em IA | Mês 3 em diante | 1 h por mês |
| 9. Medir | Tudo acima | Todo mês | 30 min |

---

## Bloco 1: velocidade e celular

1. Abra **pagespeed.web.dev**, cole `https://ledwave.com.br/` e clique em **Analisar**. Anote a nota de **Celular**. Repita para `/preco-de-painel-de-led/` e para a LP `conteudo.ledwave.com.br/lp-google-ads-painel-de-led`.
2. Meta: nota de celular **acima de 70** e **LCP abaixo de 2,5 s** (aparece em "Core Web Vitals").
3. Se a nota estiver abaixo de 70, no WordPress:
   - [ ] **Imagens:** instale o plugin **Converter for Media** (gratuito) → Ativar → Configurações → **Regenerar todas**. Ele transforma as imagens em WebP.
   - [ ] **Cache:** se a hospedagem não tem cache próprio, instale **LiteSpeed Cache** (servidor LiteSpeed) ou **WP Super Cache**. Ative com as opções padrão.
   - [ ] **Elementor:** Elementor → Configurações → **Funcionalidades** → ative "Carregamento otimizado de recursos" e "Carregamento otimizado de CSS".
   - [ ] **Vídeo no topo da home:** se houver, troque por uma imagem com botão de play.
4. **LPs do RD no celular** (o mesmo que já combinamos): título com 28–32 px, subtítulo com 16–18 px, botão "Quero meu orçamento" na primeira tela.
5. Rode o PageSpeed de novo e anote a nota nova.

## Bloco 2: dados estruturados (schema)

O Yoast já gera o básico. Falta dizer ao Google **quem é a empresa** e conferir os **produtos da loja**.

1. **Teste o que existe hoje:** abra **search.google.com/test/rich-results**, cole a URL de uma página de produto da loja e clique em **Testar URL**.
   - Aparece "Snippets de produto" ou "Listagens do comerciante" com preço? ✅ Nada a fazer na loja.
   - Não aparece? Anote e me mande o print; o ajuste depende do plugin da loja (WooCommerce gera sozinho, outros não).
2. **Dados da empresa no Yoast:** Yoast SEO → **Configurações** → **Representação do site**:
   - [ ] "Organização", nome **LedWave**, logo quadrado (mínimo 112×112 px).
   - [ ] Perfis sociais: Instagram, LinkedIn, YouTube, Facebook.
3. **Endereço e showroom (código extra):** instale o plugin **WPCode** → Adicionar snippet → **Adicionar código personalizado** → tipo **HTML** → local **Cabeçalho do site** → cole o código abaixo, troque o que está entre colchetes e **Ativar**.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LedWave",
  "url": "https://ledwave.com.br/",
  "logo": "https://ledwave.com.br/[caminho-do-logo].png",
  "foundingDate": "2011",
  "telephone": "[+55 62 0000-0000]",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[endereço da fábrica, igual ao do Google Meu Negócio]",
    "addressLocality": "Goiânia",
    "addressRegion": "GO",
    "addressCountry": "BR"
  },
  "location": {
    "@type": "Place",
    "name": "Showroom LedWave São Paulo",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Nove de Julho, 3624",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR"
    }
  },
  "sameAs": [
    "https://www.instagram.com/[perfil]",
    "https://www.linkedin.com/company/[perfil]",
    "https://www.youtube.com/@[canal]"
  ]
}
</script>
```

4. Teste de novo a home no **search.google.com/test/rich-results**: tem que aparecer "Organização" sem erros.

⚠️ **Antes do passo 3:** o site diz "Av. Vereador José Monteiro, 1390" e o cadastro diz "Quinta Avenida, 1390". Confirme qual é o certo e use o mesmo em todo lugar (bloco 3).

## Bloco 3: empresa no Google

1. Abra **business.google.com** com a conta da LedWave.
   - [ ] **Endereço da fábrica** igual ao do site e do código do bloco 2, letra por letra.
   - [ ] **Categoria principal:** "Fabricante de painéis de LED" (ou "Fornecedor de sinalização"). Categorias extras: "Empresa de aluguel de equipamentos audiovisuais", "Serviço de publicidade digital".
   - [ ] **Descrição:** 2 a 3 frases com "painel de LED", "fábrica em Goiânia", "showroom em São Paulo", "venda, aluguel e assinatura".
   - [ ] **Fotos:** fábrica, showroom e 10 painéis instalados, com o nome do cliente na legenda quando autorizado.
   - [ ] **Produtos:** um item por linha de produto (indoor, outdoor, totem, videowall), cada um com link para a página do site.
2. **Showroom de SP:** se ainda não existe um perfil próprio, crie um para a Av. Nove de Julho, 3624. Só vale se houver atendimento no local.
3. **Avaliações:** peça ao comercial para enviar o link de avaliação a todo cliente que recebeu o painel. Meta: **4 avaliações novas por mês**.
4. **Mesmo nome, endereço e telefone em todo lugar:** Instagram, LinkedIn, Facebook, rodapé do site e diretórios (Apontador, Guia Mais, ABRAPI ou associações do setor).

## Bloco 4: cluster "painel de LED"

Cluster = uma página principal forte + páginas de apoio que linkam para ela, cada uma respondendo **uma** pergunta. É isso que ensina ao Google que a LedWave é referência no assunto.

**O mapa (uma página por linha; não crie outra para a mesma busca):**

| Papel | Busca principal | Página | Situação |
|---|---|---|---|
| Página principal | painel de led | home ou `/painel-de-led/` (decidir uma) | existe, reforçar |
| Preço | quanto custa painel de led / preço | `/preco-de-painel-de-led/` | existe (manter, posição 4,3) |
| Tipo | painel de led outdoor | página de outdoor (a que ficar no Passo 2 do outro arquivo) | existe |
| Tipo | painel de led indoor | `/painel-de-led-indoor/` | criar ou confirmar |
| Uso | aluguel de painel de led | página de aluguel | existe, conferir |
| Vertical | painel de led para igreja | `/painel-de-led-para-igreja/` | criar |
| Vertical | painel de led para supermercado | `/painel-de-led-para-supermercado/` | criar |
| Vertical | painel de led para posto de gasolina | `/painel-de-led-para-posto/` | criar |
| Vertical | telão de led para clube e hotel | `/telao-de-led-para-clubes-e-hoteis/` | criar |
| Vertical | painel de led para farmácia | `/painel-de-led-para-farmacia/` | criar |
| Dúvida | qual o melhor pitch / P2, P3, P4 | artigo "Pitch de painel de LED: como escolher" | criar |
| Dúvida | painel de led ou TV | artigo "Painel de LED ou TV: qual vale mais para sua empresa" | criar |

**Para cada página nova (uma por semana):**

1. Páginas → **Adicionar nova** → monte com o Elementor (pode duplicar uma página de produto e trocar o texto).
2. Estrutura:
   - **H1** com a busca exata: "Painel de LED para igrejas".
   - **1º parágrafo** (até 50 palavras) que já responde: o que é, para quem, faixa de preço ou prazo.
   - **H2 em forma de pergunta**: "Qual o tamanho ideal de painel para igreja?", "Quanto custa?", "Indoor ou outdoor?".
   - **Fotos reais** com texto alternativo descritivo ("painel de LED instalado no altar da Igreja X").
   - **Um case** com número (tamanho do painel, prazo, resultado).
   - **Botão** de WhatsApp e de orçamento.
3. Yoast (embaixo do editor): **frase-chave** = a busca principal; título SEO "Painel de LED para Igrejas | LedWave"; meta descrição de até 155 caracteres.
4. **Links:** a página nova linka para a principal ("painel de LED") e para `/preco-de-painel-de-led/`; e a principal ganha um link para a nova.
5. **Publicar** → Search Console → **Inspeção de URL** → cole a URL → **Solicitar indexação**.

Os textos das LPs do RD (`google-ads/landing-pages-rd-station.md`) servem de base, mas a página do site precisa ser **mais completa** que a LP (mais texto, perguntas e cases). Não copie igual: as LPs estão como "não indexar" justamente para não disputar com o site.

## Bloco 5: respostas diretas (snippets e IA)

Vale para a principal, a de preço e todas as páginas do bloco 4.

1. Logo abaixo de cada H2-pergunta, escreva **a resposta em 1 ou 2 frases** e só depois explique. Ex.: "**Quanto custa um painel de LED?** Um painel de LED indoor de 2×1 m custa a partir de R$ [__] na compra ou R$ [__]/mês na assinatura. O preço depende do tamanho, do pitch e de ser indoor ou outdoor."
2. Use **tabela** quando comparar (preço por tamanho, indoor x outdoor, compra x aluguel x assinatura). O Google e as IAs copiam tabelas com facilidade.
3. Termine com um bloco **Perguntas frequentes** (4 a 6). No Elementor, use o widget **Acordeão** e, no Yoast, o bloco **FAQ** se a página for feita no editor de blocos.
   - Desde 2023 o Google quase não mostra mais o FAQ como resultado especial, mas o conteúdo continua sendo lido pelo AI Overviews e pelo ChatGPT. Vale fazer.
4. ⚠️ Preços só depois de confirmar com o comercial (pendência já registrada).

## Bloco 6: prova e autoria (E-E-A-T)

1. **Página "Cases"** (`/cases/`): 1 case por vertical, cada um com cliente (com autorização), cidade, tamanho do painel, foto e uma frase do cliente. Meta: **2 cases novos por mês**.
2. **Página "Sobre"**: fábrica em Goiânia desde 2011, fotos da produção, equipe, **1º lugar no ranking Negócios em Expansão 2025 (Exame/BTG)** com link para a matéria, garantia e assistência.
3. **Autor nos artigos**: Usuários → seu perfil → nome, cargo ("Especialista em painéis de LED da LedWave") e uma biografia curta. O Yoast coloca isso no schema sozinho.
4. **Datas**: em artigos de preço, atualize o texto e a data a cada 3 meses.

## Bloco 7: links de fora (link building)

Um link de um site sério vale mais que dez de sites fracos. Nunca compre pacotes de links.

| Fonte | Como pedir | Meta |
|---|---|---|
| Clientes | Pedir um post ou notícia "instalamos painel novo" com link para a LedWave | 1 por mês |
| Imprensa e Exame/BTG | Garantir que a matéria do ranking tenha link para o site | 1 vez |
| Associações (ABRAS para supermercados, sindicatos de postos, Abrafarma etc.) | Anunciar ou entrar na lista de fornecedores | 1 por trimestre |
| Portais de mídia exterior (DOOH) e eventos do setor | Artigo de opinião ou entrevista | 1 por trimestre |
| Fornecedores e parceiros (agências, integradores) | Página de parceiros com link recíproco | 2 no ano |

Anote cada link conseguido numa planilha (data, site, página, link).

## Bloco 8: busca com IA (GEO, AEO, citações)

As IAs citam quem responde direto, tem números e é citado em outros sites. Os blocos 4 a 7 já fazem quase tudo. Falta:

1. **Teste todo mês** no ChatGPT, no Gemini e no Google (AI Overviews), sem estar logado na conta da LedWave:
   - "qual a melhor empresa de painel de led no Brasil?"
   - "quanto custa um painel de led?"
   - "painel de led para igreja, quem fabrica?"
   Anote se a LedWave aparece e qual concorrente aparece no lugar (D Show, The LED).
2. Garanta que os textos dizem a mesma coisa em todo lugar (site, Google Meu Negócio, LinkedIn): "LedWave, fabricante de painéis de LED desde 2011, fábrica em Goiânia e showroom em São Paulo".
3. Publique os cases também no LinkedIn e no YouTube: as IAs leem essas plataformas.

## Bloco 9: medir (todo mês, 30 min)

| O que | Onde | Meta |
|---|---|---|
| Posição de "painel de led" | Search Console → Desempenho → Consultas | 6,6 → top 3 até dez/2027 |
| Cliques orgânicos | Search Console → Desempenho | subir mês a mês |
| Páginas indexadas certas | Search Console → Páginas | só as do mapa do bloco 4 + produtos |
| Nota de celular | pagespeed.web.dev | acima de 70 |
| Leads orgânicos | RD Station → Contatos → origem "Busca orgânica" | contar todo mês (entra no OKR de CRM) |
| Avaliações no Google | Google Meu Negócio | +4 por mês |
| Aparece nas IAs? | Teste do bloco 8 | sim em 2 de 3 perguntas até o fim de 2027 |

Mande os prints do Search Console e do RD que eu comparo com o mês anterior.
