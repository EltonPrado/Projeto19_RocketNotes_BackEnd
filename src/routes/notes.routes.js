const { Router } = require("express");

const NotesController = require("../controllers/NotesController");
//Importando o NotesController para o arquivo
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
//importando o middleware de autenticação

const notesController = new NotesController();
//Criando uma nova instancia (realocando) na memória 

const notesRoutes = Router();
//Vai inicializar o Router

notesRoutes.use(ensureAuthenticated);

notesRoutes.get("/", notesController.index);
notesRoutes.post("/", notesController.create);
notesRoutes.get("/:id", notesController.show);
notesRoutes.delete("/:id", notesController.delete);
//passando o middleware de forma especifica nas rotas
  //o /:user_id é o parâmetro utilizado na rota do insomnia

module.exports = notesRoutes;
//Exportando a rota para o arquivo server.js