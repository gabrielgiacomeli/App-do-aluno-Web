 funcionalidades Git/Github

 É necessário criar um repositório local para depois fazer a conexão e o versionamento no git.

Git init - cria repositorio

Git add ´nome do arquivo´ coloca arquivo dentro da area que vai entrar pra commit

git commit -m ´nome do commit´´

git status "o que foi colocado, status atual"

git remote add origin https://github.com/gabrielgiacomeli/App-do-aluno-Web.git  (adiciona o diretorio do git para upload do projeto, origin é um nome usado por padrao)

git branch -M main (muda o nome da branch que estamos, no exemplo usando main)

git push -u origin main (envia do git, ao github)

git pull origin main (atualiza seu diretório local com a situação atual do projeto no github)

git clone https://github.com/gabrielgiacomeli/App-do-aluno-Web.git (clonar o repositorio para sua máquina, faz conexão automatica)

1️⃣ Adicionar como colaborador (caso seja repositório pessoal seu)
No GitHub, abra o repositório.

Vá em Settings → Collaborators (ou Manage access).

Clique em Add people e digite o usuário do GitHub da pessoa.

Escolha o nível de permissão:

Read → só pode ver.

Write → pode enviar (push) alterações.

Admin → acesso total.

A pessoa aceita o convite e passa a ter acesso.

2️⃣ Trabalhar via “fork” e “pull request” (forma aberta)
Se o projeto for público, qualquer pessoa pode:

Fazer um fork (cópia do repositório no perfil dela).

Alterar o código no fork.

Criar um pull request pedindo para suas alterações serem mescladas no projeto original.

Essa forma é muito usada em projetos open source porque não exige dar permissão de escrita direta.
