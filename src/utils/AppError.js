class AppError {
  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
//Padronizará o tipo de mensagem de erro que aparecerá quando tiver alguma excessão

module.exports = AppError;
//Exportando o arquivo AppError