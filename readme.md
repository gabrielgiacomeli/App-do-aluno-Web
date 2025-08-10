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