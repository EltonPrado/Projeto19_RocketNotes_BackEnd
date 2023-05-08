const { verify } = require("jsonwebtoken");
//importação da função verify
const AppError = require("../utils/AppError");
//importação do gerenciamento de erros
const authConfig = require("../configs/auth");
//importação para saber como esta as configurações de autenticação

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization;
  //vai obter o cabeçalho 
    //o token do usuário vai estar dentro do authorization

  if(!authHeader){
    throw new AppError("JWT Token não informado", 401);
  }
  //verificando se o authHeader não existe

  const [ , token ] = authHeader.split(" ");
  //Se o token existir, vamos acessa-lo dentro do Header
    //Utilizamos o Split para pegar a string e separa-la passando-a para um vetor
      //Passamos para o split qual o caractere (espaço vazio) que ele vai usar como referencia para quebrar o texto em string
      //Quebramos o texto num array e pegamos a segunda posição desse array, passando-o para uma variável chamada token

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    //verificando se o token é valido
      //se for valido, vai ser devolvido o sub
      //o sub recebe um apelido referenciado como user_id

      request.user = {
        id: Number(user_id),
        //volta a ser um número
      };

      return next();
  }catch {
    throw new AppError("JWT Token inválido", 401);
  }
  //try e catch servem como tratamento de exceção
}

module.exports = ensureAuthenticated;