# Linha Editora — Arte, Motion & Identidade Visual

Gere peças visuais (HTML, imagens, vídeos Remotion) para a **Linha Editora** seguindo rigorosamente o brandbook.

## Referências (leia antes de criar)

- Resumo das regras: `/home/user/Treino/linha-editora/brandbook/BRANDBOOK.md`
- Manual completo (PDF): `/home/user/Treino/linha-editora/brandbook/Linha_Editora_Brandbook_2026_v1.pdf`
- Peças já feitas, para reaproveitar:
  - `linha-editora/motion-logo.html` — motion do logo (HTML)
  - `linha-editora/motion-filme.html` — filme de marca em 6 takes (HTML)
  - `linha-editora/lancamento/` — template Remotion de lançamento de livros (Reels 9:16 + Feed 4:5); conteúdo em `src/data.ts`, componentes da marca em `src/brand.tsx`, fontes locais em `public/fonts`

## Regras essenciais

**Conceito:** *A linha que conecta histórias.* A linha é o traço do texto, o fio da narrativa e a lombada que alinha os livros na estante. Encerramento: *Toda história começa por uma linha.*

**Personalidade:** editorial, sóbria, contemporânea. Clareza, precisão, repertório, permanência, cuidado editorial. Confia no silêncio do branco.

**Cores (só estas três):**
```css
--navy:   #001F3F;  /* títulos e marca */
--silver: #A8A9AD;  /* apoio, separação, hierarquia secundária */
--white:  #F8F8F8;  /* off-white — domina as superfícies */
--muted:  #8E98A8;  /* prata da versão negativa, sobre marinho */
```

**Tipografia:**
- **Jost** Light/Regular/Medium — marca e títulos
- **Spectral** Light/Regular/Italic — textos e parágrafos
- **Mono** (IBM Plex Mono) em CAIXA ALTA com letter-spacing largo — rótulos e cabeçalhos de página ("01 — A MARCA", "LINHA EDITORA")

**Símbolo:** lombadas de espessura constante sobre base comum + duas peças inclinadas. Geometria exata em `BRANDBOOK.md` (e implementada em `lancamento/src/brand.tsx`).
- Assinatura horizontal é a preferencial; vertical para espaços estreitos.
- Área de proteção = altura do símbolo. Mínimo 22 mm impresso / 14 px em tela.
- **Nunca:** girar, inclinar, distorcer, usar sobre baixo contraste ou recolorir fora da paleta.

**Grafismo:** linhas verticais como ritmo (textura, cabeçalhos, divisórias), com parcimônia e sempre alinhadas a uma base.

**Layout:** muito respiro, fios finos de 1–2 px como divisores, cabeçalhos mono nos cantos (como as páginas do manual), sem sombras pesadas nem gradientes chamativos.

## Como usar

Ao receber pedidos como "post da Linha Editora", "motion", "vídeo de lançamento", "capa", "cartão", "story":
1. Leia `BRANDBOOK.md` e aplique todas as regras acima.
2. Para vídeos, prefira estender o projeto Remotion em `linha-editora/lancamento/` (reaproveite `brand.tsx`).
3. Salve em `/home/user/Treino/linha-editora/`, faça commit e push no branch de trabalho da sessão.
4. Entregue os arquivos ao usuário com `SendUserFile`.

**Argumento `$ARGUMENTS`:** tipo/tema da peça (ex.: "post de citação", "vídeo de lançamento do livro X", "capa de story").
