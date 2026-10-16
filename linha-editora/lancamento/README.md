# Linha Editora — vídeo de lançamento (Remotion)

Template de vídeo de lançamento de livros, seguindo o brandbook da Linha Editora.

## Formatos

| Composição          | Tamanho    | Uso               |
|---------------------|------------|-------------------|
| `Lancamento-Reels`  | 1080×1920  | Reels, Stories    |
| `Lancamento-Feed`   | 1080×1350  | Feed (4:5)        |

## Takes

1. **Abertura** — a estante se ergue e "Save the date" é escrito letra a letra
2. **Data** — "Lançamento", a data e o dia da semana
3. **Livros** — um take por livro (capa, número, autor, título)
4. **Estante** — os títulos lado a lado na prateleira
5. **Serviço** — quando, onde e horário
6. **Encerramento** — QR code, contatos e assinatura

## Novo lançamento

1. Coloque as capas novas em `public/`
2. Edite `src/data.ts` (data, local, horário, livros, QR code)
3. Renderize:

```bash
npm i
npx remotion render Lancamento-Reels out/reels.mp4
npx remotion render Lancamento-Feed out/feed.mp4
```

Para ajustar visualmente: `npx remotion studio`.

As fontes do manual (Jost, Spectral, IBM Plex Mono) ficam em `public/fonts`.
