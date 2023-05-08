const fs = require("fs");
//importando o fs do próprio node
  //serve para lidar com manipulação de arquivos
const path = require("path");
//importando o path para lidar com os diretórios
const uploadConfig = require("../configs/upload");

class DiskStorage {
  async saveFile(file){
    await fs.promises.rename(
      //o rename vai mudar o arquivo de local
      path.resolve(uploadConfig.TMP_FOLDER, file),
      //a imagem assim que chega é alocada na pasta temporária 
        //pasta onde o arquivo se encontra
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
      //pegamos e transferimos o arquivo da pasta temporária para a pasta permanente
        //pasta onde o arquivo vai se ficar
    );

    return file;
    //retornando as informações do arquivo
  }
  //função para salvar o arquivo

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file);
    //buscando o arquivo na pasta de uploads

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    //fazendo o tratamento de exceções

    await fs.promises.unlink(filePath);
  }
  //função para deletar o arquivo
}

module.exports = DiskStorage;