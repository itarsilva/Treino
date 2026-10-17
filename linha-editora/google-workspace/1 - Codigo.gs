/**
 * Linha Editora — app interno (Google Apps Script)
 *
 * Publicar como App da Web com:
 *   Executar como: Eu (itamar@linhaeditora.com.br)
 *   Quem pode acessar: Qualquer pessoa em linhaeditora.com.br
 *
 * Os dados ficam nesta planilha. Os colaboradores NUNCA recebem acesso à planilha:
 * eles só mexem pelo app, e cada ação passa pelas verificações abaixo.
 */

const ADMIN = 'itamar@linhaeditora.com.br';
const AREAS = ['titulos', 'autores', 'producao', 'contatos', 'oportunidades', 'interacoes', 'vendas', 'financeiro'];
const NOME_AREA = {
  titulos: 'Catálogo', autores: 'Autores', producao: 'Produção', contatos: 'Contatos',
  oportunidades: 'Funil de vendas', interacoes: 'Interações', vendas: 'Estoque e faturas', financeiro: 'Financeiro',
};
const ABA_EQUIPE = '_Equipe';
const ABA_REGISTRO = '_Registro';
const META = ['id', 'criado', 'atualizado', 'criadoPor', 'atualizadoPor'];
// Renomear um destes campos atualiza os registros ligados a ele
const LIGACOES = {
  titulos: [['isbn', 'vendas', 'isbn'], ['titulo', 'producao', 'titulo'], ['titulo', 'financeiro', 'titulo']],
  autores: [['nome', 'titulos', 'autor']],
  contatos: [['nome', 'vendas', 'cliente']],
};

// ---------- Entrada ----------
function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Linha Editora')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// ---------- Quem está acessando ----------
function quem_() {
  const email = String(Session.getActiveUser().getEmail() || '').toLowerCase().trim();
  if (!email) throw new Error('SEM_LOGIN');
  const todas = {};
  AREAS.forEach(a => todas[a] = 'editar');
  if (email === ADMIN) return { email, nome: 'Administrador', admin: true, perm: todas };
  const membro = lerEquipe_().find(m => m.email === email);
  if (!membro || membro.ativo === 'Não') throw new Error('SEM_ACESSO:' + email);
  const perm = {};
  AREAS.forEach(a => perm[a] = ['editar', 'ver'].indexOf(membro[a]) >= 0 ? membro[a] : 'nenhum');
  return { email, nome: membro.nome || email, admin: false, perm };
}
function exigir_(u, area, nivel) {
  const p = u.perm[area];
  if (nivel === 'editar' ? p !== 'editar' : p === 'nenhum' || !p) throw new Error('SEM_PERMISSAO');
}
function exigirAdmin_(u) { if (!u.admin) throw new Error('SEM_PERMISSAO'); }

// ---------- Planilha ----------
function planilha_() { return SpreadsheetApp.getActive(); }
function aba_(nome, cabecalho) {
  const ss = planilha_();
  let sh = ss.getSheetByName(nome);
  if (!sh) {
    sh = ss.insertSheet(nome);
    sh.getRange(1, 1, 1, cabecalho.length).setValues([cabecalho]).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}
function cabecalho_(sh) {
  const n = sh.getLastColumn();
  return n ? sh.getRange(1, 1, 1, n).getValues()[0].map(String) : [];
}
function garantirColunas_(sh, chaves) {
  const cab = cabecalho_(sh);
  const novas = chaves.filter(k => cab.indexOf(k) < 0);
  if (novas.length) {
    sh.getRange(1, cab.length + 1, 1, novas.length).setValues([novas]).setFontWeight('bold');
    return cab.concat(novas);
  }
  return cab;
}
function paraTexto_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  return v;
}
function lerAba_(nome) {
  const sh = planilha_().getSheetByName(nome);
  if (!sh || sh.getLastRow() < 2) return [];
  const vals = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
  const cab = vals[0].map(String);
  return vals.slice(1).filter(r => r[0] !== '').map(r => {
    const o = {};
    cab.forEach((k, i) => { if (k && r[i] !== '') o[k] = paraTexto_(r[i]); });
    o.id = String(o.id);
    return o;
  });
}
// Texto vai com apóstrofo: o Planilhas guarda como texto (datas, ISBN, faturas) e não executa fórmulas digitadas
function celula_(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number' || typeof v === 'boolean') return v;
  const s = String(v);
  return s === '' ? '' : "'" + s;
}
function linhaDoId_(sh, id) {
  const n = sh.getLastRow();
  if (n < 2) return -1;
  const ids = sh.getRange(2, 1, n - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(id)) return i + 2;
  return -1;
}
function gravar_(area, reg) {
  const sh = aba_(area, META.slice());
  const cab = garantirColunas_(sh, Object.keys(reg));
  const linha = cab.map(k => celula_(reg[k]));
  const r = linhaDoId_(sh, reg.id);
  if (r > 0) sh.getRange(r, 1, 1, linha.length).setValues([linha]);
  else sh.appendRow(linha);
}

// ---------- Registro de atividades ----------
function registrar_(u, acao, area, registro, mudancas) {
  const sh = aba_(ABA_REGISTRO, ['quando', 'email', 'acao', 'area', 'registro', 'mudancas']);
  sh.appendRow([new Date().toISOString(), u.email, acao, area || '', celula_(String(registro || '').slice(0, 300)), celula_(JSON.stringify(mudancas || []))]);
}
function rotulo_(area, r) {
  if (!r) return '';
  if (area === 'vendas') return [r.tipo || 'Venda', (lerAba_('titulos').find(t => t.isbn === r.isbn) || {}).titulo || r.isbn, (r.quantidade || 0) + ' ex.', r.cliente].filter(Boolean).join(' · ');
  if (area === 'producao') return [r.titulo, r.etapa].filter(Boolean).join(' · ');
  if (area === 'financeiro') return [r.descricao || r.categoria, r.valor].filter(Boolean).join(' · R$ ');
  if (area === 'interacoes') return [r.contatoId, r.tipo, r.data].filter(Boolean).join(' · ');
  return r.titulo || r.nome || r.oportunidade || r.id || '';
}
function diferencas_(antes, depois) {
  const chaves = {};
  Object.keys(antes).concat(Object.keys(depois)).forEach(k => { if (META.indexOf(k) < 0) chaves[k] = 1; });
  return Object.keys(chaves)
    .filter(k => String(antes[k] === undefined ? '' : antes[k]) !== String(depois[k] === undefined ? '' : depois[k]))
    .map(k => ({ campo: k, de: antes[k] === undefined ? '' : String(antes[k]), para: depois[k] === undefined ? '' : String(depois[k]) }));
}

// ---------- Funções chamadas pelo app ----------
function carregar() {
  const u = quem_();
  registrar_(u, 'acessou', '', 'Abriu o espaço da Linha Editora');
  return montar_(u);
}
function atualizar() { return montar_(quem_()); }
function montar_(u) {
  const dados = {};
  AREAS.forEach(a => { dados[a] = u.perm[a] === 'nenhum' ? [] : lerAba_(a); });
  // Nomes de contatos e títulos são necessários para montar as telas mesmo sem acesso à área
  return {
    usuario: u, dados,
    equipe: u.admin ? lerEquipe_() : null,
    planilhaUrl: u.admin ? planilha_().getUrl() : null,
    nomesArea: NOME_AREA,
  };
}

function salvar(area, reg) {
  const u = quem_();
  if (AREAS.indexOf(area) < 0) throw new Error('AREA_INVALIDA');
  exigir_(u, area, 'editar');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const agora = new Date().toISOString();
    const limpo = {};
    Object.keys(reg || {}).forEach(k => { if (META.indexOf(k) < 0 && /^[A-Za-z][A-Za-z0-9]{0,40}$/.test(k)) limpo[k] = reg[k]; });
    let antes = null;
    if (reg && reg.id) antes = lerAba_(area).find(r => r.id === String(reg.id)) || null;
    if (area === 'titulos' && limpo.isbn && lerAba_(area).some(t => t.isbn === limpo.isbn && (!antes || t.id !== antes.id))) throw new Error('ISBN_DUPLICADO');
    let novo;
    if (antes) {
      novo = Object.assign({}, antes, limpo, { atualizado: agora, atualizadoPor: u.email });
      gravar_(area, novo);
      registrar_(u, 'alterou', area, rotulo_(area, novo), diferencas_(antes, novo));
      (LIGACOES[area] || []).forEach(l => {
        const [campo, outra, campoOutra] = l;
        if (antes[campo] && antes[campo] !== novo[campo]) {
          lerAba_(outra).filter(r => r[campoOutra] === antes[campo]).forEach(r => {
            r[campoOutra] = novo[campo]; r.atualizado = agora; r.atualizadoPor = u.email; gravar_(outra, r);
          });
        }
      });
    } else {
      novo = Object.assign({}, limpo, { id: Utilities.getUuid(), criado: agora, atualizado: agora, criadoPor: u.email, atualizadoPor: u.email });
      gravar_(area, novo);
      registrar_(u, 'criou', area, rotulo_(area, novo), diferencas_({}, novo));
    }
    return montar_(u);
  } finally { lock.releaseLock(); }
}

function excluir(area, id) {
  const u = quem_();
  if (AREAS.indexOf(area) < 0) throw new Error('AREA_INVALIDA');
  exigir_(u, area, 'editar');
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sh = planilha_().getSheetByName(area);
    const r = sh ? linhaDoId_(sh, id) : -1;
    if (r < 0) return montar_(u);
    const antes = lerAba_(area).find(x => x.id === String(id));
    sh.deleteRow(r);
    registrar_(u, 'excluiu', area, rotulo_(area, antes), diferencas_(antes || {}, {}));
    return montar_(u);
  } finally { lock.releaseLock(); }
}

// ---------- Administração (só o administrador) ----------
function lerRegistro(limite) {
  exigirAdmin_(quem_());
  const sh = planilha_().getSheetByName(ABA_REGISTRO);
  if (!sh || sh.getLastRow() < 2) return [];
  const n = Math.min(sh.getLastRow() - 1, limite || 2000);
  const vals = sh.getRange(sh.getLastRow() - n + 1, 1, n, 6).getValues();
  return vals.reverse().map(r => ({
    quando: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
    email: String(r[1]), acao: String(r[2]), area: String(r[3]), registro: String(r[4]),
    mudancas: (() => { try { return JSON.parse(r[5] || '[]'); } catch (e) { return []; } })(),
  }));
}
function lerEquipe_() {
  return lerAba_(ABA_EQUIPE).map(m => Object.assign(m, { email: String(m.email || '').toLowerCase().trim() })).filter(m => m.email);
}
function salvarMembro(m) {
  const u = quem_(); exigirAdmin_(u);
  const email = String(m.email || '').toLowerCase().trim();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('EMAIL_INVALIDO');
  if (email === ADMIN) throw new Error('E_ADMIN');
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const antes = lerEquipe_().find(x => x.email === email);
    const reg = { id: antes ? antes.id : email, email, nome: String(m.nome || ''), ativo: m.ativo === 'Não' ? 'Não' : 'Sim' };
    AREAS.forEach(a => reg[a] = ['editar', 'ver'].indexOf(m[a]) >= 0 ? m[a] : 'nenhum');
    const sh = aba_(ABA_EQUIPE, ['id', 'email', 'nome', 'ativo'].concat(AREAS));
    garantirColunas_(sh, Object.keys(reg));
    const cab = cabecalho_(sh);
    const linha = cab.map(k => celula_(reg[k]));
    const r = linhaDoId_(sh, reg.id);
    if (r > 0) sh.getRange(r, 1, 1, linha.length).setValues([linha]); else sh.appendRow(linha);
    registrar_(u, antes ? 'alterou' : 'criou', 'equipe', email, diferencas_(antes || {}, reg));
    return montar_(u);
  } finally { lock.releaseLock(); }
}
function removerMembro(email) {
  const u = quem_(); exigirAdmin_(u);
  const sh = planilha_().getSheetByName(ABA_EQUIPE);
  const m = lerEquipe_().find(x => x.email === String(email).toLowerCase());
  if (sh && m) { sh.deleteRow(linhaDoId_(sh, m.id)); registrar_(u, 'excluiu', 'equipe', m.email, []); }
  return montar_(u);
}

// ---------- Configuração inicial ----------
// Rode UMA vez pelo editor (selecione "configurar" e clique em Executar).
function configurar() {
  const ss = planilha_();
  aba_(ABA_EQUIPE, ['id', 'email', 'nome', 'ativo'].concat(AREAS));
  aba_(ABA_REGISTRO, ['quando', 'email', 'acao', 'area', 'registro', 'mudancas']);
  const admin = { email: ADMIN, perm: {} };
  let importados = 0;
  if (typeof DADOS_INICIAIS !== 'undefined') {
    AREAS.forEach(area => {
      const existentes = lerAba_(area);
      (DADOS_INICIAIS[area] || []).forEach(reg => {
        if (existentes.some(r => r.id === reg.id)) return;
        gravar_(area, reg); importados++;
      });
      aba_(area, META.slice());
    });
  }
  [ABA_EQUIPE, ABA_REGISTRO].forEach(n => ss.getSheetByName(n).setTabColor('#1F6B53'));
  const padrao = ss.getSheetByName('Página1') || ss.getSheetByName('Sheet1');
  if (padrao && ss.getSheets().length > 1 && padrao.getLastRow() === 0) ss.deleteSheet(padrao);
  registrar_(admin, 'importou', '', importados + ' registros importados na configuração inicial');
  Logger.log('Pronto. ' + importados + ' registros importados.');
}

/**
 * Dados iniciais da Linha Editora, levados do espaço anterior (planilhas de estoque, despesas e custo de produção).
 * São gravados uma única vez pela função configurar(). Depois disso este arquivo pode ser apagado.
 */
const DADOS_INICIAIS = {
 "titulos": [
  {
   "id": "dpc",
   "atualizado": "2026-10-17T12:00:00Z",
   "capaCriacao": 0,
   "criado": "2026-10-17T12:00:00Z",
   "diagramacao": 2114,
   "dimensoes": "14x21 cm",
   "extras": 0,
   "formato": "Brochura",
   "impressao": 10550,
   "isbn": "ISBN-PENDENTE-2",
   "isbnCusto": 108,
   "obs": "Preço de capa sugerido na planilha de custo: R$ 141,00 (x5 = R$ 143,20).",
   "paginas": 268,
   "preco": 141,
   "revisao": 1550,
   "tiragem": 500,
   "titulo": "Direito processual e capitalismo",
   "traducao": 0,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp",
   "atualizado": "2026-10-17T12:00:00Z",
   "autor": "Marcelo Grillo",
   "capaCriacao": 0,
   "criado": "2026-10-17T12:00:00Z",
   "custo": 37.93,
   "diagramacao": 3584,
   "dimensoes": "17x24 cm",
   "extras": 0,
   "formato": "Brochura",
   "impressao": 12820,
   "isbn": "ISBN-PENDENTE-3",
   "isbnCusto": 108,
   "obs": "Tiragem de 510 conforme a planilha de estoque (a de custo usa 500). Custo unitário de R$ 37,93 = custo total R$ 18.965 ÷ 500, como na planilha de custo.",
   "paginas": 376,
   "preco": 179,
   "revisao": 2453,
   "tiragem": 510,
   "titulo": "Instituições de direito público e privado",
   "traducao": 0,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "maquiavel",
   "atualizado": "2026-10-17T12:00:00Z",
   "capaCriacao": 0,
   "criado": "2026-10-17T12:00:00Z",
   "diagramacao": 1078,
   "dimensoes": "14x21 cm",
   "extras": 0,
   "formato": "Brochura",
   "impressao": 7185,
   "isbn": "ISBN-PENDENTE-1",
   "isbnCusto": 108,
   "obs": "Preço de capa sugerido na planilha de custo: R$ 88,50 (x5 = R$ 89,25).",
   "paginas": 154,
   "preco": 88.5,
   "revisao": 555,
   "tiragem": 500,
   "titulo": "Maquiavel: um renascentista hoje",
   "traducao": 0,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  }
 ],
 "autores": [
  {
   "id": "marcelo-grillo",
   "atualizado": "2026-10-17T12:00:00Z",
   "criado": "2026-10-17T12:00:00Z",
   "nome": "Marcelo Grillo",
   "obs": "Recebe exemplares de direitos autorais de Instituições de direito público e privado (planilha de estoque).",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  }
 ],
 "producao": [],
 "contatos": [
  {
   "id": "livraria-1",
   "ativo": "Sim",
   "atualizado": "2026-10-17T12:00:00Z",
   "cidade": "São Paulo/SP",
   "criado": "2026-10-17T12:00:00Z",
   "nome": "Livraria das Perdizes",
   "tipo": "Livraria",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "livraria-2",
   "ativo": "Sim",
   "atualizado": "2026-10-17T12:00:00Z",
   "criado": "2026-10-17T12:00:00Z",
   "nome": "Doctor Livros",
   "tipo": "Livraria",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "livraria-3",
   "ativo": "Sim",
   "atualizado": "2026-10-17T12:00:00Z",
   "cidade": "São Paulo/SP",
   "criado": "2026-10-17T12:00:00Z",
   "nome": "Livraria Jurídica Largo São Francisco",
   "tipo": "Livraria",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "livraria-4",
   "ativo": "Sim",
   "atualizado": "2026-10-17T12:00:00Z",
   "cidade": "São Paulo/SP",
   "criado": "2026-10-17T12:00:00Z",
   "nome": "Livraria da Vila Avenida Paulista",
   "tipo": "Livraria",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "thais-hoshika",
   "ativo": "Sim",
   "atualizado": "2026-10-17T12:00:00Z",
   "criado": "2026-10-17T12:00:00Z",
   "nome": "Thais Hoshika",
   "obs": "Recebeu exemplar de divulgação em 05/10/2026.",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  }
 ],
 "oportunidades": [],
 "interacoes": [],
 "vendas": [
  {
   "id": "idpp-mov-01",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Marcelo Grillo",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-17",
   "entrega": "2026-09-17",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Direitos autorais",
   "quantidade": 11,
   "statusEntrega": "Entregue",
   "tipo": "Direitos autorais",
   "valor": 1790,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-02",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Livraria das Perdizes",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-17",
   "entrega": "2026-09-17",
   "fatura": "0.3",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Consignação",
   "quantidade": 2,
   "statusEntrega": "Entregue",
   "tipo": "Consignação",
   "valor": 179,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-03",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Itamar",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-17",
   "entrega": "2026-09-17",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Doação",
   "quantidade": 1,
   "statusEntrega": "Entregue",
   "tipo": "Doação",
   "valor": 179,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-04",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Adauto (mesa)",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-17",
   "entrega": "2026-09-17",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Doação",
   "quantidade": 1,
   "tipo": "Doação",
   "valor": 179,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-05",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Marcelo Grillo",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-10-02",
   "entrega": "2026-10-02",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Direitos autorais",
   "quantidade": 4,
   "statusEntrega": "Entregue",
   "tipo": "Direitos autorais",
   "valor": 716,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-06",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Doctor Livros",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-10-05",
   "entrega": "2026-10-06",
   "fatura": "0.2",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Consignação",
   "quantidade": 5,
   "tipo": "Consignação",
   "valor": 447.5,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-07",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Livraria Jurídica Largo São Francisco",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-10-05",
   "fatura": "0.7 (0.4)",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Consignação",
   "quantidade": 2,
   "tipo": "Consignação",
   "valor": 179,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-08",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Thais Hoshika",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-10-05",
   "fatura": "0.6 (0.5)",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Divulgação/doação",
   "quantidade": 1,
   "tipo": "Divulgação",
   "valor": 179,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-09",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Livraria da Vila Avenida Paulista",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-10-15",
   "fatura": "0.8",
   "isbn": "ISBN-PENDENTE-3",
   "pagamento": "Consignação",
   "quantidade": 200,
   "tipo": "Consignação",
   "valor": 17900,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "idpp-mov-10",
   "atualizado": "2026-10-17T12:00:00Z",
   "cliente": "Marcelo Grillo",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-10-09",
   "entrega": "2026-10-09",
   "isbn": "ISBN-PENDENTE-3",
   "obs": "Na planilha a data do pedido está 09/10/2025 (provável erro de digitação; entrega em 09/10/2026).",
   "pagamento": "Direitos autorais",
   "quantidade": 8,
   "tipo": "Direitos autorais",
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  }
 ],
 "financeiro": [
  {
   "id": "desp-2026-01-001",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-01-010",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "Chip",
   "frequencia": "Único",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 15,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-01-011",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "CNPJ/Registros",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "Honorários",
   "frequencia": "Único",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 907,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-01-012",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "CNPJ/Registros",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "Registro BR",
   "frequencia": "Único",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 112,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-01-013",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "CNPJ/Registros",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "INPI",
   "frequencia": "Único",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 440,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-01-014",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-01-024",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-01-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-02-002",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-02-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-02-015",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-02-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-02-025",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-02-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-03-003",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-03-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-03-016",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-03-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-03-026",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-03-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-03-035",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Marketing",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-03-01",
   "descricao": "Site",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 1000,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-03-037",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-03-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-04-004",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-04-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-04-017",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-04-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-04-027",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-04-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-04-038",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-04-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-04-047",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Livro (produção)",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-04-01",
   "descricao": "Registro do Livro - Maquiavel (um renascentisa hoje)",
   "frequencia": "pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "titulo": "Maquiavel: um renascentista hoje",
   "valor": 108,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-05-005",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-05-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-05-018",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-05-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-05-023",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Operacional",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-05-01",
   "descricao": "Entrega",
   "frequencia": "?",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 79.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-05-028",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-05-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-05-033",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Financeiro",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-05-01",
   "descricao": "Itaú (conta PJ)",
   "frequencia": "Mensal (m5+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 500,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-05-039",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-05-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-006",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-019",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-029",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-040",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-044",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Serviço",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "Diagramador",
   "frequencia": "Pontual",
   "responsavel": "Adaulto",
   "tipo": "Despesa",
   "valor": 6774,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-045",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Livro (produção)",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "Registro do Livro - Direito processual e capitalismo",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "titulo": "Direito processual e capitalismo",
   "valor": 108,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-06-046",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Livro (produção)",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-06-01",
   "descricao": "Registro do Livro - Intituições de Direito",
   "frequencia": "pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "titulo": "Instituições de direito público e privado",
   "valor": 108,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-07-007",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-07-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-07-020",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-07-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-07-030",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-07-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-07-041",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-07-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-08-008",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-08-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-08-021",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-08-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-08-031",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-08-01",
   "descricao": "IA (assinatura)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-08-042",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-08-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-08-048",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Impostos/Tributos",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-08-01",
   "descricao": "TFE (tributo municipal)",
   "frequencia": "anual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 236.35,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-009",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Comunicação",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Telefone Claro",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 50,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-022",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Contabilidade",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Contador (novo)",
   "frequencia": "Mensal (m3+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 180,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-032",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "IA (assinatura) (IA Itamar que pagou de setembro)",
   "frequencia": "Mensal",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 39.9,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-034",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Financeiro",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Itaú (conta PJ)",
   "frequencia": "Mensal (m5+)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 20,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-036",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Marketing",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Site",
   "responsavel": "Adaulto",
   "tipo": "Despesa",
   "valor": 1350,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-043",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Tecnologia",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Google Workspace",
   "frequencia": "Pontual",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 130.88,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-049",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Financeiro",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Itaú (conta PJ)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 80,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-050",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Produto",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Fechadura Eletrônica",
   "responsavel": "Adaulto",
   "tipo": "Despesa",
   "valor": 690,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-051",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Produto",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Carrinho de Ferro",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 670,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-052",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Serviço",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Certificado Digital",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 79,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-053",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Produto",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Livros",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 2690.25,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-054",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Produto",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Livros",
   "responsavel": "Adaulto",
   "tipo": "Despesa",
   "valor": 3205,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  },
  {
   "id": "desp-2026-09-055",
   "atualizado": "2026-10-17T12:00:00Z",
   "categoria": "Produto",
   "criado": "2026-10-17T12:00:00Z",
   "data": "2026-09-01",
   "descricao": "Bebidas/limpeza - Lançamento 21/10(Assaí)",
   "responsavel": "Marcelo",
   "tipo": "Despesa",
   "valor": 472,
   "criadoPor": "importação",
   "atualizadoPor": "importação"
  }
 ]
};
