const knex = require ("../database/knex");
//importando a conexão com o banco de dados
const AppError = require ("../utils/AppError");
//importando o app.error para lidar com exceções de erro
const { compare } = require("bcryptjs");
//importando o compare do bcrypt. Ele vai ajudar na validação da senha
const authConfig = require("../configs/auth");
//importando o arquivo auth.js
const { sign } = require("jsonwebtoken");
//importando o método de sign

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();
    //acessando a tabela users e filtrando o usuário pelo email

    if(!user) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }
    //fazendo validação para o usuário 
      //apresentando mensagem em caso de email inexistente

    const passwordMatched = await compare(password, user.password);
    //Vai fazer a comparação de senhas. 
      //Esta pegando a senha digitada e comparando com a salva no banco de dados

    if(!passwordMatched) {
      throw new AppError("E-mail e/ou senha incorreta", 401);
    }
    //Fazendo validação verificando se a senha passada está correta
      //apresentando mensagem em caso de senha falsa

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({ user, token });
  }
}

module.exports = SessionsController;