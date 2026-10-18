# Dissertação PROUNI: espaço de trabalho

Painel publicado: https://claude.ai/artifact/DXyx5xN4uwT396PQ67gX6B (privado)

- `painel.html`: código da página (Painel, Biblioteca, Leitura e fichamento, Referências).
- `dados/gerar_seed.py`: carga inicial da biblioteca e das seções. Junta as referências do Google Docs (versão de 08/10/2026), os comentários do documento, as sugestões novas e a planilha `leituras_tese_prouni_v2.numbers`.
- `dados/seed/`: os JSON gerados pelo script, que foram enviados ao banco de dados da página.

Os fichamentos, os status e os PDFs ficam guardados no banco de dados da própria página, não neste repositório.

## Fluxo

1. **Biblioteca**: escolha um artigo e clique em *Ler e fichar*.
2. **Leitura**: envie o PDF. No modo *Texto*, selecione um trecho e clique em *+ Citação*: a página entra sozinha e a citação já sai em APA (ou ABNT).
3. **Pré-fichar com o Claude**: preenche os campos vazios a partir do PDF. Revise sempre.
4. **Painel**: *Rascunhar com fichamentos* escreve um rascunho da seção usando só o que foi fichado.
5. **Referências**: a lista sai em ordem alfabética, pronta para colar no Google Docs.
