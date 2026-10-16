"""Análises curtas automáticas (regras simples sobre os números do mês)."""
from dados import div, fbrl, fbrl_curto, fdec, fint, fpct, fvar, nome_mes, somar_mes, var


def _vs(atual, anterior, mes_ant):
    v = var(atual, anterior)
    return f" ({fvar(v)} vs {nome_mes(mes_ant, abrev=True)})" if v is not None else ""


def nps_zona(n):
    if n is None:
        return "—"
    if n >= 75:
        return "Excelência"
    if n >= 50:
        return "Qualidade"
    if n >= 0:
        return "Aperfeiçoamento"
    return "Crítica"


def fnps(n):
    if n is None:
        return "—"
    s = fint(n) if abs(n - round(n)) < 0.05 else fdec(n, 1)
    return ("+" if n > 0 else "") + s


def calc_nps(p, pa, d):
    tot = (p or 0) + (pa or 0) + (d or 0)
    if not tot:
        return None
    return ((p or 0) - (d or 0)) / tot * 100


class Analises:
    def __init__(self, d):
        self.d = d
        self.ref = d.ref
        self.ant = somar_mes(d.ref, -1)
        self.m = nome_mes(d.ref)
        self.ma = nome_mes(self.ant)

    def get(self, chave, *args):
        manual = self.d.analise_manual(chave)
        if manual:
            return manual
        f = getattr(self, chave, None)
        if f is None and chave.startswith("nps_"):  # nps_relatorio / nps_projetos / nps_sac
            f = self.nps
        try:
            return f(*args) if f else ""
        except Exception as e:  # análise nunca deve travar a geração
            print(f"[aviso] análise '{chave}' não gerada: {e}")
            return ""

    # ---------- Digital ----------
    def digital_fechados(self, receita_ano, roas):
        d = self.d
        v = d.valor("Digital", self.ref, "valor_fechado")
        va = d.valor("Digital", self.ant, "valor_fechado")
        meses = [m for m in d.meses_ano() if (d.valor("Digital", m, "valor_fechado") or 0) > 0]
        media = div(receita_ano, len(meses))
        pos = ""
        if media and v is not None:
            pos = f", {'acima' if v >= media else 'abaixo'} da média mensal do ano ({fbrl_curto(media)})"
        return (f"{self.m.capitalize()}: {fbrl(v)} em negócios fechados via Digital{_vs(v, va, self.ant)}{pos}. "
                f"Acumulado do ano: {fbrl_curto(receita_ano)} com ROAS de {roas}.")

    def _pipeline(self, origem, rotulo):
        rs = self.d.linhas("Pipeline", self.ref, origem=origem)
        from dados import num
        vals = [(r["fase"], num(r["valor"]) or 0) for r in rs]
        tot = sum(v for _, v in vals)
        if not tot:
            return ""
        fase, v = max(vals, key=lambda x: x[1])
        ant = self.d.valor("Pipeline", self.ant, "valor", origem=origem)
        return (f"{fbrl(tot)} em oportunidades {rotulo}{_vs(tot, ant, self.ant)}; "
                f"{fase} concentra {fpct(v / tot * 100, 0)} do valor.")

    def digital_pipeline(self):
        return self._pipeline("Digital", "de Digital")

    def pipeline_eventos(self):
        return self._pipeline("Eventos", "de Eventos")

    def pipeline_varejo(self):
        return self._pipeline("Varejo", "de Varejo")

    def digital_leads(self):
        d = self.d
        l, la = d.valor("Digital", self.ref, "leads"), d.valor("Digital", self.ant, "leads")
        i, ia = d.valor("Digital", self.ref, "investimento"), d.valor("Digital", self.ant, "investimento")
        cpl, cpla = div(i, l), div(ia, la)
        serie = [(m, d.valor("Digital", m, "leads")) for m in d.meses_ano()]
        serie = [(m, v) for m, v in serie if v]
        txt = f"{fint(l)} leads em {self.m}{_vs(l, la, self.ant)}"
        if cpl:
            txt += f"; custo por lead de {fbrl(cpl)}{_vs(cpl, cpla, self.ant)}"
        if serie:
            mm, mv = max(serie, key=lambda x: x[1])
            txt += f". Pico do ano: {nome_mes(mm)} ({fint(mv)})"
        return txt + "."

    def digital_resumo(self):
        d = self.d
        g = lambda m, c: d.valor("Digital", m, c)
        vl = div(g(self.ref, "leads"), g(self.ref, "visitas"))
        lq = div(g(self.ref, "leads_qualificados"), g(self.ref, "leads"))
        lqa = div(g(self.ant, "leads_qualificados"), g(self.ant, "leads"))
        vt = div(g(self.ref, "negocios_fechados"), g(self.ref, "leads"))
        partes = []
        if vl is not None:
            partes.append(f"visitas → leads em {fpct(vl * 100)}")
        if lq is not None:
            pp = f" ({'+' if lq >= lqa else '−'}{fdec(abs(lq - lqa) * 100, 1)} p.p. vs {nome_mes(self.ant, abrev=True)})" if lqa is not None else ""
            partes.append(f"leads → qualificados em {fpct(lq * 100)}{pp}")
        txt = "Conversão " + " e ".join(partes) + "." if partes else ""
        n = g(self.ref, "negocios_fechados")
        if n is not None:
            txt += f" {fint(n)} negócios fechados ({fpct((vt or 0) * 100)} dos leads)."
        return txt.strip()

    def digital_status(self):
        from dados import num
        rs = [(r["status"], num(r["quantidade"]) or 0) for r in self.d.linhas("Leads_Status", self.ref)]
        tot = sum(v for _, v in rs)
        if not tot:
            return ""
        txt = []
        for alvo in ("convertido", "não qualificado"):
            v = sum(q for s, q in rs if str(s).strip().lower() == alvo)
            if v:
                txt.append(f"{fint(v)} {alvo}{'s' if v != 1 else ''} ({fpct(v / tot * 100, 1)})")
        sdr = [(r["sdr"], num(r["leads"]) or 0) for r in self.d.linhas("Leads_SDR", self.ref)]
        out = f"{fint(tot)} leads no mês: " + " e ".join(txt) + "." if txt else ""
        if sdr:
            n, v = max(sdr, key=lambda x: x[1])
            out += f" SDR com mais leads: {n} ({fint(v)})."
        return out.strip()

    # ---------- Eventos / Varejo ----------
    def eventos(self):
        from dados import num
        rs = self.d.linhas("Eventos", self.ref)
        com = [(r["evento"], num(r.get("leads_total")) or 0, num(r.get("leads_novos")) or 0) for r in rs
               if num(r.get("leads_total"))]
        txt = f"{len(rs)} {'eventos' if len(rs) != 1 else 'evento'} em {self.m}"
        if com:
            t, n = sum(c[1] for c in com), sum(c[2] for c in com)
            top = max(com, key=lambda c: c[1])
            txt += (f"; {fint(t)} leads captados, {fint(n)} novos na base ({fpct(div(n, t) * 100, 0)}). "
                    f"Destaque: {top[0]} ({fint(top[1])} leads)")
        return txt + "."

    def varejo_fechados(self, ytd):
        d = self.d
        v, va = d.valor("Receita", self.ref, "varejo"), d.valor("Receita", self.ant, "varejo")
        serie = [(m, d.valor("Receita", m, "varejo") or 0) for m in d.meses_ano()]
        mm, mv = max(serie, key=lambda x: x[1])
        return (f"Varejo fechou {fbrl_curto(v)} em {self.m}{_vs(v, va, self.ant)}; "
                f"{fbrl_curto(ytd)} no ano. Melhor mês: {nome_mes(mm)} ({fbrl_curto(mv)}).")

    def eventos_varejo(self, total, invest, roas):
        r = div(total, invest)
        if not r:
            return ""
        return (f"ROAS total de {roas}: cada R$ 1 investido em eventos retornou {fbrl(r)} "
                f"em receita atribuída (eventos + 70% do varejo).")

    # ---------- Redes ----------
    def redes(self, campo, meses, rotulo):
        from dados import num
        cur = {r["rede"]: num(r.get(campo)) or 0 for r in self.d.linhas("Redes", meses[-1])}
        prev = {r["rede"]: num(r.get(campo)) or 0 for r in self.d.linhas("Redes", meses[-2])}
        tot, tp = sum(cur.values()), sum(prev.values())
        if not tot:
            return "", ""
        lider = max(cur, key=cur.get)
        a, b = nome_mes(meses[-2], abrev=True).capitalize(), nome_mes(meses[-1], abrev=True).capitalize()
        caixa = f"{a} → {b}: {fvar(var(tot, tp))} no total; {lider} {fvar(var(cur[lider], prev.get(lider)))}"
        quedas = [(r, var(v, prev.get(r))) for r, v in cur.items() if var(v, prev.get(r)) is not None]
        quedas = [q for q in quedas if q[1] < 0]
        txt = f"{lider} responde por {fpct(cur[lider] / tot * 100, 0)} {rotulo} do mês."
        if quedas:
            r, v = min(quedas, key=lambda q: q[1])
            txt += f" Atenção a {r} ({fvar(v)} vs {a.lower()})."
        else:
            txt += f" Todas as redes cresceram vs {a.lower()}."
        return caixa, txt

    def concorrencia(self):
        from dados import num
        rs = [(r["conta"], num(r.get("novos_seguidores")) or 0, num(r.get("publicacoes")) or 0)
              for r in self.d.linhas("Concorrencia", self.ref)]
        nos = [r for r in rs if "ledwave" in str(r[0]).lower()]
        if not nos or len(rs) < 2:
            return ""
        nos = nos[0]
        pos = sorted(rs, key=lambda r: -r[1]).index(nos) + 1
        outros = [r[2] for r in rs if r is not nos]
        return (f"LedWave ganhou {fint(nos[1])} seguidores — {pos}º lugar entre {len(rs)} contas em crescimento. "
                f"Publicamos {fint(nos[2])} conteúdos (média dos concorrentes: {fint(sum(outros) / len(outros))}).")

    def pr(self):
        d = self.d
        n, e = d.valor("PR", self.ref, "materias"), d.valor("PR", self.ref, "earned_media")
        na, ea = d.valor("PR", self.ant, "materias"), d.valor("PR", self.ant, "earned_media")
        return f"{fint(n)} matérias{_vs(n, na, self.ant)} e {fbrl(e)} em earned media{_vs(e, ea, self.ant)}."

    # ---------- NPS ----------
    def nps(self, area, p, pa, dt, env):
        n = calc_nps(p, pa, dt)
        resp = (p or 0) + (pa or 0) + (dt or 0)
        if n is None:
            return "Sem respostas no mês."
        taxa = div(resp, env)
        txt = f"NPS {fnps(n)} (zona de {nps_zona(n)}) com {fint(resp)} {'respostas' if resp != 1 else 'resposta'}"
        if taxa is not None:
            txt += f" — taxa de resposta de {fpct(taxa * 100, 1)}"
        txt += "."
        if resp < 5:
            txt += " Amostra pequena: ler o resultado com cautela."
        elif taxa is not None and taxa < 0.3:
            txt += " Vale reforçar o follow-up para ampliar as respostas."
        return txt

    def nps_pontos(self, linhas):
        if not linhas:
            return ""
        pior = min(linhas, key=lambda l: l[1] if l[1] is not None else 999)
        exc = sum(1 for _, n in linhas if n is not None and n >= 75)
        return (f"{exc} de {len(linhas)} pontos de contato na zona de excelência; "
                f"menor NPS em {pior[0]} ({fnps(pior[1])}).")
