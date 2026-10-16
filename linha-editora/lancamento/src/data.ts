// Conteúdo do vídeo. Para um novo lançamento, edite só este arquivo
// (e coloque as capas novas em public/).

export type Livro = {
  titulo: string;
  subtitulo?: string;
  autor: string;
  edicao?: string;
  capa: string; // arquivo em public/
};

export type LancamentoProps = {
  dia: string;
  mes: string;
  mesNumero: string;
  ano: string;
  semana: string;
  local: string;
  localDetalhe: string;
  horario: string;
  chamada: [string, string];
  instagram: string;
  site: string;
  qrcode: string; // arquivo em public/
  livros: Livro[];
};

export const lancamentoPadrao: LancamentoProps = {
  dia: "21",
  mes: "outubro",
  mesNumero: "10",
  ano: "2026",
  semana: "quarta",
  local: "Livraria da Vila",
  localDetalhe: "Paulista",
  horario: "das 18h às 21h",
  chamada: ["Celebre o lançamento da Linha Editora", "e seus três primeiros títulos"],
  instagram: "@Linha_editoraoficial",
  site: "www.linhaeditora.com.br",
  qrcode: "qrcode.png",
  livros: [
    {
      titulo: "Maquiavel",
      subtitulo: "um renascentista hoje",
      autor: "Paulo Ferreira da Cunha",
      capa: "livro-maquiavel.png",
    },
    {
      titulo: "Instituições de Direito Público e Privado",
      autor: "Marcelo Grillo",
      edicao: "2ª edição",
      capa: "livro-instituicoes.png",
    },
    {
      titulo: "Direito Processual e Capitalismo",
      autor: "Marcelo Grillo",
      edicao: "2ª edição",
      capa: "livro-direito-processual.png",
    },
  ],
};
