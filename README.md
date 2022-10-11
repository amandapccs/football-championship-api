# Football Championship API

# Contexto
Este projeto trata-se de plicação na qual o usuário faz seu login, visualiza e cadastra jogos, podendo editar os gols da partida conforme necessário. Há também a opção de visualizar a tabela de classificação/ranking em certos endpoints.

# Habilidades desenvolvidas
- Utilizar TypeScript;
- Utilizar os princípios do POO para criar uma estrutura de um campeonato de futebol;
- Utilizar os princípios da arquitetura SOLID para organizar o projeto e deixá-lo com uma manutenibilidade muito maior;
- Construir um backend dockerizado utilizando modelagem de dados através do ORM Sequelize;
- CRUD para criação, leitura, atualização e/ou remoção de usuários, times, partidas e tabela (placar do campeonato);
- Organização do código respeitando também o modelo MSC (Model-Service-Controller), de forma a dividir a responsabilidade do código e das funções/métodos de acordo com suas propostas;
- Construção de testes de integração utilizando Mocha, Chai e Sinon.

## Técnologias usadas
Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Sequelize, MySQL, TypeScript, Docker, Mocha

## Rodando a aplicação
Para testar a aplicação, é necessário ter o [**Docker**](https://www.docker.com/) e o [**Docker Compose**](https://docs.docker.com/compose/) instalado em sua máquina.

Clone o projeto:
`git clone git@github.com:amandapccs/football-championship-api.git`

Entre na pasta do projeto:
`cd trybe-futebol-clube`

Execute o script para iniciar o Docker Compose:
`npm run compose:up`

Quando os contêineres estiverem prontos, você poderá acessar o projeto em: <http://localhost:3000>

Utilize o script para parar os contêineres:
`npm run compose:down`
