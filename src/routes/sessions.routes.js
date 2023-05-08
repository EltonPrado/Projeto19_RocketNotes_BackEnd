const { Router } = require("express");
//Importando as rotas do express

const SessionsController = require("../controllers/SessionsController");
//Importando o SessionsController

const sessionsController = new SessionsController();
//Estamos instanciando a classe na memória e passando para a variável SessionsController

const sessionsRoutes = Router();
sessionsRoutes.post("/", sessionsController.create);
//O sessionsRoutes está acessando através de um post, o create do SessionsController

module.exports = sessionsRoutes;