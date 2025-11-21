import db from "./db.js";
import { Sequelize } from "sequelize";

const Agendamento = db.define("agendamentos", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  servico: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  horario: {
    type: Sequelize.TIME,
    allowNull: false,
  },
});

Agendamento.sync({ force: true });

export default Agendamento;
