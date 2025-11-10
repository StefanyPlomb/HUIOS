document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const openBtn = document.querySelector(".btn-login");
    const closeBtn = document.getElementById("closeModal");
  
    // Abrir modal
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      modal.classList.remove("hidden");
    });
  
    // Fechar modal
    closeBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });
  
    // Fechar clicando fora
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
      }
    });
  
    // Validação do login
    const form = modal.querySelector("form");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();

      // Validação básica
      if (!usuario || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
      }

      try {
        // Envia os dados para o endpoint de login no backend
        const resposta = await fetch('/api/login', { // Substitua '/api/login' pelo caminho correto da sua rota
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ usuario, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
          // Login bem-sucedido
          console.log("Login realizado com sucesso:", dados.usuario); // Dados retornados do backend (opcional)
          // Redireciona para a página logada
          window.location.href = "../HTML/IndexLogado.html";
        } else {
          // Login falhou (credenciais inválidas ou outro erro)
          alert(dados.mensagem || "Usuário ou senha incorretos. Tente novamente.");
        }
      } catch (erro) {
        // Erro de conexão ou outro erro inesperado
        console.error("Erro na requisição de login:", erro);
        alert("Erro de conexão com o servidor. Tente novamente mais tarde.");
      }
    });
  });
  