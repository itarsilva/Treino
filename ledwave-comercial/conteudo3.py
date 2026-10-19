# Insights da reunião com o time comercial (lista original + estruturação).
# Itens com "Confirmar" dependem de detalhe que o comercial precisa validar.

# Propósitos de compra: (propósito, o que o cliente quer de verdade, pergunta para identificar, resultados esperados ligados)
PROPOSITOS = [
    ("Mídia", "Vender espaço na tela para anunciantes e transformar o painel em fonte de receita.",
     "Você pensa em vender espaço na tela para outras marcas?", "Monetização; aumento de receita; impacto"),
    ("Eficiência operacional", "Trocar impressos, reduzir retrabalho e atualizar a comunicação de várias unidades de um só lugar.",
     "Quanto tempo e dinheiro a sua equipe gasta hoje para trocar a comunicação?", "Eficiência ops; economia; dinamismo; facilidade técnica"),
    ("Branding", "Fortalecer a marca e ser lembrado: a tela como assinatura visual da empresa.",
     "O que você quer que as pessoas lembrem da sua marca quando passam por aqui?", "Empoderamento da mensagem; modernidade; diferencial competitivo"),
    ("Retrofit / arquitetura", "Modernizar fachadas, halls e prédios, integrando o LED ao projeto arquitetônico.",
     "Existe uma reforma ou um projeto de arquitetura em andamento?", "Beleza; modernidade; longevidade; qualidade"),
    ("Retail media", "Fazer do ponto de venda um canal de mídia vendido para a indústria.",
     "A indústria já paga por exposição nas suas lojas? Ela pede comprovação?", "Monetização; aumento do fluxo no PDV; aumento de receita"),
    ("Trade", "Executar e comprovar as ações de trade marketing no PDV, no tempo certo.",
     "Como as campanhas de trade chegam às lojas hoje, e como você comprova a execução?", "Aumento do fluxo no PDV; dinamismo; eficiência ops"),
    ("Insumo de trabalho", "Usar o painel como ferramenta do dia a dia: palco, culto, aula, transmissão, evento.",
     "Com que frequência você precisa de tela para trabalhar (eventos, cultos, aulas, transmissões)?", "Disponibilidade física; equipe técnica; garantia; facilidade técnica"),
    ("Experiência", "Encantar o cliente, o visitante ou o colaborador e fazer o espaço ser lembrado.",
     "O que você quer que as pessoas sintam quando entram aqui?", "Impacto; fidelização; realização; inovação"),
    ("Entretenimento", "Atrair e reter público com conteúdo, shows, jogos e atrações.",
     "Que tipo de atração faria o seu público voltar mais vezes?", "Fidelização; impacto; aumento de receita; exclusividade"),
    ("Status", "Ter o painel mais impressionante, a referência da cidade ou do setor.",
     "Que projeto de LED você viu e pensou: eu quero isso para nós?", "Exclusividade; diferencial competitivo; inovação; realização"),
]

# Diferenciais: (diferencial, como falar para o cliente, prova / o que levar, status)
DIFERENCIAIS = [
    ("Joint venture", "Somamos forças com parceiros de mídia para entregar não só a tela, mas o negócio de mídia por trás dela.", "Nome e escopo da joint venture (ex.: WeOOH?)", "Confirmar"),
    ("Modelo comercial", "Montamos o modelo que cabe no seu negócio: compra, locação, mídia compartilhada ou combinações.", "Tabela de modelos comerciais", "Confirmar"),
    ("Locação / venda", "Você escolhe: comprar, alugar ou começar alugando e depois comprar.", "Comparativo compra x locação", "OK"),
    ("Capilaridade de atendimento", "Atendemos o Brasil inteiro a partir de Goiânia, São Paulo e Brasília, e os EUA por Orlando.", "Mapa de atendimento e equipes", "OK"),
    ("Estoque", "Temos estoque próprio: menos espera entre a assinatura e a tela acesa.", "Prazo médio de entrega", "Confirmar prazos"),
    ("Acervo", "Um acervo amplo de modelos e formatos para cada aplicação: indoor, outdoor, curvo, transparente, piso.", "Catálogo de produtos / acervo de locação", "Confirmar significado"),
    ("Tempo de vida", "Mais de 15 anos de mercado e painéis feitos para durar.", "Ano de fundação + vida útil dos painéis", "Confirmar significado"),
    ("Know-how", "Mais de 15 anos fabricando, instalando e operando painéis de LED: sabemos o que funciona em cada tipo de espaço, do PDV ao maior painel da América Latina.", "Histórico de projetos + Boulevard.Live", "OK"),
    ("Prova social", "Marcas como Nordestão, Rosewood, Beto Carrero World e Museu do Amanhã escolheram a LedWave.", "Cases e depoimentos", "OK"),
    ("Única fábrica", "Fabricamos no Brasil, com linha de produção própria em Goiânia.", "Confirmar se é a única fábrica do Brasil antes de dizer 'única'", "Confirmar"),
    ("Certificações", "Produtos certificados e processos dentro das normas.", "Lista de certificações", "Confirmar lista"),
    ("Pioneira", "Fomos pioneiros em trazer a fabricação de painéis de LED para o Brasil.", "Histórico 2010/2011", "Confirmar"),
    ("Solução 360", "Do projeto ao conteúdo: diagnóstico, fabricação, estrutura, instalação, software, conteúdo e suporte.", "Fluxo da solução", "OK"),
    ("Garantias", "Garantia de fábrica e suporte técnico próprio.", "Termos de garantia", "Confirmar prazos"),
    ("Customização", "Cada projeto é feito sob medida: formato, tamanho, resolução e acabamento.", "Projetos especiais (curvos, 3D, transparentes)", "OK"),
    ("Veículo de mídia", "A LedWave também opera mídia, como o Boulevard.Live, o maior painel de LED da América Latina.", "Boulevard.Live (1.125 m²)", "OK"),
    ("Software e programática", "Software de gestão de conteúdo e venda programática de mídia.", "Demonstração do software", "Confirmar nome do software"),
    ("Liderança", "Nº 1 do segmento de painéis de LED no ranking Exame Negócios em Expansão 2025.", "Ranking Exame", "OK"),
    ("Premiações", "Quatro anos seguidos no ranking Exame das empresas que mais crescem.", "Ranking Exame + outros prêmios", "Confirmar outros prêmios"),
]

# Objeções trazidas pelo comercial: (objeção, categoria, resposta, prova / o que levar)
OBJECOES_COMERCIAL = [
    ("Fobia digital", "Percepção", "Atualizar a tela é tão simples quanto postar no Instagram. Treinamos a sua equipe, e a LedWave pode cuidar do conteúdo para você.", "Demonstração do software no celular"),
    ("Preço", "Financeira", "Vamos comparar o custo total: impressos, locações e vendas perdidas de um ano contra o investimento no painel, que fica com você por muitos anos.", "Planilha de custo total / payback"),
    ("Qualidade", "Técnica", "Venha ver de perto: fabricamos no Brasil, com garantia e suporte próprio. E marcas como Rosewood e Museu do Amanhã aprovaram essa qualidade.", "Visita ao showroom + cases"),
    ("Gestão de conteúdo", "Operacional", "Você não fica sozinho: entregamos o software, o treinamento e, se quiser, a produção e a programação do conteúdo.", "Pacote de conteúdo"),
    ("Fabricação de estrutura metálica", "Técnica", "A estrutura faz parte do projeto: dimensionamos, fabricamos e instalamos com responsabilidade técnica, sem você precisar de outro fornecedor.", "Projeto estrutural + ART"),
    ("Manutenção", "Operacional", "Temos equipe técnica e estoque de peças próprios, e oferecemos contrato de manutenção preventiva.", "Contrato de manutenção"),
    ("SLA", "Operacional", "O prazo de atendimento fica escrito no contrato. [Preencher prazos oficiais de SLA]", "Contrato com SLA"),
    ("Política comercial", "Financeira", "Explique as condições com transparência e leve a proposta já dentro da alçada aprovada, com alternativas.", "Tabela de condições"),
    ("Política local / licenças", "Regulatória", "Apoiamos o licenciamento: projeto técnico, documentação e orientação sobre as regras da sua cidade.", "Checklist de licenciamento"),
    ("Forma de pagamento", "Financeira", "Temos opções: à vista, parcelado, financiamento e locação. Montamos a que cabe no seu fluxo de caixa.", "Simulação de pagamento"),
    ("Política de pagamento / locação / WDC", "Financeira", "[Confirmar o que é WDC] Apresente as regras de pagamento e locação de forma simples, com um exemplo numérico.", "Tabela de condições"),
    ("Momento financeiro", "Financeira", "Podemos começar por um piloto ou pela locação, que vira despesa mensal em vez de investimento, e crescer por fases.", "Proposta em fases"),
    ("Cenário mercadológico", "Percepção", "Em mercado difícil, quem se destaca no ponto de venda ganha participação. E a mídia digital fora de casa segue crescendo no Brasil.", "Dados de mercado (DOOH, retail media)"),
    ("Crédito", "Financeira", "Trabalhamos com parceiros de financiamento e com locação, que exige menos crédito do que a compra.", "Parceiros de financiamento"),
    ("Insegurança técnica", "Técnica", "Fazemos a visita técnica, mostramos a especificação certa para o seu espaço e você vê uma demonstração antes de decidir.", "Visita técnica + demonstração"),
    ("Aprovação por financeiro", "Decisão", "Preparo um resumo de uma página com investimento, retorno e prazo, e apresento junto com você para o financeiro.", "Business case de 1 página"),
    ("Concorrência", "Percepção", "Compare fábrica, estoque, equipe técnica, garantia e cases. O mais barato que apaga custa mais caro.", "Comparativo técnico"),
    ("Percepção de valor", "Percepção", "O valor não está na tela, está no que ela gera: receita de mídia, economia de impressos, fluxo e marca. Vamos colocar esses números lado a lado.", "Cases com resultado"),
    ("Consumo de energia", "Técnica", "O LED é eficiente, e o projeto inclui ajuste automático de brilho e programação de horário. Calculamos o consumo real do seu painel na proposta.", "Cálculo de consumo no projeto"),
]

# Cases citados pelo comercial: (case, segmento provável, propósitos, status)
CASES = [
    ("Nordestão", "Supermercados, Atacarejos e Home Centers", "Retail media; Trade; Eficiência operacional", "Detalhar"),
    ("Animalia", "Hotéis, Parques, Clubes e Piscinas", "Entretenimento; Experiência", "Confirmar segmento e detalhar"),
    ("Rosewood", "Hotéis, Parques, Clubes e Piscinas", "Status; Experiência; Retrofit / arquitetura", "Detalhar"),
    ("Beto Carrero World", "Hotéis, Parques, Clubes e Piscinas", "Entretenimento; Experiência", "Detalhar"),
    ("Cestto", "[Confirmar segmento]", "", "Confirmar"),
    ("Museu do Amanhã", "Poder Público e Mobiliário Urbano", "Experiência; Retrofit / arquitetura", "Detalhar"),
]

RESULTADOS = ["Beleza", "Monetização", "Impacto", "Empoderamento da mensagem", "Modernidade", "Eficiência ops",
              "Disponibilidade física", "Garantia", "Equipe técnica", "Longevidade", "Economia", "Aumento de receita",
              "Fidelização", "Dinamismo", "Aumento do fluxo no PDV", "Facilidade técnica", "Realização", "Inovação",
              "Exclusividade", "Qualidade", "Diferencial competitivo"]

# Nicho -> (propósitos principais, cases de referência, objeções mais prováveis)
NICHO_MAPA = {
    "Varejo de Moda e Vitrines": (["Branding", "Experiência", "Trade"], [], ["Preço", "Gestão de conteúdo", "Percepção de valor"]),
    "Supermercados, Atacarejos e Home Centers": (["Retail media", "Trade", "Eficiência operacional"], ["Nordestão"], ["Gestão de conteúdo", "Aprovação por financeiro", "Momento financeiro"]),
    "Farmácias e Drogarias": (["Retail media", "Trade", "Branding"], [], ["Política comercial", "Gestão de conteúdo", "Percepção de valor"]),
    "Postos de Combustível e Conveniência": (["Mídia", "Eficiência operacional", "Branding"], [], ["Política local / licenças", "Fabricação de estrutura metálica", "Consumo de energia"]),
    "DOOH e Investidores de Mídia": (["Mídia", "Status", "Retrofit / arquitetura"], [], ["Política local / licenças", "SLA", "Crédito"]),
    "Shopping Centers": (["Experiência", "Entretenimento", "Mídia"], [], ["Aprovação por financeiro", "Concorrência", "Percepção de valor"]),
    "Concessionárias de Veículos": (["Status", "Experiência", "Branding"], [], ["Preço", "Momento financeiro", "Gestão de conteúdo"]),
    "Construtoras e Stands de Vendas": (["Status", "Retrofit / arquitetura", "Experiência"], [], ["Forma de pagamento", "Fabricação de estrutura metálica", "Preço"]),
    "Franquias e Redes": (["Branding", "Eficiência operacional", "Trade"], [], ["Forma de pagamento", "Crédito", "Gestão de conteúdo"]),
    "Bares, Restaurantes e Food Service": (["Entretenimento", "Experiência", "Eficiência operacional"], [], ["Preço", "Fobia digital", "Momento financeiro"]),
    "Igrejas e Centros Religiosos": (["Insumo de trabalho", "Experiência", "Entretenimento"], [], ["Forma de pagamento", "Insegurança técnica", "Aprovação por financeiro"]),
    "Hotéis, Parques, Clubes e Piscinas": (["Entretenimento", "Experiência", "Status"], ["Beto Carrero World", "Rosewood", "Animalia"], ["Consumo de energia", "Manutenção", "Momento financeiro"]),
    "Eventos, Agências e Produtoras": (["Insumo de trabalho", "Entretenimento", "Experiência"], [], ["Preço", "SLA", "Concorrência"]),
    "Corporativo (Comunicação Interna e Recepções)": (["Branding", "Status", "Retrofit / arquitetura"], [], ["Aprovação por financeiro", "Gestão de conteúdo", "Percepção de valor"]),
    "Educação (Escolas, Faculdades e Universidades)": (["Insumo de trabalho", "Experiência", "Status"], ["Museu do Amanhã"], ["Momento financeiro", "Forma de pagamento", "Fobia digital"]),
    "Saúde (Hospitais, Clínicas e Laboratórios)": (["Eficiência operacional", "Experiência", "Branding"], [], ["Insegurança técnica", "Aprovação por financeiro", "Consumo de energia"]),
    "Arenas, Estádios, Academias e Esportes": (["Entretenimento", "Mídia", "Experiência"], [], ["Crédito", "Manutenção", "Fabricação de estrutura metálica"]),
    "Poder Público e Mobiliário Urbano": (["Mídia", "Experiência", "Retrofit / arquitetura"], ["Museu do Amanhã"], ["Política local / licenças", "Consumo de energia", "SLA"]),
}
