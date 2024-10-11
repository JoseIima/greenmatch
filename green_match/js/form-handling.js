// Função para registrar um novo usuário
function registerUser(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtendo os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Validação básica
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Armazenando o usuário no localStorage (apenas para fins de demonstração)
    localStorage.setItem(username, password);
    
    alert('Cadastro realizado com sucesso!');
    document.getElementById('register-form').reset(); // Limpa o formulário
}

// Função para fazer login
function loginUser(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtendo os valores dos campos de entrada
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    // Validação básica
    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    // Verificando se o usuário existe
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        alert('Login realizado com sucesso!');
        // Redirecionar para a página inicial ou outra página após o login
        window.location.href = 'index.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
}

// Adicionando os eventos de submit aos formulários
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (registerForm) {
        registerForm.addEventListener('submit', registerUser);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', loginUser);
    }
});

// Função para cadastro de usuário via AJAX
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const tipo = document.querySelector('input[name="tipo"]:checked');

    // Validação básica
    if (nome === '' || email === '' || senha === '' || !tipo) {
        alert('Por favor, preencha todos os campos e selecione uma opção.');
        return; // Para a execução da função se a validação falhar
    }

    // Enviando os dados para o servidor
    const data = {
        nome: nome,
        email: email,
        senha: senha,
        tipo: tipo.value
    };

    fetch("cadastrar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "login.html"; // Redirecionar para a página de login
        } else {
            alert(data.message); // Exibir mensagem de erro
        }
    })
    .catch(error => console.error("Erro:", error));
});
