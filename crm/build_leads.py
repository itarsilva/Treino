"""Consolida exportações do RD Station (conversões) em crm/leads.json.
Uso: python3 crm/build_leads.py <rótulo>=<arquivo.csv> ...
Um lead = um e-mail. Cada arquivo vira uma "lista" (evento/planilha)."""
import csv, io, json, re, sys, unicodedata
csv.field_size_limit(10**9)

def load(path):
    b = open(path, 'rb').read()
    if b[:2] in (b'\xff\xfe', b'\xfe\xff'):
        t = b.decode('utf-16')
    else:
        try: t = b.decode('utf-8-sig')
        except UnicodeDecodeError: t = b.decode('cp1252')
    first = t.split('\n', 1)[0]
    d = '\t' if first.count('\t') > first.count(',') else (';' if first.count(';') > first.count(',') else ',')
    rows = list(csv.reader(io.StringIO(t), delimiter=d))
    h = rows[0]
    out = []
    for r in rows[1:]:
        if not any(c.strip() for c in r): continue
        rec = {}
        for i, k in enumerate(h):
            v = r[i].strip() if i < len(r) else ''
            if v and not rec.get(k): rec[k] = v
        out.append(rec)
    return out

# Exportações antigas do RD trazem acentos corrompidos (Mac Roman lido como Latin-1)
MOJI = {'Ì': 'í', 'Í': 'ê', 'Á': 'ç', 'È': 'é', '·': 'á', '¥': "'"}

def fix(s):
    s = unicodedata.normalize('NFC', s or '').replace('\u00a0', ' ').replace('Õndio', 'Índio')
    s = re.sub(r'(?<=[a-zà-ü])[ÌÍÁÈ·¥]', lambda m: MOJI[m.group()], s)
    return re.sub(r'\s+', ' ', s).strip()

DDD_UF = {}
for uf, ddds in {'SP': '11 12 13 14 15 16 17 18 19', 'RJ': '21 22 24', 'ES': '27 28', 'MG': '31 32 33 34 35 37 38',
                 'PR': '41 42 43 44 45 46', 'SC': '47 48 49', 'RS': '51 53 54 55', 'DF': '61', 'GO': '62 64',
                 'TO': '63', 'MT': '65 66', 'MS': '67', 'AC': '68', 'RO': '69', 'BA': '71 73 74 75 77', 'SE': '79',
                 'PE': '81 87', 'AL': '82', 'PB': '83', 'RN': '84', 'CE': '85 88', 'PI': '86 89', 'PA': '91 93 94',
                 'AM': '92 97', 'RR': '95', 'AP': '96', 'MA': '98 99'}.items():
    for d in ddds.split(): DDD_UF[d] = uf

def nice_name(s):
    s = fix(s)
    if s and (s.isupper() or s.islower()):
        small = {'de', 'da', 'do', 'das', 'dos', 'e'}
        s = ' '.join(w if w.lower() in small and i else w.capitalize() for i, w in enumerate(s.lower().split()))
    return s

def phone(s):
    d = re.sub(r'\D', '', s or '')
    if not d: return ''
    if d.startswith('55') and len(d) >= 12: d = d[2:]
    if len(d) == 11: return f'({d[:2]}) {d[2:7]}-{d[7:]}'
    if len(d) == 10: return f'({d[:2]}) {d[2:6]}-{d[6:]}'
    return s.strip()

# Nome amigável para cada identificador de conversão do RD (eventos e canais do site)
EVENTOS = {
    'LISTApas20226 - coletor': 'APAS Show 2026', 'apas-show-2026-executivos': 'APAS Show 2026',
    'apas-2026-agendamento': 'APAS Show 2026', 'APAS Show 2025': 'APAS Show 2025', 'apas show 2024': 'APAS Show 2024',
    'evento-apas-2023': 'APAS Show 2023', 'Leads Coletor APAS 2023': 'APAS Show 2023',
    'LEADSABF2026': 'ABF Franchising Expo 2026', 'Leads ABF 2025': 'ABF Franchising Expo 2025',
    'Leads ABF Expo 2024': 'ABF Franchising Expo 2024', 'Leads - Lista Geral ABF CON 2025': 'Convenção ABF 2025',
    'Leads Convenção da ABF 2025': 'Convenção ABF 2025',
    'Trade Connection 2025': 'Trade Connection 2025', 'leads trade connection 2024-2': 'Trade Connection 2024',
    'Leads Trade Connection 2024': 'Trade Connection 2024',
    'Cópia de Mailing - Varejos presentes _ Trade Connection 2026': 'Trade Connection 2026',
    '(TradeCo)report leads_Rd': 'Trade Connection 2026',
    'Cópia de Lista varejistas presentes - 7º Fórum Rio de Janeiro - Varejistas presentes': '7º Fórum SA+ Rio de Janeiro',
    'Leads Fórum SA RJ': 'Fórum SA Rio de Janeiro',
    '15º Fórum Nacional de Integração Varejo e Indústria - SA+ Trade': '15º Fórum Nacional SA+',
    'Forum Nacional SA 14 2025': '14º Fórum Nacional SA+', 'Leads 13º Fórum Nacional SA': '13º Fórum Nacional SA',
    'Leads Fórum Nacional SA+ 2024': 'Fórum Nacional SA+ 2024',
    '7º Fórum Paulista de Integração Varejo e Indústria': '7º Fórum Paulista SA+', 'Leads 6º Fórum Paulista': '6º Fórum Paulista SA',
    'Leads 7º Fórum Cearense SA+': '7º Fórum Cearense SA+', 'LEADS 6º Fórum Cearense SA': '6º Fórum Cearense SA',
    'Leads VI Fórum Mineiro 2024': '6º Fórum Mineiro SA', 'Leads 7º Fórum Mineiro SA+': '7º Fórum Mineiro SA+',
    'Leads IV Fórum Catarinense': '4º Fórum Catarinense SA', '5º Fórum Catarinense SA+': '5º Fórum Catarinense SA+',
    'Leads 6º Fórum Paranaense': '6º Fórum Paranaense SA', '6º Fórum Gaúcho SA+': '6º Fórum Gaúcho SA+',
    'Leads Fórum Gaúcho SA': 'Fórum Gaúcho SA', 'Leads 13º Fórum Baiano': '13º Fórum Baiano SA',
    'Leads II Fórum Goiano SA': '2º Fórum Goiano SA', 'Leads Workshop SA Campinas': 'Workshop SA Campinas',
    'Leads Workshop SA Minas Gerais': 'Workshop SA Minas Gerais',
    'Leads Academia Experience 2026': 'Academia Experience 2026', 'Academia Experience 2025': 'Academia Experience 2025',
    'Leads Abradilan 2024': 'Abradilan 2024', 'import-latam-2023': 'Latam Retail Show 2023',
    'Visitantes - LATAM Retail Show 2022': 'Latam Retail Show 2022', 'nrf-2026': 'NRF 2026',
    'Lista OOH Summit 2026': 'OOH Summit 2026', 'Leads RDFÓRUM 2025': 'RD Fórum 2025',
}
SITE = re.compile(r'botao-whatsapp|formul|digitalize|octadesk|webinar|novo-formulario|midia-chefe', re.I)

def evento(ident):
    if ident in EVENTOS: return EVENTOS[ident]
    if 'Fórum Rio de Janeiro' in ident: return '7º Fórum SA+ Rio de Janeiro'
    if 'Trade Connection 2026' in ident: return 'Trade Connection 2026'
    if SITE.search(ident): return 'Site / WhatsApp (inbound)'
    # nome desconhecido: tira prefixos de planilha ("Cópia de", "Lista", "Leads"...) e fica só o evento
    return re.sub(r'^(c[óo]pia de |lista |leads? |mailing |- )+', '', ident, flags=re.I).strip() or ident

def lead_id(email):
    return re.sub(r'[^A-Za-z0-9_\-.~:@+]', '_', email)[:180]

SENIOR = re.compile(r'diretor|diretora|ceo|presidente|propriet|s[óo]ci|owner|fundador|dono|head|vp|vice', re.I)
MID = re.compile(r'gerente|coordenador|supervisor|manager|marketing|trade|compras|comprador|expans', re.I)
VAREJO = re.compile(r'supermerc|mercado|atacad|varej|hiper|drogaria|farm[aá]cia|posto|loja|rede|super ', re.I)

leads = {}
for arg in sys.argv[1:]:
    label, path = arg.split('=', 1)
    for r in load(path):
        email = fix(r.get('Email', '')).lower()
        if '@' not in email or email.endswith('@ledwave.com.br'): continue
        L = leads.setdefault(email, {'id': lead_id(email), 'email': email, 'listas': [], 'ev': [], '_d': {}})
        if label not in L['listas']: L['listas'].append(label)
        date = r.get('Data da Conversão', '')[:10]
        ev = (date, evento(fix(r.get('Identificador', ''))))
        same = [e for e in L['ev'] if e[1] == ev[1]]
        if not same: L['ev'].append(list(ev))
        elif ev[0] > same[0][0]: same[0][0] = ev[0]
        fields = {
            'nome': nice_name(r.get('Nome', '')),
            'cargo': fix(r.get('Cargo', '')),
            'empresa': fix(r.get('Empresa') or r.get('Nome da Empresa') or ''),
            'fone': phone(r.get('Celular') or r.get('Celular (WhatsApp)') or r.get('Telefone') or ''),
            'cidade': fix(r.get('Cidade', '')),
            'uf': fix(r.get('Estado', '')).upper()[:2],
            'cnpj': fix(r.get('CNPJ / CPF', '')),
            'porte': fix(r.get('Tamanho da Empresa', '')),
            'perfil': fix(r.get('Observações', '')) if label.startswith('APAS') else '',
            'execEvento': fix(r.get('ABF - Executivos') or r.get('Executivos Apas Show 2026') or r.get('Executivo') or ''),
            'fit': fix(r.get('RDStation FitScore', '')),
            'necessidade': fix(r.get('Qual a sua necessidade?', '')),
            'segmento': fix(r.get('Segmento de atuação') or r.get('Subvertical') or ''),
            'mensagem': fix(r.get('Mensagem/Observações', '')),
        }
        for k, v in fields.items():
            if not v: continue
            prev = L['_d'].get(k)
            if prev is None or date >= prev:  # valor mais recente vence
                L[k] = v; L['_d'][k] = date

out = []
for L in leads.values():
    L.pop('_d')
    L['ev'].sort(reverse=True)
    L['ult'] = L['ev'][0][0] if L['ev'] else ''
    try:
        p = float(L.get('porte', '')); L['porte'] = round(p) if p > 1000 else ''
    except ValueError: L['porte'] = ''
    if not L['porte']: L.pop('porte')
    if not L.get('uf') and L.get('fone', '').startswith('('):
        L['uf'] = DDD_UF.get(L['fone'][1:3], '')  # estimado pelo DDD
    # Perfil sugerido A/B/C: cargo decisor + varejo + recorrência + contato
    s = 0
    cargo, emp = L.get('cargo', ''), L.get('empresa', '')
    if SENIOR.search(cargo): s += 3
    elif MID.search(cargo): s += 2
    if VAREJO.search(emp) or VAREJO.search(L.get('segmento', '')): s += 1
    if len([e for e in L['ev'] if not e[1].startswith('Site')]) >= 2: s += 1
    if any(e[1].startswith('Site') for e in L['ev']): s += 1  # já procurou a LedWave
    if L.get('necessidade') or L.get('mensagem'): s += 2
    if L.get('perfil') in ('EXPOSITOR', 'EXPOSITOR DE 1 DIA', 'BUFFET'): s -= 1
    if not L.get('fone'): s -= 1
    L['score'] = 'A' if s >= 4 else ('B' if s >= 2 else 'C')
    out.append({k: v for k, v in L.items() if v not in ('', [], None)})

out.sort(key=lambda x: (x['score'], x.get('empresa', '').lower()))
json.dump({'geradoEm': __import__('datetime').date.today().isoformat(), 'leads': out},
          open('crm/leads.json', 'w'), ensure_ascii=False, separators=(',', ':'))
from collections import Counter
print(len(out), 'leads', Counter(x['score'] for x in out), Counter(l for x in out for l in x['listas']))
