/**
 * LedWave — Script 03: cada busca na sua campanha
 *
 * O que faz:
 *  1. Negativa "painel de led", "painel led" e "painel de led preço" (exatas) na
 *     campanha Parques, Clubes e Hotéis — essas buscas ficam só na Topo.
 *  2. Marca num lugar só: negativa "ledwave" e "led wave" (frase) em todas as
 *     campanhas de pesquisa ativas, EXCETO a LEADS - Search - Painéis de LED.
 *  3. Adiciona novos termos fora do público à lista compartilhada "Não vendemos".
 *
 * Não altera lances, orçamentos, anúncios nem status de campanhas.
 * Rodar duas vezes não duplica nada. Sempre clique em "Visualizar" antes de "Executar".
 */

var ID_PARQUES = 23739914623;
var ID_LEADS = 11097286200;
var NOME_DA_LISTA = 'Não vendemos';

// [colchetes] = exata; "aspas" = frase.
var NEGATIVAS_PARQUES = ['[painel de led]', '[painel led]', '[painel de led preço]'];
var NEGATIVAS_MARCA = ['"ledwave"', '"led wave"'];
var NOVAS_NA_LISTA = [
  '"letras em pvc"', '"fachadas comerciais"', '"distribuidora de leds"',
  '"display slim backlight"', '"como comprar um outdoor"'
];

function main() {
  negativarParques();
  concentrarMarcaNaLeads();
  ampliarListaNaoVendemos();
  Logger.log('Concluído.');
}

function negativarParques() {
  var campanhas = AdsApp.campaigns().withIds([ID_PARQUES]).get();
  if (!campanhas.hasNext()) {
    Logger.log('ATENÇÃO: campanha Parques (' + ID_PARQUES + ') não encontrada.');
    return;
  }
  adicionarNegativasNaCampanha(campanhas.next(), NEGATIVAS_PARQUES);
}

function concentrarMarcaNaLeads() {
  var campanhas = AdsApp.campaigns()
      .withCondition('campaign.status = ENABLED')
      .withCondition('campaign.advertising_channel_type = SEARCH')
      .get();
  var encontrouLeads = false;
  while (campanhas.hasNext()) {
    var campanha = campanhas.next();
    if (campanha.getId() == ID_LEADS) {
      encontrouLeads = true;
      Logger.log('Marca mantida em: ' + campanha.getName());
      continue;
    }
    adicionarNegativasNaCampanha(campanha, NEGATIVAS_MARCA);
  }
  if (!encontrouLeads) {
    Logger.log('ATENÇÃO: a LEADS - Search (' + ID_LEADS + ') não está ativa. ' +
        'Nenhuma campanha ficou com a marca — confira antes de executar.');
  }
}

function adicionarNegativasNaCampanha(campanha, negativas) {
  var existentes = {};
  var atuais = campanha.negativeKeywords().get();
  while (atuais.hasNext()) {
    existentes[atuais.next().getText().toLowerCase()] = true;
  }
  negativas.forEach(function (termo) {
    if (existentes[termo.toLowerCase()]) {
      Logger.log('Já existia ' + termo + ' em: ' + campanha.getName());
      return;
    }
    campanha.createNegativeKeyword(termo);
    Logger.log('Negativa ' + termo + ' adicionada em: ' + campanha.getName());
  });
}

function ampliarListaNaoVendemos() {
  var listas = AdsApp.negativeKeywordLists()
      .withCondition("shared_set.name = '" + NOME_DA_LISTA + "'")
      .get();
  if (!listas.hasNext()) {
    Logger.log('ATENÇÃO: lista "' + NOME_DA_LISTA + '" não encontrada. Rode o script 01 antes.');
    return;
  }
  var lista = listas.next();
  var jaNaLista = {};
  var atuais = lista.negativeKeywords().get();
  while (atuais.hasNext()) {
    jaNaLista[atuais.next().getText().toLowerCase()] = true;
  }
  var novas = NOVAS_NA_LISTA.filter(function (termo) {
    return !jaNaLista[termo.toLowerCase()];
  });
  if (novas.length === 0) {
    Logger.log('Os novos termos já estavam na lista "' + NOME_DA_LISTA + '".');
    return;
  }
  lista.addNegativeKeywords(novas);
  Logger.log('Adicionados à lista "' + NOME_DA_LISTA + '": ' + novas.join(', '));
}
