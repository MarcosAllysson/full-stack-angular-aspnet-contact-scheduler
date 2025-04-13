# 📞 Phone Scheduling System

This project is a full-stack phone scheduling system built with Angular on the frontend and ASP.NET Core on the backend. It includes features for contact management and authentication.

## 🚀 Technologies Used

- **Frontend:** Angular + PrimeNG
- **Backend:** ASP.NET Core + Identity + JWT
- **DataBase:** PostgreSQL (or In-Memory Database for testing environment)
- **Autenticação:** Identity + JWT

## 🛠️ How to Run the Application

## Docker

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
http://localhost:8080
```

5. Banco disponível em:

```sh
localhost:5432
```

<!-- ## 1. Ou clone o repositório e rode localmente

1. Clone o repositório

```sh
git clone https://github.com/MarcosAllysson/full-stack-angular-aspnet-contact-scheduler.git
cd full-stack-angular-aspnet-contact-scheduler
```

2. Configure o Backend

3. Instale o .NET SDK 8.0+

4. Vá até a pasta da API

```sh
cd backend
```

5. Instale as dependências do projeto:

```sh
dotnet build; dotnet restore
```

6. Crie instância do postgreSQL via docker:

```sh
docker run --name contactSchedulerDb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=contactSchedulerDb -p 5432:5432 -d postgres:17.2-alpine3.21
```

7. Veja se status do container "contactSchedulerDb" está em execução:

```sh
docker ps
```

8. Aplique migrations no banco (execute um comando por linha via terminal):

```sh
dotnet clean; dotnet restore; dotnet build;
dotnet-ef migrations add Initial
dotnet-ef database update
```

9. Se estiver rodando via Visual Studio:

```sh
Add-Migration Initial
Update-Database
```

10. Execute a API

```sh
dotnet run
```

11. Rodar testes (noutro terminal - opcional)

```sh
dotnet test
```

## Configure o Frontend

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
``` -->

<!-- ## 🌐 Acesso Online

- **Frontend:** (GitHub Pages)[https://link.com]
- **Backend:** (Free ASP.NET Hosting)[https://link.com]  -->

## ✅ Features
- User Login and Registration
- JWT Authentication
- Contact CRUD (List, Add, Edit, Delete)
- Favorite Contacts
- Route Guards and HTTP Interceptors

## 💡 Future Improvements
- Enhance UI/UX with animations and better visual feedback
- Add more unit tests for services and components
- Create a statistics dashboard
- Add more features related to the establishment
- Internationalization
- Pagination
- Data validation
