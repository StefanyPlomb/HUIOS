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
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
  
      // Usuário padrão
      const usuarioPadrao = "huios";
      const senhaPadrao = "123";
  
      if (usuario === usuarioPadrao && senha === senhaPadrao) {
        window.location.href = "IndexLogado.html";
      } else {
        alert("Usuário ou senha incorretos. Tente novamente.");
      }
    });
  });
  