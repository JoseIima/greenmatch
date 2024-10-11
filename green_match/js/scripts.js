document.addEventListener('DOMContentLoaded', function () {
    // Script para adicionar scroll suave aos links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const cadastroForm = document.getElementById('cadastroForm');

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário

        // Captura os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const tipo = document.querySelector('input[name="tipo"]:checked');

        // Validação básica
        if (nome === '' || email === '' || senha === '' || !tipo) {
            showMessage('Por favor, preencha todos os campos e selecione uma opção.', 'error');
            return; // Para a execução da função se a validação falhar
        }

        // Se passar na validação, você pode enviar os dados ou fazer o que desejar
        showMessage(`Cadastro realizado com sucesso!\nNome: ${nome}\nE-mail: ${email}\nTipo: ${tipo.value}`, 'success');

        // Aqui você poderia redirecionar ou enviar os dados para o servidor
    });

    // Função para mostrar mensagens de sucesso ou erro
    function showMessage(message, type) {
        const messageBox = document.createElement('div');
        messageBox.className = `message ${type}`;
        messageBox.textContent = message;
        document.body.appendChild(messageBox);

        // Remove a mensagem após alguns segundos
        setTimeout(() => {
            messageBox.remove();
        }, 5000);
    }

    // Adiciona animação aos botões
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.2s';
        });

        button.addEventListener('mouseleave', function() {
            button.style.transform = 'scale(1)';
        });
    });

    // Adiciona sombra ao focar nos campos de entrada
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            input.style.boxShadow = '0 0 5px rgba(46, 204, 113, 0.5)';
        });

        input.addEventListener('blur', function() {
            input.style.boxShadow = 'none';
        });
    });
});

// Função para adicionar um novo projeto
document.getElementById('form-adicionar-projeto').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome-projeto').value;
    const descricao = document.getElementById('descricao-projeto').value;
    const imagem = document.getElementById('imagem-projeto').files[0];

    // Aqui você deve enviar os dados para o servidor usando AJAX ou Fetch API.
    // O código abaixo é apenas uma simulação da adição do projeto.
    
    const projectDiv = document.createElement('div');
    projectDiv.innerHTML = `
        <h3>${nome}</h3>
        <p>${descricao}</p>
        <img src="${URL.createObjectURL(imagem)}" alt="${nome}" style="max-width: 300px;">
    `;
    
    document.getElementById('lista-projetos').appendChild(projectDiv);
    
    // Limpar o formulário
    this.reset();
});

// Função para editar o perfil
document.getElementById('form-editar-perfil').addEventListener('submit', function(event) {
    event.preventDefault();

    const novoEmail = document.getElementById('novo-email').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const novaDataNascimento = document.getElementById('data-nascimento').value;

    // Aqui você deve enviar os dados para o servidor usando AJAX ou Fetch API para atualizar as informações do perfil.
    alert("Perfil atualizado com sucesso!");
});
