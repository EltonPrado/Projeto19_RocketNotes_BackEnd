const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class UserAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    //id do usuário que quer atualizar o avatar dele
    const avatarFileName = request.file.filename;
    //nome do arquivo que o usuário fez upload

    const diskStorage = new DiskStorage();

    const user = await knex("users")
    //buscando o usuário pela tabela de usuários
      .where({ id: user_id }).first();
      //filtrando o id pelo id do usuário
        //o campo buscado é diferente do user_id, por isso usamos o id:

      if(!user) {
      //se o usuário não existir
        throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);
      }

      if(user.avatar) {
      //verificando se dentro do usuário existe um avatar
        await diskStorage.deleteFile(user.avatar);
        //se existir, precisamos deletar a existente e substitui-la
      }

      const filename = await diskStorage.saveFile(avatarFileName);
      user.avatar = filename;
      //se não existir a foto de avatar, vai salvar a nova imagem
    
    await knex("users").update(user).where({ id: user_id });
    //salvando a foto para o usuário

    return response.json(user);
  }
}

module.exports = UserAvatarController;