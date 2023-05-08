module.exports = {
  //O objeto vai conter o JWT com as propriedades
  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    //secret - pode ser uma palavra ou chave de segredo
      //Utilizado para poder gerar o token
      //O valor do secret está sendo passado através da variável de ambiente ou pelo default
    expiresIn: "1d"
    //expiresIn - tempo de expiração para a palavra
  }
}
//São informações/ dados sensíveis que devem ser protegidos