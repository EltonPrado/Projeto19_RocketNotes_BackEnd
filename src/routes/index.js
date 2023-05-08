const { Router } = require("express");
//Importando o Router do express para o arquivo

const usersRouter = require("./users.routes");
//importando o grupo de rotas do usuário (users.routes)
const notesRouter = require("./notes.routes");
//importando o grupo de rotas do notas (notes.routes)
const tagsRouter = require("./tags.routes");
//importando o grupo de rotas da tags (tags.routes)
const sessionsRouter = require("./sessions.routes");
//importando o grupo de rotas da sessão (sessions.routes)

const routes = Router();

routes.use("/users", usersRouter);
//Vai redirecionar o acesso para o arquivo usersRoutes
routes.use("/notes", notesRouter);
//Vai redirecionar o acesso para o arquivo notesRoutes
routes.use("/tags", tagsRouter);
//Vai redirecionar o acesso para o arquivo tagsRoutes
routes.use("/sessions", sessionsRouter);
//Vai redirecionar o acesso para o arquivo sessionsRoutes

module.exports = routes;
//Exportando o routes para o arquivo