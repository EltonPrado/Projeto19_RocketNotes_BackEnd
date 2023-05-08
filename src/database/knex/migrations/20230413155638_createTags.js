exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();
  
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
});
//Up - processo de criar a tabela

exports.down = knex => knex.schema.dropTable("tags");
//Down - processo de deletar a tabela