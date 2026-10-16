"""Gráficos no estilo visual do AGM (Poppins, roxo/ciano/magenta, rótulos sobre as barras)."""
import os
import re
import urllib.request

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
from matplotlib import font_manager  # noqa: E402
from matplotlib.transforms import blended_transform_factory  # noqa: E402

ROXO, CIANO, MAGENTA = "#7D7BFF", "#00E1F0", "#E100FF"
TEXTO, CINZA, LINHA = "#1F1F1F", "#6B6B6B", "#DDDDDD"
EMU_POR_POL = 914400
PASTA_FONTES = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fontes")


def _baixar_poppins():
    os.makedirs(PASTA_FONTES, exist_ok=True)
    for peso in (400, 500, 600, 700):
        destino = os.path.join(PASTA_FONTES, f"Poppins-{peso}.ttf")
        if os.path.exists(destino):
            continue
        css = urllib.request.urlopen(
            f"https://fonts.googleapis.com/css2?family=Poppins:wght@{peso}", timeout=30).read().decode()
        url = re.search(r"https://[^)]+\.ttf", css)[0]
        urllib.request.urlretrieve(url, destino)


def preparar_fontes():
    if not any("Poppins" in f.name for f in font_manager.fontManager.ttflist):
        try:
            _baixar_poppins()
        except Exception as e:  # sem rede: segue com a fonte padrão
            print(f"[aviso] não foi possível baixar a fonte Poppins ({e}); usando fonte padrão.")
        if os.path.isdir(PASTA_FONTES):
            for f in os.listdir(PASTA_FONTES):
                font_manager.fontManager.addfont(os.path.join(PASTA_FONTES, f))
    plt.rcParams["font.family"] = ["Poppins", "DejaVu Sans"]
    plt.rcParams["text.color"] = TEXTO


def _figura(w_emu, h_emu):
    fig = plt.figure(figsize=(w_emu / EMU_POR_POL, h_emu / EMU_POR_POL), dpi=180)
    fig.patch.set_alpha(0)
    return fig


def _limpar(ax, base=True):
    for lado in ("top", "right", "left"):
        ax.spines[lado].set_visible(False)
    ax.spines["bottom"].set_visible(base)
    ax.spines["bottom"].set_color(LINHA)
    ax.spines["bottom"].set_linewidth(1.5)
    ax.set_yticks([])
    ax.tick_params(axis="x", length=0, pad=10, labelsize=22)
    ax.set_facecolor("none")


def _salvar(fig, caminho):
    fig.savefig(caminho, transparent=True)
    plt.close(fig)
    return caminho


def barras(caminho, cats, vals, w, h, cor=ROXO, fmt=str, rotulo=20, eixo=22):
    fig = _figura(w, h)
    ax = fig.add_axes([0.005, 0.12, 0.99, 0.86])
    vals = [v or 0 for v in vals]
    ax.bar(range(len(cats)), vals, width=0.62, color=cor)
    topo = max(vals + [1])
    for i, v in enumerate(vals):
        ax.text(i, v + topo * 0.025, fmt(v), ha="center", va="bottom", fontsize=rotulo, fontfamily=["Poppins Medium", "Poppins", "DejaVu Sans"])
    ax.set_xticks(range(len(cats)), cats)
    ax.set_xlim(-0.6, len(cats) - 0.4)
    ax.set_ylim(0, topo * 1.13)
    _limpar(ax)
    ax.tick_params(axis="x", labelsize=eixo)
    return _salvar(fig, caminho)


def barras_h(caminho, cats, vals, w, h, cor=ROXO, fmt=str, n_min=4):
    """Barras horizontais (pipeline / status). Mantém altura de barra para até `n_min` itens."""
    fig = _figura(w, h)
    n = max(len(cats), n_min)
    esq = max(len(str(c)) for c in cats + [""]) * 11.5 / 72 / (w / EMU_POR_POL) + 0.035
    ax = fig.add_axes([esq, 0.02, 0.99 - esq, 0.96])
    vals = [v or 0 for v in vals]
    ax.barh(range(len(cats)), vals, height=0.6, color=cor)
    topo = max(vals + [1])
    for i, v in enumerate(vals):
        ax.text(v + topo * 0.012, i, fmt(v), va="center", fontsize=20, fontfamily=["Poppins Medium", "Poppins", "DejaVu Sans"])
    ax.set_yticks(range(len(cats)), cats, fontsize=20)
    ax.set_ylim(n - 0.5, -0.5)
    ax.set_xlim(0, topo * 1.45)
    for lado in ("top", "right", "bottom"):
        ax.spines[lado].set_visible(False)
    ax.spines["left"].set_color(LINHA)
    ax.set_xticks([])
    ax.tick_params(axis="y", length=0, pad=10)
    ax.set_facecolor("none")
    return _salvar(fig, caminho)


def linha(caminho, cats, vals, w, h, cor=MAGENTA, fmt=str, linha_extra=None):
    """Linha com marcadores; `linha_extra` = (rótulo, [textos]) desenhada abaixo do eixo."""
    fig = _figura(w, h)
    base = 0.27 if linha_extra else 0.12
    ax = fig.add_axes([0.005, base, 0.99, 0.97 - base])
    xs = list(range(len(cats)))
    pts = [(x, v) for x, v in zip(xs, vals) if v is not None]
    ax.plot([p[0] for p in pts], [p[1] for p in pts], color=cor, lw=4, marker="o", ms=11, zorder=3)
    topo = max([v for _, v in pts] + [1])
    piso = min([v for _, v in pts] + [0])
    for x, v in pts:
        ax.annotate(fmt(v), (x, v), xytext=(0, 14), textcoords="offset points", ha="center",
                    fontsize=22, fontweight="bold")
    ax.set_xticks(xs, cats)
    ax.set_xlim(-0.5, len(cats) - 0.5)
    ax.set_ylim(max(0, piso - (topo - piso) * 0.6), topo + (topo - piso) * 0.18)
    _limpar(ax)
    if linha_extra:
        rot, textos = linha_extra
        tr = blended_transform_factory(ax.transData, fig.transFigure)
        fig.text(0.012, 0.105, rot, fontsize=15, color=CINZA, va="bottom")
        for x, t in zip(xs, textos):
            ax.text(x, 0.035, t, transform=tr, ha="center", fontsize=19, color=CINZA)
    return _salvar(fig, caminho)


def agrupado(caminho, cats, series, w, h, fmt=str):
    """series = [(nome, valores, cor), ...]"""
    fig = _figura(w, h)
    ax = fig.add_axes([0.005, 0.1, 0.99, 0.8])
    k = len(series)
    larg = 0.8 / k
    topo = max([v or 0 for _, vs, _ in series for v in vs] + [1])
    for j, (nome, vs, cor) in enumerate(series):
        xs = [i - 0.4 + larg * (j + 0.5) for i in range(len(cats))]
        ax.bar(xs, [v or 0 for v in vs], width=larg, color=cor, label=nome)
        for x, v in zip(xs, vs):
            ax.text(x, (v or 0) + topo * 0.02, fmt(v or 0), ha="center", va="bottom", fontsize=14)
    ax.set_xticks(range(len(cats)), cats)
    ax.set_xlim(-0.55, len(cats) - 0.45)
    ax.set_ylim(0, topo * 1.08)
    _limpar(ax)
    fig.legend(loc="upper center", ncol=k, frameon=False, fontsize=22, handlelength=1.2,
               handleheight=0.9, columnspacing=2.2, bbox_to_anchor=(0.5, 1.0))
    return _salvar(fig, caminho)
