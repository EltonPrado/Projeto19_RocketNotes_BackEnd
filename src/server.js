require("dotenv/config");
require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");
//importando bibliotecas

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
//importando as rotas do arquivo index
 //Quando não especificado o arquivo, automaticamente ele importa o index

migrationsRun();
//arquivo do banco de dados

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER));
//vai fazer aparecer a imagem do usuário no insomnia

app.use(routes);
//Está dizendo para a aplicação (app) utilizar as rotas dentro do arquivo routes

app.use((error, request, response, next ) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})
//Fazendo a:
  //captura do error
  //verificação de onde está vindo esse error
  //devolvendo a resposta do error
  //Tudo isso do lado do cliente

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));