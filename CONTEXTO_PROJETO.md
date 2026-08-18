# 📋 Documentação de Contexto do Projeto - Sistema de Pizzaria

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Tecnologias e Versões](#tecnologias-e-versões)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Modelagem do Banco de Dados](#modelagem-do-banco-de-dados)
6. [Middlewares](#middlewares)
7. [Validação com Schemas](#validação-com-schemas)
8. [Endpoints](#endpoints)
9. [Fluxo de Requisição](#fluxo-de-requisição)
10. [Configurações do Projeto](#configurações-do-projeto)

---

## 🎯 Visão Geral

Sistema backend de gerenciamento de pizzaria desenvolvido em Node.js com TypeScript, utilizando Express como framework web, Prisma ORM para comunicação com banco de dados PostgreSQL, e Zod para validação de dados.

---

## 🏗️ Arquitetura

O projeto segue o padrão **MVC + Service Layer**, com a seguinte estrutura:

```
Requisição HTTP → Rotas → Middlewares → Controller → Service → Banco de Dados → Service → Controller → Resposta HTTP
```

### Camadas da Arquitetura:

1. **Rotas (`routes.ts`)**: Define os endpoints e aplica os middlewares
2. **Middlewares**: Validação de schema, autenticação e autorização
3. **Controllers**: Recebem a requisição, extraem dados e delegam para o Service
4. **Services**: Contêm toda a lógica de negócio e comunicação com o banco de dados
5. **Prisma Client**: ORM que gerencia a comunicação com PostgreSQL

### Princípios Seguidos:

- **Separação de Responsabilidades**: Cada camada tem uma responsabilidade específica
- **Single Responsibility Principle**: Um controller/service para cada operação
- **Reutilização**: Middlewares compartilhados entre rotas
- **Validação Centralizada**: Schemas Zod validam dados antes de chegarem ao controller

---

## 🚀 Tecnologias e Versões

### Dependências de Produção

| Tecnologia         | Versão  | Finalidade                                   |
| ------------------ | ------- | -------------------------------------------- |
| **express**        | ^5.1.0  | Framework web para criação de APIs REST      |
| **@prisma/client** | ^6.19.0 | ORM para comunicação com banco de dados      |
| **typescript**     | ^5.9.3  | Superset JavaScript com tipagem estática     |
| **zod**            | ^4.1.12 | Biblioteca de validação de schemas e tipagem |
| **bcryptjs**       | ^3.0.3  | Criptografia de senhas                       |
| **jsonwebtoken**   | ^9.0.2  | Geração e validação de tokens JWT            |
| **cors**           | ^2.8.5  | Middleware para habilitar CORS               |
| **dotenv**         | ^17.2.3 | Carregamento de variáveis de ambiente        |
| **tsx**            | ^4.20.6 | Executor TypeScript para desenvolvimento     |

### Dependências de Desenvolvimento

| Tecnologia              | Versão   | Finalidade                    |
| ----------------------- | -------- | ----------------------------- |
| **@types/express**      | ^5.0.5   | Tipos TypeScript para Express |
| **@types/cors**         | ^2.8.19  | Tipos TypeScript para CORS    |
| **@types/jsonwebtoken** | ^9.0.10  | Tipos TypeScript para JWT     |
| **@types/node**         | ^24.10.0 | Tipos TypeScript para Node.js |
| **prisma**              | ^6.19.0  | CLI do Prisma ORM             |

### Banco de Dados

- **PostgreSQL** (gerenciado via Prisma ORM)

---

## 📁 Estrutura de Pastas

```
backend/
├── prisma/
│   ├── migrations/           # Histórico de migrações do banco
│   │   └── 20251110200355_create_tables/
│   │       └── migration.sql
│   ├── migration_lock.toml   # Lock de migrações
│   └── schema.prisma         # Schema do banco de dados
├── src/
│   ├── @types/               # Definições de tipos TypeScript customizados
│   │   └── express/
│   │       └── index.d.ts    # Extensão de tipos do Express
│   ├── config/               # Configurações da aplicação
│   │   ├── cloudinary.ts     # Configuração do Cloudinary para upload de imagens
│   │   └── multer.ts         # Configuração do Multer para arquivos em memória
│   ├── controllers/          # Controllers (recebem requisições)
│   │   ├── category/
│   │   │   ├── CreateCategoryController.ts
│   │   │   └── ListCategoriesController.ts
│   │   ├── order/
│   │   │   ├── AddItemController.ts
│   │   │   ├── CreateOrderController.ts
│   │   │   ├── DeleteOrderController.ts
│   │   │   ├── DetailOrderController.ts
│   │   │   ├── FinishOrderController.ts
│   │   │   ├── ListOrdersController.ts
│   │   │   ├── RemoveItemController.ts
│   │   │   └── SendOrderController.ts
│   │   ├── product/
│   │   │   ├── CreateProductController.ts
│   │   │   ├── DeleteProductController.ts
│   │   │   ├── ListProductsByCategoryController.ts
│   │   │   └── ListProductsController.ts
│   │   └── user/
│   │       ├── AuthUserController.ts
│   │       ├── createUserController.ts
│   │       ├── DetailUserController.ts
│   ├── generated/            # Código gerado pelo Prisma
│   │   └── prisma/
│   │       └── client.ts
│   ├── middlewares/          # Middlewares customizados
│   │   ├── isAdmin.ts        # Verifica se usuário é admin
│   │   ├── isAuthenticated.ts # Valida JWT token
│   │   └── validadeSchema.ts # Valida requisições com Zod
│   ├── prisma/               # Configuração do Prisma Client
│   │   └── index.ts
│   ├── schemas/              # Schemas de validação Zod
│   │   ├── categorySchema.ts
│   │   ├── orderDetailSchema.ts
│   │   ├── orderRemoveSchema.ts
│   │   ├── orderSchema.ts
│   │   ├── productSchema.ts
│   │   └── userSchema.ts
│   ├── services/             # Services (lógica de negócio)
│   │   ├── category/
│   │   │   ├── CreateCategoryService.ts
│   │   │   └── ListCategoriesService.ts
│   │   ├── order/
│   │   │   ├── AddItemOrderService.ts
│   │   │   ├── CreateOrderService.ts
│   │   │   ├── DeleteOrderService.ts
│   │   │   ├── DetailOrderService.ts
│   │   │   ├── FinishOrderService.ts
│   │   │   ├── ListOrderService.ts
│   │   │   ├── RemoveItemOrderService.ts
│   │   │   └── SendOrderService.ts
│   │   ├── product/
│   │   │   ├── CreateProductService.ts
│   │   │   ├── DeleteProductService.ts
│   │   │   ├── ListProductsByCategoryService.ts
│   │   │   └── ListProductsService.ts
│   │   └── user/
│   │       ├── AuthUserService.ts
│   │       ├── CreateUserService.ts
│   │       └── DetailUserService.ts
│   ├── routes.ts             # Definição de todas as rotas
│   └── server.ts             # Configuração e inicialização do servidor
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências e scripts
├── prisma.config.ts          # Configurações adicionais do Prisma
└── tsconfig.json             # Configurações do TypeScript

```

### Convenções de Nomenclatura:

- **Controllers**: `<Action><Entity>Controller.ts` (ex: `CreateUserController.ts`)
- **Services**: `<Action><Entity>Service.ts` (ex: `CreateUserService.ts`)
- **Schemas**: `<entity>Schema.ts` (ex: `userSchema.ts`)
- **Middlewares**: `<description>.ts` (ex: `isAuthenticated.ts`)

### Resumo de Componentes:

| Tipo | Total | Descrição |
|------|-------|-----------|
| **Controllers** | 15 | Responsáveis por receber requisições e chamar services |
| **Services** | 15 | Contêm toda a lógica de negócio e acesso ao banco de dados |
| **Schemas** | 14 | Schemas de validação Zod em 6 arquivos |
| **Middlewares** | 3 | Middlewares de autenticação, autorização e validação |
| **Rotas** | 17 | Endpoints REST API |

---

## 🗄️ Modelagem do Banco de Dados

### Diagrama de Relacionamentos

```
User (1)
  └─ role: STAFF | ADMIN

Category (1) ─────< (N) Product
                         │
                         └─< (N) Item >─┐
                                        │
Order (1) ─────────────────────────────┘
  └─ items: Item[]
```

### Entidades e Atributos

#### **User** (Usuários do Sistema)

```typescript
{
  id: string(UUID); // Identificador único
  name: string; // Nome completo
  email: string(unique); // Email (único)
  password: string; // Senha criptografada (bcrypt)
  role: Role; // STAFF ou ADMIN
  createdAt: DateTime; // Data de criação
  updatedAt: DateTime; // Data de atualização
}
```

**Enum Role:**

- `STAFF` - Funcionário padrão
- `ADMIN` - Administrador (acesso total)

#### **Category** (Categorias de Produtos)

```typescript
{
  id: string (UUID)          // Identificador único
  name: string               // Nome da categoria
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
  products: Product[]        // Produtos desta categoria
}
```

#### **Product** (Produtos/Pizzas)

```typescript
{
  id: string (UUID)          // Identificador único
  name: string               // Nome do produto
  price: number (int)        // Preço em centavos
  description: string        // Descrição do produto
  banner: string             // URL da imagem
  disabled: boolean          // Produto ativo/inativo
  category_id: string        // FK para Category
  category: Category         // Relação com categoria
  items: Item[]              // Itens de pedidos deste produto
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

**Observação sobre preço**: O preço é armazenado em **centavos** (inteiro) para evitar problemas com aritmética de ponto flutuante.

#### **Order** (Pedidos)

```typescript
{
  id: string (UUID)          // Identificador único
  table: number (int)        // Número da mesa
  status: boolean            // false = aberto, true = fechado
  draft: boolean             // true = rascunho, false = confirmado
  name: string?              // Nome opcional para o pedido
  items: Item[]              // Itens do pedido
  createdAt: DateTime        // Data de criação
  updatedAt: DateTime        // Data de atualização
}
```

#### **Item** (Itens dos Pedidos)

```typescript
{
  id: string(UUID); // Identificador único
  amount: number(int); // Quantidade
  order_id: string; // FK para Order
  order: Order; // Relação com pedido
  product_id: string; // FK para Product
  product: Product; // Relação com produto
  createdAt: DateTime; // Data de criação
  updatedAt: DateTime; // Data de atualização
}
```

### Regras de Deleção (Cascade)

- **Product** deletado → Deleta todos os **Items** relacionados
- **Order** deletado → Deleta todos os **Items** relacionados
- **Category** deletada → Deleta todos os **Products** relacionados

---

## 🛡️ Middlewares

### 1. **isAuthenticated** (`middlewares/isAuthenticated.ts`)

**Função**: Valida se o usuário está autenticado verificando o token JWT.

**Fluxo**:

1. Extrai o token do header `Authorization: Bearer <token>`
2. Verifica a validade do token usando `jsonwebtoken`
3. Extrai o `user_id` do payload do token
4. Adiciona `user_id` ao objeto `req` para uso nos próximos middlewares/controllers
5. Chama `next()` se válido, ou retorna erro 401 se inválido

**Uso**:

```typescript
router.get("/me", isAuthenticated, new DetailUserController().handle);
```

**Respostas de Erro**:

- `401`: Token não fornecido ou inválido

---

### 2. **isAdmin** (`middlewares/isAdmin.ts`)

**Função**: Verifica se o usuário autenticado tem permissão de ADMIN.

**Pré-requisito**: Deve ser usado **após** o middleware `isAuthenticated`.

**Fluxo**:

1. Obtém `user_id` do `req` (adicionado pelo `isAuthenticated`)
2. Busca o usuário no banco de dados
3. Verifica se o campo `role` é igual a `"ADMIN"`
4. Chama `next()` se for admin, ou retorna erro 401 se não for

**Uso**:

```typescript
router.post(
  "/category",
  isAuthenticated,
  isAdmin,
  new CreateCategoryController().handle
);
```

**Respostas de Erro**:

- `401`: Usuário sem permissão

---

### 3. **validateSchema** (`middlewares/validateSchema.ts`)

**Função**: Valida dados da requisição (body, query, params) usando schemas Zod.

**Fluxo**:

1. Recebe um schema Zod como parâmetro
2. Valida `req.body`, `req.query` e `req.params` contra o schema
3. Chama `next()` se válido
4. Retorna erro 400 com detalhes da validação se inválido

**Uso**:

```typescript
router.post(
  "/users",
  validateSchema(createUserSchema),
  new CreateUserController().handle
);
```

**Respostas de Erro**:

- `400`: Erro de validação com detalhes dos campos inválidos
- `500`: Erro interno do servidor

**Exemplo de resposta de erro**:

```json
{
  "error": "Erro validação",
  "details": [
    { "message": "O nome precisa ter no minimo 3 letras" },
    { "message": "Precisa ser um email valido" }
  ]
}
```

---

## ✅ Validação com Schemas

Utilizamos **Zod** para validação de dados de entrada. Os schemas ficam organizados na pasta `src/schemas/`. Todos os 14 schemas estão divididos em 6 arquivos:

### 👤 User Schemas (`schemas/userSchema.ts`)

#### **createUserSchema**

Valida criação de novos usuários:

```typescript
{
  body: {
    name: string (min: 3 caracteres),
    email: email válido,
    password: string (min: 6 caracteres)
  }
}
```

**Mensagens de erro customizadas**:

- Nome inválido: "O nome precisa ter no minimo 3 letras"
- Email inválido: "Precisa ser um email valido"
- Senha inválida: "A senha deve ter no minimo 6 caracteres"

#### **authUserSchema**

Valida autenticação de usuários:

```typescript
{
  body: {
    email: email válido,
    password: string (obrigatório)
  }
}
```

---

### 🏷️ Category Schemas (`schemas/categorySchema.ts`)

#### **CreateCategorySchema**

Valida criação de categorias:

```typescript
{
  body: {
    name: string (min: 2 caracteres)
  }
}
```

**Mensagens de erro**:

- Nome inválido: "Nome da caregoria precisa ter 2 caracteres"

---

### 📦 Product Schemas (`schemas/productSchema.ts`)

#### **productSchema**

Valida criação de produtos:

```typescript
{
  body: {
    name: string (obrigatório),
    price: number (mínimo 1),
    description: string (obrigatório),
    category_id: string (obrigatório)
  }
}
```

#### **listProductsSchema**

Valida listagem com filtro de produtos:

```typescript
{
  query: {
    disabled: enum ["true" | "false"] (opcional, padrão: "false")
  }
}
```

#### **listProductsByCategorySchema**

Valida listagem de produtos por categoria:

```typescript
{
  query: {
    category_id: string (obrigatório)
  }
}
```

---

### 🛒 Order Schemas (`schemas/orderSchema.ts`)

#### **createOrderSchema**

Valida criação de pedidos:

```typescript
{
  body: {
    table: number (inteiro positivo, obrigatório),
    name: string (opcional)
  }
}
```

#### **addItemSchema**

Valida adição de itens ao pedido:

```typescript
{
  body: {
    order_id: string (obrigatório),
    product_id: string (obrigatório),
    amount: number (inteiro positivo, obrigatório)
  }
}
```

#### **sendOrderSchema**

Valida envio do pedido para preparo:

```typescript
{
  body: {
    order_id: string (obrigatório),
    name: string (obrigatório)
  }
}
```

#### **finishOrderSchema**

Valida finalização do pedido:

```typescript
{
  body: {
    order_id: string (obrigatório)
  }
}
```

---

### 🛒 Order Remove Schema (`schemas/orderRemoveSchema.ts`)

#### **removeItemSchema**

Valida remoção de itens do pedido:

```typescript
{
  query: {
    item_id: string (obrigatório)
  }
}
```

---

### 🛒 Order Detail Schema (`schemas/orderDetailSchema.ts`)

#### **detailOrderSchema**

Valida obtenção de detalhes do pedido:

```typescript
{
  query: {
    order_id: string (obrigatório)
  }
}
```

---

### Resumo dos Schemas

| Arquivo | Schemas | Total |
|---------|---------|-------|
| `userSchema.ts` | createUserSchema, authUserSchema | 2 |
| `categorySchema.ts` | CreateCategorySchema | 1 |
| `productSchema.ts` | productSchema, listProductsSchema, listProductsByCategorySchema | 3 |
| `orderSchema.ts` | createOrderSchema, addItemSchema, sendOrderSchema, finishOrderSchema | 4 |
| `orderRemoveSchema.ts` | removeItemSchema | 1 |
| `orderDetailSchema.ts` | detailOrderSchema | 1 |
| **TOTAL** | **14 schemas** | **14** |

---

## 🌐 Endpoints Completos

Este projeto possui **17 endpoints** divididos em 4 módulos: Usuários, Categorias, Produtos e Pedidos.

> ℹ️ **Nota**: Para documentação detalhada com todos os exemplos, consulte o arquivo [endpoints.md](endpoints.md)

### **👤 Módulo Usuários (3 endpoints)**

#### **POST /users** - Criar Usuário
- **Autenticação**: Não requerida
- **Validação**: `createUserSchema`
- **Controller**: `CreateUserController`
- **Service**: `CreateUserService`
- **Retorno**: 200 + dados do usuário criado

#### **POST /session** - Autenticar Usuário
- **Autenticação**: Não requerida
- **Validação**: `authUserSchema`
- **Controller**: `AuthUserController`
- **Service**: `AuthUserService`
- **Retorno**: 200 + token JWT

#### **GET /me** - Obter Dados do Usuário Autenticado
- **Autenticação**: `isAuthenticated`
- **Controller**: `DetailUserController`
- **Service**: `DetailUserService`
- **Retorno**: 200 + dados do usuário

---

### **🏷️ Módulo Categorias (2 endpoints)**

#### **POST /category** - Criar Categoria
- **Autenticação**: `isAuthenticated` + `isAdmin`
- **Validação**: `CreateCategorySchema`
- **Controller**: `CreateCategoryController`
- **Service**: `CreateCategoryService`
- **Retorno**: 201 + dados da categoria

#### **GET /category** - Listar Categorias
- **Autenticação**: `isAuthenticated`
- **Controller**: `ListCategoriesController`
- **Service**: `ListCategoriesService`
- **Retorno**: 200 + array de categorias

---

### **📦 Módulo Produtos (4 endpoints)**

#### **POST /product** - Criar Produto
- **Autenticação**: `isAuthenticated` + `isAdmin`
- **Validação**: `productSchema`
- **Especial**: Upload de imagem com `multer`
- **Controller**: `CreateProductController`
- **Service**: `CreateProductService`
- **Retorno**: 200 + dados do produto

#### **GET /products** - Listar Produtos
- **Autenticação**: `isAuthenticated`
- **Validação**: `listProductsSchema` (query: `disabled`)
- **Controller**: `ListProductsController`
- **Service**: `ListProductsService`
- **Retorno**: 200 + array de produtos

#### **GET /category/product** - Listar Produtos por Categoria
- **Autenticação**: `isAuthenticated`
- **Validação**: `listProductsByCategorySchema` (query: `category_id`)
- **Controller**: `ListProductsByCategoryController`
- **Service**: `ListProductsByCategoryService`
- **Retorno**: 200 + array de produtos da categoria

#### **DELETE /product** - Deletar Produto
- **Autenticação**: `isAuthenticated` + `isAdmin`
- **Validação**: Via query param `product_id`
- **Controller**: `DeleteProductController`
- **Service**: `DeleteProductService`
- **Retorno**: 200 + confirmação de deleção

---

### **🛒 Módulo Pedidos (8 endpoints)**

#### **POST /order** - Criar Pedido
- **Autenticação**: `isAuthenticated`
- **Validação**: `createOrderSchema`
- **Controller**: `CreateOrderController`
- **Service**: `CreateOrderService`
- **Retorno**: 201 + dados do pedido

#### **GET /orders** - Listar Pedidos
- **Autenticação**: `isAuthenticated`
- **Controller**: `ListOrdersController`
- **Service**: `ListOrderService`
- **Retorno**: 200 + array de pedidos

#### **POST /order/add** - Adicionar Item ao Pedido
- **Autenticação**: `isAuthenticated`
- **Validação**: `addItemSchema`
- **Controller**: `AddItemController`
- **Service**: `AddItemOrderService`
- **Retorno**: 200 + dados do item adicionado

#### **DELETE /order/remove** - Remover Item do Pedido
- **Autenticação**: `isAuthenticated`
- **Validação**: `removeItemSchema` (query: `item_id`)
- **Controller**: `RemoveItemController`
- **Service**: `RemoveItemOrderService`
- **Retorno**: 200 + confirmação

#### **GET /order/detail** - Obter Detalhes do Pedido
- **Autenticação**: `isAuthenticated`
- **Validação**: `detailOrderSchema` (query: `order_id`)
- **Controller**: `DetailOrderController`
- **Service**: `DetailOrderService`
- **Retorno**: 200 + detalhes completos do pedido

#### **PATCH /order/send** - Enviar Pedido para Preparo
- **Autenticação**: `isAuthenticated`
- **Validação**: `sendOrderSchema`
- **Controller**: `SendOrderController`
- **Service**: `SendOrderService`
- **Retorno**: 200 + pedido atualizado

#### **PUT /order/finish** - Finalizar Pedido
- **Autenticação**: `isAuthenticated`
- **Validação**: `finishOrderSchema`
- **Controller**: `FinishOrderController`
- **Service**: `FinishOrderService`
- **Retorno**: 200 + pedido finalizado

#### **DELETE /order** - Deletar Pedido
- **Autenticação**: `isAuthenticated`
- **Controller**: `DeleteOrderController`
- **Service**: `DeleteOrderService`
- **Retorno**: 200 + confirmação

---

## 🔄 Fluxo de Requisição

### Exemplo 1: Criação de Usuário (Sem Autenticação)

```
1. POST /users
   ↓
2. Middleware: validateSchema(createUserSchema)
   - Valida name, email, password
   - Se inválido → 400 com erros
   ↓
3. CreateUserController.handle()
   - Extrai dados do req.body
   - Instancia CreateUserService
   - Chama service.execute()
   ↓
4. CreateUserService.execute()
   - Verifica se email já existe
   - Se existe → throw Error("Usuário já existente!")
   - Criptografa senha com bcrypt
   - Cria usuário no banco via Prisma
   - Retorna dados do usuário (sem senha)
   ↓
5. CreateUserController.handle()
   - Recebe dados do service
   - Retorna res.json(user)
   ↓
6. Resposta HTTP 200 com dados do usuário
```

### Exemplo 2: Autenticação (Sem Autenticação, com Validação)

```
1. POST /session
   ↓
2. Middleware: validateSchema(authUserSchema)
   - Valida email e password
   - Se inválido → 400
   ↓
3. AuthUserController.handle()
   - Extrai email e password do req.body
   - Instancia AuthUserService
   - Chama service.execute()
   ↓
4. AuthUserService.execute()
   - Busca usuário por email no banco
   - Se não encontrar → throw Error("Usuário não encontrado!")
   - Compara password com hash bcrypt
   - Se incorreta → throw Error("Senha incorreta!")
   - Gera token JWT com user_id
   - Retorna dados do usuário + token
   ↓
5. AuthUserController.handle()
   - Recebe dados do service com token
   - Retorna res.json(session)
   ↓
6. Resposta HTTP 200 com token JWT
```

### Exemplo 3: Criação de Categoria (Com Autenticação + Autorização)

```
1. POST /category
   ↓
2. Middleware: isAuthenticated
   - Extrai token do header Authorization: Bearer <token>
   - Valida token JWT
   - Extrai user_id do payload
   - Adiciona user_id ao req
   - Se inválido → 401
   ↓
3. Middleware: isAdmin
   - Busca usuário no banco usando user_id
   - Verifica se role === "ADMIN"
   - Se não for admin → 401
   ↓
4. Middleware: validateSchema(CreateCategorySchema)
   - Valida dados do body
   - Se inválido → 400
   ↓
5. CreateCategoryController → CreateCategoryService
   - Lógica de negócio
   - Criação no banco de dados
   ↓
6. Resposta HTTP 201 com dados da categoria criada
```

### Exemplo 4: Adicionar Item ao Pedido (Fluxo Completo com Validações de Negócio)

```
1. POST /order/add
   ↓
2. Middleware: isAuthenticated
   - Valida token
   - Extrai user_id
   ↓
3. Middleware: validateSchema(addItemSchema)
   - Valida order_id, product_id, amount
   - Se inválido → 400
   ↓
4. AddItemController.handle()
   - Extrai order_id, product_id, amount do req.body
   - Instancia AddItemOrderService
   - Chama service.execute()
   ↓
5. AddItemOrderService.execute()
   - Verifica se pedido existe no banco
   - Se não → throw Error("Pedido não encontrado")
   - Verifica se produto existe e está ativo (disabled: false)
   - Se não → throw Error("Produto não encontrado")
   - Cria item no banco com relacionamentos
   - Retorna item com dados do produto
   ↓
6. AddItemController.handle()
   - Recebe item do service
   - Retorna res.json(item)
   ↓
7. Resposta HTTP 200 com dados do item adicionado
```

### Fluxo Geral de Tratamento de Erros

```
Service gera erro → Controller recebe erro → Error Handler Global
                                                    ↓
                                          Verifica tipo de erro
                                                    ↓
                                ┌───────────────────┼───────────────────┐
                                ↓                   ↓                   ↓
                        Error (custom)    InputError (validação)  Erro desconhecido
                                ↓                   ↓                   ↓
                            400 + mensagem      400 + detalhes      500 + generic
```

---

## ⚙️ Configurações do Projeto

### TypeScript (`tsconfig.json`)

**Configurações Principais**:

- **Target**: ES2020
- **Module**: CommonJS (compatível com Node.js)
- **Strict Mode**: Ativado (todas verificações rigorosas)
- **Output**: `./dist`
- **Root**: `./src`
- **Source Maps**: Habilitado

**Verificações Estritas Ativas**:

- `noImplicitAny`: Proíbe tipos `any` implícitos
- `strictNullChecks`: Tratamento rigoroso de null/undefined
- `noUnusedLocals`: Erro para variáveis não usadas
- `noUnusedParameters`: Erro para parâmetros não usados
- `noImplicitReturns`: Todos os caminhos devem retornar valor

---

### Prisma (`prisma/schema.prisma`)

**Generator**:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../src/generated/prisma"
}
```

Cliente Prisma é gerado em `src/generated/prisma/`.

**Datasource**:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Convenções**:

- Nomes de models em PascalCase (ex: `User`)
- Nomes de tabelas em snake_case (ex: `users`)
- IDs: UUID gerado automaticamente
- Timestamps automáticos: `createdAt`, `updatedAt`

---

### Express Server (`server.ts`)

**Middlewares Globais**:

1. `express.json()` - Parse de requisições JSON
2. `cors()` - Habilita CORS para todas as origens
3. `router` - Rotas da aplicação

**Error Handler Global**:

```typescript
app.use((error: Error, _, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: "Internal server error!" });
});
```

**Porta**:

- Padrão: `3333`
- Configurável via variável de ambiente `PORT`

---

### Variáveis de Ambiente (`.env`)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/pizzaria?schema=public"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# Server
PORT=3333
```

**Variáveis Obrigatórias**:

- `DATABASE_URL`: String de conexão PostgreSQL
- `JWT_SECRET`: Chave secreta para assinar tokens JWT

---

### Scripts NPM (`package.json`)

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

**Comando de Desenvolvimento**:

```bash
npm run dev
```

- Executa servidor com hot-reload
- Usa `tsx` para executar TypeScript diretamente

**Comandos Prisma**:

```bash
# Criar migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações
npx prisma migrate deploy

# Abrir Prisma Studio
npx prisma studio

# Gerar Prisma Client
npx prisma generate
```

---

## 🔐 Segurança

### Autenticação

- **JWT (JSON Web Tokens)** para autenticação stateless
- Tokens devem ser enviados no header: `Authorization: Bearer <token>`
- Token contém `user_id` no campo `sub`

### Autorização

- Sistema de roles: `STAFF` e `ADMIN`
- Rotas protegidas por middlewares `isAuthenticated` e `isAdmin`

### Criptografia

- **bcryptjs** com salt de 8 rounds para senhas
- Senhas nunca são retornadas nas respostas da API

### Validação

- **Zod** valida todos os inputs antes de chegarem à lógica de negócio
- Mensagens de erro customizadas e amigáveis

---

## 📝 Observações Importantes

1. **Preços em Centavos**: Todos os preços são armazenados como inteiros em centavos para evitar problemas com ponto flutuante.

2. **UUIDs**: Todos os IDs são UUIDs v4 gerados automaticamente pelo Prisma.

3. **Timestamps Automáticos**: `createdAt` e `updatedAt` são gerenciados automaticamente pelo Prisma.

4. **Cascade Delete**: Deleções em cascata estão configuradas para manter integridade referencial.

5. **Error Handling**: Todos os erros são capturados pelo error handler global do Express.

6. **Type Safety**: TypeScript configurado no modo strict garante segurança de tipos em todo o código.

7. **Prisma Client Customizado**: Cliente gerado em `src/generated/prisma` para melhor organização.

---

## 🚀 Como Iniciar o Projeto

1. **Instalar dependências**:

```bash
npm install
```

2. **Configurar variáveis de ambiente**:

```bash
cp .env.example .env
# Editar .env com suas configurações
```

3. **Executar migrações**:

```bash
npx prisma migrate dev
```

4. **Iniciar servidor**:

```bash
npm run dev
```

5. **Servidor rodando em**: `http://localhost:3333`

---

**Documento gerado em**: 11/11/2025  
**Versão do Projeto**: 1.0.0
