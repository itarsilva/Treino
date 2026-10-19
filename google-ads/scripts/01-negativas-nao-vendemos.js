/**
 * LedWave — Script 01: lista de negativas "Não vendemos"
 *
 * O que faz:
 *  1. Cria a lista compartilhada de palavras-chave negativas "Não vendemos"
 *     (se já existir, reaproveita e só adiciona os termos que faltam).
 *  2. Aplica a lista em todas as campanhas de PESQUISA ATIVAS.
 *
 * Não altera lances, orçamentos, anúncios nem status de campanhas.
 * Sempre clique em "Visualizar" antes de "Executar".
 */

var NOME_DA_LISTA = 'Não vendemos';

// Sem aspas = correspondência ampla; "entre aspas" = correspondência de frase.
var NEGATIVAS = [
  'fita', 'lâmpada', 'lampada', 'luminária', 'luminaria', 'plafon',
  'embutir', 'sobrepor', 'refletor', 'spot',
  '12w', '18w', '24w', '36w', '40w',
  'neon', 'acrílico', 'acrilico', 'projetor',
  'grátis', 'gratis', 'atacado',
  'curso', 'cursos', 'emprego', 'vaga', 'vagas', 'salário', 'salario',
  'pdf', 'shopee', 'usado', 'usados',
  '"luz de led"', '"luz led"', '"letreiro neon"', '"letreiro luminoso"',
  '"fornecedor de led"', '"anuncie aqui"', '"como fazer"', '"mercado livre"'
];

function main() {
  var lista = obterOuCriarLista();
  adicionarNegativasQueFaltam(lista);
  aplicarNasCampanhasDePesquisa(lista);
  Logger.log('Concluído.');
}

function obterOuCriarLista() {
  var existentes = AdsApp.negativeKeywordLists()
      .withCondition("shared_set.name = '" + NOME_DA_LISTA + "'")
      .get();
  if (existentes.hasNext()) {
    Logger.log('Lista "' + NOME_DA_LISTA + '" já existe — reaproveitando.');
    return existentes.next();
  }
  Logger.log('Criando lista "' + NOME_DA_LISTA + '".');
  return AdsApp.newNegativeKeywordListBuilder()
      .withName(NOME_DA_LISTA)
      .build()
      .getResult();
}

function adicionarNegativasQueFaltam(lista) {
  var jaNaLista = {};
  var atuais = lista.negativeKeywords().get();
  while (atuais.hasNext()) {
    jaNaLista[atuais.next().getText().toLowerCase()] = true;
  }
  var novas = NEGATIVAS.filter(function (termo) {
    return !jaNaLista[termo.toLowerCase()];
  });
  if (novas.length === 0) {
    Logger.log('Todas as ' + NEGATIVAS.length + ' negativas já estavam na lista.');
    return;
  }
  lista.addNegativeKeywords(novas);
  Logger.log('Adicionadas ' + novas.length + ' negativas: ' + novas.join(', '));
}

function aplicarNasCampanhasDePesquisa(lista) {
  var campanhas = AdsApp.campaigns()
      .withCondition('campaign.status = ENABLED')
      .withCondition('campaign.advertising_channel_type = SEARCH')
      .get();
  var aplicadas = 0;
  while (campanhas.hasNext()) {
    var campanha = campanhas.next();
    if (jaTemALista(campanha)) {
      Logger.log('Já tinha a lista: ' + campanha.getName());
      continue;
    }
    campanha.addNegativeKeywordList(lista);
    Logger.log('Lista aplicada em: ' + campanha.getName());
    aplicadas++;
  }
  Logger.log('Lista aplicada em ' + aplicadas + ' campanha(s) de pesquisa.');
}

function jaTemALista(campanha) {
  var listas = campanha.negativeKeywordLists().get();
  while (listas.hasNext()) {
    if (listas.next().getName() === NOME_DA_LISTA) {
      return true;
    }
  }
  return false;
}
