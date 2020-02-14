<p align="center">
  <img width="400" height="80" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png">
</p>


## Desafio 2:   FastFeet, o início.

## :rocket: Sobre o desafio

A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.
1. Permita que um usuário se autentique em sua aplicação utilizando e-mail e uma senha.
2. Crie um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed).
3.  Somente o usuário administrador poderá cadastrar os destinatários que serão  mantidos (cadastrados/atualizados) na aplicação, e esses devem ter o **nome** do destinatário e campos de endereço: **rua**, **número**, **complemento**, **estado**, **cidade** e **CEP**.

## :computer: Ferramentas Utilizadas
-  [Node.js]([https://nodejs.org/en/](https://nodejs.org/en/))
- [Express]([https://expressjs.com/](https://expressjs.com/))
- [Docker]([https://www.docker.com/](https://www.docker.com/))
- [Postgres]([https://www.postgresql.org/](https://www.postgresql.org/))
- [Yarn]([https://classic.yarnpkg.com/en/](https://classic.yarnpkg.com/en/))
	* [Sequelize]([https://sequelize.org/](https://sequelize.org/))
	* [Yup]([https://classic.yarnpkg.com/en/package/yup](https://classic.yarnpkg.com/en/package/yup))
	* [JsonWebToken]([https://classic.yarnpkg.com/en/package/jsonwebtoken](https://classic.yarnpkg.com/en/package/jsonwebtoken))
	* [Bcrypt]([https://classic.yarnpkg.com/en/package/bcryptjs](https://classic.yarnpkg.com/en/package/bcryptjs))
	* [Eslint]([https://classic.yarnpkg.com/en/package/eslint](https://classic.yarnpkg.com/en/package/eslint))
	* [Prettier]([https://classic.yarnpkg.com/en/package/prettier](https://classic.yarnpkg.com/en/package/prettier))



## :books: Instalação 

##### 	Para instalar a aplicação é necessário ter o [Node](https://nodejs.org/en/) , [Yarn](https://legacy.yarnpkg.com/en/docs/install/#mac-stable) e o [Docker](https://www.docker.com/) instalados em sua máquina.

Clone o repositório:
```sh
$ git clone https://github.com/dayana-sog/bootcamp-gostack-desafio-02
```

Aceda a pasta do projeto:
```sh
$ cd bootcamp-gostack-desafio-02
```
Gere o banco de dados no docker:
```
docker run --name fastfeet -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
Instale as dependências:
```sh
yarn
```
Inicie o servidor:
```sh
$ yarn dev
```

Para realizações de testes é recomendado que utilize o [Insomnia](https://insomnia.rest/) 

## 📝  Licença

Esse projeto está sob a licença MIT. Veja o arquivo  [License](https://github.com/dayana-sog/bootcamp-gostack-desafio-02/blob/master/LICENSE)  para mais detalhes.

----------

Feito com ♥ by Dayana Gonçalves  👋 
