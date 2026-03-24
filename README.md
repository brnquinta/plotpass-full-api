# PlotPass 🎬

Access URL: https://plotpass-full-api.vercel.app/

PlotPass é uma aplicação web Full Stack integrada com a API do TMDB (The Movie Database), onde usuários podem buscar filmes e enviar recomendações para outros usuários.

---

## Funcionalidades

- Cadastro de usuário
- Login com autenticação JWT
- Busca de filmes utilizando a API do TMDB
- Envio de recomendações de filmes para outros usuários via e-mail
- Visualização de recomendações recebidas e enviadas
- Marcar recomendações como lidas

---

## Tecnologias Utilizadas

### Frontend

- React 19
- React Router DOM
- Vite
- CSS
- ESLint

### Backend

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT (JSON Web Token)
- Bcryptjs (hash de senha)
- Celebrate + Joi (validação de dados)
- Winston + Express-Winston (logs de requisições e erros)
- CORS
- Validator
- ESLint (Airbnb config)

### API Externa

- TMDB (The Movie Database)

---

## Estrutura do Projeto

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

## Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/brnquinta/plotpass-full-api.git
cd plotpass-full-api
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

Servidor roda em:

```
http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação roda em:

```
http://localhost:5173
```

---

## Variáveis de Ambiente (backend)

Crie um arquivo `.env` na pasta `backend/`:

```
JWT_SECRET=seu_secret
MONGO_URI=sua_string_mongodb
TMDB_API_KEY=sua_chave_tmdb
```

---

## Deploy

- Frontend: Vercel
- Backend: Render

---

## Autor

Bruno Quintanilha