"""Estrutura da planilha de dados do AGM (abas e colunas).

Cada aba é uma tabela "longa": uma linha por mês (e por item, quando houver).
A coluna `mes` sempre usa o formato AAAA-MM (ex.: 2026-09).
"""

# aba -> lista de (coluna, descrição)
ABAS = {
    "Config": [
        ("chave", "Nome do parâmetro"),
        ("valor", "Valor do parâmetro"),
    ],
    "Digital": [
        ("mes", "Mês (AAAA-MM)"),
        ("visitas", "Visitas no site"),
        ("leads", "Leads gerados"),
        ("leads_qualificados", "Leads qualificados"),
        ("negocios_fechados", "Quantidade de negócios fechados"),
        ("valor_fechado", "Valor dos negócios fechados (R$)"),
        ("investimento", "Investimento/orçamento em mídia (R$)"),
    ],
    "Leads_Status": [
        ("mes", "Mês (AAAA-MM)"),
        ("status", "Status do lead (ex.: Não qualificado, Convertido, Em contato, Qualificação)"),
        ("quantidade", "Quantidade de leads"),
    ],
    "Leads_SDR": [
        ("mes", "Mês (AAAA-MM) — inclua também o mês parcial"),
        ("sdr", "Nome do SDR"),
        ("leads", "Leads recebidos"),
    ],
    "Pipeline": [
        ("mes", "Mês (AAAA-MM) da foto do pipeline"),
        ("origem", "Digital, Eventos ou Varejo"),
        ("fase", "Fase da oportunidade (ex.: Negociação, Fechamento, Contratação, Aceite técnico)"),
        ("valor", "Valor em oportunidades (R$)"),
    ],
    "Receita": [
        ("mes", "Mês (AAAA-MM)"),
        ("varejo", "Negócios fechados gerados de Varejo (R$)"),
        ("eventos", "Negócios fechados gerados por Eventos (R$)"),
        ("investimento_eventos", "Investimento em eventos (R$)"),
        ("observacao", "Opcional"),
    ],
    "Eventos": [
        ("mes", "Mês (AAAA-MM)"),
        ("data", "Data(s) do evento (texto, ex.: 16–17/09)"),
        ("evento", "Nome do evento"),
        ("local", "Cidade/local ou descrição curta (opcional)"),
        ("leads_total", "Leads captados no evento (deixe vazio se não houver)"),
        ("leads_novos", "Leads novos na base (deixe vazio se não houver)"),
    ],
    "Redes": [
        ("mes", "Mês (AAAA-MM)"),
        ("rede", "Instagram, Facebook, TikTok, YouTube, LinkedIn"),
        ("alcance", "Pessoas impactadas (alcance)"),
        ("interacoes", "Interações com conteúdos"),
        ("novos_seguidores", "Seguidores ganhos no mês"),
    ],
    "Concorrencia": [
        ("mes", "Mês (AAAA-MM)"),
        ("conta", "Conta (ex.: @ledwave — LedWave)"),
        ("seguidores", "Seguidores (total)"),
        ("novos_seguidores", "Novos seguidores (últimos 28 dias)"),
        ("publicacoes", "Conteúdos publicados"),
    ],
    "PR": [
        ("mes", "Mês (AAAA-MM)"),
        ("materias", "Matérias publicadas no mês"),
        ("earned_media", "Earned media (R$)"),
    ],
    "NPS": [
        ("mes", "Mês (AAAA-MM)"),
        ("area", "Projetos ou SAC"),
        ("promotores", "Respostas 9–10"),
        ("passivos", "Respostas 7–8"),
        ("detratores", "Respostas 0–6"),
        ("enviadas", "Pesquisas enviadas"),
        ("comentarios", "Respostas com comentário"),
    ],
    "NPS_Pontos": [
        ("mes", "Mês (AAAA-MM)"),
        ("ponto", "Ponto de contato"),
        ("respostas", "Quantas pessoas avaliaram esse ponto"),
        ("base", "Total de respondentes da pesquisa"),
        ("promotores", "Respostas 9–10"),
        ("passivos", "Respostas 7–8"),
        ("detratores", "Respostas 0–6"),
    ],
    "Textos": [
        ("mes", "Mês (AAAA-MM)"),
        ("secao", "Ver lista de seções no LEIA-ME"),
        ("ordem", "Ordem do item (1, 2, 3…)"),
        ("titulo", "Título / rótulo"),
        ("texto", "Texto / valor"),
    ],
}

CONFIG_PADRAO = [
    ("mes_referencia", "2026-09", "Mês de resultados da apresentação (AAAA-MM)"),
    ("parcial_ate", "", "Data até onde vão os dados do mês parcial (ex.: 07/10). Vazio = sem coluna parcial"),
]

SECOES_TEXTO = [
    ("proximos_digital", "Próximos passos — Digital (titulo = texto do item)"),
    ("proximos_nps", "Próximos passos — NPS (titulo = item, texto = detalhe)"),
    ("pr_destaque", "Manchetes de destaque em PR (titulo = manchete)"),
    ("pr_veiculos", "Veículos de PR (texto = lista de veículos)"),
    ("destaque_titulo", "Slide de destaque do mês (opcional) — titulo = título do slide"),
    ("destaque_item", "Slide de destaque — passos/ações (titulo = texto)"),
    ("destaque_kpi", "Slide de destaque — cartões (titulo = rótulo, texto = valor). Máx. 2"),
    ("destaque_tabela", "Slide de destaque — tabela (titulo = fase, texto = quantidade)"),
    ("analise", "Substitui a análise automática de um slide (titulo = chave do slide, texto = análise)"),
]

CHAVES_ANALISE = [
    "digital_fechados", "digital_pipeline", "digital_leads", "digital_resumo", "digital_status",
    "eventos", "varejo_fechados", "eventos_varejo", "pipeline_eventos", "pipeline_varejo",
    "redes_alcance", "redes_interacoes", "redes_seguidores", "concorrencia", "pr",
    "nps_relatorio", "nps_projetos", "nps_pontos", "nps_sac",
]
