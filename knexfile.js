const path = require("path");

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
      //caminho da conexão
    },

    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    //Por padrão o sqlite vem com a funcionalidade de apagar em cascata desabilitado
      //Essa Funcionalidade vai estabelecer conexão com o banco de dados
      //PRAGMA foreign_keys = ON vai ajudar a deletar as notas em cascata

    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
    },

    useNullAsDefault: true
    //propriedade padrão para trabalhar com o sqlite
		//Essa é uma configuração para tratar queries de inserção de dados em que você não tenha definido um valor e é específica para atender a uma exigência do SQL.
  }
};
