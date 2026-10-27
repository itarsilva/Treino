/**
 * LedWave — Script 02: relatório semanal na planilha
 *
 * Só LÊ a conta e grava os dados na planilha abaixo. Não altera nada no Google Ads.
 * Abas criadas/atualizadas a cada execução:
 *   - Info                 : quando o relatório foi gerado
 *   - Campanhas ontem      : desempenho por campanha no dia anterior
 *   - Campanhas no período : desempenho por campanha desde o início do plano de mídia (INICIO_PLANO)
 *   - Campanhas 7d         : desempenho por campanha nos últimos 7 dias
 *   - Campanhas 30d        : desempenho por campanha nos últimos 30 dias
 *   - Termos de pesquisa   : buscas com clique nos últimos 7 dias (até 500, maior gasto primeiro)
 *   - Topo diário          : campanha "PSQ | Painel de LED - Topo" dia a dia (30 dias)
 *   - Conversões por ação  : conversões por ação de conversão (30 dias)
 *
 * Agende em: Scripts → coluna Frequência → Diária, 7h.
 */

var URL_DA_PLANILHA =
    'https://docs.google.com/spreadsheets/d/15RyLoBl8HWbat_sHPMp-1kDmy7sVp1E3kEVj3dJsj78/edit';
var ID_CAMPANHA_TOPO = '24316794456';
var MAX_TERMOS = 500;
// Primeiro dia do plano de mídia atual (R$ 17.000 de 27/10 a 25/11/2026).
var INICIO_PLANO = '2026-10-27';

function main() {
  var planilha = SpreadsheetApp.openByUrl(URL_DA_PLANILHA);
  var fuso = AdsApp.currentAccount().getTimeZone();
  var hoje = Utilities.formatDate(new Date(), fuso, 'yyyy-MM-dd');

  escreverAba(planilha, 'Campanhas ontem', relatorioCampanhas('DURING YESTERDAY'));
  escreverAba(planilha, 'Campanhas no período',
      relatorioCampanhas("BETWEEN '" + INICIO_PLANO + "' AND '" + hoje + "'"));
  escreverAba(planilha, 'Campanhas 7d', relatorioCampanhas('DURING LAST_7_DAYS'));
  escreverAba(planilha, 'Campanhas 30d', relatorioCampanhas('DURING LAST_30_DAYS'));
  escreverAba(planilha, 'Termos de pesquisa', relatorioTermos());
  escreverAba(planilha, 'Topo diário', relatorioTopo());
  escreverAba(planilha, 'Conversões por ação', relatorioConversoes());

  escreverAba(planilha, 'Info', [
    ['Conta', 'Atualizado em'],
    [AdsApp.currentAccount().getName(),
     Utilities.formatDate(new Date(), fuso, 'dd/MM/yyyy HH:mm')]
  ]);
  Logger.log('Relatório gravado em ' + URL_DA_PLANILHA);
}

// filtroData: "DURING LAST_7_DAYS" ou "BETWEEN 'aaaa-mm-dd' AND 'aaaa-mm-dd'".
function relatorioCampanhas(filtroData) {
  var linhas = [[
    'Campanha', 'Status', 'Tipo', 'Gasto (R$)', 'Cliques', 'Impressões',
    'CPC médio (R$)', 'Conversões', 'Custo/conv. (R$)', 'Valor conv.',
    'Parcela impr. (pesquisa)'
  ]];
  var rows = AdsApp.report(
      'SELECT campaign.name, campaign.status, campaign.advertising_channel_type, ' +
      'metrics.cost_micros, metrics.clicks, metrics.impressions, ' +
      'metrics.conversions, metrics.conversions_value, metrics.search_impression_share ' +
      'FROM campaign ' +
      'WHERE segments.date ' + filtroData + ' AND metrics.impressions > 0 ' +
      'ORDER BY metrics.cost_micros DESC').rows();
  while (rows.hasNext()) {
    var r = rows.next();
    var gasto = reais(r['metrics.cost_micros']);
    var cliques = num(r['metrics.clicks']);
    var conv = num(r['metrics.conversions']);
    linhas.push([
      r['campaign.name'], r['campaign.status'], r['campaign.advertising_channel_type'],
      gasto, cliques, num(r['metrics.impressions']),
      cliques ? arred(gasto / cliques) : '', arred(conv),
      conv ? arred(gasto / conv) : '', arred(num(r['metrics.conversions_value'])),
      pct(r['metrics.search_impression_share'])
    ]);
  }
  return linhas;
}

function relatorioTermos() {
  var linhas = [['Termo de pesquisa', 'Campanha', 'Gasto (R$)', 'Cliques', 'Conversões']];
  var rows = AdsApp.report(
      'SELECT search_term_view.search_term, campaign.name, ' +
      'metrics.cost_micros, metrics.clicks, metrics.conversions ' +
      'FROM search_term_view ' +
      'WHERE segments.date DURING LAST_7_DAYS AND metrics.clicks > 0 ' +
      'ORDER BY metrics.cost_micros DESC LIMIT ' + MAX_TERMOS).rows();
  while (rows.hasNext()) {
    var r = rows.next();
    linhas.push([
      r['search_term_view.search_term'], r['campaign.name'],
      reais(r['metrics.cost_micros']), num(r['metrics.clicks']),
      arred(num(r['metrics.conversions']))
    ]);
  }
  return linhas;
}

function relatorioTopo() {
  var linhas = [[
    'Data', 'Gasto (R$)', 'Cliques', 'Impressões', 'CPC médio (R$)',
    'Parcela impr.', 'Parcela topo', 'Parcela 1ª posição', 'Conversões'
  ]];
  var rows = AdsApp.report(
      'SELECT segments.date, metrics.cost_micros, metrics.clicks, metrics.impressions, ' +
      'metrics.search_impression_share, metrics.search_top_impression_share, ' +
      'metrics.search_absolute_top_impression_share, metrics.conversions ' +
      'FROM campaign ' +
      'WHERE campaign.id = ' + ID_CAMPANHA_TOPO + ' AND segments.date DURING LAST_30_DAYS ' +
      'ORDER BY segments.date ASC').rows();
  while (rows.hasNext()) {
    var r = rows.next();
    var gasto = reais(r['metrics.cost_micros']);
    var cliques = num(r['metrics.clicks']);
    linhas.push([
      r['segments.date'], gasto, cliques, num(r['metrics.impressions']),
      cliques ? arred(gasto / cliques) : '',
      pct(r['metrics.search_impression_share']),
      pct(r['metrics.search_top_impression_share']),
      pct(r['metrics.search_absolute_top_impression_share']),
      arred(num(r['metrics.conversions']))
    ]);
  }
  return linhas;
}

function relatorioConversoes() {
  var linhas = [['Ação de conversão', 'Conversões', 'Valor']];
  var rows = AdsApp.report(
      'SELECT segments.conversion_action_name, metrics.conversions, metrics.conversions_value ' +
      'FROM customer ' +
      'WHERE segments.date DURING LAST_30_DAYS ' +
      'ORDER BY metrics.conversions DESC').rows();
  while (rows.hasNext()) {
    var r = rows.next();
    linhas.push([
      r['segments.conversion_action_name'],
      arred(num(r['metrics.conversions'])),
      arred(num(r['metrics.conversions_value']))
    ]);
  }
  return linhas;
}

function escreverAba(planilha, nome, linhas) {
  var aba = planilha.getSheetByName(nome) || planilha.insertSheet(nome);
  aba.clearContents();
  aba.getRange(1, 1, linhas.length, linhas[0].length).setValues(linhas);
  aba.getRange(1, 1, 1, linhas[0].length).setFontWeight('bold');
  aba.setFrozenRows(1);
}

function num(valor) {
  var n = Number(String(valor).replace(/,/g, ''));
  return isNaN(n) ? 0 : n;
}

function reais(micros) {
  return arred(num(micros) / 1000000);
}

function arred(n) {
  return Math.round(n * 100) / 100;
}

function pct(valor) {
  if (valor === undefined || valor === null || valor === '' || valor === '--') {
    return '';
  }
  return arred(num(valor) * 100) + '%';
}
