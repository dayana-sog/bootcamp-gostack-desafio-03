<p align="center">
  <img width="400" height="80" src="https://raw.githubusercontent.com/Rocketseat/bootcamp-gostack-desafio-02/master/.github/logo.png">
</p>

-----


#### ⚠️  Etapa 2/4 do Desafio Final  ⚠️
---

## Desafio 3:   FastFeet, Continuação da aplicação.

## :rocket: Sobre o desafio


Durante esse desafio vamos aprimorar a aplicação FastFeet que demos início no desafio anterior implementando funcionalidades que aprendemos durante as aulas até agora.

### **Funcionalidades do administrador**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para administradores.

### **1. Gestão de entregadores**

Permita que o administrador possa cadastrar entregadores para a plataforma, o entregador deve possuir os seguintes campos:

-   id (id do entregador)
-   name (nome do entregador);
-   avatar_id (foto do entregador);
-   email (email do entregador)
-   created_at;
-   updated_at;

Crie rotas para listagem/cadastro/atualização/remoção de entregadores;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **2. Gestão de encomendas**

Apesar do entregador estar cadastrado, ele não é independente dentro da plataforma, e você deve cadastrar encomendas para os entregadores.

Nessa funcionalidade criaremos um cadastro de encomendas por entregador, a encomenda possui os campos:

-   id (id da entrega)
-   recipient_id (referência ao destinatário);
-   deliveryman_id (referência ao entregador);
-   signature_id (referência à uma assinatura do destinatário, que será uma imagem);
-   product (nome do produto a ser entregue);
-   canceled_at (data de cancelamento, se cancelada);
-   start_date (data de retirada do produto);
-   end_date (data final da entrega);
-   created_at;
-   updated_at;

A **data de início** deve ser cadastrada assim que for feita a retirada do produto pelo entregador, e as retiradas só podem ser feitas entre as 08:00 e 18:00h.

A **data de término** da entrega deve ser cadastrada quando o entregador finalizar a entrega:

Os campos  **recipient_id**  e  **deliveryman_id**  devem ser cadastrados no momento que for cadastrada a encomenda.

Quando a encomenda é  **cadastrada**  para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.

Crie rotas para listagem/cadastro/atualização/remoção de encomendas;

Obs.: Essa funcionalidade é para administradores autenticados na aplicação.

### **Funcionalidades do entregador**

Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para os entregadores.

### **1. Visualizar encomendas**

Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuídas a ele, que  **não estejam entregues ou canceladas**;

Permita também que ele liste apenas as encomendas que já foram  **entregues**  por ele, com base em seu ID de cadastro;

Exemplo de requisição: `GET https://fastfeet.com/deliveryman/1/deliveries`

### 2. Alterar status de encomendas

Você deve permitir que o entregador tenha rotas para incluir uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer **5 retiradas por dia**.

Obs.: Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

### 3. Cadastrar problemas nas entregas

O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar.

A tabela `delivery_problems` deve conter os seguintes campos:

-   delivery_id (referência da encomenda);
-   description (descrição do problema que o entregador teve);
-   created_at;
-   updated_at;

Crie uma rota para a distribuidora listar todas as entregas com algum problema;

Crie uma rota para listar todos os problemas de uma encomenda baseado no ID da encomenda.

Exemplo de requisição: `GET https://fastfeet.com/delivery/2/problems`

Crie uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados);

Exemplo de requisição: `POST https://fastfeet.com/delivery/3/problems`

Crie uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda.

Exemplo de requisição: `DELETE https://fastfeet.com/problem/1/cancel-delivery`

Quando uma encomenda for cancelada, o entregador deve receber um e-mail informando-o sobre o cancelamento.

---

## :computer: Ferramentas Utilizadas:
-  [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/)
- [Yarn](https://classic.yarnpkg.com/en/)
	* [Sequelize](https://sequelize.org/)
	* [Yup](https://classic.yarnpkg.com/en/package/yup)
	* [JsonWebToken](https://classic.yarnpkg.com/en/package/jsonwebtoken)
	* [Bcrypt](https://classic.yarnpkg.com/en/package/bcryptjs)
	* [Eslint](https://classic.yarnpkg.com/en/package/eslint)
	* [Prettier](https://classic.yarnpkg.com/en/package/prettier)
	*  [Multer](https://classic.yarnpkg.com/en/package/multer)
	* [Express Handlebars](https://classic.yarnpkg.com/en/package/express-handlebars)
	* [Express Async Errors](https://classic.yarnpkg.com/en/package/express-async-errors)
	* [Bee Queue](https://github.com/bee-queue/bee-queue)
	* [Sentry](https://sentry.io/)
	* [Youch](https://classic.yarnpkg.com/en/package/youch)




## :books: Instalação:

##### 	Para instalar a aplicação é necessário ter o [Node](https://nodejs.org/en/) , [Yarn](https://legacy.yarnpkg.com/en/docs/install/#mac-stable) e o [Docker](https://www.docker.com/) instalados em sua máquina.

Clone o repositório:
```sh
$ git clone https://github.com/dayana-sog/bootcamp-gostack-desafio-03
```

Aceda a pasta do projeto:
```sh
$ cd bootcamp-gostack-desafio-03
```
Gere o banco de dados no docker:
```
docker run --name fastfeet -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
Para gerenciamento de jobs:
```sh
docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
```
Gere as tabelas/migrations:
```sh
$ yarn sequelize db:migrate
```
Instale as dependências:
```sh
$ yarn
```
Inicie o servidor:
```sh
$ yarn dev
```
Inicie o servidor de filas:
```sh
$ yarn queue
```

Para realizações de testes é recomendado que utilize o [Insomnia](https://insomnia.rest/)

## 📝  Licença:

Esse projeto está sob a licença MIT. Veja o arquivo  [License](https://github.com/dayana-sog/bootcamp-gostack-desafio-02/blob/master/LICENSE)  para mais detalhes.

----------

Feito com ♥ by Dayana Gonçalves  👋
