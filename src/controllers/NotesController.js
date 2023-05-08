const { request, response, query } = require("express");
const knex = require("../database/knex");
//Importando o knex para dentro do nosso controller de notas

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    //desestruturando e pegando do corpo da requisição criado no insomnia
    const user_id = request.user.id;

    const [note_id] = await knex("notes").insert({
      title,
      description,
      user_id
    });
    //inserindo a nota e recuperando o id dessa nota cadastrada

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    });

    await knex("links").insert(linksInsert);
    //Inserindo os links

    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id
      }
    });

    await knex("tags").insert(tagsInsert);
    //Inserindo as tags

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    //Recuperando o id através do parâmetro da requisição 

    const note = await knex("notes").where({ id }).first();
    //Buscando as notas baseados no id
      //O id está sendo usado como parâmetro para encontrar a primeira nota
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");
    //mostrando as tags e links de dentro da nota
      //as tags serão mostradas por ordem de nome
      //os links serão mostrados pela data de criação

    return response.json({
      ...note,
      tags,
      links
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();
    //Delete das notas

    return response.json();
  }

  async index(request, response) {
    const { title, tags } = request.query;
    //pegando o user_id através da query

    const user_id = request.user.id;

    let notes;

    if(tags) {
      const filterTags = tags.split(',').map(tag => tag.trim());
      //vetor que converte o texto em um array, utilizando a , como delimitador

      notes = await knex("tags")
        .select([
          //quais os campos serão selecionados de ambas as tabelas
          "notes.id",
          "notes.title",
          "notes.user_id",
        ])
        .where("notes.user_id", user_id)
        //filtro baseado no id do usuário
        .whereLike("notes.title", `%${title}%`)
        //filtro baseado na palavra-chave titulo
        .whereIn("name", filterTags)
        //fazendo a analise baseado na tag
          //se existe ou não
        .innerJoin("notes", "notes.id", "tags.note_id")
        //vai conectar uma tabela na outra
        .groupBy("notes.id")
        //agrupar por notas do id
        .orderBy("notes.title")
        //ordenar por titulo

    } else {
      notes = await knex("notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        //Estamos acrescentando a busca por palavras-chave dentro do titulo
        .orderBy("title");
        //esse filtro vai mostrar somente as notas criado por um usuário
          //vai trazer por ordem de titulo
    }

    const userTags = await knex("tags").where({ user_id });
    //Filter em todas as tags onde a tag seja igual ao id do usuário
    const notesWithTags = notes.map(note => {
      //vai percorrer todas as notas
      const noteTags = userTags.filter(tag => tag.note_id === note.id);
      //esta filtrando as tags da nota, onde o id da nota seja igual ao id

      return {
        ...note,
        tags: noteTags
      }
    })

    return response.json(notesWithTags);
  }
}

module.exports = NotesController;