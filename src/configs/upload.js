const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
//importando as bibliotecas

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp");
//Pasta temporária
  //vai armazenar informações de configuração para o upload
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");
//Pasta definitiva
  //vai servir para armazenar os arquivos de upload

const MULTER = {
  //O multer é a biblioteca que vamos utilizar para fazer o upload
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    //para onde estamos mandando o arquivo
    filename(request, file, callback){
      const fileHash = crypto.randomBytes(10).toString("hex");
      //o crypto vai gerar um hash (número) aleatório para o arquivo
        //vai evitar que os arquivos tenham nomes iguais
      const filename = `${fileHash}-${file.originalname}`;
      //nome do arquivo
        //está sendo usado literals para passar o texto com conteúdo de string

      return callback(null, filename);
    },
  }),
};

module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER,
}
