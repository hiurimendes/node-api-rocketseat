# 🚀 API Node.js - Desafio Rocketseat

Uma API REST moderna construída com **Node.js**, **Fastify** e **TypeScript** para gerenciamento de cursos. Este projeto foi desenvolvido como parte do desafio da Rocketseat.

## ✨ Funcionalidades

- ✅ Criar novos cursos
- ✅ Listar todos os cursos
- ✅ Buscar curso por ID
- ✅ Documentação automática da API com Swagger
- ✅ Validação de dados com Zod
- ✅ Banco de dados PostgreSQL com Drizzle ORM
- ✅ Docker para ambiente de desenvolvimento

## � Fluxo da Aplicação

O diagrama abaixo ilustra o fluxo principal da API, mostrando como as requisições são processadas desde o cliente até o banco de dados:

```mermaid
graph TD
    A[Cliente/Frontend] -->|POST /courses| B[Criar Curso]
    A -->|GET /courses| C[Listar Cursos]
    A -->|GET /courses/:id| D[Buscar Curso por ID]
    
    B --> E{Validação Zod}
    E -->|❌ Inválido| F[Erro 400 - Bad Request]
    E -->|✅ Válido| G[Drizzle ORM]
    
    C --> H[Drizzle ORM - SELECT]
    D --> I[Drizzle ORM - SELECT WHERE]
    
    G --> J[(PostgreSQL Database)]
    H --> J
    I --> J
    
    J -->|Curso criado| K[Retorna courseId - 201]
    J -->|Lista de cursos| L[Retorna courses[] - 200]
    J -->|Curso encontrado| M[Retorna course - 200]
    J -->|Curso não encontrado| N[Erro 404 - Not Found]
    
    K --> A
    L --> A
    M --> A
    N --> A
    F --> A
    
    style A fill:#e1f5fe
    style J fill:#f3e5f5
    style E fill:#fff3e0
    style F fill:#ffebee
    style N fill:#ffebee
```

### Descrição do Fluxo:

1. **Cliente** faz requisições HTTP para os endpoints da API
2. **Validação** - Para criação de cursos, os dados são validados com Zod
3. **Processamento** - Drizzle ORM executa operações no banco de dados
4. **Resposta** - API retorna dados ou erros apropriados ao cliente

## �🛠️ Tecnologias

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset tipado do JavaScript
- **[Fastify](https://fastify.dev/)** - Framework web rápido e eficiente
- **[Drizzle ORM](https://orm.drizzle.team/)** - ORM type-safe para TypeScript
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Zod](https://zod.dev/)** - Validação e parsing de schemas TypeScript
- **[Docker](https://www.docker.com/)** - Containerização
- **[Swagger](https://swagger.io/)** - Documentação da API

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Docker](https://www.docker.com/) e Docker Compose
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd node-api-rocketseat
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/desafio
NODE_ENV=development
```

### 4. Inicie o banco de dados

```bash
docker-compose up -d
```

### 5. Execute as migrações

```bash
npm run db:generate
npm run db:migrate
```

### 6. Inicie o servidor

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3333`

## 📖 Documentação da API

Com o servidor rodando, acesse a documentação interativa:

- **Swagger UI**: `http://localhost:3333/docs`

### Endpoints disponíveis

#### Cursos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/courses` | Criar um novo curso |
| `GET` | `/courses` | Listar todos os cursos |
| `GET` | `/courses/:id` | Buscar curso por ID |

### Exemplos de uso

#### Criar um curso

```bash
curl -X POST http://localhost:3333/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "Curso de Node.js"}'
```

#### Listar todos os cursos

```bash
curl http://localhost:3333/courses
```

#### Buscar curso por ID

```bash
curl http://localhost:3333/courses/{course-id}
```

## 🗂️ Scripts disponíveis

```bash
# Executar em modo de desenvolvimento
npm run dev

# Gerar migrações do banco de dados
npm run db:generate

# Executar migrações do banco de dados
npm run db:migrate

# Abrir o Drizzle Studio (interface visual para o banco)
npm run db:studio
```

## 📁 Estrutura do projeto

```
├── drizzle/                 # Migrações do banco de dados
├── src/
│   ├── database/
│   │   ├── client.ts       # Configuração do cliente do banco
│   │   └── schema.ts       # Schema do banco de dados
│   └── routes/
│       ├── create-course.ts    # Rota para criar cursos
│       ├── get-courses.ts      # Rota para listar cursos
│       └── get-course-by-id.ts # Rota para buscar curso por ID
├── client.http             # Arquivo com requisições HTTP para teste
├── docker-compose.yml      # Configuração do Docker
├── drizzle.config.ts       # Configuração do Drizzle ORM
├── package.json           # Dependências e scripts
├── server.ts              # Arquivo principal do servidor
└── tsconfig.json          # Configuração do TypeScript
```

## 🐳 Docker

O projeto inclui um `docker-compose.yml` que configura:

- **PostgreSQL 17** na porta `5432`
- Banco de dados: `desafio`
- Usuário: `postgres`
- Senha: `postgres`

Para gerenciar o container:

```bash
# Iniciar o banco de dados
docker-compose up -d

# Parar o banco de dados
docker-compose down

# Ver logs do banco
docker-compose logs -f
```

## 🔧 Desenvolvimento

### Drizzle Studio

Para visualizar e gerenciar os dados do banco através de uma interface gráfica:

```bash
npm run db:studio
```

Acesse: `https://local.drizzle.studio`

### Arquivo de testes

O projeto inclui um arquivo `client.http` com exemplos de requisições HTTP que podem ser executadas diretamente no VS Code com a extensão REST Client.

## 🤝 Como contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para mais detalhes.

## 👨‍💻 Autor

Desenvolvido como parte do desafio da [Rocketseat](https://rocketseat.com.br/) 🚀

---

⭐ Se este projeto te ajudou, não esqueça de dar uma estrela!