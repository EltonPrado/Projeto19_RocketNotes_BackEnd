const config = require("../../../knexfile");
//vai receber as configurações do arquivo knexfile
const knex = require("knex");
//Importando o knex
const connection = knex(config.development);
//Criando a conexão

module.exports = connection;
//Exportando a conexão para ser utilizado em outros lugares da aplicação