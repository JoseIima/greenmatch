<?php
// Conectando ao banco de dados
$servername = "127.0.0.1";
$username = "root"; // Altere conforme necessário
$password = ""; // Altere conforme necessário
$dbname = "db_greenmatch"; // Altere conforme necessário

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Obtendo os dados do corpo da requisição
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nome'], $data['email'], $data['senha'], $data['tipo'])) {
    $nome = $data['nome'];
    $email = $data['email'];
    $senha = password_hash($data['senha'], PASSWORD_DEFAULT); // Hash da senha
    $tipo = $data['tipo'];

    // Preparando e executando a inserção
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nome, $email, $senha, $tipo);

    if ($stmt->execute()) {
        // Cadastro bem-sucedido
        echo json_encode(['success' => true]);
    } else {
        // Falha ao cadastrar
        echo json_encode(['success' => false, 'message' => 'Erro ao cadastrar: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    // Dados não recebidos corretamente
    echo json_encode(['success' => false, 'message' => 'Dados incompletos']);
}

$conn->close();
?>
