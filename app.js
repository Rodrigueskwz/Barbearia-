// Importando biblioteca express
import express from "express";
import Agendamento from "./agendamentos.js";
import cors from "cors";
import path from "path" //1

const app = express();

app.use(cors());

// Middleware para ler JSON do corpo da requisição
app.use(express.json());

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "public")));

// GET - Consulta os dados cadastrados
app.get("/agendamentos", async (req, res) => {
  try {
    const showAgendamentos = await Agendamento.findAll();
    res.send(showAgendamentos);
  } catch (error) {
    res.send("Erro ao buscar os dados no banco:" + error);
  }
});

// POST - Cadastra novo agendamento
app.post("/agendamentos", async (req, res) => {
  try {
    await Agendamento.create({
      nome: req.body.nome,
      telefone: req.body.telefone,
      servico: req.body.servico,
      data: req.body.data,
      horario: req.body.horario,
    });
    res.send("Agendamento cadastrado com sucesso!");
  } catch (error) {
    res.send("Erro ao cadastrar o agendamento: " + error);
  }
});

// PATCH — atualiza agendamento existente pelo ID
app.patch("/agendamentos/:id", async (req, res) => {
  try {
    await Agendamento.update(
      {
        nome: req.body.nome,
        telefone: req.body.telefone,
        servico: req.body.servico,
        data: req.body.data,
        horario: req.body.horario,
      },
      { where: { id: req.params.id } }
    );
    res.send("Agendamento atualizado com sucesso!");
  } catch (erro) {
    res.send("Erro ao atualizar o agendamento: " + erro);
  }
});

// DELETE — remove um agendamento pelo ID
app.delete("/agendamentos/:id", async (req, res) => {
  try {
    await Agendamento.destroy({
      where: { id: req.params.id },
    });
    res.send("Agendamento deletado com sucesso!");
  } catch (erro) {
    res.send("Erro ao deletar agendamento: " + erro);
  }
});

app.listen(3000, function () {
  console.log("O servidor está rodando na porta 3000");
});
