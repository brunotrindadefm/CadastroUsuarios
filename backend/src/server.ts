import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db/dbConfig";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

import routes from "./routes/routes";
app.use('/api', routes);

sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Escutando na porta ${port}`);
    });
    console.log("Conectado no banco de dados");
  })
  .catch((error) => console.log("Erro ao conectar no banco de dados", error));
