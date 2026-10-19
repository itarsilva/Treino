import sys
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.formatting.rule import FormulaRule
from openpyxl.comments import Comment
from openpyxl.utils import get_column_letter

from conteudo import NICHOS, LEDWAVE, ROTEIRO, TECNICAS, OBJECOES_GERAIS, FRASES_GERAIS, BLOCOS, TIPOS_IDEIA, STATUS_IDEIA
from conteudo3 import PROPOSITOS, DIFERENCIAIS, OBJECOES_COMERCIAL, CASES, RESULTADOS, NICHO_MAPA
from conteudo2 import (SPIN, ORCAMENTO, REFERENCIA_TECNICA, CADENCIA, COLD_CALL, ESCUTA_ATIVA,
                       METODO_OBJECAO, ROLEPLAY_CENARIO, ROLEPLAY_SCRIPT, ROLEPLAY_AVALIACAO)

OUT = sys.argv[1]

NAVY = "3D3D3D"
MAGENTA = "8A5CF6"
LILAC = "F2F3F7"
EDIT = "FFF8D6"
WHITE = "FFFFFF"
GREY = "F5F5F7"

F = "Arial"
thin = Side(style="thin", color="D0CCE0")
BORDER = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical="top")

wb = Workbook()
wb.remove(wb.active)


def sheet(name, tab_color=NAVY):
    ws = wb.create_sheet(name)
    ws.sheet_properties.tabColor = tab_color
    ws.sheet_view.showGridLines = False
    return ws


def title(ws, text, sub=None, span=8):
    ws["A1"] = text
    ws["A1"].font = Font(name=F, size=18, bold=True, color=WHITE)
    for c in range(1, span + 1):
        ws.cell(row=1, column=c).fill = PatternFill("solid", fgColor=NAVY)
        ws.cell(row=2, column=c).fill = PatternFill("solid", fgColor=NAVY)
    ws.row_dimensions[1].height = 34
    if sub:
        ws["A2"] = sub
        ws["A2"].font = Font(name=F, size=10, italic=True, color="D9D2F0")
    ws.row_dimensions[2].height = 20


def header(ws, row, cols, widths=None, color=MAGENTA):
    for i, h in enumerate(cols, start=1):
        c = ws.cell(row=row, column=i, value=h)
        c.font = Font(name=F, size=10, bold=True, color=WHITE)
        c.fill = PatternFill("solid", fgColor=color)
        c.alignment = Alignment(wrap_text=True, vertical="center", horizontal="center")
        c.border = BORDER
    ws.row_dimensions[row].height = 32
    if widths:
        for i, w in enumerate(widths, start=1):
            ws.column_dimensions[get_column_letter(i)].width = w


def body(ws, row, values, bold_first=False, fill=None, height=None):
    for i, v in enumerate(values, start=1):
        c = ws.cell(row=row, column=i, value=v)
        c.font = Font(name=F, size=10, bold=(bold_first and i == 1))
        c.alignment = WRAP
        c.border = BORDER
        if fill:
            c.fill = PatternFill("solid", fgColor=fill)
    if height:
        ws.row_dimensions[row].height = height


def zebra(ws, first, last, ncols):
    for r in range(first, last + 1):
        if (r - first) % 2 == 1:
            for c in range(1, ncols + 1):
                cell = ws.cell(row=r, column=c)
                if cell.fill.fgColor.rgb in (None, "00000000"):
                    cell.fill = PatternFill("solid", fgColor=GREY)


def est_height(texts, widths, base=14):
    lines = 1
    for t, w in zip(texts, widths):
        if t is None:
            continue
        t = str(t)
        chars = max(int(w * 1.15), 8)
        n = sum(max(1, -(-len(part) // chars)) for part in t.split("\n"))
        lines = max(lines, n)
    return min(max(lines * base + 6, 20), 400)


NICHO_NOMES = [n["nicho"] for n in NICHOS]
N = len(NICHOS)

# ---------------------------------------------------------------- Como usar
ws = sheet("Como usar", MAGENTA)
title(ws, "Playbook Comercial LedWave por Nicho", "Storytelling, prospecção e argumentação por segmento · apresentações de 10 a 20 minutos · versão 1 (out/2026)", span=4)
ws.column_dimensions["A"].width = 4
ws.column_dimensions["B"].width = 30
ws.column_dimensions["C"].width = 95
rows = [
    ("O que é", "Material vivo para o time comercial vender painéis de LED por nicho: primeiro vendemos a LedWave (quem somos, tamanho, presença, prova), depois o porquê aquele cliente precisa digitalizar o ponto dele."),
    ("Como montar uma apresentação", "1) Abra a aba Gerador de Roteiro. 2) Escolha o nicho e a duração (10, 15 ou 20 min) nas células amarelas. 3) O roteiro sai pronto, bloco a bloco, com tempo, técnica e fala. 4) Ajuste com o nome e os números do cliente."),
    ("Antes da reunião", "Prospecção Outbound (cadência e script de ligação) → SPIN por Nicho (perguntas inteligentes) → Orçamento por Nicho (o que levantar para orçar certo)."),
    ("Durante a reunião", "Gerador de Roteiro + Escuta Ativa + Objeções. Regra de ouro: na descoberta, o cliente fala 70% do tempo."),
    ("Treino do time", "Aba Roleplay: cenário, script de referência e ficha de avaliação com nota. Repita com outros nichos trocando a persona."),
    ("Como contribuir (gestores)", "Toda ideia nova entra na aba Banco de Ideias (uma linha por ideia). Na reunião do time, as ideias com status 'Aprovada' são levadas para a matriz Nichos. A coluna 'Ideias no Banco' da matriz mostra quantas contribuições cada nicho tem."),
    ("Células editáveis", "Fundo amarelo = campo para preencher ou escolher. Todo o texto das abas de conteúdo também pode ser editado e melhorado. Não apague as colunas A das abas Nichos e Listas: elas alimentam as fórmulas."),
    ("Fatos sobre a LedWave", "Na aba LedWave – Prova, a coluna Status diz se o dado já tem fonte pública ou se precisa ser validado com a apresentação executiva oficial. Só use em reunião dados 'Fonte pública' ou já validados."),
    ("Insights do comercial", "As abas Propósitos de Compra, Diferenciais e Cases organizam o que o time comercial trouxe na reunião. Cada nicho da matriz tem os seus propósitos de compra, cases de referência e objeções mais prováveis (colunas T a V). Itens marcados 'Confirmar' precisam de detalhe do comercial antes de ir para o cliente."),
    ("Adicionar um nicho", "Inclua uma nova linha no fim da matriz Nichos (e nas abas SPIN e Orçamento, com o mesmo nome). Ele aparece automaticamente na lista do Gerador e do Banco de Ideias (até a linha 60)."),
]
r = 4
for k, v in rows:
    ws.cell(row=r, column=2, value=k).font = Font(name=F, size=11, bold=True, color=NAVY)
    c = ws.cell(row=r, column=3, value=v)
    c.font = Font(name=F, size=10)
    c.alignment = WRAP
    ws.cell(row=r, column=2).alignment = WRAP
    ws.row_dimensions[r].height = est_height([v], [95]) + 4
    r += 1
r += 1
ws.cell(row=r, column=2, value="Legenda").font = Font(name=F, size=11, bold=True, color=NAVY)
c = ws.cell(row=r, column=3, value="Campo editável / escolha")
c.fill = PatternFill("solid", fgColor=EDIT)
c.font = Font(name=F, size=10)
c.border = BORDER
r += 1
c = ws.cell(row=r, column=3, value="Cabeçalho de tabela")
c.fill = PatternFill("solid", fgColor=MAGENTA)
c.font = Font(name=F, size=10, color=WHITE, bold=True)

# ---------------------------------------------------------------- Listas (built early so validations can reference it)
wl = None  # created at the end, referenced by name

# ---------------------------------------------------------------- Gerador de Roteiro
wg = sheet("Gerador de Roteiro", MAGENTA)
title(wg, "Gerador de Roteiro", "Escolha o nicho e a duração. O roteiro se monta sozinho a partir das outras abas.", span=6)
widths = [30, 11, 11, 30, 48, 80]
for i, w in enumerate(widths, start=1):
    wg.column_dimensions[get_column_letter(i)].width = w
wg["A4"] = "Nicho"
wg["A5"] = "Duração (min)"
wg["A6"] = "Cliente (opcional)"
for a in ("A4", "A5", "A6"):
    wg[a].font = Font(name=F, size=11, bold=True, color=NAVY)
wg["B4"] = NICHOS[2]["nicho"]
wg["B5"] = 15
wg["B6"] = "Rede Exemplo (38 lojas)"
for a in ("B4", "B5", "B6"):
    wg[a].fill = PatternFill("solid", fgColor=EDIT)
    wg[a].font = Font(name=F, size=11, bold=True)
    wg[a].border = BORDER
wg.merge_cells("B4:E4")
wg.merge_cells("B6:E6")
dv_n = DataValidation(type="list", formula1="=Listas!$A$2:$A$60", allow_blank=False)
dv_d = DataValidation(type="list", formula1='"10,15,20"', allow_blank=False)
wg.add_data_validation(dv_n)
wg.add_data_validation(dv_d)
dv_n.add("B4")
dv_d.add("B5")
wg["F5"] = '=IF(ISNA(MATCH($B$4,Nichos!$A:$A,0)),"Escolha um nicho da lista","Decisor típico: "&INDEX(Nichos!$B:$B,MATCH($B$4,Nichos!$A:$A,0)))'
wg["F5"].font = Font(name=F, size=10, italic=True, color=MAGENTA)
wg["F5"].alignment = WRAP
wg.row_dimensions[5].height = 30

header(wg, 8, ["Bloco", "Minutos", "Termina em (min)", "Técnica", "Como conduzir", "Fala do nicho (pronta para adaptar)"])

# Nichos columns: A nicho B decisor C dor D inacao E proposito F gancho G historia H arg_receita I arg_exp J arg_oper
# K frase L fechamento M solucao N prova O perguntas P objecao Q resposta R kpi S cta
M = "MATCH($B$4,Nichos!$A:$A,0)"
def col(c):
    return f"INDEX(Nichos!${c}:${c},{M})"
def spin(c):
    return f"INDEX('SPIN por Nicho'!${c}:${c},MATCH($B$4,'SPIN por Nicho'!$A:$A,0))"
NL = "&CHAR(10)&"
falas = [
    f'"GANCHO: "&{col("F")}',
    f'"DOR: "&{col("C")}{NL}"PERGUNTE (Situação): "&{spin("B")}{NL}"PERGUNTE (Problema): "&{spin("C")}',
    f'"CUSTO DA INAÇÃO: "&{col("D")}{NL}"PERGUNTE (Implicação): "&{spin("D")}',
    f'"ORIGEM: "&INDEX(\'LedWave – Prova\'!$C:$C,5){NL}"PROVA 1: "&INDEX(\'LedWave – Prova\'!$C:$C,7){NL}"PROVA 2: "&INDEX(\'LedWave – Prova\'!$C:$C,9){NL}"CASE DE REFERÊNCIA: "&IF({col("U")}="","use o Boulevard.Live (sem case do segmento mapeado)",{col("U")}){NL}"Feche com: E é por isso que estamos aqui."',
    f'"PROPÓSITO DE COMPRA (descubra qual pesa mais): "&{col("T")}{NL}"PROPÓSITO: "&{col("E")}{NL}"HISTÓRIA: "&{col("G")}{NL}"FRASE DE EFEITO (pausa de 3 s): "&{col("K")}',
    f'"1. RECEITA: "&{col("H")}{NL}"2. EXPERIÊNCIA: "&{col("I")}{NL}"3. OPERAÇÃO: "&{col("J")}{NL}"SOLUÇÃO: "&{col("M")}',
    f'"OBJEÇÃO PROVÁVEL: "&{col("P")}{NL}"RESPOSTA: "&{col("Q")}{NL}"OUTRAS OBJEÇÕES PROVÁVEIS (respostas na aba Objeções): "&{col("V")}{NL}"O QUE VOCÊ VAI MEDIR: "&{col("R")}',
    f'"PERGUNTE (Necessidade): "&{spin("E")}{NL}"FRASE: "&{col("K")}{NL}"FECHAMENTO: "&{col("L")}{NL}"PRÓXIMO PASSO: "&{col("S")}',
]
for i, (bloco, share, obj, tec, como, slide, erro) in enumerate(ROTEIRO):
    r = 9 + i
    rm = 4 + i  # row in Roteiro Mestre
    wg.cell(row=r, column=1, value=f"='Roteiro Mestre'!A{rm}")
    wg.cell(row=r, column=2, value=f"='Roteiro Mestre'!B{rm}*$B$5")
    wg.cell(row=r, column=3, value=f"=SUM($B$9:B{r})")
    wg.cell(row=r, column=4, value=f"='Roteiro Mestre'!D{rm}")
    wg.cell(row=r, column=5, value=f"='Roteiro Mestre'!E{rm}")
    wg.cell(row=r, column=6, value=f'=IFERROR({falas[i]},"Escolha um nicho da lista")')
    for c in range(1, 7):
        cell = wg.cell(row=r, column=c)
        cell.font = Font(name=F, size=10, bold=(c == 1))
        cell.alignment = WRAP
        cell.border = BORDER
    wg.cell(row=r, column=2).number_format = "0.0"
    wg.cell(row=r, column=3).number_format = "0.0"
    wg.row_dimensions[r].height = 175 if i in (3, 5, 7, 1) else 120
last = 9 + len(ROTEIRO) - 1
r = last + 1
wg.cell(row=r, column=1, value="Total").font = Font(name=F, size=10, bold=True)
wg.cell(row=r, column=2, value=f"=SUM(B9:B{last})").number_format = "0.0"
wg.cell(row=r, column=2).font = Font(name=F, size=10, bold=True)
wg.cell(row=r + 2, column=1, value="Dica: copie a coluna F para as notas do apresentador dos slides. Os tempos vêm dos percentuais da aba Roteiro Mestre.").font = Font(name=F, size=9, italic=True)
wg.freeze_panes = "A9"

# ---------------------------------------------------------------- Roteiro Mestre
wr = sheet("Roteiro Mestre")
title(wr, "Roteiro Mestre: a estrutura de toda apresentação", "Primeiro vendemos a LedWave como guia confiável; depois, o porquê do cliente. Ajuste os percentuais na coluna B (amarelo).", span=7)
cols = ["Bloco", "% do tempo", "Objetivo", "Técnica", "Como conduzir", "Slide sugerido", "Erro a evitar"]
w = [30, 11, 34, 30, 55, 34, 34]
header(wr, 3, cols, w)
for i, row in enumerate(ROTEIRO):
    r = 4 + i
    body(wr, r, list(row), bold_first=True, height=est_height(row, w))
    wr.cell(row=r, column=2).number_format = "0%"
    wr.cell(row=r, column=2).fill = PatternFill("solid", fgColor=EDIT)
r = 4 + len(ROTEIRO)
wr.cell(row=r, column=1, value="Total (deve ser 100%)").font = Font(name=F, size=10, bold=True)
wr.cell(row=r, column=2, value=f"=SUM(B4:B{r-1})").number_format = "0%"
wr.cell(row=r, column=3, value=f'=IF(ROUND(B{r},2)=1,"OK","Ajuste os percentuais para somar 100%")')
wr.cell(row=r, column=3).font = Font(name=F, size=10, bold=True, color=MAGENTA)
wr.freeze_panes = "B4"

# ---------------------------------------------------------------- LedWave – Prova
wp = sheet("LedWave – Prova")
title(wp, "LedWave: por que confiar em nós", "Use 3 provas por apresentação, escolhidas pelo nicho. Status 'Validar' = conferir com a apresentação executiva antes de usar.", span=6)
cols = ["Tema", "Fato", "Como falar (frase pronta)", "Fonte", "Status", "Observações do gestor"]
w = [20, 55, 55, 38, 14, 30]
header(wp, 4, cols, w)
for i, (tema, fato, falar, fonte, status) in enumerate(LEDWAVE):
    r = 5 + i
    body(wp, r, [tema, fato, falar, fonte, status, ""], bold_first=True, height=est_height([fato, falar, fonte], [55, 55, 38]))
    wp.cell(row=r, column=5).fill = PatternFill("solid", fgColor=EDIT)
    wp.cell(row=r, column=6).fill = PatternFill("solid", fgColor=EDIT)
lp = 5 + len(LEDWAVE) - 1
dv_s = DataValidation(type="list", formula1='"Fonte pública,Validar,Validado"', allow_blank=True)
wp.add_data_validation(dv_s)
dv_s.add(f"E5:E{lp+20}")
wp.conditional_formatting.add(f"E5:E{lp+20}", FormulaRule(formula=['$E5="Validar"'], font=Font(color="B00020", bold=True)))
wp.conditional_formatting.add(f"E5:E{lp+20}", FormulaRule(formula=['$E5<>"Validar"'], font=Font(color="1B7F3B", bold=True)))
wp["A3"] = "As linhas 5 (Origem), 7 (Reconhecimento) e 9 (Projeto-ícone) alimentam o bloco 4 do Gerador de Roteiro. Ao editar, mantenha essa ordem."
wp["A3"].font = Font(name=F, size=9, italic=True, color=MAGENTA)
wp.freeze_panes = "B5"

# ---------------------------------------------------------------- Propósitos de Compra
wpc = sheet("Propósitos de Compra", MAGENTA)
title(wpc, "Propósitos de compra: por que o cliente compra", "Insight do time comercial. Descubra na conversa qual propósito pesa mais e conduza a apresentação por ele.", span=6)
cols = ["Propósito", "O que o cliente quer de verdade", "Pergunta para identificar", "Resultados esperados ligados", "Nichos onde mais aparece", "Observações do gestor"]
w = [24, 50, 45, 36, 45, 30]
header(wpc, 3, cols, w)
for i, (prop, quer, perg, res) in enumerate(PROPOSITOS):
    r = 4 + i
    nichos = "; ".join(k for k, v in NICHO_MAPA.items() if prop in v[0])
    body(wpc, r, [prop, quer, perg, res, nichos, ""], bold_first=True, height=est_height([quer, perg, res, nichos], [50, 45, 36, 45]))
    wpc.cell(row=r, column=6).fill = PatternFill("solid", fgColor=EDIT)
zebra(wpc, 4, 3 + len(PROPOSITOS), 5)
r = 5 + len(PROPOSITOS)
wpc.cell(row=r, column=1, value="Resultados esperados (lista do comercial)").font = Font(name=F, size=12, bold=True, color=NAVY)
for i, res in enumerate(RESULTADOS):
    c = wpc.cell(row=r + 1 + i // 3, column=1 + i % 3, value=res)
    c.font = Font(name=F, size=10)
    c.border = BORDER
wpc.freeze_panes = "B4"

# ---------------------------------------------------------------- Diferenciais
wdf = sheet("Diferenciais", MAGENTA)
title(wdf, "Diferenciais da LedWave", "Insight do time comercial. Use 3 a 5 por apresentação, escolhidos pelo propósito de compra do cliente. 'Confirmar' = validar o texto com o comercial antes de usar com cliente.", span=5)
cols = ["Diferencial", "Como falar para o cliente", "Prova / o que levar", "Status", "Observações do gestor"]
w = [26, 70, 42, 20, 30]
header(wdf, 3, cols, w)
for i, (d, falar, prova, st) in enumerate(DIFERENCIAIS):
    r = 4 + i
    body(wdf, r, [d, falar, prova, st, ""], bold_first=True, height=est_height([falar, prova], [70, 42]))
    for c in (4, 5):
        wdf.cell(row=r, column=c).fill = PatternFill("solid", fgColor=EDIT)
ld = 3 + len(DIFERENCIAIS)
wdf.conditional_formatting.add(f"D4:D{ld}", FormulaRule(formula=['LEFT($D4,9)="Confirmar"'], font=Font(color="B00020", bold=True)))
wdf.conditional_formatting.add(f"D4:D{ld}", FormulaRule(formula=['$D4="OK"'], font=Font(color="1B7F3B", bold=True)))
wdf.freeze_panes = "B4"

# ---------------------------------------------------------------- Cases
wcs = sheet("Cases", MAGENTA)
title(wcs, "Cases de referência", "Cases citados pelo time comercial. Preencha desafio, entrega e resultado: é isso que entra nas apresentações.", span=9)
cols = ["Case", "Segmento (nicho)", "Propósitos de compra", "Desafio do cliente", "O que a LedWave entregou", "Resultado (número, se houver)", "Fotos/vídeo (link)", "Autorizado para uso com clientes?", "Status"]
w = [22, 30, 30, 36, 36, 32, 24, 18, 22]
header(wcs, 3, cols, w)
for i, (case, seg, props, st) in enumerate(CASES):
    r = 4 + i
    body(wcs, r, [case, seg, props, "", "", "", "", "", st], bold_first=True, height=40)
    for c in range(4, 10):
        wcs.cell(row=r, column=c).fill = PatternFill("solid", fgColor=EDIT)
for rr in range(4 + len(CASES), 4 + len(CASES) + 10):
    for c in range(1, 10):
        cell = wcs.cell(row=rr, column=c)
        cell.fill = PatternFill("solid", fgColor=EDIT)
        cell.border = BORDER
dv_aut = DataValidation(type="list", formula1='"Sim,Não,A confirmar"', allow_blank=True)
wcs.add_data_validation(dv_aut)
dv_aut.add(f"H4:H{3 + len(CASES) + 10}")
wcs.freeze_panes = "B4"

# ---------------------------------------------------------------- Nichos
wn = sheet("Nichos", MAGENTA)
title(wn, "Matriz de Nichos: o porquê de cada cliente", "Uma linha por nicho. É a fonte do Gerador de Roteiro. Melhore à vontade; registre a mudança na coluna 'Última contribuição'.", span=25)
cols = ["Nicho", "Decisor típico", "Dor principal (o mundo dele hoje)", "Custo da inação", "Propósito (o porquê)",
        "Gancho de abertura", "História / analogia", "Argumento 1: Receita", "Argumento 2: Experiência e marca",
        "Argumento 3: Operação e custo", "Frase de efeito", "Frase de fechamento", "Solução recomendada",
        "Prova / case (a completar)", "Perguntas de descoberta", "Objeção nº 1", "Resposta à objeção",
        "KPIs que o cliente vai medir", "Próximo passo (CTA)",
        "Propósitos de compra (comercial)", "Cases de referência", "Objeções mais prováveis (comercial)", "Ideias no Banco", "Última contribuição (gestor/data)", "Notas"]
keys = ["nicho", "decisor", "dor", "inacao", "proposito", "gancho", "historia", "arg_receita", "arg_exp", "arg_oper",
        "frase", "fechamento", "solucao", "prova", "perguntas", "objecao", "resposta", "kpi", "cta"]
w = [26, 26] + [38] * 17 + [30, 26, 34, 11, 22, 26]
header(wn, 3, cols, w)
for i, n in enumerate(NICHOS):
    r = 4 + i
    vals = [n[k] for k in keys]
    pr, cs, ob = NICHO_MAPA[n["nicho"]]
    vals += ["; ".join(pr), "; ".join(cs), "; ".join(ob)]
    body(wn, r, vals + [f"=COUNTIF('Banco de Ideias'!$C:$C,A{r})", "", ""], bold_first=True,
         height=est_height(vals, w[:22]))
    wn.cell(row=r, column=11).font = Font(name=F, size=10, bold=True, color=MAGENTA)
    wn.cell(row=r, column=23).alignment = Alignment(horizontal="center", vertical="top")
    for c in (24, 25):
        wn.cell(row=r, column=c).fill = PatternFill("solid", fgColor=EDIT)
zebra(wn, 4, 3 + N, 25)
wn.freeze_panes = "B4"
wn.auto_filter.ref = f"A3:Y{3+N}"

# ---------------------------------------------------------------- SPIN por Nicho
wsp = sheet("SPIN por Nicho")
title(wsp, "SPIN Selling por Nicho: perguntas inteligentes", "Situação → Problema → Implicação → Necessidade de solução. Faça poucas de Situação (pesquise antes) e mais de Implicação.", span=6)
cols = ["Nicho", "S · Situação (contexto, pesquise antes)", "P · Problema (onde dói)", "I · Implicação (quanto custa a dor)", "N · Necessidade (o cliente diz o valor)", "Pergunta nova do gestor"]
w = [26, 45, 45, 45, 45, 35]
header(wsp, 3, cols, w)
for i, nome in enumerate(NICHO_NOMES):
    r = 4 + i
    s, p, im, ne = SPIN[nome]
    body(wsp, r, [nome, s, p, im, ne, ""], bold_first=True, height=est_height([s, p, im, ne], [45] * 4))
    wsp.cell(row=r, column=6).fill = PatternFill("solid", fgColor=EDIT)
zebra(wsp, 4, 3 + N, 5)
wsp.freeze_panes = "B4"

# ---------------------------------------------------------------- Orçamento por Nicho
wo = sheet("Orçamento por Nicho")
title(wo, "Orçar certo por nicho: o que levantar antes da proposta", "Proposta boa nasce de briefing bom. Use na visita técnica e na reunião de descoberta.", span=5)
cols = ["Nicho", "Dados técnicos essenciais", "Qualificação (decisor, orçamento, prazo)", "Armadilhas de orçamento", "Observações do gestor"]
w = [26, 60, 45, 45, 30]
header(wo, 3, cols, w)
for i, nome in enumerate(NICHO_NOMES):
    r = 4 + i
    a, b, c = ORCAMENTO[nome]
    body(wo, r, [nome, a, b, c, ""], bold_first=True, height=est_height([a, b, c], [60, 45, 45]))
    wo.cell(row=r, column=5).fill = PatternFill("solid", fgColor=EDIT)
zebra(wo, 4, 3 + N, 4)
r = 5 + N
wo.cell(row=r, column=1, value="Referência técnica rápida").font = Font(name=F, size=12, bold=True, color=NAVY)
header(wo, r + 1, ["Tema", "Regra prática", "Fonte / validação"], color=NAVY)
for i, (a, b, c) in enumerate(REFERENCIA_TECNICA):
    body(wo, r + 2 + i, [a, b, c], bold_first=True, height=est_height([b, c], [60, 45]))
r = r + 3 + len(REFERENCIA_TECNICA)
wo.cell(row=r, column=1, value="Checklist universal da proposta").font = Font(name=F, size=12, bold=True, color=NAVY)
check = ["Dor do cliente nas palavras dele (da descoberta)", "Decisor e critério de decisão mapeados", "Medidas, distância de visualização e ambiente (indoor/outdoor)",
         "Compra x locação comparadas", "Custo total (painel, estrutura, instalação, conteúdo, manutenção)", "KPIs que o cliente vai medir", "Prova social do mesmo nicho", "Próximo passo com data"]
for i, t in enumerate(check):
    body(wo, r + 1 + i, ["☐", t])
wo.freeze_panes = "B4"

# ---------------------------------------------------------------- Objeções
wob = sheet("Objeções")
title(wob, "Objeções e respostas", "Método: Ouvir → Acolher → Explorar → Responder com prova → Confirmar (detalhes na aba Escuta Ativa). Adicione as respostas que funcionaram em campo.", span=6)
cols = ["Nicho", "Objeção", "Resposta", "Técnica", "Funcionou em campo? (gestor)", "Variação testada"]
w = [26, 38, 70, 24, 18, 40]
header(wob, 3, cols, w)
r = 4
for obj, cat, resp, prova in OBJECOES_COMERCIAL:
    tec = f"{cat} · Leve: {prova}"
    body(wob, r, ["Todos (insight do comercial)", obj, resp, tec, "", ""], bold_first=True, height=est_height([obj, resp, tec], [38, 70, 24]))
    r += 1
for nicho, obj, resp, tec in OBJECOES_GERAIS:
    body(wob, r, [nicho, obj, resp, tec, "", ""], bold_first=True, height=est_height([obj, resp], [38, 70]))
    r += 1
for n in NICHOS:
    body(wob, r, [n["nicho"], n["objecao"], n["resposta"], "Específica do nicho", "", ""], bold_first=True, height=est_height([n["objecao"], n["resposta"]], [38, 70]))
    r += 1
lo = r - 1
for rr in range(4, lo + 15):
    for c in (5, 6):
        wob.cell(row=rr, column=c).fill = PatternFill("solid", fgColor=EDIT)
        wob.cell(row=rr, column=c).border = BORDER
dv_sn = DataValidation(type="list", formula1='"Sim,Parcial,Não"', allow_blank=True)
wob.add_data_validation(dv_sn)
dv_sn.add(f"E4:E{lo+14}")
wob.freeze_panes = "C4"
wob.auto_filter.ref = f"A3:F{lo}"

# ---------------------------------------------------------------- Frases de Efeito
wf = sheet("Frases de Efeito")
title(wf, "Banco de frases de efeito", "Frases curtas, ritmadas e repetíveis. Diga, pause 3 segundos, deixe o silêncio trabalhar.", span=4)
cols = ["Momento / Nicho", "Frase", "Autor", "Nota do time (1 a 5)"]
w = [32, 80, 20, 16]
header(wf, 3, cols, w)
r = 4
for m, t in FRASES_GERAIS:
    body(wf, r, [m, t, "Playbook v1", ""], bold_first=True)
    r += 1
for n in NICHOS:
    body(wf, r, [n["nicho"], n["frase"], "Playbook v1", ""], bold_first=True)
    r += 1
    body(wf, r, [n["nicho"] + " (fechamento)", n["fechamento"], "Playbook v1", ""], bold_first=True)
    r += 1
for rr in range(4, r + 15):
    wf.cell(row=rr, column=4).fill = PatternFill("solid", fgColor=EDIT)
    wf.cell(row=rr, column=4).border = BORDER
dv_nota = DataValidation(type="whole", operator="between", formula1="1", formula2="5", allow_blank=True)
wf.add_data_validation(dv_nota)
dv_nota.add(f"D4:D{r+14}")
wf.freeze_panes = "B4"
wf.auto_filter.ref = f"A3:D{r-1}"

# ---------------------------------------------------------------- Prospecção Outbound
wpo = sheet("Prospecção Outbound")
title(wpo, "Prospecção outbound: cadência e script de ligação", "Objetivo do outbound é AGENDAR uma conversa de descoberta, não vender o painel. Personalize com o gatilho e a dor do nicho.", span=5)
cols = ["Dia", "Canal", "Ação", "Objetivo", "Modelo de mensagem"]
w = [8, 18, 55, 28, 70]
header(wpo, 3, cols, w)
for i, row in enumerate(CADENCIA):
    body(wpo, 4 + i, list(row), bold_first=True, height=est_height(row, w))
r = 5 + len(CADENCIA)
wpo.cell(row=r, column=1, value="Script de cold call (2 a 3 minutos)").font = Font(name=F, size=12, bold=True, color=NAVY)
header(wpo, r + 1, ["Etapa", "", "O que dizer", "Por que funciona", ""], color=NAVY)
for i, (etapa, fala, pq) in enumerate(COLD_CALL):
    rr = r + 2 + i
    body(wpo, rr, [etapa, "", fala, pq, ""], bold_first=True, height=est_height([fala, pq], [55, 28]))
    wpo.merge_cells(start_row=rr, start_column=1, end_row=rr, end_column=2)
r = r + 3 + len(COLD_CALL)
wpo.cell(row=r, column=1, value="Gatilhos de prospecção por nicho (onde procurar o motivo do contato)").font = Font(name=F, size=12, bold=True, color=NAVY)
gat = [
    "Inauguração ou reforma de loja (Instagram, Google Maps, imprensa local)",
    "Lançamento imobiliário ou de veículo (sites de construtoras, montadoras)",
    "Expansão de rede ou franquia (ABF, notícias, vagas abertas)",
    "Participação em feiras do setor (APAS, Abrasel, ExpoPostos, Abrafarma, Expo Cristã)",
    "Troca de liderança de marketing/trade (LinkedIn)",
    "Edital, licitação ou concessão de mobiliário urbano (portais de compras)",
    "Fachada antiga ou impressos desbotados (Street View)",
]
for i, g in enumerate(gat):
    body(wpo, r + 1 + i, ["•", "", g, "", ""])
    wpo.merge_cells(start_row=r + 1 + i, start_column=3, end_row=r + 1 + i, end_column=5)

# ---------------------------------------------------------------- Escuta Ativa
we = sheet("Escuta Ativa")
title(we, "Escuta ativa e tratamento de objeções", "Quem pergunta conduz. Quem escuta entende o que orçar e como fechar.", span=3)
cols = ["Técnica", "Como aplicar", "Exemplo"]
w = [30, 70, 55]
header(we, 3, cols, w)
for i, row in enumerate(ESCUTA_ATIVA):
    body(we, 4 + i, list(row), bold_first=True, height=est_height(row, w))
r = 5 + len(ESCUTA_ATIVA)
we.cell(row=r, column=1, value="Método para converter objeções em avanço").font = Font(name=F, size=12, bold=True, color=NAVY)
header(we, r + 1, ["Passo", "Como fazer", ""], color=NAVY)
for i, (a, b) in enumerate(METODO_OBJECAO):
    body(we, r + 2 + i, [a, b, ""], bold_first=True, height=est_height([b], [70]))

# ---------------------------------------------------------------- Roleplay
wrp = sheet("Roleplay", MAGENTA)
title(wrp, "Roleplay 1: Rede de farmácias", "Um faz o vendedor, outro faz a cliente, um terceiro avalia. Depois troquem os papéis e o nicho.", span=5)
w = [22, 14, 75, 32, 14]
for i, x in enumerate(w, start=1):
    wrp.column_dimensions[get_column_letter(i)].width = x
r = 4
wrp.cell(row=r, column=1, value="Cenário").font = Font(name=F, size=12, bold=True, color=NAVY)
r += 1
for k, v in ROLEPLAY_CENARIO:
    body(wrp, r, [k, "", v, "", ""], bold_first=True, height=est_height([v], [75 + 32]))
    wrp.merge_cells(start_row=r, start_column=1, end_row=r, end_column=2)
    wrp.merge_cells(start_row=r, start_column=3, end_row=r, end_column=5)
    r += 1
r += 1
wrp.cell(row=r, column=1, value="Script de referência (não é para decorar; é para entender a lógica)").font = Font(name=F, size=12, bold=True, color=NAVY)
r += 1
header(wrp, r, ["Etapa", "Quem fala", "Fala", "Técnica usada", ""])
r += 1
for etapa, quem, fala, tec in ROLEPLAY_SCRIPT:
    body(wrp, r, [etapa, quem, fala, tec, ""], bold_first=True, height=est_height([fala, tec], [75, 32]),
         fill=(LILAC if quem == "Cliente" else None))
    r += 1
r += 1
wrp.cell(row=r, column=1, value="Ficha de avaliação (nota de 1 a 5 nas células amarelas)").font = Font(name=F, size=12, bold=True, color=NAVY)
r += 1
header(wrp, r, ["Critério", "", "O que observar", "Comentário do avaliador", "Nota (1-5)"])
r += 1
first = r
for crit, obs in ROLEPLAY_AVALIACAO:
    body(wrp, r, [crit, "", obs, "", None], bold_first=True, height=30)
    wrp.merge_cells(start_row=r, start_column=1, end_row=r, end_column=2)
    for c in (4, 5):
        wrp.cell(row=r, column=c).fill = PatternFill("solid", fgColor=EDIT)
    r += 1
lastc = r - 1
dv_rp = DataValidation(type="whole", operator="between", formula1="1", formula2="5", allow_blank=True)
wrp.add_data_validation(dv_rp)
dv_rp.add(f"E{first}:E{lastc}")
wrp.cell(row=r, column=3, value="Pontuação total (máx. 50)").font = Font(name=F, size=10, bold=True)
wrp.cell(row=r, column=5, value=f"=SUM(E{first}:E{lastc})").font = Font(name=F, size=10, bold=True)
wrp.cell(row=r + 1, column=3, value="Aproveitamento").font = Font(name=F, size=10, bold=True)
wrp.cell(row=r + 1, column=5, value=f'=IF(COUNT(E{first}:E{lastc})=0,"-",SUM(E{first}:E{lastc})/(5*COUNT(E{first}:E{lastc})))')
wrp.cell(row=r + 1, column=5).number_format = "0%"
wrp.cell(row=r + 2, column=3, value="Leitura")
wrp.cell(row=r + 2, column=5, value=f'=IF(COUNT(E{first}:E{lastc})=0,"-",IF(E{r+1}>=0.8,"Pronto para campo",IF(E{r+1}>=0.6,"Treinar 1 rodada","Repetir roleplay")))')
for rr in (r, r + 1, r + 2):
    wrp.cell(row=rr, column=5).alignment = Alignment(horizontal="center")
    wrp.cell(row=rr, column=3).font = Font(name=F, size=10, bold=True)
r += 4
wrp.cell(row=r, column=1, value="Próximos roleplays sugeridos").font = Font(name=F, size=12, bold=True, color=NAVY)
prox = ["Posto de combustível: proprietário que 'só olha preço' (cold call de 3 minutos)",
        "Igreja: pastor + tesoureiro, objeção de aprovação em conselho",
        "Supermercado: diretor de trade cético com retail media",
        "Construtora: compra x locação para stand temporário",
        "Agência de eventos: 'tenho fornecedor mais barato'"]
for i, t in enumerate(prox):
    body(wrp, r + 1 + i, [f"Roleplay {i+2}", "", t, "", ""], bold_first=True)
    wrp.merge_cells(start_row=r + 1 + i, start_column=1, end_row=r + 1 + i, end_column=2)

# ---------------------------------------------------------------- Técnicas
wt = sheet("Técnicas")
title(wt, "Técnicas de storytelling e speech comercial", "Referência rápida. Cada técnica indica em que bloco do Roteiro Mestre ela entra.", span=4)
cols = ["Técnica", "Onde usar", "Como aplicar", "Exemplo LedWave"]
w = [30, 22, 60, 60]
header(wt, 3, cols, w)
for i, row in enumerate(TECNICAS):
    body(wt, 4 + i, list(row), bold_first=True, height=est_height(row, w))
zebra(wt, 4, 3 + len(TECNICAS), 4)

# ---------------------------------------------------------------- Banco de Ideias
wb_ = sheet("Banco de Ideias", MAGENTA)
title(wb_, "Banco de Ideias dos Gestores", "Uma linha por ideia. A linha 5 é um exemplo. Status 'Aprovada' = levar para a matriz Nichos na próxima reunião.", span=10)
cols = ["Data", "Gestor", "Nicho", "Tipo de contribuição", "Ideia (texto pronto para usar)", "Onde usar no roteiro", "Testada com cliente? Resultado", "Status", "Votos do time", "Responsável por migrar"]
w = [12, 18, 26, 22, 60, 26, 34, 20, 10, 20]
header(wb_, 4, cols, w)
from datetime import date
ex = [date(2026, 10, 19), "Exemplo (apagar)", "Farmácias e Drogarias", "Gancho de abertura",
      "Se o seu cliente estivesse com dor de cabeça na esquina da sua farmácia, ele veria a sua loja antes da concorrente?",
      "1. Abertura / Gancho", "Testado em 2 reuniões: gerou conversa sobre fachada", "Em teste em campo", 3, ""]
body(wb_, 5, ex, height=45)
wb_.cell(row=5, column=1).number_format = "DD/MM/YYYY"
for rr in range(5, 306):
    for c in range(1, 11):
        cell = wb_.cell(row=rr, column=c)
        cell.border = BORDER
        cell.alignment = WRAP
        if rr > 5:
            cell.fill = PatternFill("solid", fgColor=EDIT)
            cell.font = Font(name=F, size=10)
    wb_.cell(row=rr, column=1).number_format = "DD/MM/YYYY"
for lst, colL, ref in (("Nichos", "C", "=Listas!$A$2:$A$60"), ("Tipos", "D", "=Listas!$B$2:$B$20"),
                       ("Blocos", "F", "=Listas!$C$2:$C$20"), ("Status", "H", "=Listas!$D$2:$D$10")):
    dv = DataValidation(type="list", formula1=ref, allow_blank=True)
    wb_.add_data_validation(dv)
    dv.add(f"{colL}5:{colL}305")
dv_v = DataValidation(type="whole", operator="greaterThanOrEqual", formula1="0", allow_blank=True)
wb_.add_data_validation(dv_v)
dv_v.add("I5:I305")
wb_.conditional_formatting.add("A5:J305", FormulaRule(formula=['$H5="Aprovada (levar à matriz)"'], fill=PatternFill("solid", fgColor="D7F2DF")))
wb_.conditional_formatting.add("A5:J305", FormulaRule(formula=['$H5="Descartada"'], font=Font(color="999999", strike=True)))
wb_.freeze_panes = "A5"
wb_.auto_filter.ref = "A4:J305"
# resumo
wb_["L4"] = "Resumo"
wb_["L4"].font = Font(name=F, size=11, bold=True, color=NAVY)
wb_.column_dimensions["L"].width = 26
wb_.column_dimensions["M"].width = 10
for i, s in enumerate(STATUS_IDEIA):
    wb_.cell(row=5 + i, column=12, value=s).font = Font(name=F, size=10)
    wb_.cell(row=5 + i, column=13, value=f'=COUNTIF($H$5:$H$305,L{5+i})').font = Font(name=F, size=10)
wb_.cell(row=6 + len(STATUS_IDEIA), column=12, value="Total de ideias").font = Font(name=F, size=10, bold=True)
wb_.cell(row=6 + len(STATUS_IDEIA), column=13, value='=COUNTA($E$5:$E$305)').font = Font(name=F, size=10, bold=True)

# ---------------------------------------------------------------- Listas
wl = sheet("Listas", "999999")
for i, h in enumerate(["Nichos", "Tipos de contribuição", "Blocos do roteiro", "Status"], start=1):
    c = wl.cell(row=1, column=i, value=h)
    c.font = Font(name=F, size=10, bold=True, color=WHITE)
    c.fill = PatternFill("solid", fgColor=NAVY)
    wl.column_dimensions[get_column_letter(i)].width = 34
for i in range(59):
    src = 4 + i
    wl.cell(row=2 + i, column=1, value=f'=IF(Nichos!A{src}="","",Nichos!A{src})')
for i, t in enumerate(TIPOS_IDEIA):
    wl.cell(row=2 + i, column=2, value=t)
for i, t in enumerate(BLOCOS):
    wl.cell(row=2 + i, column=3, value=t)
for i, t in enumerate(STATUS_IDEIA):
    wl.cell(row=2 + i, column=4, value=t)
for row in wl.iter_rows(min_row=2, max_row=60, max_col=4):
    for c in row:
        c.font = Font(name=F, size=10)

for ws_ in wb.worksheets:
    ws_.sheet_view.zoomScale = 90
wb.active = 0
wb.save(OUT)
print("ok", OUT)
