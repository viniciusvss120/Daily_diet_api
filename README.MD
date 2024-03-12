# Etapas para criar a aplicação

- [x] Baixar todas as ferramentas de desenvolvimento;
- [x] Estruturar as pastas do projeto;
- [x] Configurar o Typescript;
- [x] Configurar o eslint;
- [] Definir as variaveis de ambiente;
- [] Dentro da pasta src criar uma pasta env, criar um arquivo index.ts onde vamos distinguir qual base de dados usar, se vai ser a de testes ou de desenvolvimento, além de trabalhar com o zod para gerenciar as tipagem das variaveis de ambiente;
- [] Criar o servidor;

# Requisitos funcionais

- [] O usuário deve conseguir criar um usuário;
- [] O usuário deve ser possível identificar o usuário entre as requisições;
- [] O usuário deve consegui registrar uma refeição feita, as refeições devem ser relacionadas a um usuário;
- [] Deve ser possível editar uma refeição, podendo alterar todos os dados;
- [] Deve ser possivel apagar uma refeição;
- [] Deve ser possível listar uma única refeição;
- [] Deve ser possível recuperar as métricas do usuáro, ou seja, quantidades de refeições, refeições dentro da dieta ... ;

# Regras de Negócio
- [] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou;

# Tecnologias a serem utilizadas

- Fastify;
- dotenv;
- zod;
- knex;
- pg: Postgrees;

// Dependência de desenvolvimento

- Typescript;
- @types/node;
- tsx;
- eslint;
- @rocketseat/eslint-config;
- sqlite3;
- supertest;
- @types/supertest;
- vitest