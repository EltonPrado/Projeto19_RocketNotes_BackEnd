const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
//importando bibliotecas

const UsersController = require("../controllers/UsersController");
//Importando o UsersController para o arquivo
const UserAvatarController = require("../controllers/UserAvatarController");
//Importando o a rota do avatar de usuário
const ensureAuthenticated = require("../middleware/ensureAuthenticated");
//importando o middleware de autenticação

const usersController = new UsersController();
//Criando uma nova instancia (realocando) na memória
const userAvatarController = new UserAvatarController();
//Criando uma nova instancia para o controller do avatar

const usersRoutes = Router();
//Vai inicializar o Router
const upload = multer(uploadConfig.MULTER);
//inicializando e passando as configs do multer dentro da const upload

usersRoutes.post("/", usersController.create);
//passando o middleware de forma especifica nas rotas
usersRoutes.put("/", ensureAuthenticated, usersController.update);
//nova rota para atualização do perfil de usuário
//o middleware de autenticação vai interceptar a requisição nessa rota para depois o usuário seguir o caminho de atualização
  //dentro do middleware vai ser capturado o id usuário que está dentro do token
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update);
//atualizando a imagem de avatar do usuário
  //a imagem será salva numa pasta temporária, não no banco de dados.

module.exports = usersRoutes;
//Exportando a rota para o arquivo server.js