"""Gera os arquivos de carga inicial (seed) do Painel da Dissertação.

Saída: dados/seed/artigos/*.json e dados/seed/secoes/*.json
Fonte: referências da dissertação (Google Docs, versão de 08/10/2026),
comentários da orientadora e sugestões novas pesquisadas.
"""
import json, os, re, unicodedata

AQUI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(AQUI, "seed")

def A(s):
    """'Sobrenome, Nomes; Sobrenome2, Nomes2' -> lista de autores."""
    out = []
    for p in s.split(";"):
        p = p.strip()
        if not p:
            continue
        if p.startswith("@"):
            out.append({"instituicao": p[1:].strip()})
        else:
            sob, _, nome = p.partition(",")
            out.append({"sobrenome": sob.strip(), "nome": nome.strip()})
    return out

ARTIGOS = []
def art(id, **k):
    k.setdefault("origem", "dissertacao")
    k.setdefault("status", "citado")
    k.setdefault("secoes", [])
    for campo in ("autores", "organizadores"):
        if isinstance(k.get(campo), str):
            k[campo] = A(k[campo])
    k["ano"] = str(k.get("ano", ""))
    ARTIGOS.append((id, k))

# ---------- Referências que já estão na dissertação ----------
art("andriola2020", tipo="artigo", autores="Andriola, Wagner Bandeira; Barrozo Filho, José Liberato", ano=2020,
    titulo="Avaliação de políticas públicas para a educação superior: o caso do Programa Universidade para Todos (PROUNI)",
    periodico="Avaliação: Revista da Avaliação da Educação Superior", volume="25", numero="3",
    secoes=["1", "3"], alerta="Faltam páginas e DOI. Conferir o nome exato do periódico (Avaliação, Campinas/Sorocaba).")
art("arendt2010", tipo="livro", autores="Arendt, Hannah", ano=2010, titulo="A condição humana", edicao="12",
    editora="Forense Universitária", alerta="Está nas referências, mas não é citada no texto. Citar ou remover.")
art("arthur1989", tipo="livro", autores="Arthur, Michael B.; Hall, Douglas T.; Lawrence, Barbara S.", organizadores_flag=True,
    ano=1989, titulo="Handbook of career theory", editora="Cambridge University Press", secoes=["2.4"])
art("bardin2016", tipo="livro", autores="Bardin, Laurence", ano=2016, titulo="Análise de conteúdo",
    editora="Edições 70", secoes=["4.4"])
art("baruch2004", tipo="livro", autores="Baruch, Yehuda", ano=2004, titulo="Managing careers: theory and practice",
    editora="Pearson Education", secoes=["2.4"])
art("bourdieu1998", tipo="capitulo", autores="Bourdieu, Pierre", ano=1998,
    titulo="A escola conservadora: as desigualdades frente à escola e à cultura",
    organizadores="Nogueira, Maria Alice; Catani, Afrânio", livro="Escritos de educação", editora="Vozes",
    secoes=["1", "3.2", "3.3"], alerta="Faltam as páginas do capítulo (pp.). Comentário seu: 'trazer pra hoje' (ver Nogueira, 2021).")
art("bourdieu2008", tipo="livro", autores="Bourdieu, Pierre; Passeron, Jean-Claude", ano=2008,
    titulo="A reprodução: elementos para uma teoria do sistema de ensino", edicao="3", editora="Vozes",
    secoes=["1", "3.2", "3.3"], alerta="Na seção 3.3 aparece 'Bourdieu (1998, 2008)'. Se for esta obra, citar como Bourdieu e Passeron (2008).")
art("brasil1988", tipo="lei", autores="@Brasil", ano=1988, titulo="Constituição da República Federativa do Brasil de 1988",
    editora="Presidência da República", url="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm", secoes=["1"])
art("brasil2005", tipo="lei", autores="@Brasil", ano=2005,
    titulo="Lei nº 11.096, de 13 de janeiro de 2005. Institui o Programa Universidade para Todos - PROUNI, regula a atuação de entidades beneficentes de assistência social no ensino superior e dá outras providências",
    editora="Diário Oficial da União", url="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2005/lei/l11096.htm", secoes=["1", "3"])
art("inep2019", tipo="relatorio", autores="@Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira", ano=2019,
    titulo="Censo da Educação Superior 2019", url="http://portal.inep.gov.br",
    alerta="O texto cita INEP (2023) e Censo 2023, mas a referência é de 2019. Atualizar (ver INEP, 2024).")
art("catani2006", tipo="artigo", autores="Catani, Afrânio Mendes; Hey, Ana Paula; Gilioli, Renato de Sousa Porto", ano=2006,
    titulo="PROUNI: democratização do acesso às instituições de ensino superior?", periodico="Educar em Revista",
    numero="28", paginas="125-140", secoes=["3"])
art("catani2002", tipo="livro", autores="Catani, Afrânio Mendes; Oliveira, João Ferreira de", ano=2002,
    titulo="Educação superior no Brasil: reestruturação e metamorfose das universidades públicas", editora="Vozes", secoes=["3.3"])
art("creswell2010", tipo="livro", autores="Creswell, John W.", ano=2010,
    titulo="Projeto de pesquisa: métodos qualitativo, quantitativo e misto", edicao="3", editora="Artmed", secoes=["4.1"])
art("defillippi1994", tipo="artigo", autores="DeFillippi, Robert J.; Arthur, Michael B.", ano=1994,
    titulo="The boundaryless career: a competency-based perspective", periodico="Journal of Organizational Behavior",
    volume="15", numero="4", paginas="307-324", secoes=["2.4"])
art("duarte2009", tipo="capitulo", autores="Duarte, Marco Éden", ano=2009, titulo="O indivíduo e a organização: perspectivas de desenvolvimento",
    organizadores="Zanelli, José Carlos; Borges-Andrade, Jairo Eduardo; Bastos, Antonio Virgílio Bittencourt",
    livro="Psicologia, organizações e trabalho no Brasil", editora="Artmed", secoes=["2.4"], status="conferir",
    alerta="Conferir autor e capítulo: o nome do autor parece incorreto. Faltam páginas.")
art("dutra2004", tipo="livro", autores="Dutra, Joel Souza", ano=2004,
    titulo="Competências: conceitos e instrumentos para a gestão de pessoas na empresa moderna", editora="Atlas", secoes=["2.5"])
art("fleury2001", tipo="artigo", autores="Fleury, Maria Tereza Leme; Fleury, Afonso", ano=2001,
    titulo="Construindo o conceito de competência", periodico="Revista de Administração Contemporânea",
    volume="5", numero="esp.", paginas="183-196", secoes=["2.5"])
art("fugate2004", tipo="artigo", autores="Fugate, Mel; Kinicki, Angelo J.; Ashforth, Blake E.", ano=2004,
    titulo="Employability: a psycho-social construct, its dimensions, and applications", periodico="Journal of Vocational Behavior",
    volume="65", numero="1", paginas="14-38", doi="10.1016/j.jvb.2003.10.005", secoes=["2.3"])
art("gil2002", tipo="livro", autores="Gil, Antônio Carlos", ano=2002, titulo="Como elaborar projetos de pesquisa",
    edicao="4", editora="Atlas", secoes=["4.1"])
art("goncalves2020", tipo="tese", autores="Gonçalves, Edil de Souza", ano=2020,
    titulo="As propagandas do ENEM, PROUNI e FIES no processo de ampliação do acesso ao ensino superior",
    grau="Dissertação de mestrado", instituicao="Universidade Estadual de Campinas", secoes=["3.1"])
art("hall2002", tipo="livro", autores="Hall, Douglas T.", ano=2002, titulo="Careers in and out of organizations",
    editora="Sage", secoes=["2.4"])
art("harvey2001", tipo="artigo", autores="Harvey, Lee", ano=2001, titulo="Defining and measuring employability",
    periodico="Quality in Higher Education", volume="7", numero="2", paginas="97-109", doi="10.1080/13538320120059990", secoes=["2.3"])
art("ibge2019", tipo="relatorio", autores="@Instituto Brasileiro de Geografia e Estatística", ano=2019,
    titulo="Pesquisa Nacional por Amostra de Domicílios Contínua (PNAD Contínua) 2019", editora="IBGE", secoes=["1"],
    alerta="A orientadora perguntou se há dado mais novo. Há: PNAD Contínua Educação 2024 (ver IBGE, 2025).")
art("ipea2020", tipo="relatorio", autores="@Instituto de Pesquisa Econômica Aplicada", ano=2020,
    titulo="Mercado de trabalho e empregabilidade no Brasil", editora="IPEA", status="conferir",
    alerta="Não encontrei publicação do IPEA com este título. Localizar o documento original ou remover.")
art("joaopaulo1981", tipo="livro", autores="João Paulo II,", ano=1981, titulo="Laborem exercens: sobre o trabalho humano",
    editora="Paulinas", alerta="Está nas referências, mas não é citada no texto. Citar ou remover.")
art("knight2003", tipo="livro", autores="Knight, Peter; Yorke, Mantz", ano=2003, titulo="Assessment, learning and employability",
    editora="Open University Press", secoes=["2.3"])
art("leboterf2003", tipo="livro", autores="Le Boterf, Guy", ano=2003, titulo="Desenvolvendo a competência dos profissionais",
    edicao="3", editora="Artmed", secoes=["2.5"])
art("mendes2020", tipo="artigo", autores="Mendes, Maíra Tavares", ano=2020,
    titulo="Políticas de reconhecimento e de redistribuição na permanência estudantil", periodico="Educação & Realidade",
    volume="45", numero="4", secoes=["1", "3.1"], alerta="Faltam número do artigo/páginas e DOI.")
art("minayo2009", tipo="livro", autores="Minayo, Maria Cecília de Souza", organizadores_flag=True, ano=2009,
    titulo="Pesquisa social: teoria, método e criatividade", edicao="28", editora="Vozes", secoes=["4.1"])
art("moreno2017", tipo="livro", autores="Moreno, J.", ano=2017,
    titulo="Empregabilidade e o mercado de trabalho: desenvolvimento de competências para o sucesso profissional",
    editora="Editora Acadêmica", secoes=["2.3"], status="conferir",
    alerta="Referência incompleta e não localizada (nome do autor e editora). Confirmar a fonte ou trocar por Vieira et al. (2022).")
art("nicolini2003", tipo="artigo", autores="Nicolini, Alexandre", ano=2003, titulo="Qual será o futuro das fábricas de administradores?",
    periodico="Revista de Administração de Empresas", volume="43", numero="2", paginas="44-54", secoes=["2.1", "2.2"])
art("prouni2024", tipo="site", autores="@Ministério da Educação", ano="2024",
    titulo="Indicadores sobre PROUNI: Programa Universidade para Todos",
    url="https://dados.gov.br/dataset/prouni-programa-universidade-para-todos", acessoEm="2024-07-04", secoes=["1"])
art("ristoff2014", tipo="artigo", autores="Ristoff, Dilvo", ano=2014,
    titulo="O novo perfil do campus brasileiro: uma análise do perfil socioeconômico do estudante de graduação",
    periodico="Avaliação: Revista da Avaliação da Educação Superior", volume="19", numero="3", paginas="723-747", secoes=["3.1"])
art("rocha2019", tipo="artigo", autores="Rocha, Vera", ano=2019, titulo="Ensino superior no Brasil: uma análise sobre a inclusão de alunos bolsistas",
    periodico="Revista Brasileira de Educação", secoes=["3.1"], status="conferir",
    alerta="Faltam volume, número, páginas e DOI. Não localizei o artigo: confirmar se existe.")
art("savickas2013", tipo="capitulo", autores="Savickas, Mark L.", ano=2013, titulo="Career construction theory and practice",
    organizadores="Lent, Robert W.; Brown, Steven D.", livro="Career development and counseling: putting theory and research to work",
    edicao="2", editora="Wiley", paginas="147-183", secoes=["2.4"])
art("schein1978", tipo="livro", autores="Schein, Edgar H.", ano=1978, titulo="Career dynamics: matching individual and organizational needs",
    editora="Addison-Wesley", secoes=["2.4"])
art("severino2007", tipo="livro", autores="Severino, Antônio Joaquim", ano=2007, titulo="Metodologia do trabalho científico",
    edicao="23", editora="Cortez", secoes=["4.1"])
art("tomlinson2017", tipo="artigo", autores="Tomlinson, Michael", ano=2017,
    titulo="Forms of graduate capital and their relationship to graduate employability", periodico="Education + Training",
    volume="59", numero="4", paginas="338-352", doi="10.1108/ET-05-2016-0090", secoes=["2.3"])
art("tudda2011", tipo="tese", autores="Tudda, Luciane", ano=2011,
    titulo="O currículo projetado e o currículo vivido no Curso de Graduação em Administração da PUC-SP",
    grau="Tese de doutorado", instituicao="Pontifícia Universidade Católica de São Paulo",
    alerta="Não é citada no texto. Boa candidata para a seção 2.2 (curso de Administração na PUC-SP).")
art("wef2020", tipo="relatorio", autores="@World Economic Forum", ano=2020, titulo="The future of jobs report 2020",
    editora="World Economic Forum", secoes=["2.5"], alerta="Existe edição mais nova (2025), ver WEF (2025).")
art("yorke2006", tipo="livro", autores="Yorke, Mantz", ano=2006, titulo="Employability in higher education: what it is, what it is not",
    editora="Higher Education Academy", secoes=["2.3"])

# ---------- Citadas no texto, mas ausentes da lista ----------
for id_, aut, ano, sec, nota in [
    ("negrao2016", "Negrão,", 2016, ["1"], "Citado na Introdução (p. 15), sem referência. A orientadora pediu levar este trecho para os capítulos."),
    ("mariz2009", "Mariz,", 2009, ["3"], "Citado no Cap. 3, sem referência na lista."),
    ("oliveira2009", "Oliveira,", 2009, ["3.2"], "Citado na seção 3.2, sem referência na lista."),
    ("sposati2010", "Sposati, Aldaíza", 2010, ["3.2"], "Citada na seção 3.2, sem referência na lista."),
]:
    art(id_, tipo="livro", autores=aut, ano=ano, titulo="(referência a completar)", secoes=sec, status="faltando", alerta=nota)
art("sennett1999", tipo="livro", autores="Sennett, Richard", ano=1999,
    titulo="A corrosão do caráter: consequências pessoais do trabalho no novo capitalismo", editora="Record", secoes=["3.3"],
    status="faltando", alerta="O texto cita Sennett (2006) falando de 'A corrosão do caráter', que é de 1999. Sennett (2006) é 'A cultura do novo capitalismo'. Escolher e corrigir o ano.")
art("inep2024", tipo="relatorio", autores="@Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira", ano=2024,
    titulo="Censo da Educação Superior 2023: notas estatísticas", editora="Inep",
    url="https://www.gov.br/inep/pt-br/areas-de-atuacao/pesquisas-estatisticas-e-indicadores/censo-da-educacao-superior/resultados",
    secoes=["1", "2.1", "2.2"], status="faltando",
    alerta="Texto cita INEP (2023) para dados do Censo 2023 (publicado em 2024). Conferir dados e ano na publicação.")

# ---------- Sugestões novas ----------
S = dict(origem="sugestao", status="sugerido")
art("amaral2011", tipo="artigo", autores="Amaral, Daniela Patti; Oliveira, Fátima Bayma de", ano=2011,
    titulo="O Prouni e a conclusão do ensino superior: novas trajetórias pessoais e profissionais dos egressos",
    periodico="Ensaio: Avaliação e Políticas Públicas em Educação", volume="19", numero="73", paginas="861-890",
    doi="10.1590/S0104-40362011000500008", acesso="aberto", secoes=["1", "3", "5.3", "5.4"],
    porque="Estudo empírico com egressos do ProUni (2010-2011) sobre trajetórias profissionais. Provavelmente é o 'Amaral e Oliveira (2011)' que você cita na Introdução sem referência: conferir.", **S)
art("polli2021", tipo="artigo", autores="Polli, Gislei Mocelin; Martinelli, Jamille; Zugman, Ari; Oliveira, Fabio; Doi, Francislaine Wiczneski; Dias, Maria Sara de Lima; Tavares, Juliana",
    ano=2021, titulo="Políticas públicas e mobilidade social: egressos do Programa Universidade para Todos (PROUNI)",
    periodico="Psicologia da Educação", numero="53", paginas="86-96", doi="10.23925/2175-3520.2021i53p86-96", acesso="aberto",
    secoes=["3.3", "5.3", "5.4"],
    porque="Questionário com 212 egressos do ProUni sobre ascensão profissional, econômica e pessoal. É da PUC-SP e dialoga direto com seu Cap. 5.", **S)
art("vieira2022", tipo="artigo", autores="Vieira, André de Holanda Padilha; Honorato, Gabriela; Rodrigues, Leonardo", ano=2022,
    titulo="Educação superior e resultados no mercado de trabalho no Brasil: uma revisão da literatura e dos dados disponíveis",
    periodico="Revista Brasileira de Sociologia", volume="10", numero="25", paginas="193-218", doi="10.20336/rbs.879", acesso="aberto",
    secoes=["2.3", "3.3", "4.2"],
    porque="Mapeia as bases de dados nacionais sobre inserção de egressos (RAIS, PNAD, Censo). Ajuda a sustentar a lacuna e a escolher dados para o Cap. 4.", **S)
art("braga2022", tipo="artigo", autores="Braga, Daniel Santos; Inácio, Márcia Helena; Salomé, Nivalda Chaves dos Santos; Brescia, Amanda Tolomelli",
    ano=2022, titulo="Empregabilidade e destino ocupacional de egressos da educação superior: uma revisão da literatura",
    periodico="Revista de Educação PUC-Campinas", volume="27", artigoNum="e225382", doi="10.24220/2318-0870v27e2022a5382",
    acesso="aberto", secoes=["2.3", "3.3"],
    porque="Revisão de 30 estudos brasileiros sobre egressos. Aponta que bolsistas do ProUni têm urgência maior de inserção profissional. Conferir a lista de autores na página da revista.", **S)
art("clarke2018", tipo="artigo", autores="Clarke, Marilyn", ano=2018,
    titulo="Rethinking graduate employability: the role of capital, individual attributes and context",
    periodico="Studies in Higher Education", volume="43", numero="11", paginas="1923-1937", doi="10.1080/03075079.2017.1294152",
    acesso="capes", secoes=["2.3"],
    porque="Modelo com seis dimensões (capital humano, capital social, atributos, comportamentos, empregabilidade percebida e mercado). Atualiza Yorke e Fugate e conversa com Bourdieu.", **S)
art("ikuta2025", tipo="artigo", autores="Ikuta, Camila Yuri Santana; Barreyro, Gladys Beatriz", ano=2025,
    titulo="Análise da trajetória do Programa Universidade para Todos (ProUni) nos governos Temer e Bolsonaro (2016-2022)",
    periodico="Educação e Pesquisa", volume="51", doi="10.1590/S1678-4634202551286690por", acesso="aberto", secoes=["3"],
    porque="Atualiza a história do ProUni até 2022 (mudança de público-alvo em 2021). O Cap. 3 hoje para em 2009-2014.", **S)
art("nogueira2021", tipo="artigo", autores="Nogueira, Maria Alice", ano=2021,
    titulo="O capital cultural e a produção das desigualdades escolares contemporâneas", periodico="Cadernos de Pesquisa",
    volume="51", artigoNum="e07468", doi="10.1590/198053147468", acesso="aberto", secoes=["3.2", "3.3"],
    porque="Responde ao seu comentário 'trazer pra hoje' sobre Bourdieu: revisão atual do conceito de capital cultural, pela organizadora dos Escritos de Educação.", **S)
art("abilio2020", tipo="artigo", autores="Abílio, Ludmila Costhek", ano=2020, titulo="Uberização: a era do trabalhador just-in-time?",
    periodico="Estudos Avançados", volume="34", numero="98", paginas="111-126", doi="10.1590/s0103-4014.2020.3498.008",
    acesso="aberto", secoes=["2.6"],
    porque="Base para a seção 2.6 (vazia): autogerenciamento, 'empreendedor de si' e precarização.", **S)
art("rosenfield2011", tipo="artigo", autores="Rosenfield, Cinara L.", ano=2011, titulo="Trabalho decente e precarização",
    periodico="Tempo Social", doi="10.1590/S0103-20702011000100012", acesso="aberto", secoes=["2.6"],
    porque="Mostra o 'empreendedorismo de si mesmo' entre trabalhadores qualificados (executivos de TI). Útil para pejotização de administradores. Conferir volume e páginas.", **S)
art("cfa2023", tipo="relatorio", autores="@Conselho Federal de Administração", ano=2023,
    titulo="Pesquisa nacional Sistema CFA/CRAs: perfil, formação, atuação e oportunidades de trabalho do administrador (7. ed.)",
    editora="CFA", url="https://cfa.org.br/wp-content/uploads/2025/02/zPesquisa_Perfil_E01_A4_16122024.pdf", acesso="aberto",
    secoes=["2.2", "2.5"],
    porque="Dados oficiais e recentes (mais de 14 mil respondentes) sobre perfil e mercado do administrador. Base para a seção 2.2, hoje vazia.", **S)
art("wef2025", tipo="relatorio", autores="@World Economic Forum", ano=2025, titulo="The future of jobs report 2025",
    editora="World Economic Forum", url="https://www.weforum.org/publications/the-future-of-jobs-report-2025/", acesso="aberto",
    secoes=["2.4", "2.5"],
    porque="Atualiza o WEF (2020) e traz IA e big data como competências que mais crescem. Atende seu comentário 'falar sobre IA' na seção 2.4.", **S)
art("frey2017", tipo="artigo", autores="Frey, Carl Benedikt; Osborne, Michael A.", ano=2017,
    titulo="The future of employment: how susceptible are jobs to computerisation?", periodico="Technological Forecasting and Social Change",
    volume="114", paginas="254-280", doi="10.1016/j.techfore.2016.08.019", acesso="capes", secoes=["2.4"],
    porque="Estudo clássico sobre automação e risco por ocupação. Bom contraponto para IA e carreira do administrador.", **S)
art("collins2021", tipo="livro", autores="Collins, Patricia Hill; Bilge, Sirma", ano=2021, titulo="Interseccionalidade",
    tradutor="Rane Souza", editora="Boitempo", acesso="biblioteca", secoes=["3.2", "3.3"],
    porque="Você anotou 'colocar o termo interseccionalidade' no sumário. Obra de referência para articular classe, raça e gênero na trajetória dos bolsistas.", **S)
art("ibge2025", tipo="relatorio", autores="@Instituto Brasileiro de Geografia e Estatística", ano=2025,
    titulo="Pesquisa Nacional por Amostra de Domicílios Contínua: educação 2024", editora="IBGE",
    url="https://sidra.ibge.gov.br/tabela/7135", acesso="aberto", secoes=["1"],
    porque="Substitui a PNAD 2019 (pedido da orientadora). Em 2024, 47,8% dos jovens que deixaram o ensino médio citaram a necessidade de trabalhar. Conferir os números na tabela 7135 do SIDRA.", **S)

# ---------- Planilha "leituras_tese_prouni_v2" (seções antigas mapeadas para o sumário atual) ----------
def upd(id_, secoes=(), alerta=None, **k):
    d = dict(ARTIGOS)[id_]
    d["secoes"] = sorted(set(d.get("secoes", [])) | set(secoes), key=lambda s: [int(x) if x.isdigit() else 99 for x in s.split(".")])
    if alerta:
        d["alerta"] = (d.get("alerta", "") + " " + alerta).strip()
    d.update(k)

P = dict(origem="planilha", status="conferir")
CONF = "Veio da sua planilha. Dados incompletos: conferir autores, ano e periódico no link."
upd("amaral2011", ["1"], status="citado", origem="dissertacao",
    alerta="Você já cita este texto na Introdução (Nunes, 2007, apud Amaral e Oliveira, 2011), marcado como lido na planilha. Falta entrar na lista de referências.")
upd("catani2006", ["2.1"], url="https://www.scielo.br/j/er/a/6kD9QTwtmfKbtBqMjYGrVNd/",
    alerta="Na planilha ele aparece duas vezes, e uma delas aponta para a revista Sociologias, que é de outro artigo. O link certo é o da Educar em Revista.")
upd("nicolini2003", url="http://www.spell.org.br/documentos/ver/11173")
upd("ristoff2014", ["2.1"], url="https://periodicos.uniso.br/avaliacao/article/view/2058/1796")
upd("fleury2001", ["2.3"])
upd("nogueira2021", ["3.3"], alerta="Na sua planilha está como Nogueira (2017); o ano correto é 2021.")
upd("braga2022", ["2.3"], alerta="Na sua planilha aparece como 'Sá & Alves (2019)', mas o link é deste artigo.")
upd("wef2025", alerta="A planilha traz a edição 2023; prefira a de 2025.")
upd("inep2024", url="http://portal.inep.gov.br/web/guest/microdados")

art("sguissardi", tipo="artigo", autores="Sguissardi, Valdemar; Silva Júnior, João dos Reis", ano="",
    titulo="Universidade pública brasileira no século XXI", url="https://www.redalyc.org/pdf/3845/384539805007.pdf",
    secoes=["2.1"], alerta="Faltam ano e periódico.", **P)
art("chaves2010", tipo="artigo", autores="Chaves, Vera Lúcia Jacob", ano=2010, titulo="Políticas de expansão da educação superior (1995-2010)",
    url="https://www.scielo.br/j/rbedu/a/QKyJmCvwkGxsJqg7vSCC4xk/", secoes=["2.1", "3"],
    alerta="O título da planilha parece resumido e varia entre as linhas. " + CONF, **P)
art("sampaio2000", tipo="artigo", autores="Sampaio,", ano=2000, titulo="O ensino superior no Brasil nos anos 90",
    periodico="São Paulo em Perspectiva", url="https://www.scielo.br/j/spp/a/9mVz3rLgsChQbW9LNMnrLjD/", secoes=["2.1"],
    alerta="Até onde sei, 'O ensino superior brasileiro nos anos 90' (São Paulo em Perspectiva, 2000) é de Carlos Benedito Martins, não de Sampaio. Conferir o autor no link.", **P)
art("cunha2007", tipo="livro", autores="Cunha, Luiz Antônio", ano=2007, titulo="A universidade temporã: o ensino superior, da Colônia à Era Vargas",
    edicao="3", editora="Editora Unesp", url="https://books.scielo.org/id/tmz6r", acesso="aberto", secoes=["2.1"],
    alerta="Conferir a edição e o ano da versão no SciELO Livros.", **P)
art("neves2007", tipo="artigo", autores="Neves, Clarissa Eckert Baeta; Raizer, Leandro; Fachinetto, Rochele Fellini", ano=2007,
    titulo="Acesso, expansão e equidade na educação superior: novos desafios para a política educacional brasileira",
    periodico="Sociologias", numero="17", paginas="124-157", url="https://www.scielo.br/j/soc/a/JDyQXmQ5YrWTZV9CQ8tYDcd/",
    acesso="aberto", secoes=["2.1", "3"],
    alerta="Na planilha está como 'Rothen & Schulz (2007)', mas o título e o link (Sociologias) correspondem a Neves, Raizer e Fachinetto (2007). Conferir.", **P)
art("catani2005", tipo="artigo", autores="Catani, Afrânio Mendes; Gilioli, Renato de Sousa Porto", ano=2005,
    titulo="O ProUni na encruzilhada: entre a cidadania e a privatização", periodico="Linhas Críticas",
    url="https://www.researchgate.net/publication/279494199", secoes=["3"], alerta="Faltam volume e páginas.", **P)
art("fleury2004", tipo="artigo", autores="Fleury,", ano=2004, titulo="Competências e habilidades para empregabilidade dos egressos de Administração",
    url="https://www.researchgate.net/publication/333874443", secoes=["2.2", "2.5"], alerta=CONF, **P)
art("pinto2022", tipo="artigo", autores="Pinto,", ano=2022, titulo="O perfil do egresso dos cursos de Administração no Brasil",
    periodico="RAM: Revista de Administração Mackenzie", secoes=["2.2", "2.5"],
    url="https://humanas.blog.scielo.org/blog/2022/12/05/o-perfil-do-egresso-dos-cursos-de-administracao-no-brasil/",
    alerta="O link é do blog do SciELO, não do artigo. Achar o artigo na RAM. " + CONF, **P)
art("leal_ram", tipo="artigo", autores="Leal,; Dalmau,", ano="", titulo="Formação baseada em competências? Estudo em cursos de Administração",
    periodico="RAM: Revista de Administração Mackenzie", url="https://www.scielo.br/j/ram/a/7yBjP6CLCpHVSwfNTt9sPdP/", secoes=["2.2"], alerta=CONF, **P)
art("leal_aval", tipo="artigo", autores="Leal,; Dalmau,", ano="", titulo="Alunos de Administração estão em sintonia com o mercado?",
    periodico="Avaliação: Revista da Avaliação da Educação Superior", url="https://www.scielo.br/j/aval/a/6wHbb4kFFW5wvyP3M7G4wGF/",
    secoes=["2.2", "2.5"], alerta=CONF, **P)
art("bertero2006", tipo="artigo", autores="Bertero, Carlos Osmar", ano=2006, titulo="Administração no Brasil: potencialidades, problemas e perspectivas",
    periodico="Revista de Administração de Empresas", url="https://www.scielo.br/j/rae/a/5qd9dc8FMbrM4NQcymtPcwB/", secoes=["2.2"], alerta=CONF, **P)
art("rocha2012", tipo="artigo", autores="Rocha-de-Oliveira, Sidinei; Piccinini, Valmíria Carolina", ano=2012,
    titulo="Inserção profissional de estudantes de Administração no Brasil", url="https://periodicos.uniarp.edu.br/index.php/visao/article/view/3113",
    secoes=["2.2", "2.5", "3.3"], alerta="Muito pertinente: trata de inserção profissional no próprio curso de Administração. " + CONF, **P)
art("bourdieu1998b", tipo="capitulo", autores="Bourdieu, Pierre", ano=1998, titulo="Os três estados do capital cultural",
    organizadores="Nogueira, Maria Alice; Catani, Afrânio", livro="Escritos de educação", editora="Vozes",
    secoes=["3.2", "3.3"], status="lendo", origem="planilha",
    alerta="Marcado como lido na planilha: registre o fichamento. Não cite o link do Scribd; cite o livro (o mesmo de 'A escola conservadora'). Faltam as páginas.")
art("freire1987", tipo="livro", autores="Freire, Paulo", ano=1987, titulo="Pedagogia do oprimido", edicao="17", editora="Paz e Terra",
    secoes=["3.2", "3.3"], acesso="biblioteca",
    alerta="Cite o livro, não o PDF do link. A epígrafe da dissertação é de Freire, mas parece vir de 'Educação como prática da liberdade', não da Pedagogia do oprimido: confirmar a fonte e incluir nas referências.", **P)
art("faguer", tipo="artigo", autores="Faguer,", ano="", titulo="Sociologia da educação, reprodução das desigualdades e novas formas de dominação",
    periodico="Educação e Pesquisa", url="https://www.scielo.br/j/ep/a/MDjSZr3WqdJN7YSnGg5PSqz/", secoes=["3.2"], alerta=CONF, **P)
art("ribeiro2020", tipo="artigo", autores="Ribeiro, Carlos Antonio Costa; Carvalhaes, Flavio", ano=2020,
    titulo="Educação, mobilidade social e desigualdades: diálogo com os clássicos", url="https://revistas.ufrj.br/index.php/rce/article/view/62806",
    secoes=["3.2", "3.3"], alerta=CONF, **P)
art("caseiro2019", tipo="artigo", autores="Caseiro, Luiz; Maciente, Aguinaldo", ano=2019,
    titulo="Estratificação horizontal e inserção no mercado formal", periodico="Tempo Social", url="https://revistas.usp.br/ts/article/view/200986",
    secoes=["3.2", "3.3"], alerta="Um dos mais úteis da lista: mostra que o tipo de curso e de instituição pesa na inserção formal, o que é o centro do seu argumento. " + CONF, **P)
art("viana2017", tipo="artigo", autores="Viana,; Diniz,", ano=2017, titulo="Os jovens das camadas populares na universidade pública: acesso e permanência",
    url="https://www.scielo.br/j/rk/a/TJkmTvBNS5tr3TPXQtvbRMs/", secoes=["3.1"],
    alerta="Trata de universidade pública; o ProUni é em IES privada. Use para contraste. " + CONF, **P)
art("araujo2017", tipo="artigo", autores="Araújo,", ano=2017, titulo="Democratização do acesso à educação superior no Brasil",
    periodico="Revista Diálogo Educacional", url="http://educa.fcc.org.br/scielo.php?script=sci_arttext&pid=S1981-416x2017000401241",
    secoes=["3.1"], alerta=CONF, **P)
art("carrieri2011", tipo="artigo", autores="Carrieri,; Sarsur,", ano=2011, titulo="O discurso da empregabilidade: o que pensam a academia e o mundo empresarial",
    periodico="Cadernos EBAPE.BR", url="https://www.scielo.br/j/cebape/a/Pq7bdMdm78ZNjKG7PcJtdcd/", secoes=["2.3"], alerta=CONF, **P)
art("kilimnik2006", tipo="artigo", autores="Kilimnik, Zélia Miranda; Castilho, Ione Vasques", ano=2006,
    titulo="Flexibilização e empregabilidade individual: proposição de um modelo", periodico="Cadernos EBAPE.BR",
    url="http://www.scielo.br/j/cebape/a/9VTbVsJwKMyPGF8hKJwQSTM/", secoes=["2.3"], alerta=CONF, **P)
art("lemos", tipo="artigo", autores="Lemos,", ano="", titulo="Globalização e mercado de trabalho: educação e empregabilidade",
    periodico="Organizações & Sociedade", url="https://www.scielo.br/j/osoc/a/G8fwxJ5g9xKhtfzqTyH6sHM/", secoes=["2.3"], alerta=CONF, **P)
art("borges", tipo="artigo", autores="Borges,; Yamamoto,", ano="", titulo="Empregabilidade e sociedade disciplinar",
    periodico="Organizações & Sociedade", url="https://www.scielo.br/j/osoc/a/dcTf7vcqRVNf4zdp5DqKvKD/", secoes=["2.3"],
    alerta="Leitura crítica (foucaultiana) da empregabilidade: bom contraponto a Yorke e Fugate. " + CONF, **P)
art("nascimento", tipo="artigo", autores="Nascimento,", ano="", titulo="Panorama de oportunidades para os egressos do ensino superior no Brasil",
    periodico="Ensaio: Avaliação e Políticas Públicas em Educação", url="https://www.scielo.br/j/ensaio/a/GkNt9yjtrjWXgYFCzQpVTKk",
    secoes=["2.3", "3.3"], alerta=CONF, **P)
art("dutra2010", tipo="livro", autores="Dutra, Joel Souza", ano=2010, titulo="Gestão de carreiras na empresa contemporânea", editora="Atlas",
    secoes=["2.4"], acesso="biblioteca", alerta="A planilha diz 2009: conferir o ano da edição que você tem.", **P)
art("briscoe2006", tipo="artigo", autores="Briscoe, Jon P.; Hall, Douglas T.", ano=2006,
    titulo="The interplay of boundaryless and protean careers: combinations and implications", periodico="Journal of Vocational Behavior",
    volume="69", numero="1", paginas="4-18", doi="10.1016/j.jvb.2005.09.002", acesso="capes", secoes=["2.4"],
    alerta="O link da planilha é de um artigo brasileiro de 2011 (RAC), não deste. Decida qual dos dois quer usar.", **P)
art("oliveira2014", tipo="artigo", autores="Oliveira,", ano=2014, titulo="Estilos reflexivos e atitudes de carreira proteana: versão brasileira",
    url="https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S1984-66572014000100009", secoes=["2.4"], alerta=CONF, **P)
art("neves2013", tipo="artigo", autores="Neves,; Trevisan,; João,", ano=2013, titulo="Carreira proteana: revisão teórica e análise bibliométrica",
    url="https://www.redalyc.org/journal/1334/133460324007/html/", secoes=["2.4"], alerta=CONF, **P)
art("dutra2002", tipo="livro", autores="Dutra, Joel Souza", ano=2002, titulo="Gestão de pessoas por competências", editora="Atlas",
    secoes=["2.5"], acesso="biblioteca", alerta="A dissertação já cita Dutra (2004). Talvez não precise dos três livros do Dutra.", **P)
art("ocde2025", tipo="relatorio", autores="@Organisation for Economic Co-operation and Development", ano=2025,
    titulo="Education at a glance 2025: OECD indicators", editora="OECD Publishing", url="https://www.oecd.org/en/publications/education-at-a-glance-2025_1c0d9c79-en.html",
    secoes=["1", "3.3"], acesso="aberto", alerta="O link da planilha é uma notícia da SBPC. Cite o relatório da OCDE.", **P)

# ---------- Seções (sumário + pendências dos comentários) ----------
SECOES = [
 ("1", "Introdução", "rascunho", [
   "Orientadora: construir um começo que situe o leitor (o 2º parágrafo entra de forma abrupta).",
   "Orientadora: na Introdução não entram citações e referências; levar autores para os capítulos.",
   "Orientadora: o trecho sobre o impacto da política cabe melhor na conclusão.",
   "Orientadora: tem PNAD mais nova? (sim: PNAD Educação 2024)",
   "A 'questão central' repete o título. Reescrever como pergunta.",
   "Frase incompleta: 'No Brasil se traduz…'. Comentário seu sobre cultura, poder econômico e decolonialismo.",
   "Cuidado com a confusão da lacuna.",
   "Reinserir o Gráfico 1 e conferir os números de bolsas.",
 ]),
 ("2", "Aportes teóricos (abertura)", "vazia", ["Escrever o parágrafo que apresenta o capítulo."]),
 ("2.1", "Ensino Superior no Brasil: expansão, privatização e acesso", "rascunho", [
   "Só tem a Tabela 1. Falta o texto sobre expansão e privatização.",
   "Refazer a Tabela 1 com microdados do INEP: valores com ~ são estimativas e a série salta de 99 para ~900 cursos.",
 ]),
 ("2.2", "O Curso de Administração no Brasil: perfil, demanda e mercado", "vazia", [
   "Nota sua: pegar da IC (iniciação científica).", "Sugestões: CFA (2023), Nicolini (2003), Tudda (2011).",
 ]),
 ("2.3", "Empregabilidade: conceitos e modelos teóricos", "redigida", ["Trocar Moreno (2017), que não foi localizado, por fonte verificável."]),
 ("2.4", "Carreira: teorias e perspectivas contemporâneas", "redigida", ["Nota sua: falar sobre IA e desafios digitais aqui."]),
 ("2.5", "O Perfil do Administrador: hard skills, soft skills e novas demandas", "redigida", ["Atualizar WEF 2020 para 2025."]),
 ("2.6", "Empreendedorismo: conceitos, atualidade e pejotização", "vazia", ["Seção sem texto."]),
 ("2.7", "Níveis organizacionais: estratégico, tático e operacional", "vazia", ["Seção sem texto. Definir como liga à ascensão de carreira (5.4)."]),
 ("3", "O PROUNI: histórico, funcionamento e alcance", "redigida", ["Mariz (2009) sem referência.", "Atualizar o histórico até 2022-2024."]),
 ("3.1", "O estudante bolsista: perfil socioeconômico e trajetória acadêmica", "redigida", ["Nota sua: desafios da desigualdade social, 'grana e boletos'."]),
 ("3.2", "Desigualdade social, educação e políticas públicas de inclusão", "redigida", [
   "Nota sua: trazer Bourdieu para hoje.", "Oliveira (2009) e Sposati (2010) sem referência.", "Incluir o termo interseccionalidade.",
 ]),
 ("3.3", "Intersecção entre origem socioeconômica, formação e inserção profissional", "redigida", ["Corrigir ano de Sennett."]),
 ("4.1", "Natureza e tipo de pesquisa", "redigida", ["Alinhar com a versão revisada (Creswell): métodos mistos sequencial explanatório."]),
 ("4.2", "Campo empírico e sujeitos da pesquisa", "redigida", [
   "Verificar no Sisprouni se FGV-SP e Insper aderem ao ProUni.", "Definir recorte temporal (texto diz 'últimos cinco anos'; nota sua: 2020-2024).",
 ]),
 ("4.3", "Instrumentos de coleta de dados", "redigida", []),
 ("4.4", "Procedimentos de análise dos dados", "redigida", ["Nota sua: perfil do entrevistado, coleta (Forms), estratégia de contato, o que se espera dos dados."]),
 ("5.1", "Perfil socioeconômico dos egressos", "aguardando", ["Aguardando coleta de dados."]),
 ("5.2", "Trajetória formativa: experiências na graduação", "aguardando", ["Aguardando coleta de dados."]),
 ("5.3", "Empregabilidade e inserção no mercado de trabalho", "aguardando", ["Aguardando coleta de dados."]),
 ("5.4", "Ascensão profissional e desenvolvimento de carreira", "aguardando", ["Aguardando coleta de dados."]),
 ("5.5", "Percepções e expectativas: desafios e oportunidades", "aguardando", ["Aguardando coleta de dados."]),
 ("6", "Considerações finais", "rascunho", ["Esqueleto preliminar. Ainda menciona 'hipótese' (foi trocada por questão central)."]),
 ("ref", "Referências", "rascunho", ["Converter tudo para APA 7 (ou confirmar norma com a orientadora, que pediu ABNT)."]),
 ("ap", "Apêndices A, B e C", "vazia", ["Questionário, roteiro de entrevista e TCLE ainda não inseridos."]),
]

def main():
    for sub in ("artigos", "secoes"):
        os.makedirs(os.path.join(OUT, sub), exist_ok=True)
    for i, (id_, k) in enumerate(ARTIGOS):
        if k.pop("organizadores_flag", False):
            k["orgs"] = True
        with open(os.path.join(OUT, "artigos", id_ + ".json"), "w", encoding="utf-8") as f:
            json.dump(k, f, ensure_ascii=False, indent=1)
    for ordem, (num, tit, st, pend) in enumerate(SECOES):
        d = {"numero": num, "titulo": tit, "status": st, "pendencias": pend, "ordem": ordem}
        with open(os.path.join(OUT, "secoes", "s" + num.replace(".", "_") + ".json"), "w", encoding="utf-8") as f:
            json.dump(d, f, ensure_ascii=False, indent=1)
    print(len(ARTIGOS), "artigos;", len(SECOES), "seções")

if __name__ == "__main__":
    main()
