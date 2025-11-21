// Espera o carregamento completo do DOM antes de executar o cÃ³digo
document.addEventListener("DOMContentLoaded", async () => {
  // Seleciona o corpo da tabela onde os agendamentos serÃ£o exibidos
  const tbody = document.querySelector("#bookingsTable tbody");

  // Seleciona elementos do modal
  const modal = document.getElementById("editModal");
  const closeBtn = document.querySelector(".close");
  const editForm = document.getElementById("editForm");

  // Variável para armazenar o ID do agendamento sendo editado
  let currentEditId = null;

  // FunÃ§Ã£o que busca os agendamentos no servidor e exibe na tabela
  async function carregarAgendamentos() {
    // Limpa a tabela antes de inserir os novos dados
    tbody.innerHTML = "";
    try {
      // Faz uma requisiÃ§Ã£o GET para o backend local
      const res = await fetch("http://localhost:3000/agendamentos");
      const agendamentos = await res.json();

      // Percorre cada agendamento retornado e cria uma linha na tabela
      agendamentos.forEach((a) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
                    <td>${a.nome}</td>
                    <td>${a.telefone}</td>
                    <td>${a.servico}</td>
                    <td>${a.data}</td>
                    <td>${a.horario}</td>
                    <td>
                        <button class="edit-btn" data-id="${a.id}">Editar</button>
                        <button class="delete-btn" data-id="${a.id}">Deletar</button>
                    </td>
                `;
        // Adiciona a linha na tabela
        tbody.appendChild(tr);
      });

      // Depois de criar as linhas, adiciona os eventos nos botÃµes
      adicionarEventos();
    } catch (erro) {
      alert("Erro ao carregar os agendamentos: " + erro);
    }
  }

  // FunÃ§Ã£o que adiciona os eventos aos botÃµes de editar e deletar
  function adicionarEventos() {
    // --- DELETE ---
    // Seleciona todos os botÃµes de deletar e adiciona evento de clique
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;

        // Confirma antes de deletar
        if (confirm("Deseja realmente deletar este agendamento?")) {
          try {
            const res = await fetch(
              `http://localhost:3000/agendamentos/${id}`,
              {
                method: "DELETE",
              }
            );
            const texto = await res.text();
            alert(texto);
            // Recarrega a lista apÃ³s deletar
            carregarAgendamentos();
          } catch (erro) {
            alert("Erro ao deletar: " + erro);
          }
        }
      });
    });

    // --- EDIT ---
    // Permite editar todos os campos do agendamento via modal
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        currentEditId = id;

        // Busca os dados atuais do agendamento
        try {
          const res = await fetch(`http://localhost:3000/agendamentos/${id}`);
          const agendamento = await res.json();

          // Preenche os campos do modal com os dados atuais
          document.getElementById("editNome").value = agendamento.nome;
          document.getElementById("editTelefone").value = agendamento.telefone;
          document.getElementById("editServico").value = agendamento.servico;
          document.getElementById("editData").value = agendamento.data;
          document.getElementById("editHorario").value = agendamento.horario;

          // Abre o modal
          modal.style.display = "block";
        } catch (erro) {
          alert("Erro ao carregar dados para edição: " + erro);
        }
      });
    });
  }

  // Evento para fechar o modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fecha o modal se clicar fora dele
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Evento para submeter o formulário de edição
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("editNome").value;
    const telefone = document.getElementById("editTelefone").value;
    const servico = document.getElementById("editServico").value;
    const data = document.getElementById("editData").value;
    const horario = document.getElementById("editHorario").value;

    try {
      const res = await fetch(
        `http://localhost:3000/agendamentos/${currentEditId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, telefone, servico, data, horario }),
        }
      );
      const texto = await res.text();
      alert(texto);
      // Fecha o modal e recarrega a lista
      modal.style.display = "none";
      carregarAgendamentos();
    } catch (erro) {
      alert("Erro ao atualizar o agendamento: " + erro);
    }
  });

  // Quando a pÃ¡gina carregar, busca e exibe todos os agendamentos
  carregarAgendamentos();
});
