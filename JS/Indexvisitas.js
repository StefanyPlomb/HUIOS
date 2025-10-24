// Obtém o botão para abrir o modal
const openModalButton = document.getElementById('open-modal-button');
// Obtém o elemento de sobreposição do modal principal
const modalOverlay = document.getElementById('login-modal-overlay'); // Este é o overlay do login principal

const forgotPasswordLink = document.getElementById('forgot-password-link');
const forgotPasswordModal = document.getElementById('forgot-password-modal');
const resetPasswordModal = document.getElementById('reset-password-modal');
const successModal = document.getElementById('success-modal');
const forgotEmailInput = document.getElementById('forgot-email');
const sendResetLinkBtn = document.getElementById('send-reset-link-btn');
const backToLoginBtn = document.getElementById('back-to-login-btn');
const newPasswordInput = document.getElementById('new-password');
const confirmNewPasswordInput = document.getElementById('confirm-new-password');
const resetPasswordBtn = document.getElementById('reset-password-btn');
const backToForgotBtn = document.getElementById('back-to-forgot-btn');
const closeSuccessModalBtn = document.getElementById('close-success-modal-btn');

// Adiciona um ouvinte de evento de clique ao botão com icone do usuário
openModalButton.addEventListener('click', () => {
    // Fecha quaisquer outros modais de senha que possam estar abertos
    forgotPasswordModal.style.display = 'none';
    resetPasswordModal.style.display = 'none';
    successModal.style.display = 'none';
    // Exibe a sobreposição do modal de login
    modalOverlay.style.display = 'flex';
});

// --- Event Listener para Fechar o Modal de Login Principal ---
// Adiciona um ouvinte de evento de clique à própria sobreposição do login para fechá-la
// quando o usuário clica fora do container do modal de login
modalOverlay.addEventListener('click', (event) => {
    // Verifica se o clique ocorreu diretamente na sobreposição do login, e não dentro do container do modal
    if (event.target === modalOverlay) {
        // Oculta a sobreposição do modal de login
        modalOverlay.style.display = 'none';
    }
});

// --- Event Listeners para Funcionalidade de Senha ---

function openForgotPasswordModal() {
    modalOverlay.style.display = 'none'; // Fecha o modal de login
    forgotPasswordModal.style.display = 'flex';
    forgotEmailInput.value = ''; // Limpa o campo de e-mail
}

function closeForgotPasswordModal() {
    forgotPasswordModal.style.display = 'none';
    openModalButton.click(); // Reabre o modal de login
}

function openResetPasswordModal() {
    forgotPasswordModal.style.display = 'none';
    resetPasswordModal.style.display = 'flex';
    newPasswordInput.value = '';
    confirmNewPasswordInput.value = '';
}

function closeResetPasswordModal() {
    resetPasswordModal.style.display = 'none';
    openForgotPasswordModal(); // Retorna ao modal de esqueci senha
}

function openSuccessModal() {
    resetPasswordModal.style.display = 'none';
    successModal.style.display = 'flex';
}

function closeSuccessModal() {
    successModal.style.display = 'none';
    openModalButton.click(); // Reabre o modal de login
}

// --- Event Listeners para Funcionalidade de Senha ---

forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault(); // Previne o comportamento padrão do link
    openForgotPasswordModal();
});

sendResetLinkBtn.addEventListener('click', () => {
    const email = forgotEmailInput.value.trim();
    if (!email) {
        alert('Por favor, digite seu e-mail.');
        return;
    }
    // Simulação de envio de e-mail
    // Na prática, tem que ser feito uma requisição AJAX para um backend
    // que gera um token e envia o e-mail.
    console.log('Simulando envio de e-mail para:', email);
    alert(`E-mail de redefinição enviado para ${email}. Por favor, verifique sua caixa de entrada.`);
    openResetPasswordModal(); // Em uma implementação real, isso seria acionado após confirmação do backend ou via link no e-mail
});

backToLoginBtn.addEventListener('click', closeForgotPasswordModal);

resetPasswordBtn.addEventListener('click', () => {
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    if (!newPassword || !confirmNewPassword) {
        alert('Por favor, preencha ambos os campos de senha.');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    if (newPassword.length < 6) { // Exemplo de validação de força de senha
        alert('A nova senha deve ter pelo menos 6 caracteres.');
        return;
    }

    // Simulação de redefinição de senha
    console.log('Simulando redefinição de senha para:', newPassword);
    // Aqui seria feito uma atualização no "banco de dados"
    // ou chamar uma API real.
    openSuccessModal();
});

backToForgotBtn.addEventListener('click', closeResetPasswordModal);

closeSuccessModalBtn.addEventListener('click', closeSuccessModal);

// Variaveis pros botoes de login e registrar (pra facilitar pesquisa no ctrl+f)
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

// --- Atualização da Função de Login ---
loginButton.addEventListener('click', () => {
    const usuario = document.getElementById('user').value.trim(); // Obter valor e remover espaços
    const password = document.getElementById('password').value.trim(); // Obter valor e remover espaços

    // Validação simples (você pode adicionar mais validações)
    if (!usuario || !password) {
        alert('Por favor, preencha o nome de usuário e a senha.');
        return;
    }

    // Simulação de verificação de credenciais
    // Em uma implementação real, isso seria feito no backend.
    // Aqui, é uma simulação de um usuário válido.
    const usuariosValidos = [
        { username: 'admin', password: '123' },
        { username: 'user1', password: 'senha123' }
    ];

    const usuarioValido = usuariosValidos.find(u => u.username === usuario && u.password === password);

    if (usuarioValido) {
        // Login bem-sucedido
        console.log('Login bem-sucedido para o usuário:', usuario);
        // Armazenar o status de login e o nome de usuário no localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', usuario);
        // Fechar o modal
        modalOverlay.style.display = 'none';
        // Limpar os campos de entrada
        document.getElementById('user').value = '';
        document.getElementById('password').value = '';
        // Redirecionar para entrada.html
        window.location.href = 'entrada.html'; // Caminho relativo para entrada.html
    } else {
        // Login falhou
        alert('Usuário ou senha incorretos.');
        // Limpar o campo de senha
        document.getElementById('password').value = '';
        document.getElementById('password').focus(); // Focar no campo de senha novamente
    }
});

document.getElementById('register-button').addEventListener('click', function() {
    window.location.href = '../HTML/cadastro.html';
});
// JavaScript para o Carrossel
// Variáveis para o carrossel
const carousel = document.getElementById('funcionalidades-carousel');
const prevButton = document.getElementById('prev-slide');
const nextButton = document.getElementById('next-slide');
const carouselItems = document.querySelectorAll('.carrossel-item-estilo');
const dots = document.querySelectorAll('.dot');
let currentIndex = 0;
// Função para atualizar o carrossel
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 50}%)`;
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
// Navegação com setas
prevButton.addEventListener('click', () => {
    // Resetar o timer ao clicar na seta
    clearInterval(autoRotationInterval);
    // Iniciar um novo timer
    const newInterval = setInterval(autoRotate, 5000);
    // Armazenar a referência do intervalo em uma variável global se necessário
    autoRotationInterval = newInterval;
    // Atualizar o carrossel
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});
nextButton.addEventListener('click', () => {
    // Resetar o timer ao clicar na seta
    clearInterval(autoRotationInterval);
    // Iniciar um novo timer
    const newInterval = setInterval(autoRotate, 5000);
    // Armazenar a referência do intervalo em uma variável global se necessário
    autoRotationInterval = newInterval;
    // Atualizar o carrossel
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
});
// Inicializa o carrossel
updateCarousel();
// Autorrotação automática
function autoRotate() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
}
// Iniciar a rotação automática a cada 5 segundos
let autoRotationInterval = setInterval(autoRotate, 5000);
// Parar a rotação quando o usuário interagir com o carrossel
carousel.addEventListener('click', () => {
    clearInterval(autoRotationInterval);
});