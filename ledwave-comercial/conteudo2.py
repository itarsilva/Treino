# Prospecção, SPIN por nicho, briefing de orçamento, escuta ativa e roleplay.

# SPIN por nicho: (Situação, Problema, Implicação, Necessidade de solução)
SPIN = {
    "Varejo de Moda e Vitrines": (
        "Quantas lojas vocês têm e quantas trocas de coleção/campanha fazem por ano? Como a vitrine é produzida hoje?",
        "O que mais atrasa ou encarece uma troca de vitrine? Já perderam uma promoção por não dar tempo de imprimir?",
        "Se a vitrine fica a mesma por semanas, o que acontece com o fluxo de quem passa todo dia na frente? Quanto isso pesa na venda da coleção nova?",
        "Se você pudesse trocar a vitrine de todas as lojas pelo celular, em minutos, o que faria diferente na próxima campanha?"),
    "Supermercados, Atacarejos e Home Centers": (
        "Quantas lojas e checkouts? Como as ofertas são comunicadas hoje? A indústria investe em trade nas suas lojas?",
        "Quanto tempo leva para uma oferta sair do comercial e chegar à gôndola? O fornecedor pede comprovação de exposição?",
        "Quanto de verba de trade vira papel que ninguém mede? Quanto você deixa de faturar por não vender mídia dentro da loja?",
        "Se as telas fossem pagas pela indústria e ainda gerassem receita, quantas lojas você colocaria no piloto?"),
    "Farmácias e Drogarias": (
        "Quantas lojas, e quantas abrem por ano? Como funciona a parceria com a indústria hoje?",
        "Como vocês se diferenciam das farmácias concorrentes na mesma rua? Campanhas sazonais chegam a tempo em todas as lojas?",
        "Se o cliente escolhe a farmácia mais visível, quanto fluxo vocês perdem por ter fachada igual às outras? E quanto a indústria investiria se tivesse onde?",
        "Uma rede de telas que se paga com a indústria e destaca a sua fachada ajudaria na meta deste ano?"),
    "Postos de Combustível e Conveniência": (
        "Quantos postos, qual o fluxo diário da via, qual o peso da conveniência no resultado?",
        "Como o preço é atualizado hoje? A conveniência é vista da pista? Algum anunciante local já procurou vocês?",
        "Quantos motoristas passam reto por não verem o preço ou a oferta a tempo? Quanto vale um ponto a mais de conversão da pista?",
        "Se o mesmo totem mostrasse preço, promoção da conveniência e ainda vendesse mídia, como isso mudaria a margem do posto?"),
    "DOOH e Investidores de Mídia": (
        "Quantos pontos opera, em quais praças, com que ocupação média? Quem é seu fornecedor atual?",
        "Quanto tempo de tela apagada teve no último ano? Qual a maior dificuldade: ponto, licenciamento, venda ou manutenção?",
        "Quanto custou em receita cada dia de tela apagada? Quantos pontos bons a concorrência ocupou enquanto você decidia?",
        "Um parceiro que fabrica, mantém e entende de operação de mídia aceleraria o seu plano de expansão?"),
    "Shopping Centers": (
        "Qual o fluxo mensal, quais as datas mais fortes e como está a receita de mall media?",
        "O mall media atual é fácil de vender? O shopping tem um ponto de experiência que gera visita espontânea?",
        "Se o shopping não é destino, quanto da visita migra para o online ou para o concorrente? Quanto inventário de mídia fica sem venda?",
        "Uma experiência-âncora que gera fluxo e mídia premium ajudaria no próximo Natal?"),
    "Concessionárias de Veículos": (
        "Quantas lojas e marcas? Quantos lançamentos por ano? Como é o showroom hoje?",
        "O cliente chega já decidido pela internet? O que o showroom oferece que o site não oferece?",
        "Quantas vendas se perdem quando o cliente sai do showroom sem emoção? Quanto custa cada evento de lançamento sem estrutura própria?",
        "Se o showroom pudesse colocar o cliente na estrada antes do test-drive, como isso afetaria a conversão?"),
    "Construtoras e Stands de Vendas": (
        "Quantos lançamentos e qual o VGV do próximo? Quanto tempo dura um stand?",
        "O visitante entende o empreendimento só com maquete e perspectivas? Qual a conversão de visita em proposta?",
        "Cada mês a mais de ciclo de vendas custa quanto em custo financeiro da obra? Quantas visitas saem sem se imaginar no imóvel?",
        "Se o stand fizesse o cliente viver o apartamento e o painel fosse reaproveitado nos próximos lançamentos, faria sentido avaliar?"),
    "Franquias e Redes": (
        "Quantas unidades, quantas aberturas previstas, qual o kit de abertura hoje?",
        "Quanto tempo leva para uma campanha nacional chegar a todas as lojas? Os franqueados aplicam o material corretamente?",
        "Qual o custo de uma campanha impressa multiplicado pelo número de lojas? O que a inconsistência faz com o valor da marca?",
        "Se uma campanha chegasse a todas as lojas em um clique, padronizada, quanto isso valeria para a rede e para o franqueado?"),
    "Bares, Restaurantes e Food Service": (
        "Quantas casas, quais turnos, transmitem jogos/eventos? Como é o cardápio hoje?",
        "Quantas vezes por ano reimprimem o cardápio? Os pratos de maior margem estão em destaque?",
        "Quanto deixam de ganhar quando o cliente pede o item de menor margem por falta de destaque? Quanto custam as reimpressões?",
        "Se o cardápio mudasse sozinho por turno e destacasse o que dá mais lucro, quanto isso mudaria no ticket médio?"),
    "Igrejas e Centros Religiosos": (
        "Qual a capacidade do templo e a distância do palco ao último banco? Vocês transmitem online? Usam projetor?",
        "Quem está no fundo consegue ler as letras e ver o pregador? A transmissão tem a qualidade que vocês gostariam?",
        "Quando as pessoas não enxergam bem, o que acontece com a participação no louvor e na mensagem? E com a audiência online?",
        "Se toda a comunidade, presente e online, visse a mensagem com clareza, como isso fortaleceria o ministério?"),
    "Hotéis, Parques, Clubes e Piscinas": (
        "Quantos eventos por mês, quais espaços, quanto gastam ou repassam em locação de telão?",
        "Já perderam eventos para concorrentes com melhor estrutura? A área de lazer tem programação noturna?",
        "Quanto somam as locações no ano? Quanto vale um evento corporativo perdido?",
        "Uma estrutura fixa que vira diferencial de venda e gera novos produtos de lazer faria sentido no plano do ano?"),
    "Eventos, Agências e Produtoras": (
        "Quantos eventos por mês, que formatos, quem fornece hoje?",
        "Já tiveram falha técnica ao vivo? O fornecedor atual dá conta de jobs simultâneos e de outras praças?",
        "O que uma falha ao vivo custou em relação com o cliente final? Quantos jobs deixaram de pegar por falta de estrutura?",
        "Um parceiro com estoque, equipe e backup próprios permitiria aceitar jobs maiores com tranquilidade?"),
    "Corporativo (Comunicação Interna e Recepções)": (
        "Quantas unidades e colaboradores? Quantos não têm e-mail corporativo? Como é a recepção e o auditório?",
        "A comunicação interna chega a todos? A recepção mostra quem vocês são?",
        "O que a falta de informação causa em engajamento, segurança e produtividade? Que impressão o visitante leva?",
        "Se a cultura e os resultados estivessem visíveis em todas as unidades, o que mudaria no clima e na percepção de clientes?"),
    "Educação (Escolas, Faculdades e Universidades)": (
        "Quantos alunos e unidades, quantas visitas de captação por ano, existe auditório?",
        "Qual a conversão de visita em matrícula? A infraestrutura é citada pelos pais como critério?",
        "Quanto vale cada matrícula perdida ao longo dos anos de curso? Quanto gastam em locação para formaturas e eventos?",
        "Se o auditório e o pátio mostrassem inovação na visita dos pais, como ficaria a captação?"),
    "Saúde (Hospitais, Clínicas e Laboratórios)": (
        "Quantas unidades, fluxo diário de pacientes e tempo médio de espera?",
        "Como os pacientes avaliam a recepção? A sinalização e a chamada são claras?",
        "O que a ansiedade na espera faz com o NPS e as avaliações online? Quantos serviços o paciente desconhece?",
        "Uma recepção que informa, acalma e divulga serviços ajudaria nas metas de satisfação e de receita?"),
    "Arenas, Estádios, Academias e Esportes": (
        "Quantos jogos/eventos/alunos? Quantos patrocinadores hoje e como entregam exposição?",
        "Há fila de patrocinadores sem espaço? O patrocinador pede comprovação?",
        "Quanto de receita de patrocínio fica na mesa por limitação de placas estáticas?",
        "Se o mesmo espaço comportasse 10x mais cotas com comprovação, quanto isso pagaria do investimento?"),
    "Poder Público e Mobiliário Urbano": (
        "Quais canais de comunicação com o cidadão existem? Há concessões ou projetos de cidade inteligente?",
        "A informação de emergência chega rápido a quem está na rua? A cidade tem pontos turísticos digitais?",
        "Quanto custa uma comunicação lenta em emergências? Quanto a cidade perde em turismo e eventos?",
        "Um modelo em que a mídia custeia o equipamento e a cidade ganha comunicação pública faria sentido?"),
}

# Briefing técnico-comercial para orçar por nicho: (dados técnicos essenciais, perguntas de qualificação BANT, armadilhas de orçamento)
ORCAMENTO = {
    "Varejo de Moda e Vitrines": ("Medidas da vitrine; vidro (painel atrás do vidro = alto brilho ou LED transparente); incidência de sol; horário de funcionamento; distância da calçada; nº de lojas.", "Quem aprova (marketing ou dono)? Orçamento por loja ou para a rede? Data da próxima coleção?", "Orçar brilho de indoor para vitrine com sol direto; esquecer o calendário de coleções como prazo."),
    "Supermercados, Atacarejos e Home Centers": ("Nº de lojas e checkouts; pontos (entrada, gôndola, checkout, fachada); infraestrutura de rede/energia; integração com preços.", "Trade/marketing ou operações decide? Indústria vai cofinanciar? Piloto em quantas lojas?", "Orçar só hardware sem modelo de retail media e gestão de conteúdo."),
    "Farmácias e Drogarias": ("Fachada (medidas, manual da marca); áreas internas; nº de lojas e aberturas; regras do franqueador.", "Franqueador aprova? Indústria cofinancia? Meta de rollout?", "Ignorar manual de marca e aprovação do franqueador."),
    "Postos de Combustível e Conveniência": ("Totem existente (medidas, estrutura); distância e velocidade da via; exposição a sol/chuva (IP65); bandeira e regras da distribuidora.", "Proprietário decide sozinho? Bandeira exige padrão? Prazo da reforma?", "Pixel pitch fino demais (caro e desnecessário para leitura a distância); esquecer aprovação da bandeira."),
    "DOOH e Investidores de Mídia": ("Ponto (endereço, fluxo, ângulo, distância); estrutura e laudo; licenciamento municipal; energia; horas de operação/dia.", "Capital próprio ou financiado? Expectativa de payback? Já tem anunciantes?", "Orçar o painel sem validar licença e estrutura; subestimar manutenção e uptime."),
    "Shopping Centers": ("Local (praça, empena, fachada); medidas; formato (curvo, 3D anamórfico); distância do público; integração com mall media.", "Superintendência ou administradora aprova? Orçamento CAPEX do ano? Data-alvo (Natal)?", "Perder a janela de aprovação do orçamento anual do shopping."),
    "Concessionárias de Veículos": ("Parede do showroom (medidas); distância de visualização; fachada; necessidade de painel móvel para eventos.", "Grupo ou loja decide? Montadora cofinancia? Próximo lançamento?", "Não envolver a regional da montadora."),
    "Construtoras e Stands de Vendas": ("Medidas do stand e do tapume; tempo de permanência; reaproveitamento previsto; outdoor x indoor.", "Incorporação ou marketing decide? Compra ou locação? Data do lançamento?", "Orçar compra quando o caso é locação (ou vice-versa) sem mostrar o comparativo."),
    "Franquias e Redes": ("Formatos de loja; nº de unidades e aberturas; padrão visual; quem paga (franqueador/franqueado).", "Diretor de expansão aprova kit? Fornecedor homologado? Financiamento ao franqueado?", "Orçar loja a loja em vez de um kit padrão homologado."),
    "Bares, Restaurantes e Food Service": ("Pontos (menu board, fachada, salão); medidas; distância do balcão; horas de operação.", "Dono decide? Orçamento por casa? Abertura/reforma prevista?", "Superdimensionar; menu board precisa de leitura de perto (pitch mais fino)."),
    "Igrejas e Centros Religiosos": ("Largura e altura do palco; distância ao primeiro e ao último banco; iluminação; transmissão; estrutura (piso ou suspenso).", "Pastor, conselho ou assembleia aprova? Campanha de arrecadação? Data (Páscoa, Natal, conferência)?", "Ignorar a distância do primeiro banco (define o pitch); não preparar material para o conselho."),
    "Hotéis, Parques, Clubes e Piscinas": ("Espaços (salões, piscina, área aberta); outdoor (IP65); medidas; histórico de locações.", "Gerente geral ou conselho? CAPEX ou OPEX? Alta temporada?", "Orçar indoor para área aberta/molhada."),
    "Eventos, Agências e Produtoras": ("Datas, local, montagem/desmontagem; medidas; formato; conteúdo; operação técnica; backup.", "Quem é o cliente final? Orçamento fechado do job? Prazo de aprovação?", "Esquecer frete, montagem, técnico e processador no orçamento de locação."),
    "Corporativo (Comunicação Interna e Recepções)": ("Pontos (recepção, auditório, fábrica, refeitório); nº de unidades; integração com TI; segurança da informação.", "RH, comunicação ou facilities? Ciclo de orçamento anual? TI precisa homologar?", "Não envolver TI cedo (integração e segurança)."),
    "Educação (Escolas, Faculdades e Universidades)": ("Auditório (medidas, distância); pátio/fachada; ginásio; uso em eventos.", "Mantenedor decide? Orçamento antes do período de matrículas?", "Perder o timing da campanha de matrículas."),
    "Saúde (Hospitais, Clínicas e Laboratórios)": ("Recepções e corredores; distância de leitura; integração com sistema de senhas; normas da engenharia clínica.", "Diretoria administrativa ou marketing? Processo de compras/cotação formal?", "Ignorar integração com sistema de chamada e normas internas."),
    "Arenas, Estádios, Academias e Esportes": ("Perímetro de campo (metros lineares); telão; distância da arquibancada; resistência a impacto; outdoor.", "Diretoria do clube/arena? Patrocinadores envolvidos? Calendário de jogos?", "Não estruturar o modelo de patrocínio junto com o orçamento."),
    "Poder Público e Mobiliário Urbano": ("Locais; especificação técnica; normas; modelo (compra, concessão, PPP).", "Há dotação orçamentária? Modalidade de licitação? Prazo do edital?", "Especificação técnica genérica que abre espaço para menor preço sem qualidade."),
}

REFERENCIA_TECNICA = [
    ("Pixel pitch x distância", "Regra prática: distância mínima de visualização (m) ≈ pixel pitch (mm). Distância confortável ≈ 2 a 3 vezes isso. Ex.: P3,9 → a partir de ~4 m, ideal 8 a 12 m.", "Referência de mercado; validar com a engenharia LedWave."),
    ("Brilho indoor x outdoor", "Indoor: tipicamente 800 a 1.500 nits. Outdoor/vitrine com sol: 4.500 nits ou mais.", "Referência de mercado; validar com a ficha técnica."),
    ("Proteção", "Outdoor e áreas molhadas exigem grau de proteção IP65 ou superior na frente.", "Referência de mercado."),
    ("Compra x locação", "Uso recorrente (≥ alguns eventos por mês ou uso diário) tende a favorecer compra; uso pontual favorece locação. Sempre mostrar o comparativo.", "Montar com os números do cliente."),
    ("Custo total", "Orçamento completo = painel + estrutura + processador/player + instalação + conteúdo/gestão + garantia/manutenção (+ frete, montagem e técnico em locação).", "Planilha MC_EVENTOS (Drive) como base de locação."),
]

# Cadência outbound: dia, canal, ação, objetivo, modelo
CADENCIA = [
    ("D0", "Pesquisa", "Estudar a conta: site, Instagram, Google Maps/Street View da fachada, notícias, LinkedIn do decisor. Anotar 1 gatilho (inauguração, reforma, lançamento, expansão, evento).", "Ter um motivo real e específico para o contato.", "—"),
    ("D1", "LinkedIn", "Pedido de conexão sem pitch, com nota personalizada.", "Ser reconhecido antes da ligação.", "{Nome}, acompanho a {Empresa} e vi {gatilho}. Trabalho com comunicação digital para {nicho}. Seria bom ter você na rede."),
    ("D2", "Ligação", "Cold call de 2 a 3 minutos. Objetivo: agendar 20 minutos, não vender.", "Agendar diagnóstico.", "Ver aba Script Cold Call."),
    ("D2", "WhatsApp", "Mensagem curta pós-ligação (atendeu ou não).", "Deixar registro e um gancho.", "{Nome}, aqui é {Vendedor}, da LedWave. Tentei falar com você sobre {gatilho}. Tenho uma ideia de como {dor do nicho em 1 linha}. Faz sentido 20 min na {dia}?"),
    ("D4", "E-mail", "E-mail com insight do nicho (Challenger) + 1 imagem antes/depois.", "Ensinar algo novo.", "Assunto: {Empresa} + uma ideia para {dor}. Corpo: 1 insight + 1 prova + 1 pergunta. Máx. 90 palavras."),
    ("D6", "Ligação", "Segunda tentativa em outro horário (início da manhã ou fim da tarde).", "Agendar.", "Abrir citando o e-mail: 'Te mandei uma imagem de como ficaria a fachada de vocês...'"),
    ("D8", "LinkedIn/Instagram", "Interagir com conteúdo do decisor ou da empresa; enviar case do mesmo nicho.", "Prova social.", "{Nome}, fizemos isso para uma {empresa do nicho}. Lembrei de vocês por causa de {gatilho}."),
    ("D11", "Vídeo/áudio", "Vídeo de 45 s (ou áudio) personalizado com mockup da fachada/espaço do cliente.", "Quebrar o padrão.", "Mostrar o espaço dele com o painel e fazer 1 pergunta."),
    ("D14", "E-mail de término", "E-mail 'break-up' educado.", "Gerar resposta.", "{Nome}, imagino que não seja prioridade agora. Posso encerrar por aqui ou volto a falar em {mês}? Uma palavra já me ajuda."),
]

COLD_CALL = [
    ("1. Permissão (10 s)", "Oi, {Nome}? Aqui é {Vendedor}, da LedWave. Eu te liguei sem avisar. Posso te tomar 30 segundos e você decide se continuamos?", "Reduz a defesa. Quem dá permissão escuta."),
    ("2. Motivo (20 s)", "Vi que {gatilho: vocês estão abrindo a loja X / lançando o empreendimento Y}. Nós trabalhamos com {nicho} e normalmente as empresas nos chamam quando {dor do nicho}.", "Mostra que você estudou. Fala da dor, não do produto."),
    ("3. Pergunta de dor (30 s)", "Isso acontece por aí também, ou vocês já resolveram? (Escolha 1 pergunta de Problema da aba SPIN por Nicho)", "Pergunta aberta. Cale-se e escute."),
    ("4. Escuta + aprofundamento", "Entendi. Quando você diz '{palavra do cliente}', o que isso significa na prática? E quanto isso custa hoje?", "Espelhamento + implicação."),
    ("5. Mini-prova (15 s)", "Fizemos algo parecido para {empresa do nicho}, e {resultado/qualitativo}. Somos a LedWave, número 1 do segmento no ranking da Exame.", "Uma prova só, do mesmo nicho."),
    ("6. Pedido de reunião", "Faz sentido conversarmos 20 minutos para eu entender o seu cenário e te mostrar como ficaria no seu espaço? Terça às 10h ou quinta às 15h?", "Fechamento por escolha. Objetivo é a agenda, não a venda."),
    ("Objeção: 'Me manda por e-mail'", "Mando sim. Para não te mandar algo genérico: qual é hoje o seu maior desafio com {dor}? Assim o material já vai certo, e eu te ligo na quinta para ver se fez sentido.", "Transformar a fuga em qualificação."),
    ("Objeção: 'Não tenho interesse'", "Justo. Só por curiosidade: é porque já resolveram {dor} ou porque não é prioridade agora?", "Descobrir o motivo real."),
    ("Objeção: 'Já tenho fornecedor'", "Ótimo, é sinal de que vocês valorizam isso. Se tivesse uma coisa que você melhoraria no seu fornecedor atual, qual seria?", "Encontrar a brecha."),
]

ESCUTA_ATIVA = [
    ("Regra 70/30", "O cliente fala 70% do tempo na descoberta. Se você está falando mais, está vendendo cedo demais.", "Cronometre um roleplay: quem falou mais?"),
    ("Silêncio de 3 segundos", "Depois de uma resposta, conte até 3 antes de falar. O cliente costuma completar com a informação mais valiosa.", "—"),
    ("Espelhamento", "Repita as últimas 2 ou 3 palavras do cliente em tom de pergunta. Ele aprofunda sozinho.", "Cliente: '...a troca de campanha é um caos.' Você: 'Um caos?'"),
    ("Rotulagem (labeling)", "Nomeie a emoção ou a situação: 'Parece que…', 'Dá a impressão de que…'.", "'Parece que a operação de impressos tira tempo do seu time.'"),
    ("Paráfrase + confirmação", "Resuma com as palavras dele e peça confirmação. Evita proposta errada.", "'Se eu entendi bem, o principal é X, depois Y. Correto?'"),
    ("Anotar as palavras do cliente", "Use no fechamento exatamente as palavras que ele usou na descoberta.", "Ele disse 'caos'? Na proposta: 'fim do caos na troca de campanha'."),
    ("Pergunta 'o que mais?'", "Antes de seguir, pergunte 'o que mais?'. A segunda dor costuma ser a mais importante.", "—"),
    ("Não interromper nem completar frases", "Interromper sinaliza que você já sabe a resposta, e o cliente para de contar.", "—"),
    ("Escutar o não dito", "Observe hesitação, mudança de tom, quem olha para quem numa reunião com mais de uma pessoa.", "'Notei que você hesitou quando falamos de prazo. O que te preocupa?'"),
]

# Método para tratar objeções (aumentar a taxa de conversão de objeções)
METODO_OBJECAO = [
    ("1. Ouvir até o fim", "Não interrompa. A objeção dita pela metade esconde a real."),
    ("2. Acolher", "'Faz sentido você pensar nisso.' Nunca 'mas'; use 'e'."),
    ("3. Explorar (isolar)", "'Além disso, tem mais alguma coisa que te impede de seguir?' e 'O que te faz pensar assim?'"),
    ("4. Responder com prova", "Resposta da aba Objeções + 1 prova (case, número, garantia)."),
    ("5. Confirmar", "'Isso responde a sua dúvida?' Se sim, avance para o próximo passo na hora."),
    ("Indicador", "Taxa de conversão de objeções = objeções superadas que avançaram de etapa ÷ objeções registradas. Registre no Banco de Ideias as respostas que funcionaram."),
]

# Roleplay 1
ROLEPLAY_CENARIO = [
    ("Nicho", "Farmácias e Drogarias"),
    ("Cliente (persona)", "Marta, Diretora de Marketing de uma rede regional com 38 lojas, 4 aberturas previstas no ano. Pragmática, ocupada, já foi abordada por fornecedores de TV/digital signage."),
    ("Contexto", "Primeira reunião por vídeo, 20 minutos, agendada após cold call. Gatilho: a rede anunciou novas lojas no Instagram."),
    ("Objetivo do vendedor", "Descobrir dor, implicação e decisores, e sair com visita técnica agendada na loja âncora."),
    ("Instruções para quem faz a Marta", "Responda de forma curta no início. Só abra informações se o vendedor fizer boas perguntas. Use 2 objeções: 'Já tentamos TVs e ninguém olhava' e 'Preciso ver com o diretor financeiro'. Revele, só se perguntarem, que a indústria pediu mais exposição nas lojas."),
    ("Tempo", "15 minutos de roleplay + 10 minutos de feedback."),
]

ROLEPLAY_SCRIPT = [
    ("Abertura", "Vendedor", "Marta, obrigado pelo tempo. Para aproveitar bem os 20 minutos: queria entender o momento da rede, te mostrar uma ou duas ideias e, se fizer sentido, combinar um próximo passo. Pode ser?", "Agenda clara + permissão"),
    ("Abertura", "Cliente", "Pode. Mas já adianto que temos pouco tempo.", "—"),
    ("Situação", "Vendedor", "Vi que vocês vão abrir 4 lojas este ano. Parabéns. Como a comunicação nas lojas funciona hoje, das campanhas à fachada?", "Pergunta de Situação com gatilho"),
    ("Situação", "Cliente", "Basicamente impressos. A agência cria, a gráfica imprime e a gente distribui.", "—"),
    ("Problema", "Vendedor", "E quanto tempo leva entre a campanha ficar pronta e estar aplicada nas 38 lojas?", "Problema"),
    ("Problema", "Cliente", "Uns 10, 15 dias. Às vezes a campanha acaba e tem loja que ainda não aplicou.", "—"),
    ("Escuta ativa", "Vendedor", "Ainda não aplicou?", "Espelhamento (e silêncio)"),
    ("Escuta ativa", "Cliente", "É. E a indústria vive pedindo mais exposição, mas não temos espaço nem como provar o que foi exposto.", "Informação de ouro revelada"),
    ("Implicação", "Vendedor", "Deixa eu ver se entendi: a campanha chega atrasada em parte das lojas, e a indústria quer investir mas vocês não têm onde nem como provar. Quanto você acha que isso representa em verba de trade que vocês deixam de capturar por ano?", "Paráfrase + Implicação"),
    ("Implicação", "Cliente", "Nunca calculei. Mas não é pouco.", "—"),
    ("Objeção 1", "Cliente", "Só que já testamos TV em duas lojas e ninguém olhava.", "Objeção"),
    ("Tratamento", "Vendedor", "Faz todo sentido você ficar com o pé atrás. Posso perguntar: onde ficavam as TVs e que conteúdo passava? (Ouve.) O que a gente costuma ver é que TV pequena, com conteúdo institucional longo, vira paisagem. Painel de LED na fachada e no corredor de dermo, com conteúdo curto da indústria, é outra coisa: brilho e escala chamam o olhar. Uma rede como a Farmelhor, que esteve no nosso LedCast, é um bom exemplo de como pensar isso.", "Acolher → Explorar → Responder com prova"),
    ("Necessidade", "Vendedor", "Se as telas fossem em boa parte pagas pela indústria, com relatório de exibição, e a campanha chegasse às 38 lojas no mesmo minuto, isso ajudaria nas metas deste ano?", "Need-payoff: o cliente diz o valor"),
    ("Necessidade", "Cliente", "Ajudaria bastante, principalmente nas lojas novas.", "—"),
    ("Objeção 2", "Cliente", "Mas isso vai ter que passar pelo diretor financeiro.", "Objeção de autoridade"),
    ("Tratamento", "Vendedor", "Ótimo, é importante ele estar junto. O que ele costuma olhar primeiro num investimento assim: payback, fluxo de caixa ou risco? (Ouve.) Proponho o seguinte: faço a visita técnica na loja âncora, monto a conta com a receita da indústria e a economia de impressos, e apresentamos juntos para ele. Você prefere terça ou quinta para a visita?", "Coaching do campeão + fechamento por escolha"),
    ("Fechamento", "Cliente", "Quinta de manhã.", "Compromisso com data"),
    ("Fechamento", "Vendedor", "Fechado: quinta, 9h, na loja do centro. Te mando o convite agora e levo uma simulação da fachada com a identidade de vocês. Obrigado, Marta.", "Confirmação + próximo passo concreto"),
]

ROLEPLAY_AVALIACAO = [
    ("Abertura com agenda e permissão", "Combinou objetivo e tempo da reunião?"),
    ("Uso do gatilho", "Citou algo específico da empresa do cliente?"),
    ("Perguntas SPIN", "Fez ao menos 1 pergunta de cada tipo (S, P, I, N)?"),
    ("Escuta ativa (70/30)", "O cliente falou mais que o vendedor? Usou espelhamento/silêncio?"),
    ("Paráfrase", "Resumiu a dor com as palavras do cliente?"),
    ("Tratamento de objeções", "Acolheu, explorou e respondeu com prova, sem discutir?"),
    ("Mapeamento de decisores", "Descobriu quem decide e quais critérios usa?"),
    ("Prova social do nicho", "Usou uma prova do mesmo nicho?"),
    ("Fechamento por escolha", "Saiu com próximo passo, data e hora?"),
    ("Tom e confiança", "Falou com calma, sem pressa e sem jargão técnico?"),
]
