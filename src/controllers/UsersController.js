const { hash, compare } = require("bcryptjs");
//Importando a função que vai criar a criptografia

const AppError = require("../utils/AppError");
//importando o arquivo de exceção

const sqliteConnection = require("../database/sqlite");
//Importando a conexão com o banco de dados

class UsersController {
  async create(request, response) {
    //funcionalidade de criação do usuário
    const { name, email, password } = request.body;
  
    const database = await sqliteConnection();
    //Fazendo a conexão com o banco de dados
      //Temos que utilizar o async porque talvez a conexão não seja feita na hora
  
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    //Fazendo a pesquisa (buscando informações) se o usuário existe no banco de dados
      //Aplicando filtro para a pesquisa de usuário
  
    if(checkUserExists) {
      throw new AppError("Este email já está em uso.");
      //Retornará o aviso caso o já tenha um usuário cadastrado com o email.
    }

    const hashedPassword = await hash(password, 8);
    //variável que controlará a senha criptografada
      //Terá dois parâmetros: senha e fator de complexidade da senha

    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
      //Fará o cadastro do usuário no banco de dados
    );
  
    return response.status(201).json();
  }

  async update(request, response) {
    //funcionalidade de atualização do usuário
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection();
    //criando a conexão com o banco de dados
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]);
    //buscando todos os usuário
      //selecionando o usuário pelo id

    if (!user) {
      throw new AppError("Usuário não encontrado");
      //mensagem para caso não encontre o usuário
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
    //Verificando se o usuário está tentando trocar o email para um que já exista

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      //se atualizar o email para um email existente aparecerá a mensagem abaixo
      throw new AppError("Este e-mail já está em uso");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    //está se precavendo para caso não seja trocado esses dados, eles se mantenham os mesmos
      //Se tiver conteúdo dentro de name e email, serão trocas
      //Se não houver conteúdo, mantenha o mesmo que estava

    if(password && !old_password) {
      //verificação da senha antiga
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
    }

    if(password && old_password) {
      //fazendo a comparação de senha antiga com a senha dele
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        //se for falso
        throw new AppError("Senha antiga não confere.");
      }

      user.password = await hash(password, 8);
      //permitindo a atualização da senha caso tenha batido as senhas
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );
    //Vai executar a atualização dos dados do usuário

    return response.status(200).json();
  }
}
//tirando e passando a responsabilidade do users.routes para o UserController

module.exports = UsersController;