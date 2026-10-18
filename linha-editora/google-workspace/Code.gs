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
  // admin = dono do sistema (equipe e registro); podeExcluir = perfil Administrador
  if (email === ADMIN) return { email, nome: 'Administrador', admin: true, perfil: 'Administrador', podeExcluir: true, perm: todas };
  const membro = lerEquipe_().find(m => m.email === email);
  if (!membro || membro.ativo === 'Não') throw new Error('SEM_ACESSO:' + email);
  const perm = {};
  AREAS.forEach(a => perm[a] = ['editar', 'ver'].indexOf(membro[a]) >= 0 ? membro[a] : 'nenhum');
  const perfil = membro.perfil === 'Administrador' ? 'Administrador' : 'Colaborador';
  return { email, nome: membro.nome || email, admin: false, perfil, podeExcluir: perfil === 'Administrador', perm };
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

// ---------- Regras de cadastro ----------
// Campos obrigatórios por área. O app mostra a mesma lista com *; aqui é a garantia final.
const OBRIGATORIOS = {
  titulos: [['titulo', 'Título'], ['isbn', 'ISBN'], ['autor', 'Autor'], ['preco', 'Preço de capa'], ['tiragem', 'Tiragem'], ['status', 'Status']],
  autores: [['nome', 'Nome'], ['royalty', '% de royalties']],
  contatos: [['nome', 'Nome / empresa'], ['tipo', 'Tipo'], ['cidade', 'Cidade/UF']],
  vendas: [['data', 'Data'], ['tipo', 'Tipo'], ['isbn', 'Título'], ['quantidade', 'Quantidade'], ['cliente', 'Cliente / destinatário']],
  financeiro: [['data', 'Data'], ['tipo', 'Tipo'], ['categoria', 'Categoria'], ['descricao', 'Descrição'], ['valor', 'Valor'], ['responsavel', 'Pago por']],
  producao: [['titulo', 'Título'], ['etapa', 'Etapa']],
  oportunidades: [['oportunidade', 'Oportunidade'], ['contatoId', 'Contato'], ['etapa', 'Etapa do funil']],
  interacoes: [['data', 'Data'], ['contatoId', 'Contato']],
};
const SAIDAS = ['Venda', 'Consignação', 'Doação', 'Divulgação', 'Direitos autorais'];
const vazio_ = v => v === undefined || v === null || String(v).trim() === '';
const digitos_ = v => String(v || '').replace(/\D/g, '');
function isbnValido_(v) {
  const d = digitos_(v);
  if (d.length !== 13) return false;
  let soma = 0;
  for (let i = 0; i < 12; i++) soma += Number(d[i]) * (i % 2 ? 3 : 1);
  return (10 - soma % 10) % 10 === Number(d[12]);
}
function cnpjValido_(v) {
  const d = digitos_(v);
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const dv = n => { const p = n === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]; const r = p.reduce((s, x, i) => s + x * Number(d[i]), 0) % 11; return r < 2 ? 0 : 11 - r; };
  return dv(12) === Number(d[12]) && dv(13) === Number(d[13]);
}
function cpfValido_(v) {
  const d = digitos_(v);
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  const dv = n => { let s = 0; for (let i = 0; i < n; i++) s += Number(d[i]) * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; };
  return dv(9) === Number(d[9]) && dv(10) === Number(d[10]);
}
const mesmoNome_ = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
function validar_(area, r) {
  const erros = (OBRIGATORIOS[area] || []).filter(([k]) => vazio_(r[k])).map(([, l]) => 'Preencha ' + l);
  const email = v => vazio_(v) || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v));
  if (['autores', 'contatos'].indexOf(area) >= 0) {
    if (vazio_(r.email) && vazio_(r.telefone)) erros.push('Informe telefone ou e-mail');
    if (!email(r.email)) erros.push('E-mail inválido');
  }
  if (area === 'titulos') {
    if (!vazio_(r.isbn) && !/^ISBN-PENDENTE/i.test(String(r.isbn)) && !isbnValido_(r.isbn)) erros.push('ISBN inválido: confira os 13 dígitos');
    if (!vazio_(r.preco) && !(Number(r.preco) > 0)) erros.push('Preço de capa deve ser maior que zero');
    if (!vazio_(r.tiragem) && !(Number(r.tiragem) > 0)) erros.push('Tiragem deve ser maior que zero');
  }
  if (area === 'autores') {
    if (!vazio_(r.cpf) && !cpfValido_(r.cpf)) erros.push('CPF inválido');
    if (!vazio_(r.royalty) && !(Number(r.royalty) >= 0 && Number(r.royalty) <= 100)) erros.push('Royalties deve ficar entre 0 e 100%');
  }
  if (area === 'contatos') {
    if (['Livraria', 'Distribuidora'].indexOf(r.tipo) >= 0 && vazio_(r.cnpj)) erros.push('Preencha o CNPJ (obrigatório para ' + r.tipo.toLowerCase() + ')');
    if (!vazio_(r.cnpj) && !cnpjValido_(r.cnpj)) erros.push('CNPJ inválido');
  }
  if (area === 'vendas') {
    const n = Number(r.quantidade);
    if (!vazio_(r.quantidade) && !(n > 0 && Math.floor(n) === n)) erros.push('Quantidade deve ser um número inteiro maior que zero');
    if (['Venda', 'Acerto de consignação'].indexOf(r.tipo) >= 0) {
      if (!(Number(r.valor) > 0)) erros.push('Preencha o Valor da venda');
      if (vazio_(r.pagamento)) erros.push('Preencha a Forma de pagamento');
    }
    if (r.tipo === 'Consignação' && vazio_(r.fatura)) erros.push('Preencha o Nº da fatura da consignação');
  }
  if (area === 'financeiro' && !vazio_(r.valor) && !(Number(r.valor) > 0)) erros.push('Valor deve ser maior que zero');
  if (!erros.length && area === 'vendas') checarEstoque_(r, erros);
  if (erros.length) throw new Error('VALIDACAO:' + erros.join('|'));
}
// Não deixa sair mais do que há na editora, nem acertar/devolver mais do que a livraria tem consignado
function checarEstoque_(r, erros) {
  const t = lerAba_('titulos').find(x => x.isbn === r.isbn);
  if (!t) { erros.push('Título não encontrado no Catálogo'); return; }
  const movs = lerAba_('vendas').filter(v => v.isbn === r.isbn && v.id !== String(r.id));
  const soma = (tipos, filtro) => movs.filter(v => tipos.indexOf(v.tipo || 'Venda') >= 0 && (!filtro || filtro(v))).reduce((s, v) => s + Number(v.quantidade || 0), 0);
  const n = Number(r.quantidade);
  if (SAIDAS.indexOf(r.tipo) >= 0) {
    const naEditora = Number(t.tiragem || 0) - soma(SAIDAS) + soma(['Devolução de consignação']);
    if (n > naEditora) erros.push('Estoque insuficiente: há ' + naEditora + ' exemplares de "' + t.titulo + '" na editora');
  } else if (['Acerto de consignação', 'Devolução de consignação'].indexOf(r.tipo) >= 0) {
    const doCliente = v => mesmoNome_(v.cliente, r.cliente);
    const aberto = soma(['Consignação'], doCliente) - soma(['Acerto de consignação', 'Devolução de consignação'], doCliente);
    if (n > aberto) erros.push(r.cliente + ' tem ' + aberto + ' exemplares de "' + t.titulo + '" em consignação');
  }
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
      validar_(area, novo);
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
      validar_(area, novo);
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
  if (!u.podeExcluir) throw new Error('SEM_PERMISSAO_EXCLUIR');
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
    const reg = { id: antes ? antes.id : email, email, nome: String(m.nome || ''), perfil: m.perfil === 'Administrador' ? 'Administrador' : 'Colaborador', ativo: m.ativo === 'Não' ? 'Não' : 'Sim' };
    AREAS.forEach(a => reg[a] = ['editar', 'ver'].indexOf(m[a]) >= 0 ? m[a] : 'nenhum');
    const sh = aba_(ABA_EQUIPE, ['id', 'email', 'nome', 'perfil', 'ativo'].concat(AREAS));
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
  aba_(ABA_EQUIPE, ['id', 'email', 'nome', 'perfil', 'ativo'].concat(AREAS));
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
