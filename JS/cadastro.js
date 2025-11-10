function manipularEnvio(evento) {
    evento.preventDefault(); // Prevenir o envio padrão do formulário

    // Limpar mensagens de erro anteriores
    limparMensagensErro();

    // Obter os elementos dos campos
    const campoNome = document.getElementById('nome');
    const campoUsuario = document.getElementById('usuario');
    const campoEmail = document.getElementById('email');
    const campoSenha = document.getElementById('senha');

    // Obter os valores dos campos
    const valorNome = campoNome.value.trim();
    const valorUsuario = campoUsuario.value.trim();
    const valorEmail = campoEmail.value.trim();
    const valorSenha = campoSenha.value;

    const erros = {};

    // Validar nome
    if (valorNome === '' || valorNome.length < 5) {
        erros.nome = 'O nome deve ter pelo menos 5 caracteres.';
    }

    // Validar usuário
    if (valorUsuario === '' || valorUsuario.length < 4) {
        erros.usuario = 'O usuário deve ter pelo menos 4 caracteres.';
    }

    // Validar e-mail com expressão regular 
    // (algo, que não contenha "@", + 
    // @ + 
    // domínio, que não contenha "@", + 
    // . + 
    // extensão, que não contenha "@".)
    const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!padraoEmail.test(valorEmail)) {
        erros.email = 'Por favor, insira um e-mail válido.';
    }

    // Validar senha
    if (valorSenha.length < 8) {
        erros.senha = 'A senha deve ter pelo menos 8 caracteres.';
    }

    // Se houver erros, exibir mensagens
    if (Object.keys(erros).length > 0) {
        exibirMensagensErro(erros);
        return;
    }

    // Se não houver erros, coletar os dados
    const dadosUsuario = {
        nome: valorNome,
        usuario: valorUsuario,
        email: valorEmail,
        senha: valorSenha
    };

    // Preparar para envio ao backend Node.js
    enviarDadosParaBackend(dadosUsuario);
}

// Função para enviar dados para o backend
async function enviarDadosParaBackend(dados) {
    try {
        // Mostrar indicador de carregamento
        mostrarCarregamento(true);
	
	// POST ao metodo cadastrar
        const resposta = await fetch('/api/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        let resultado;
        const contentType = resposta.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            resultado = await resposta.json();
        } else {
            // Se não for JSON, tentamos obter o texto
            const textoResposta = await resposta.text();
            // E tentamos converter em JSON, ou usamos o texto puro
            try {
                resultado = JSON.parse(textoResposta);
            } catch {
                // Se não for JSON válido, usamos o texto como mensagem
                resultado = { mensagem: textoResposta || `Erro HTTP ${resposta.status}: ${resposta.statusText}` };
            }
        }

        // Agora verificamos o status
        if (resposta.ok) {
            // Cadastro realizado com sucesso (status 2xx)
            mostrarCarregamento(false);
            exibirSucesso(dados.usuario);
        } else {
            // Erro retornado pelo backend (status 4xx, 5xx, etc)
            mostrarCarregamento(false);
            // Usamos a mensagem do JSON retornado pelo backend, ou uma genérica
            exibirErroBackend(resultado.mensagem || `Erro ${resposta.status}: ${resposta.statusText}`);
        }
    } catch (erro) {
        // Erro de conexão, falha na leitura do JSON, ou outro erro inesperado
        console.error("Erro na requisição ou processamento da resposta:", erro);
        mostrarCarregamento(false);
        exibirErroBackend('Erro de conexão com o servidor ou resposta inválida.');
    }
}

// Função para mostrar indicador de carregamento
function mostrarCarregamento(mostrar) {
    const botao = document.querySelector('button[type="submit"]');
    if (mostrar) {
        botao.innerHTML = 'Processando...';
        botao.disabled = true;
    } else {
        botao.innerHTML = 'Cadastrar';
        botao.disabled = false;
    }
}

// Função para exibir erro do backend
function exibirErroBackend(mensagem) {
    // Limpar erros anteriores
    limparMensagensErro();
    
    // Exibir mensagem de erro genérica
    const formulario = document.getElementById('cadastroForm');
    const mensagemErro = document.createElement('div');
    mensagemErro.className = 'mensagem-erro-backend bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4';
    mensagemErro.textContent = mensagem;
    formulario.insertBefore(mensagemErro, formulario.firstChild);
}

// Função para limpar mensagens de erro anteriores
function limparMensagensErro() {
    // Remover spans de erro específicos dos campos (se existirem)
    const spansErro = document.querySelectorAll('.erro-mensagem');
    spansErro.forEach(span => span.remove());

    // Remover mensagem de erro genérica do backend (se existir)
    const mensagemErroBackend = document.querySelector('.mensagem-erro-backend');
    if (mensagemErroBackend) {
        mensagemErroBackend.remove();
    }
}

// Função para exibir mensagens de erro nos campos correspondentes
function exibirMensagensErro(erros) {
    for (const campo in erros) {
        const elementoCampo = document.getElementById(campo);
        const mensagemErro = document.createElement('span');
        mensagemErro.className = 'erro-mensagem text-red-500 text-sm mt-1 block';
        mensagemErro.textContent = erros[campo];
        elementoCampo.parentNode.insertBefore(mensagemErro, elementoCampo.nextSibling);
    }
}

// Função para exibir mensagem de sucesso em um modal
function exibirSucesso(usuario) {

    // Criar o fundo escuro (overlay)
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    overlay.style.display = 'flex';

    // Criar o conteúdo do modal
    overlay.innerHTML = `
        <div class="modal-conteudo bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full transform transition-all duration-300 scale-95 animate-aparecer">
            <div class="icone-sucesso text-green-500 text-6xl text-center mb-4">✓</div>
            <h2 class="titulo-sucesso text-2xl font-bold text-center text-gray-800 mb-3">Sucesso!</h2>
            <p class="texto-sucesso text-center text-gray-600 mb-6">
                Cadastro de <strong class="font-semibold text-gray-800">${usuario}</strong> realizado com sucesso!
            </p>
            <div class="acoes-modal flex justify-center">
                <button id="botao-fechar-modal" class="botao-fechar bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300">
                    OK
                </button>
            </div>
        </div>
    `;

    // Adicionar o modal ao corpo da página
    document.body.appendChild(overlay);

    // Fechar o modal e redirecionar
    const botaoFechar = document.getElementById('botao-fechar-modal');
    botaoFechar.addEventListener('click', function() {
        fecharModalERedirecionar(overlay);
    });
}

// Função para fechar o modal e redirecionar
function fecharModalERedirecionar(modal) {
    modal.style.opacity = '0';
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
        
        // Redirecionar para IndexVisitas.html
        window.location.href = '../HTML/IndexVisitas.html';
    }, 200);
}

// Função para inicializar o script quando o DOM estiver carregado
function inicializarCadastro() {
    const formulario = document.getElementById('cadastroForm');
    if (formulario) {
        formulario.addEventListener('submit', manipularEnvio);
    }
}

// Inicializar quando o conteúdo da página estiver carregado
document.addEventListener('DOMContentLoaded', inicializarCadastro);