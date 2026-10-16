# AGM Marketing — gerador mensal

Gera a apresentação mensal do AGM (diretoria) a partir de uma planilha de dados,
mantendo o layout do modelo e escrevendo análises curtas automaticamente.

> A apresentação de cada mês mostra os **resultados do mês anterior**
> (ex.: apresentação de outubro → `mes_referencia = 2026-09`).

## Fluxo mensal

1. Na planilha **AGM_dados** (Google Sheets), aba `Config`, troque `mes_referencia`.
2. Adicione as linhas do novo mês em cada aba (não apague meses anteriores — eles
   alimentam os gráficos de evolução e as comparações).
3. Peça ao Claude para gerar o AGM do mês; ele lê a planilha, roda o gerador e devolve
   o `.pptx`, que abre direto no Google Slides.

## Rodando localmente

```bash
pip install -r requirements.txt
python criar_planilha.py AGM_dados.xlsx                      # planilha em branco
python gerar_agm.py --modelo AGM_modelo.pptx --dados AGM_dados.xlsx
```

- `AGM_modelo.pptx`: a apresentação do AGM exportada do Google Slides
  (Arquivo → Fazer download → .pptx). Os slides são localizados pelos IDs dos
  objetos do Google Slides, então use sempre o mesmo arquivo como base.
- A fonte Poppins é baixada do Google Fonts na primeira execução (pasta `fontes/`).

## O que é automático

| Slide | Cálculo |
|---|---|
| Negócios fechados Digital | gráfico mensal, receita e investimento acumulados no ano, ROAS |
| Leads | gráfico do ano + investimento mês a mês |
| Resumo Digital | 4 meses + mês parcial, taxas de conversão |
| Varejo / Eventos | 70% do varejo, receita total, ROAS total |
| Redes sociais | comparativo de 3 meses, totais e variação |
| NPS | NPS, zona (Excelência ≥ 75, Qualidade ≥ 50, Aperfeiçoamento ≥ 0, Crítica), taxa de resposta |
| Análises | texto curto no rodapé de cada slide + notas do apresentador |

Qualquer análise automática pode ser substituída pela aba `Textos`
(seção `analise`, título = chave do slide).

Dados da empresa (planilha, modelo e apresentações geradas) **não** são versionados.
