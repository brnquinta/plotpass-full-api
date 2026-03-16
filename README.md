# PlotPass

Access URL: https://plotpass-full-api.vercel.app/

PlotPass é uma aplicação web onde usuários podem buscar filmes e enviar recomendações para outros usuários.

O projeto foi desenvolvido como aplicação fullstack, utilizando React no frontend e Node.js com Express no backend.

---

## Funcionalidades

* Cadastro de usuário
* Login com autenticação JWT
* Busca de filmes utilizando a API do TMDB
* Envio de recomendações de filmes para outros usuários
* Visualização de recomendações recebidas
* Marcar recomendações como lidas

---

## Tecnologias utilizadas

### Frontend

* React
* React Router
* Vite
* CSS

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* JWT (JSON Web Token)

### API externa

* TMDB (The Movie Database)

---

## Estrutura do projeto

```
plotpass-full-api
│
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   └── app.js
│
├── frontend
│   ├── src
│   └── public
│
└── README.md
```

---

## Instalação e execução

### 1. Clonar o repositório

```
git clone https://github.com/brnquinta/plotpass-full-api.git
cd plotpass-full-api
```

---

### 2. Backend

```
cd backend
npm install
npm run start
```

Servidor roda em:

```
http://localhost:5000
```

---

### 3. Frontend

```
cd frontend
npm install
npm run dev
```

Aplicação roda em:

```
http://localhost:5173
```

---

## Variáveis de ambiente (backend)

Criar um arquivo `.env` na pasta `backend`:

```
JWT_SECRET=seu_secret
MONGO_URI=sua_string_mongodb
```

---

## Deploy

Frontend: Vercel
Backend: Render

---

## Autor

Bruno Quintanilha
