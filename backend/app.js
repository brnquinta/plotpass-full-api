const { requestLogger, errorLogger } = require("./middlewares/logger");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const errorMiddleware = require("./middlewares/error");

const usersRouter = require("./routes/users");
const recommendationsRouter = require("./routes/recommendations");

const app = express();

/* conexão mongodb */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log(err));

/* CORS CONFIG */
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://plotpass-full-api.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS não permitido"));
    },
  })
);

app.use(express.json());

/* logs */
app.use(requestLogger);

/* rotas */
app.use("/users", usersRouter);
app.use("/recommendations", recommendationsRouter);

/* erros */
app.use(errorLogger);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});