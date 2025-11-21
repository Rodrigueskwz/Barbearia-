// importa a classe Sequelize
import { NUMBER, Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

// Cria uma nova instância de conexão com o banco de dados
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST, // onde o banco está
    dialect: "postgres", // o drive do tipo do banco
    port: Number(process.env.DB_PORT),
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
    logging: false,
  }
);

db.authenticate()
  .then(function () {
    console.log("Conectado ao banco com sucesso");
  })
  .catch(function (erro) {
    console.log("Erro ao conectar ao banco de dados" + erro);
  });

export default db;
