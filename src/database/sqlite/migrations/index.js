const sqliteConnection = require('../../sqlite');
//importando a conexão do sqlite

const createUsers = require('./createUsers');
//importando o arquivo createUsers

async function migrationsRun() {
  const schemas = [
    createUsers
  ].join('');

  sqliteConnection()
  .then(db => db.exec(schemas))
  //uma promess que executará o objeto schemas (migrations)
  .catch(error => console.error(error));
  //esta capturando o erro que possa acontecer
}
//Função para rodar as migrations
  //foi criado um objeto schemas referindo-se as tabelas do banco de dados
  //Vai ser passado um vetor, porque podemos ter varias tabelas
  //o .join('') está juntando todas as migrations e separando com um parâmetro vazio

  module.exports = migrationsRun;