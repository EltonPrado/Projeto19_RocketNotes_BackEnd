const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
//importando o sqlite3 e o sqlite

const path = require("path");
//biblioteca de configuração de diretórios
  //o path resolve o problema de endereço conforme o ambiente

async function sqliteConnection() {
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"),
    driver: sqlite3.Database
  });

  return database;
}
//Criando uma função assíncrona para lidar com banco de dados
  //caso o arquivo do banco de dados não existir, ele será criado
    // com o await abriremos uma conexão, passando um objeto com configurações da conexão
    //filename - vai nos dizer onde o arquivo ficará salvo
    //__dirname - pega de forma automática onde estamos dentro do projeto

module.exports = sqliteConnection;
//Exportando o arquivo