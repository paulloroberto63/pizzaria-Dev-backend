# 📚 Documentação Completa de Endpoints - API Pizzaria

## 📖 Índice

1. [👤 Usuários (3 endpoints)](#-usuários-3-endpoints)
2. [🏷️ Categorias (2 endpoints)](#-categorias-2-endpoints)
3. [📦 Produtos (4 endpoints)](#-produtos-4-endpoints)
4. [🛒 Pedidos (8 endpoints)](#-pedidos-8-endpoints)
5. [🔐 Headers e Autenticação](#-headers-e-autenticação)
6. [⚠️ Códigos de Erro](#️-códigos-de-erro)

---

## 👤 Usuários (3 endpoints)

### POST /users - Criar Usuário

**Descrição**: Cria um novo usuário no sistema.

**Autenticação**: Não requerida

**Validação**: `createUserSchema`

**Middlewares**: `validadeSchema(createUserSchema)`

**Controller**: `CreateUserController`

**Service**: `CreateUserService`

---

#### Request

**Método**: `POST`

**URL**: `http://localhost:3333/users`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `name` | string | ✅ Sim | Mínimo 3 caracteres | "João Silva" |
| `email` | string | ✅ Sim | Email válido | "joao@example.com" |
| `password` | string | ✅ Sim | Mínimo 6 caracteres | "senha123" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2025-08-17T10:30:00.000Z",
  "updatedAt": "2025-08-17T10:30:00.000Z"
}
```

**Campos Retornados**:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string (UUID) | Identificador único do usuário |
| `name` | string | Nome do usuário |
| `email` | string | Email do usuário |
| `role` | string (enum) | Papel do usuário: `STAFF` ou `ADMIN` |
| `createdAt` | ISO 8601 | Data de criação |
| `updatedAt` | ISO 8601 | Data de atualização |

---

#### Possíveis Erros

**400 Bad Request** - Validação de schema falhada:
```json
{
  "error": "Erro validação",
  "details": [
    { "message": "o nome precisa ter no minimo 3 letras" },
    { "message": "Precisa ser um email valido" },
    { "message": "A senha deve ter no minimo 6 caracteres" }
  ]
}
```

**400 Bad Request** - Email já cadastrado:
```json
{
  "error": "Usuário já existente!"
}
```

---

#### Observações

- A senha é criptografada com **bcryptjs** (salt: 8 rounds)
- Role padrão atribuído é `STAFF`
- A senha não é retornada na resposta por questões de segurança
- O email é único no sistema (não podem existir dois usuários com o mesmo email)

---

### POST /session - Autenticar Usuário

**Descrição**: Autentica um usuário e retorna um token JWT para requisições futuras.

**Autenticação**: Não requerida

**Validação**: `authUserSchema`

**Middlewares**: `validadeSchema(authUserSchema)`

**Controller**: `AuthUserController`

**Service**: `AuthUserService`

---

#### Request

**Método**: `POST`

**URL**: `http://localhost:3333/session`

**Headers**:
```
Content-Type: application/json
```

**Body**:
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `email` | string | ✅ Sim | Email válido | "joao@example.com" |
| `password` | string | ✅ Sim | String não vazia | "senha123" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1NTBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAwMDAiLCJpYXQiOjE2OTI3OTk4MDB9.3mLr1Z6K9pQ2xL5mR3fF7sD4xY8nZ2mW1vC6kJ4pU5s"
}
```

**Campos Retornados**:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string (UUID) | Identificador único do usuário |
| `name` | string | Nome do usuário |
| `email` | string | Email do usuário |
| `role` | string (enum) | Papel do usuário |
| `token` | string (JWT) | Token de autenticação para requisições protegidas |

---

#### Possíveis Erros

**400 Bad Request** - Email não encontrado:
```json
{
  "error": "Usuário não encontrado!"
}
```

**400 Bad Request** - Senha incorreta:
```json
{
  "error": "Senha incorreta!"
}
```

---

#### Observações

- O token JWT é válido por tempo indeterminado (configurável via `JWT_SECRET` no `.env`)
- O token deve ser enviado no header `Authorization: Bearer <token>` em requisições futuras
- O token contém o `user_id` no campo `sub` do payload

---

### GET /me - Obter Dados do Usuário Autenticado

**Descrição**: Retorna os dados do usuário autenticado atualmente.

**Autenticação**: Requerida ✅

**Middlewares**: `isAuthenticated`

**Controller**: `DetailUserController`

**Service**: `DetailUserService`

---

#### Request

**Método**: `GET`

**URL**: `http://localhost:3333/me`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parâmetros**: Nenhum

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "STAFF",
  "createdAt": "2025-08-17T10:30:00.000Z",
  "updatedAt": "2025-08-17T10:30:00.000Z"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Token não fornecido ou inválido:
```json
{
  "error": "Unauthorized"
}
```

---

#### Observações

- Este endpoint requer autenticação
- O token deve ser enviado no header `Authorization`
- Retorna os dados do usuário autenticado no momento da requisição

---

## 🏷️ Categorias (2 endpoints)

### POST /category - Criar Categoria

**Descrição**: Cria uma nova categoria de produtos no sistema. Apenas administradores podem criar categorias.

**Autenticação**: Requerida ✅

**Permissão**: Admin

**Validação**: `CreateCategorySchema`

**Middlewares**: `isAuthenticated`, `isAdmin`, `validadeSchema(CreateCategorySchema)`

**Controller**: `CreateCategoryController`

**Service**: `CreateCategoryService`

---

#### Request

**Método**: `POST`

**URL**: `http://localhost:3333/category`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "name": "Pizzas Doces"
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `name` | string | ✅ Sim | Mínimo 2 caracteres | "Pizzas Doces" |

---

#### Response

**Status**: `201 Created`

**Body**:
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Pizzas Doces",
  "createdAt": "2025-08-17T10:35:00.000Z",
  "updatedAt": "2025-08-17T10:35:00.000Z"
}
```

**Campos Retornados**:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string (UUID) | Identificador único da categoria |
| `name` | string | Nome da categoria |
| `createdAt` | ISO 8601 | Data de criação |
| `updatedAt` | ISO 8601 | Data de atualização |

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**401 Unauthorized** - Usuário não é administrador:
```json
{
  "error": "Usuário sem permissão"
}
```

**400 Bad Request** - Validação falhada:
```json
{
  "error": "Erro validação",
  "details": [
    { "message": "Nome da caregoria precisa ter 2 caracteres" }
  ]
}
```

---

#### Observações

- Requer autenticação (enviar token JWT)
- Requer permissão de administrador
- O nome da categoria deve ter no mínimo 2 caracteres
- As categorias são usadas para organizar produtos

---

### GET /category - Listar Categorias

**Descrição**: Lista todas as categorias cadastradas no sistema.

**Autenticação**: Requerida ✅

**Middlewares**: `isAuthenticated`

**Controller**: `ListCategoriesController`

**Service**: `ListCategoriesService`

---

#### Request

**Método**: `GET`

**URL**: `http://localhost:3333/category`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parâmetros**: Nenhum

---

#### Response

**Status**: `200 OK`

**Body**:
```json
[
  {
    "id": "660e8400-e29b-41d4-a716-446655440001",
    "name": "Pizzas Doces",
    "createdAt": "2025-08-17T10:35:00.000Z",
    "updatedAt": "2025-08-17T10:35:00.000Z"
  },
  {
    "id": "660e8400-e29b-41d4-a716-446655440002",
    "name": "Pizzas Salgadas",
    "createdAt": "2025-08-17T10:36:00.000Z",
    "updatedAt": "2025-08-17T10:36:00.000Z"
  }
]
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

---

#### Observações

- Requer autenticação
- Retorna array vazio se nenhuma categoria foi criada
- Categorias são usadas para filtrar produtos

---

## 📦 Produtos (4 endpoints)

### POST /product - Criar Produto

**Descrição**: Cria um novo produto com upload de imagem para Cloudinary. Apenas administradores podem criar produtos.

**Autenticação**: Requerida ✅

**Permissão**: Admin

**Validação**: `productSchema`

**Middlewares**: `isAuthenticated`, `isAdmin`, `upload.single("file")`, `validadeSchema(productSchema)`

**Controller**: `CreateProductController`

**Service**: `CreateProductService`

---

#### Request

**Método**: `POST`

**URL**: `http://localhost:3333/product`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body** (form-data):

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `name` | string | ✅ Sim | Min 1 caractere | "Pepperoni" |
| `price` | number | ✅ Sim | Mínimo 1 | 3500 |
| `description` | string | ✅ Sim | Min 1 caractere | "Pizza de pepperoni com queijo" |
| `category_id` | string | ✅ Sim | UUID válido | "660e8400-e29b-41d4-a716-446655440001" |
| `file` | file | ✅ Sim | Imagem (jpg, png, etc) | [arquivo de imagem] |

**Exemplo cURL**:
```bash
curl -X POST http://localhost:3333/product \
  -H "Authorization: Bearer <token>" \
  -F "name=Pepperoni" \
  -F "price=3500" \
  -F "description=Pizza de pepperoni com queijo" \
  -F "category_id=660e8400-e29b-41d4-a716-446655440001" \
  -F "file=@pizza.jpg"
```

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "770e8400-e29b-41d4-a716-446655440003",
  "name": "Pepperoni",
  "price": 3500,
  "description": "Pizza de pepperoni com queijo",
  "banner": "https://res.cloudinary.com/seu-cloud/image/upload/v1692799800/pizzaria/pizza.jpg",
  "disabled": false,
  "category_id": "660e8400-e29b-41d4-a716-446655440001",
  "createdAt": "2025-08-17T10:40:00.000Z",
  "updatedAt": "2025-08-17T10:40:00.000Z"
}
```

**Campos Retornados**:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string (UUID) | Identificador único do produto |
| `name` | string | Nome do produto |
| `price` | number | Preço em centavos |
| `description` | string | Descrição do produto |
| `banner` | string (URL) | URL da imagem no Cloudinary |
| `disabled` | boolean | Status do produto (false = ativo) |
| `category_id` | string (UUID) | ID da categoria |
| `createdAt` | ISO 8601 | Data de criação |
| `updatedAt` | ISO 8601 | Data de atualização |

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**401 Unauthorized** - Usuário não é administrador:
```json
{
  "error": "Usuário sem permissão"
}
```

**400 Bad Request** - Validação falhada:
```json
{
  "error": "Erro validação",
  "details": [
    { "message": "O nome do produto é obrigatório" },
    { "message": "O preço do produto é obrigatório" }
  ]
}
```

**400 Bad Request** - Categoria não existe:
```json
{
  "error": "Categoria não encontrada!"
}
```

---

#### Observações

- Requer autenticação e permissão de admin
- O preço é armazenado em **centavos** (inteiro para evitar problemas com ponto flutuante)
- A imagem é enviada para o Cloudinary via stream
- O campo `banner` contém a URL pública da imagem
- Apenas uma imagem por requisição
- `disabled` começa como `false` (produto ativo)

---

### GET /products - Listar Produtos

**Descrição**: Lista todos os produtos cadastrados. Pode filtrar por status (ativo/desativado).

**Autenticação**: Requerida ✅

**Validação**: `listProductsSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(listProductsSchema)`

**Controller**: `ListProductsController`

**Service**: `ListProductsService`

---

#### Request

**Método**: `GET`

**URL**: `http://localhost:3333/products?disabled=false`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters**:

| Parâmetro | Tipo | Obrigatório | Validação | Padrão | Exemplo |
|-----------|------|-------------|-----------|--------|---------|
| `disabled` | enum | Não | "true" \| "false" | "false" | "false" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "name": "Pepperoni",
    "price": 3500,
    "description": "Pizza de pepperoni com queijo",
    "banner": "https://res.cloudinary.com/seu-cloud/image/upload/v1692799800/pizzaria/pizza.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-08-17T10:40:00.000Z",
    "updatedAt": "2025-08-17T10:40:00.000Z"
  },
  {
    "id": "770e8400-e29b-41d4-a716-446655440004",
    "name": "Margherita",
    "price": 2500,
    "description": "Pizza clássica com tomate e queijo",
    "banner": "https://res.cloudinary.com/seu-cloud/image/upload/v1692799850/pizzaria/margherita.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-08-17T10:41:00.000Z",
    "updatedAt": "2025-08-17T10:41:00.000Z"
  }
]
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

---

#### Observações

- Requer autenticação
- Query param `disabled` controla quais produtos são retornados
- Se `disabled=false` (padrão): retorna apenas produtos ativos
- Se `disabled=true`: retorna apenas produtos desativados
- Retorna array vazio se nenhum produto encontrado
- Preço sempre em centavos

---

### GET /category/product - Listar Produtos por Categoria

**Descrição**: Lista todos os produtos de uma categoria específica.

**Autenticação**: Requerida ✅

**Validação**: `listProductsByCategorySchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(listProductsByCategorySchema)`

**Controller**: `ListProductsByCategoryController`

**Service**: `ListProductsByCategoryService`

---

#### Request

**Método**: `GET`

**URL**: `http://localhost:3333/category/product?category_id=660e8400-e29b-41d4-a716-446655440001`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters**:

| Parâmetro | Tipo | Obrigatório | Validação | Exemplo |
|-----------|------|-------------|-----------|---------|
| `category_id` | string | ✅ Sim | UUID válido | "660e8400-e29b-41d4-a716-446655440001" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
[
  {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "name": "Pepperoni",
    "price": 3500,
    "description": "Pizza de pepperoni com queijo",
    "banner": "https://res.cloudinary.com/seu-cloud/image/upload/v1692799800/pizzaria/pizza.jpg",
    "disabled": false,
    "category_id": "660e8400-e29b-41d4-a716-446655440001",
    "createdAt": "2025-08-17T10:40:00.000Z",
    "updatedAt": "2025-08-17T10:40:00.000Z"
  }
]
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Validação falhada:
```json
{
  "error": "Erro validação",
  "details": [
    { "message": "O id da categoria é obrigatório" }
  ]
}
```

**400 Bad Request** - Categoria não existe:
```json
{
  "error": "Categoria não encontrada!"
}
```

---

#### Observações

- Requer autenticação
- `category_id` é obrigatório
- Retorna apenas produtos ativos (disabled: false)
- Retorna array vazio se nenhum produto encontrado na categoria

---

### DELETE /product - Deletar Produto

**Descrição**: Deleta um produto do sistema. Apenas administradores podem deletar produtos.

**Autenticação**: Requerida ✅

**Permissão**: Admin

**Middlewares**: `isAuthenticated`, `isAdmin`

**Controller**: `DeleteProductController`

**Service**: `DeleteProductService`

---

#### Request

**Método**: `DELETE`

**URL**: `http://localhost:3333/product?product_id=770e8400-e29b-41d4-a716-446655440003`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters**:

| Parâmetro | Tipo | Obrigatório | Validação | Exemplo |
|-----------|------|-------------|-----------|---------|
| `product_id` | string | ✅ Sim | UUID válido | "770e8400-e29b-41d4-a716-446655440003" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "message": "Produto deletado com sucesso"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**401 Unauthorized** - Usuário não é administrador:
```json
{
  "error": "Usuário sem permissão"
}
```

**400 Bad Request** - Produto não existe:
```json
{
  "error": "Produto não encontrado!"
}
```

---

#### Observações

- Requer autenticação e permissão de admin
- Deleta em cascata todos os itens (items) associados ao produto
- `product_id` é enviado como query parameter

---

## 🛒 Pedidos (8 endpoints)

### POST /order - Criar Pedido

**Descrição**: Cria um novo pedido no sistema. Um pedido começa em estado de rascunho.

**Autenticação**: Requerida ✅

**Validação**: `createOrderSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(createOrderSchema)`

**Controller**: `CreateOrderController`

**Service**: `CreateOrderService`

---

#### Request

**Método**: `POST`

**URL**: `http://localhost:3333/order`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "table": 5,
  "name": "Mesa do João"
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `table` | number | ✅ Sim | Inteiro positivo | 5 |
| `name` | string | Não | String | "Mesa do João" |

---

#### Response

**Status**: `201 Created`

**Body**:
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440005",
  "table": 5,
  "status": false,
  "draft": true,
  "name": "Mesa do João",
  "createdAt": "2025-08-17T11:00:00.000Z",
  "updatedAt": "2025-08-17T11:00:00.000Z"
}
```

**Campos Retornados**:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string (UUID) | Identificador único do pedido |
| `table` | number | Número da mesa |
| `status` | boolean | false = aberto, true = fechado |
| `draft` | boolean | true = rascunho, false = confirmado |
| `name` | string | Nome/identificação do pedido |
| `createdAt` | ISO 8601 | Data de criação |
| `updatedAt` | ISO 8601 | Data de atualização |

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Validação falhada:
```json
{
  "error": "Erro validação",
  "details": [
    { "message": "A mesa é obrigatória" }
  ]
}
```

---

#### Observações

- Requer autenticação
- `table` é obrigatório e deve ser um número positivo inteiro
- `name` é opcional
- Novo pedido começa como `draft: true` e `status: false` (aberto)

---

### GET /orders - Listar Pedidos

**Descrição**: Lista todos os pedidos cadastrados no sistema.

**Autenticação**: Requerida ✅

**Middlewares**: `isAuthenticated`

**Controller**: `ListOrdersController`

**Service**: `ListOrderService`

---

#### Request

**Método**: `GET`

**URL**: `http://localhost:3333/orders`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Parâmetros**: Nenhum

---

#### Response

**Status**: `200 OK`

**Body**:
```json
[
  {
    "id": "880e8400-e29b-41d4-a716-446655440005",
    "table": 5,
    "status": false,
    "draft": true,
    "name": "Mesa do João",
    "createdAt": "2025-08-17T11:00:00.000Z",
    "updatedAt": "2025-08-17T11:00:00.000Z"
  },
  {
    "id": "880e8400-e29b-41d4-a716-446655440006",
    "table": 3,
    "status": true,
    "draft": false,
    "name": null,
    "createdAt": "2025-08-17T11:05:00.000Z",
    "updatedAt": "2025-08-17T11:10:00.000Z"
  }
]
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

---

#### Observações

- Requer autenticação
- Retorna todos os pedidos, independente do status
- Retorna array vazio se nenhum pedido foi criado

---

### POST /order/add - Adicionar Item ao Pedido

**Descrição**: Adiciona um produto ao pedido como um novo item.

**Autenticação**: Requerida ✅

**Validação**: `addItemSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(addItemSchema)`

**Controller**: `AddItemController`

**Service**: `AddItemOrderService`

---

#### Request

**Método**: `POST`

**URL**: `http://localhost:3333/order/add`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "order_id": "880e8400-e29b-41d4-a716-446655440005",
  "product_id": "770e8400-e29b-41d4-a716-446655440003",
  "amount": 2
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `order_id` | string | ✅ Sim | UUID válido | "880e8400-e29b-41d4-a716-446655440005" |
| `product_id` | string | ✅ Sim | UUID válido | "770e8400-e29b-41d4-a716-446655440003" |
| `amount` | number | ✅ Sim | Inteiro positivo | 2 |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "990e8400-e29b-41d4-a716-446655440007",
  "order_id": "880e8400-e29b-41d4-a716-446655440005",
  "product_id": "770e8400-e29b-41d4-a716-446655440003",
  "amount": 2,
  "product": {
    "id": "770e8400-e29b-41d4-a716-446655440003",
    "name": "Pepperoni",
    "price": 3500,
    "description": "Pizza de pepperoni com queijo",
    "banner": "https://res.cloudinary.com/seu-cloud/image/upload/v1692799800/pizzaria/pizza.jpg"
  },
  "createdAt": "2025-08-17T11:15:00.000Z",
  "updatedAt": "2025-08-17T11:15:00.000Z"
}
```

**Campos Retornados**:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | string (UUID) | Identificador único do item |
| `order_id` | string (UUID) | ID do pedido |
| `product_id` | string (UUID) | ID do produto |
| `amount` | number | Quantidade adicionada |
| `product` | object | Dados completos do produto |
| `createdAt` | ISO 8601 | Data de criação |
| `updatedAt` | ISO 8601 | Data de atualização |

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Validação falhada:
```json
{
  "error": "Erro validação",
  "details": [
    { "message": "O id do pedido é obrigatório" }
  ]
}
```

**400 Bad Request** - Pedido não encontrado:
```json
{
  "error": "Pedido não encontrado"
}
```

**400 Bad Request** - Produto não encontrado ou desativado:
```json
{
  "error": "Produto não encontrado"
}
```

---

#### Observações

- Requer autenticação
- Verifica se o pedido existe
- Verifica se o produto existe e está ativo (disabled: false)
- Você pode adicionar o mesmo produto múltiplas vezes
- Cada adicionar cria um novo Item com a quantidade especificada

---

### DELETE /order/remove - Remover Item do Pedido

**Descrição**: Remove um item específico de um pedido.

**Autenticação**: Requerida ✅

**Validação**: `removeItemSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(removeItemSchema)`

**Controller**: `RemoveItemController`

**Service**: `RemoveItemOrderService`

---

#### Request

**Método**: `DELETE`

**URL**: `http://localhost:3333/order/remove?item_id=990e8400-e29b-41d4-a716-446655440007`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters**:

| Parâmetro | Tipo | Obrigatório | Validação | Exemplo |
|-----------|------|-------------|-----------|---------|
| `item_id` | string | ✅ Sim | UUID válido | "990e8400-e29b-41d4-a716-446655440007" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "message": "Item removido com sucesso"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Item não existe:
```json
{
  "error": "Item não encontrado!"
}
```

---

#### Observações

- Requer autenticação
- Remove completamente o item do pedido
- `item_id` é enviado como query parameter

---

### GET /order/detail - Obter Detalhes do Pedido

**Descrição**: Obtém todos os detalhes de um pedido, incluindo seus itens e produtos.

**Autenticação**: Requerida ✅

**Validação**: `detailOrderSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(detailOrderSchema)`

**Controller**: `DetailOrderController`

**Service**: `DetailOrderService`

---

#### Request

**Método**: `GET`

**URL**: `http://localhost:3333/order/detail?order_id=880e8400-e29b-41d4-a716-446655440005`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters**:

| Parâmetro | Tipo | Obrigatório | Validação | Exemplo |
|-----------|------|-------------|-----------|---------|
| `order_id` | string | ✅ Sim | UUID válido | "880e8400-e29b-41d4-a716-446655440005" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440005",
  "table": 5,
  "status": false,
  "draft": true,
  "name": "Mesa do João",
  "items": [
    {
      "id": "990e8400-e29b-41d4-a716-446655440007",
      "order_id": "880e8400-e29b-41d4-a716-446655440005",
      "product_id": "770e8400-e29b-41d4-a716-446655440003",
      "amount": 2,
      "product": {
        "id": "770e8400-e29b-41d4-a716-446655440003",
        "name": "Pepperoni",
        "price": 3500,
        "description": "Pizza de pepperoni com queijo",
        "banner": "https://res.cloudinary.com/seu-cloud/image/upload/v1692799800/pizzaria/pizza.jpg"
      },
      "createdAt": "2025-08-17T11:15:00.000Z",
      "updatedAt": "2025-08-17T11:15:00.000Z"
    }
  ],
  "createdAt": "2025-08-17T11:00:00.000Z",
  "updatedAt": "2025-08-17T11:15:00.000Z"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Pedido não existe:
```json
{
  "error": "Pedido não encontrado!"
}
```

---

#### Observações

- Requer autenticação
- Retorna o pedido completo com todos seus itens
- Cada item contém os dados do produto associado
- Preços estão em centavos

---

### PATCH /order/send - Enviar Pedido para Preparo

**Descrição**: Envia o pedido para a cozinha (muda de draft para confirmado e inicia o preparo).

**Autenticação**: Requerida ✅

**Validação**: `sendOrderSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(sendOrderSchema)`

**Controller**: `SendOrderController`

**Service**: `SendOrderService`

---

#### Request

**Método**: `PATCH`

**URL**: `http://localhost:3333/order/send`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "order_id": "880e8400-e29b-41d4-a716-446655440005",
  "name": "Mesa do João"
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `order_id` | string | ✅ Sim | UUID válido | "880e8400-e29b-41d4-a716-446655440005" |
| `name` | string | ✅ Sim | String não vazia | "Mesa do João" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440005",
  "table": 5,
  "status": false,
  "draft": false,
  "name": "Mesa do João",
  "createdAt": "2025-08-17T11:00:00.000Z",
  "updatedAt": "2025-08-17T11:20:00.000Z"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Pedido não existe:
```json
{
  "error": "Pedido não encontrado!"
}
```

**400 Bad Request** - Pedido já foi enviado:
```json
{
  "error": "Pedido já foi enviado"
}
```

---

#### Observações

- Requer autenticação
- Muda `draft` de true para false
- `name` pode ser atualizado neste ponto
- Pedido está sendo preparado na cozinha

---

### PUT /order/finish - Finalizar Pedido

**Descrição**: Finaliza um pedido (marca como entregue/fechado).

**Autenticação**: Requerida ✅

**Validação**: `finishOrderSchema`

**Middlewares**: `isAuthenticated`, `validadeSchema(finishOrderSchema)`

**Controller**: `FinishOrderController`

**Service**: `FinishOrderService`

---

#### Request

**Método**: `PUT`

**URL**: `http://localhost:3333/order/finish`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body**:
```json
{
  "order_id": "880e8400-e29b-41d4-a716-446655440005"
}
```

**Parâmetros Body**:

| Campo | Tipo | Obrigatório | Validação | Exemplo |
|-------|------|-------------|-----------|---------|
| `order_id` | string | ✅ Sim | UUID válido | "880e8400-e29b-41d4-a716-446655440005" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "id": "880e8400-e29b-41d4-a716-446655440005",
  "table": 5,
  "status": true,
  "draft": false,
  "name": "Mesa do João",
  "createdAt": "2025-08-17T11:00:00.000Z",
  "updatedAt": "2025-08-17T11:25:00.000Z"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Pedido não existe:
```json
{
  "error": "Pedido não encontrado!"
}
```

**400 Bad Request** - Pedido já está finalizado:
```json
{
  "error": "Pedido já está finalizado"
}
```

---

#### Observações

- Requer autenticação
- Muda `status` de false para true (fechado/finalizado)
- Indica que o pedido foi entregue ao cliente

---

### DELETE /order - Deletar Pedido

**Descrição**: Deleta um pedido e todos seus itens associados do sistema.

**Autenticação**: Requerida ✅

**Middlewares**: `isAuthenticated`

**Controller**: `DeleteOrderController`

**Service**: `DeleteOrderService`

---

#### Request

**Método**: `DELETE`

**URL**: `http://localhost:3333/order?order_id=880e8400-e29b-41d4-a716-446655440005`

**Headers**:
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Query Parameters**:

| Parâmetro | Tipo | Obrigatório | Validação | Exemplo |
|-----------|------|-------------|-----------|---------|
| `order_id` | string | ✅ Sim | UUID válido | "880e8400-e29b-41d4-a716-446655440005" |

---

#### Response

**Status**: `200 OK`

**Body**:
```json
{
  "message": "Pedido deletado com sucesso"
}
```

---

#### Possíveis Erros

**401 Unauthorized** - Sem token ou não autenticado:
```json
{
  "error": "Unauthorized"
}
```

**400 Bad Request** - Pedido não existe:
```json
{
  "error": "Pedido não encontrado!"
}
```

---

#### Observações

- Requer autenticação
- Deleta em cascata todos os itens associados ao pedido
- `order_id` é enviado como query parameter

---

## 🔐 Headers e Autenticação

### Bearer Token (JWT)

Para acessar endpoints protegidos, você deve incluir o token JWT no header `Authorization`:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Como Obter o Token

1. Faça login com `POST /session`:

```bash
curl -X POST http://localhost:3333/session \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

2. O token será retornado na resposta
3. Use o token em todas as requisições subsequentes

### Headers Padrão

```
Authorization: Bearer <token>
Content-Type: application/json
```

Para upload de arquivos:

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

---

## ⚠️ Códigos de Erro

### 200 OK
- Requisição bem-sucedida
- Dados retornados no body

### 201 Created
- Recurso criado com sucesso
- Dados do novo recurso retornados

### 400 Bad Request
- Erro de validação
- Dados inválidos
- Lógica de negócio falhou

### 401 Unauthorized
- Sem autenticação
- Token inválido ou expirado
- Sem permissão de acesso

### 500 Internal Server Error
- Erro no servidor
- Erro não previsto

---

## 📋 Resumo de Endpoints

| HTTP | Endpoint | Auth | Admin | Descrição |
|------|----------|------|-------|-----------|
| POST | `/users` | ❌ | ❌ | Criar usuário |
| POST | `/session` | ❌ | ❌ | Fazer login |
| GET | `/me` | ✅ | ❌ | Dados do usuário |
| POST | `/category` | ✅ | ✅ | Criar categoria |
| GET | `/category` | ✅ | ❌ | Listar categorias |
| POST | `/product` | ✅ | ✅ | Criar produto |
| GET | `/products` | ✅ | ❌ | Listar produtos |
| GET | `/category/product` | ✅ | ❌ | Produtos por categoria |
| DELETE | `/product` | ✅ | ✅ | Deletar produto |
| POST | `/order` | ✅ | ❌ | Criar pedido |
| GET | `/orders` | ✅ | ❌ | Listar pedidos |
| POST | `/order/add` | ✅ | ❌ | Adicionar item |
| DELETE | `/order/remove` | ✅ | ❌ | Remover item |
| GET | `/order/detail` | ✅ | ❌ | Detalhes do pedido |
| PATCH | `/order/send` | ✅ | ❌ | Enviar para preparo |
| PUT | `/order/finish` | ✅ | ❌ | Finalizar pedido |
| DELETE | `/order` | ✅ | ❌ | Deletar pedido |

---

**Documento gerado em**: 17/08/2026  
**Versão da API**: 1.0.0  
**Base URL**: `http://localhost:3333`
