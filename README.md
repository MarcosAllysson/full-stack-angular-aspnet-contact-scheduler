# 📞 Sistema de Agendamento Telefônico

Este projeto é um sistema de agendamento telefônico full-stack desenvolvido com **Angular** no frontend e **ASP.NET Core** no backend. Ele possui funcionalidades de gerenciamento de contatos e autenticação.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Angular + PrimeNG
- **Backend:** ASP.NET Core + Identity + JWT
- **Banco de Dados:** PostgreSQL (ou In-Memory Database para ambiente de teste)
- **Autenticação:** Identity + JWT
- **Deploy:** Frontend no GitHub Pages, API em Free ASP.NET Hosting

## 🛠️ Como Rodar a Aplicação

### 0. Via docker

1. Build

```sh
docker-compose up --build
```

2. Parar os serviços:

```sh
docker-compose down
```

3. Abra a aplicação:

```sh
http://localhost:4200
```

4. API disponível em:

```sh
http://localhost:5000
```

5. Banco disponível em:

```sh
localhost:5432
```

### 1. Ou clone o repositório

```sh
git clone https://github.com/MarcosAllysson/full-stack-angular-aspnet-contact-scheduler.git
cd full-stack-angular-aspnet-contact-scheduler
```

### 2. Configurar o Backend

1. Instale o .NET SDK 8.0+
2. Vá até a pasta da API

```sh
cd backend
```

2.1. Instale as dependências do projeto:

```sh
dotnet build; dotnet restore
```

3. Crie instância do postgreSQL via docker:

```sh
docker run --name contactSchedulerDb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=contactSchedulerDb -p 5432:5432 -d postgres:17.2-alpine3.21
```

4. Veja se status do container "contactSchedulerDb" está em execução:

```sh
docker ps
```

5. Aplique migrations no banco (execute um comando por linha via terminal):

```sh
dotnet clean; dotnet restore; dotnet build;
dotnet-ef migrations add Initial
dotnet-ef database update
```

5.1. Se estiver rodando via Visual Studio:

```sh
Add-Migration Initial
Update-Database
```

6. Execute a API

```sh
dotnet run
```

7. Rodar testes (noutro terminal - opcional)

```sh
dotnet test
```

### 3. Configurar o Frontend

1. Instale o Node.js e Angular CLI
2. Navegue até a pasta do frontend

```sh
cd frontend
```

3. Instale as dependências

```sh
npm install
```

4. Rode o frontend

```sh
ng s -o
```

5. Rodar testes (noutro terminal)

```sh
ng test
```

## 🌐 Acesso Online

- **Frontend:** (GitHub Pages)[https://link.com]
- **Backend:** (Free ASP.NET Hosting)[https://link.com]

## ✅ Funcionalidades

- Login e Cadastro de Usuários
- Autenticação JWT
- CRUD de Contatos (Listar, Adicionar, Editar, Deletar)
- Favoritar Contatos
- Guardas de Rota e Interceptores HTTP

## 💡 Melhorias Futuras

- Melhorar UI/UX com animações e melhor feedback visual
- Adicionar mais testes unitários para serviços e componentes
- Criar um dashboard de estatísticas
- Mais funcionalidades relacionados ao estabelecimento
- Internacionalização
