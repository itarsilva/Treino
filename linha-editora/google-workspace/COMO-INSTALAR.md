# Linha Editora no Google Workspace: como instalar

Tempo: cerca de 10 minutos. Faça tudo logado como **itamar@linhaeditora.com.br**.

## 1. Criar a planilha
1. Abra o Google Drive da editora e crie uma **Planilha Google** nova.
2. Dê o nome **Linha Editora — Sistema**.
3. **Não compartilhe esta planilha com ninguém.** A equipe entra pelo app, nunca pela planilha. É isso que garante que só você veja o registro de atividades.

## 2. Colar o código
1. Na planilha, clique em **Extensões › Apps Script**.
2. No arquivo `Código.gs` que já aparece, apague tudo e cole o conteúdo de **Code.gs**.
3. Clique no **+** ao lado de "Arquivos" › **Script** e crie um arquivo chamado `Dados`. Cole o conteúdo de **Dados.gs**.
4. Clique no **+** › **HTML** e crie um arquivo chamado `Index` (exatamente assim, com I maiúsculo). Cole o conteúdo de **Index.html**.
5. Clique em **Salvar** (ícone de disquete).

## 3. Configurar e importar os dados
1. No topo do editor, escolha a função **configurar** e clique em **Executar**.
2. O Google vai pedir autorização: clique em **Revisar permissões**, escolha sua conta e clique em **Permitir**.
3. Volte para a planilha. Devem aparecer as abas `titulos`, `vendas`, `financeiro` etc., além de `_Equipe` e `_Registro`.

Rode `configurar` só uma vez. Se rodar de novo, ele não duplica os dados.

## 4. Publicar o app
1. No Apps Script, clique em **Implantar › Nova implantação**.
2. Em "Selecionar tipo", escolha **App da Web**.
3. Preencha:
   - **Executar como:** Eu (itamar@linhaeditora.com.br)
   - **Quem pode acessar:** Qualquer pessoa em linhaeditora.com.br
4. Clique em **Implantar** e copie o **URL do app da Web**. Esse é o endereço do sistema.

## 5. Liberar a equipe
1. Abra o URL do app. Você entra direto como administrador.
2. Vá em **Administração › Equipe e acessos**.
3. Digite o e-mail de cada pessoa (precisa ser @linhaeditora.com.br), o nome, e escolha para cada área: **Edita**, **Só vê** ou **Sem acesso**. Clique em **Adicionar**.
4. Mande o URL para a equipe. Quem não estiver cadastrado vê uma mensagem pedindo para falar com você.

## Como funciona a segurança
- Só entra quem está logado com uma conta do Workspace da editora **e** está cadastrado em Equipe e acessos.
- Cada ação é verificada no servidor do Google: quem só vê não consegue salvar, e quem não tem acesso ao Financeiro não recebe esses dados.
- O app funciona com a sua conta. Por isso os colaboradores não têm acesso à planilha nem ao registro de atividades.
- Para tirar o acesso de alguém na hora: em Equipe e acessos, marque **Ativo: Não** ou clique em **Remover**.

## Quando eu mandar uma versão nova do código
1. Cole o arquivo novo por cima do antigo no Apps Script e salve.
2. Clique em **Implantar › Gerenciar implantações**, no lápis (editar), em **Versão: Nova versão** e em **Implantar**.
3. O URL continua o mesmo.

## Se algo der errado
- **"Seu e-mail ainda não tem acesso"**: a pessoa não está em Equipe e acessos, ou entrou com um Gmail pessoal. Peça que ela troque de conta no canto superior direito do Google.
- **Página em branco ou erro de autorização**: confira se o passo 3 (configurar) foi executado e autorizado.
- **A equipe não vê as mudanças dos outros na hora**: o app atualiza sozinho a cada minuto. Para ver na hora, basta recarregar a página.
