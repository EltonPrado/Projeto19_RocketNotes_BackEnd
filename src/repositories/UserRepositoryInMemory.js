class UserRepositoryInMemory {
  users = [];

  async create({ name, email, password }) {
    const user = {
      id: Math.floor(Math.random() * 1000) + 1,
      //criando um id aleatório

      name,
      email,
      password
    };

    this.users.push(user);

    return user;
  }
  //método de criar

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
  //método de criar email
}

module.exports = UserRepositoryInMemory;