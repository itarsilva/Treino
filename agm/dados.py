"""Leitura da planilha de dados e formatação de números em pt-BR."""
import datetime as dt
import re
import unicodedata

from openpyxl import load_workbook

from esquema import ABAS

MESES = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho",
         "agosto", "setembro", "outubro", "novembro", "dezembro"]
ABREV = [m[:3] for m in MESES]


def _sem_acento(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn").lower()


def norm_mes(v):
    """Converte '2026-09', '09/2026', 'set/2026', datas etc. em 'AAAA-MM' (ou None)."""
    if v is None or v == "":
        return None
    if isinstance(v, (dt.date, dt.datetime)):
        return f"{v.year:04d}-{v.month:02d}"
    s = _sem_acento(str(v).strip())
    m = re.fullmatch(r"(\d{4})[-/.](\d{1,2})(?:[-/.]\d{1,2})?(?: .*)?", s)
    if m:
        return f"{int(m[1]):04d}-{int(m[2]):02d}"
    m = re.fullmatch(r"(\d{1,2})[-/.](\d{4})", s)
    if m:
        return f"{int(m[2]):04d}-{int(m[1]):02d}"
    m = re.fullmatch(r"([a-z]{3})[a-z]*[-/. ]*(\d{2,4})", s)
    if m and m[1] in [_sem_acento(a) for a in ABREV]:
        ano = int(m[2]) + (2000 if len(m[2]) == 2 else 0)
        return f"{ano:04d}-{[_sem_acento(a) for a in ABREV].index(m[1]) + 1:02d}"
    return None


def num(v):
    """Converte células em número (aceita '15.623,49', 'R$ 1.000', '6,8%')."""
    if v is None or v == "":
        return None
    if isinstance(v, (int, float)):
        return v
    s = str(v).replace("R$", "").replace("%", "").replace(" ", "").strip()
    if not s or s in "-—":
        return None
    if "," in s:
        s = s.replace(".", "").replace(",", ".")
    try:
        return float(s)
    except ValueError:
        return None


def somar_mes(mes, n):
    a, m = map(int, mes.split("-"))
    t = a * 12 + (m - 1) + n
    return f"{t // 12:04d}-{t % 12 + 1:02d}"


def nome_mes(mes, abrev=False, cap=False):
    i = int(mes.split("-")[1]) - 1
    s = ABREV[i] if abrev else MESES[i]
    return s.capitalize() if cap else s


class Dados:
    def __init__(self, caminho):
        wb = load_workbook(caminho, data_only=True)
        self.abas = {}
        for aba, colunas in ABAS.items():
            self.abas[aba] = self._ler(wb, aba, [c for c, _ in colunas])
        cfg = {str(r["chave"]).strip(): r["valor"] for r in self.abas.pop("Config") if r.get("chave")}
        self.config = cfg
        self.ref = norm_mes(cfg.get("mes_referencia"))
        if not self.ref:
            raise SystemExit("Config.mes_referencia vazio ou inválido (use AAAA-MM).")
        self.parcial_ate = str(cfg.get("parcial_ate") or "").strip()
        self.parcial = somar_mes(self.ref, 1) if self.parcial_ate else None

    @staticmethod
    def _ler(wb, aba, colunas):
        if aba not in wb.sheetnames:
            return []
        ws = wb[aba]
        linhas = list(ws.iter_rows(values_only=True))
        if not linhas:
            return []
        cab = [str(c).strip() if c is not None else "" for c in linhas[0]]
        idx = {c: cab.index(c) for c in colunas if c in cab}
        out = []
        for row in linhas[1:]:
            r = {c: (row[i] if i < len(row) else None) for c, i in idx.items()}
            if all(v in (None, "") for v in r.values()):
                continue
            if "mes" in r:
                r["mes"] = norm_mes(r["mes"])
                if not r["mes"]:  # linha de descrição ou mês inválido
                    continue
            out.append(r)
        return out

    def linhas(self, aba, mes=None, **filtros):
        out = []
        for r in self.abas.get(aba, []):
            if mes and r.get("mes") != mes:
                continue
            if any(_sem_acento(str(r.get(k) or "")) != _sem_acento(v) for k, v in filtros.items()):
                continue
            out.append(r)
        return out

    def valor(self, aba, mes, campo, **filtros):
        """Soma de um campo numérico no mês (None se não houver dado)."""
        vals = [num(r.get(campo)) for r in self.linhas(aba, mes, **filtros)]
        vals = [v for v in vals if v is not None]
        return sum(vals) if vals else None

    def meses_ano(self, ate=None):
        ate = ate or self.ref
        ano = ate.split("-")[0]
        return [f"{ano}-{m:02d}" for m in range(1, int(ate.split("-")[1]) + 1)]

    def textos(self, secao, mes=None):
        rs = self.linhas("Textos", mes or self.ref, secao=secao)
        return sorted(rs, key=lambda r: num(r.get("ordem")) or 0)

    def analise_manual(self, chave):
        for r in self.textos("analise"):
            if _sem_acento(str(r.get("titulo") or "")) == chave and r.get("texto"):
                return str(r["texto"])
        return None


# ---------- formatação pt-BR ----------

def _milhar(s):
    return s.replace(",", "X").replace(".", ",").replace("X", ".")


def fint(v):
    return "—" if v is None else _milhar(f"{round(v):,.0f}")


def fdec(v, casas=1):
    return "—" if v is None else _milhar(f"{v:,.{casas}f}")


def fbrl(v):
    return "—" if v is None else "R$ " + _milhar(f"{v:,.2f}")


def fpct(v, casas=2):
    return "—" if v is None else _milhar(f"{v:,.{casas}f}") + "%"


def fvar(v, casas=1):
    """Variação percentual com sinal: +12,3% / −4,0%."""
    if v is None:
        return "—"
    s = _milhar(f"{abs(v):,.{casas}f}")
    return ("+" if v >= 0 else "−") + s + "%"


def fbrl_curto(v, prefixo="R$ ", casas_mi=2):
    if v is None:
        return "—"
    if abs(v) >= 1e6:
        return f"{prefixo}{fdec(v / 1e6, casas_mi)} mi"
    if abs(v) >= 1e3:
        return f"{prefixo}{fdec(v / 1e3, 1)} mil"
    return f"{prefixo}{fint(v)}"


def fmil(v):
    """24.500 → '24,5 mil'; 591 → '591'."""
    if v is None:
        return "—"
    return f"{fdec(v / 1e3, 1)} mil" if abs(v) >= 1000 else fint(v)


def var(atual, anterior):
    if atual is None or not anterior:
        return None
    return (atual / anterior - 1) * 100


def div(a, b):
    if a is None or not b:
        return None
    return a / b
