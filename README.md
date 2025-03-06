# 📞 Sistema de Agendamento Telefônico

Este projeto é um sistema de agendamento telefônico full-stack desenvolvido com **Angular** no frontend e **ASP.NET Core** no backend. Ele possui funcionalidades de gerenciamento de contatos e autenticação.

## 🚀 Tecnologias Utilizadas

- **Frontend:** Angular + PrimeNG
- **Backend:** ASP.NET Core + Identity + JWT
- **Banco de Dados:** PostgreSQL (ou In-Memory Database para ambiente de teste)
- **Autenticação:** Identity + JWT
- **Deploy:** Frontend no GitHub Pages, API em Free ASP.NET Hosting

## 🛠️ Como Rodar a Aplicação

### Docker

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
