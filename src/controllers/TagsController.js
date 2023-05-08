const { response } = require("express");
const knex = require("../database/knex");
//importando o knex para o arquivo

class TagsController {
  async index(request, response) {
    //responsável por listar todas as tags do usuário
    const user_id = request.user.id;
    //fazendo a requisição através do id do usuário
    
      const tags = await knex("tags")
      //buscando pelas tags indo na tabela de tags
        .where({ user_id })
        //filtrando pelo id do usuário
        .groupBy("name")
        //agrupa pelo campo e não deixa trazer nada repetido desse campo
      
      return response.json(tags);
  }
}

module.exports = TagsController;