# Backend Exemplo - Node.js, TypeScript, TypeORM, PostgreSQL

## Pré-requisitos
- Docker e Docker Compose instalados
- (Opcional) Node.js e npm para rodar localmente sem Docker

## Configuração
1. Copie o arquivo `.env.example` para `.env` e edite os valores conforme seu ambiente:
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com usuário, senha, nome do banco, volume, etc.
   ```
2. (Opcional) Ajuste o volume do banco de dados (`PGDATA_VOLUME`) para apontar para a pasta desejada no host.

### Variáveis de ambiente obrigatórias
Crie o arquivo `.env` ou configure as variáveis no ambiente de hospedagem. Todas são necessárias para funcionamento correto:

- `POSTGRES_USER`: usuário do banco PostgreSQL (ex: `postgres`)
- `POSTGRES_PASSWORD`: senha do banco PostgreSQL (ex: `postgres`)
- `POSTGRES_DB`: nome do banco de dados (ex: `sistemadb`)
- `DB_HOST`: host do banco de dados (ex: `localhost`, `db` ou IP do container)
- `DB_PORT`: porta do banco de dados (padrão: `5432`)
- `PGDATA_VOLUME`: caminho local para persistência dos dados do banco (ex: `./pg_db` ou caminho absoluto)
- `PORT`: porta do backend (padrão: `3081`)
- `TYPEORM_ENTITIES`: caminho dos arquivos de entidades TypeORM (padrão: `src/database/entities/*.ts`)
- `TYPEORM_MIGRATIONS`: caminho dos arquivos de migrations TypeORM (padrão: `src/database/migrations/*.ts`)
- `NODE_ENV`: ambiente de execução (`production` ou `development`)

> Recomenda-se nunca subir o arquivo `.env` real para o repositório. Use `.env.example` como modelo.

## Subindo o projeto com Docker Compose
```bash
docker-compose build
docker-compose up -d
```
O backend estará disponível em `http://localhost:3081/apiv1/app` (ajuste a porta conforme seu .env).

## Rotas disponíveis
Prefixo: `/apiv1/app`

- **Usuários**: `/usuarios` (CRUD)
- **Técnicos**: `/tecnicos` (CRUD)
- **Empresas**: `/empresas` (CRUD)
- **Clientes**: `/clientes` (CRUD)
- **Seções/Departamentos/SubDepartamentos**: `/secoes` (CRUD)
- **Status**: `/status` (CRUD)
- **Situações**: `/situacoes` (CRUD)
- **Produtos**: `/produtos` (CRUD)
- **Atendimentos**: `/atendimentos` (CRUD)
- **Atendimento Interações**: `/atendimentos/:codigo/interacoes` (listar interações de um atendimento)
- **Atendimento Produtos**: `/atendimentos/:codigo/produtos` (listar produtos de um atendimento)

> **Obs:** A rota `/apiv1/syspdv` não faz parte da API principal e serve apenas para testes internos.

---

## Exemplos de uso das rotas

### Usuários
- **Criar usuário:**
  - `POST /apiv1/app/usuarios`
  - Body:
    ```json
    { "nome": "João", "apelido": "joao", "senha": "123456", "email": "joao@email.com" }
    ```
  - Resposta:
    ```json
    { "codigo": "000001", "nome": "João", ... }
    ```

- **Listar usuários:**
  - `GET /apiv1/app/usuarios`
  - Resposta:
    ```json
    [ { "codigo": "000001", "nome": "João", ... } ]
    ```

### Atendimentos
- **Criar atendimento:**
  - `POST /apiv1/app/atendimentos`
  - Body:
    ```json
    { "codigoEmpresa": "0001", "codigoUsuario": "000001", "codigoCliente": "000001", "codigoStatus": "001", "codigoSituacao": "001" }
    ```
  - Resposta:
    ```json
    { "codigo": "0000000001", ... }
    ```

- **Listar interações de um atendimento:**
  - `GET /apiv1/app/atendimentos/0000000001/interacoes`
  - Resposta:
    ```json
    [ { "codigo": "0000000001", "codigoAtendimento": "0000000001", ... } ]
    ```

- **Listar produtos de um atendimento:**
  - `GET /apiv1/app/atendimentos/0000000001/produtos`
  - Resposta:
    ```json
    [ { "codigoAtendimento": "0000000001", "codigoProduto": "000001", ... } ]
    ```

---

## Observações
- Todos os endpoints seguem o padrão RESTful.
- Os códigos (ex: `codigo`, `codigoAtendimento`) são strings numéricas com padding zero à esquerda.
- Para mais detalhes sobre cada rota, consulte o código dos controllers e services.
- Futuramente, serão adicionadas seções sobre autenticação, permissões e exemplos avançados.
