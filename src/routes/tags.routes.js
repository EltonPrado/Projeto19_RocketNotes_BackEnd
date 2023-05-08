const { Router } = require("express");

const TagsController = require("../controllers/TagsController");
//Importando o NotesController para o arquivo
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
//importando o middleware de autenticação

const tagsController = new TagsController();
//Criando uma nova instancia (realocando) na memória 

const tagsRoutes = Router();
//Vai inicializar o Router

tagsRoutes.get("/", ensureAuthenticated, tagsController.index);
//passando o middleware de forma especifica nas rotas
  //o / é o parâmetro utilizado na rota do insomnia

module.exports = tagsRoutes;
//Exportando a rota para o arquivo server.js