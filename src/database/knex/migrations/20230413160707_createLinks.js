exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();
  
  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");
  table.timestamp("created_at").default(knex.fn.now());
});
//Up - processo de criar a tabela

exports.down = knex => knex.schema.dropTable("links");
//Down - processo de deletar a tabela