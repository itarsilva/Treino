# NewPlace — Arte & Identidade Visual

Gere ativos visuais HTML para a marca **NewPlace Administradora de Imóveis** seguindo rigorosamente o sistema de identidade estabelecido.

## Conceito da Marca

**"O Limiar"** — Todo imóvel é um limiar: o instante antes de uma nova história começar. O ponto entre o que era e o que será.

Tagline: *"Onde o novo começa."*

---

## Sistema de Identidade

### Tipografia (OBRIGATÓRIO)

| Fonte | Uso | Peso |
|---|---|---|
| **Cormorant SC** | Logo "New", labels, small caps | 300 |
| **Cormorant Garamond Italic** | Logo "Place", títulos emocionais, taglines | 300–400 italic |
| **Cormorant Garamond** | Corpo editorial, manifesto | 300–400 |
| **Inter** | Corpo UI, labels técnicos, interfaces | 200–500 |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Cormorant+SC:wght@300;400;500&family=Inter:wght@200;300;400;500&display=swap" rel="stylesheet" />
```

**Regra principal do logotipo:**
- "New" → Cormorant SC, weight 300, letter-spacing generoso → ancora, estrutura
- "Place" → Cormorant Garamond italic, weight 300 → flui, elegância

```css
.logo-new   { font-family: 'Cormorant SC'; font-weight: 300; letter-spacing: 8-12px; }
.logo-place { font-family: 'Cormorant Garamond'; font-style: italic; font-weight: 300; letter-spacing: 2-4px; }
```

---

### Paleta de Cores (OBRIGATÓRIO)

```css
--navy:      #0B1C35;  /* Azul Noite — primária, fundos escuros, autoridade */
--navy-mid:  #162D52;  /* Navy intermediário para gradientes */
--red:       #C4201B;  /* Vermelho Limiar — acento, emoção, CTAs */
--red-warm:  #D12822;  /* Variante quente do vermelho */
--white:     #FFFFFF;
--cream:     #F6F4F0;  /* Fundo principal — nunca branco puro */
--parchment: #EDE8DF;  /* Pergaminho — verso de cartão, variações */
--ink:       #0E0E0E;  /* Tipografia escura */
--g3:        #ECEAE5;  /* Cinza estrutural — bordas, divisores */
--g5:        #D0CCCA;  /* Cinza médio */
--g7:        #8A8680;  /* Cinza texto secundário */
--g9:        #3A3835;  /* Cinza escuro corpo */
```

**Combinações aprovadas:**
- Navy + Branco + Acento vermelho → principal
- Creme + Navy + Vermelho → editorial
- Navy fundo + texto branco + Place em vermelho quente
- Vermelho fundo + texto branco

---

### Grid & Espaçamento

- Máx-width de conteúdo: `1100px`
- Padding seções: `clamp(80px, 9vw, 140px)` vertical, `clamp(32px, 7vw, 120px)` horizontal
- Gap entre grids: `1px` com `background: var(--g5)` → efeito de divisor fino
- Bordas: `1px solid var(--g3)` ou `1px solid var(--g5)` — nunca sombras pesadas
- Border-radius: `0` ou `2px` — jamais `16px+` (muito "app")

---

### Regras Visuais

1. **Fundo padrão:** `var(--cream)`, não branco puro
2. **Seções alternadas:** `--white` / `--cream` / `--navy`
3. **Divisores:** `1px` lines e grids de `1px gap` — nunca sombras
4. **Itálico como voz emocional:** Use Cormorant italic para frases que carregam sentimento
5. **Small Caps como autoridade:** Cormorant SC para labels, categorias, rodapés
6. **Espaçamento generoso:** `letter-spacing: 3-6px` em labels SC
7. **Sem gradientes chamativos** — só `radial-gradient` subtis para glow de fundo
8. **Grid de fundo opcional:** `linear-gradient` em `1px` para textura sutil

---

### Componentes Padrão

**Botões:**
```css
font-family: 'Cormorant SC'; font-size: 9px; font-weight: 300;
letter-spacing: 3px; text-transform: uppercase; padding: 13px 28px;
border-radius: 0; /* sem rounded */
```

**Badges/Tags:**
```css
font-family: 'Cormorant SC'; font-size: 8px; font-weight: 300;
letter-spacing: 2px; text-transform: uppercase; border-radius: 0;
```

**Labels de seção:**
```css
font-family: 'Cormorant SC'; font-size: 10px; letter-spacing: 5px;
color: var(--red); text-transform: uppercase; margin-bottom: 10px;
```

**Títulos H2:**
```css
font-family: 'Cormorant Garamond'; font-weight: 300;
font-size: clamp(36px, 5vw, 64px); color: var(--navy);
/* linha em roman + segunda linha em italic vermelho */
```

---

## Como Usar Esta Skill

Ao receber pedidos como:
- "crie arte NewPlace para Instagram"
- "faz um post NewPlace"
- "banner NewPlace"
- "cartão de visita NewPlace"
- "página NewPlace"
- "template NewPlace"
- qualquer pedido de arte/design/visual relacionado à NewPlace

**Sempre:**
1. Gere um arquivo `.html` standalone (tudo inline, sem dependências externas exceto Google Fonts)
2. Aplique TODAS as regras acima
3. Use o conceito "O Limiar" como fio condutor quando pertinente
4. Salve em `/home/user/Treino/` com nome descritivo
5. Faça commit e push no branch `claude/friendly-lovelace-K6178`
6. Entregue o arquivo ao usuário com `SendUserFile`

**Argumento `$ARGUMENTS`:** Se fornecido, é o tipo/tema específico do ativo (ex: "post Instagram sobre aluguel", "banner de lançamento", "página de serviços").

---

## Referência — Arquivo Base

O manual completo de identidade está em:
`/home/user/Treino/newplace-identidade-visual.html`

Use-o como referência para extrair componentes, CSS vars e padrões quando necessário.
