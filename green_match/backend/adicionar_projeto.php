<?php
session_start();
include 'config.php';

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario_id = $_SESSION['usuario_id'];
    $titulo = $_POST['titulo'];
    $descricao = $_POST['descricao'];
    $imagem = $_FILES['imagem']['name'];

    // Diretório para salvar a imagem
    $target_dir = "../uploads/";
    $target_file = $target_dir . basename($imagem);

    // Faz o upload da imagem
    move_uploaded_file($_FILES['imagem']['tmp_name'], $target_file);

    $stmt = $conn->prepare("INSERT INTO projetos (usuario_id, titulo, descricao, imagem, data_criacao) VALUES (:usuario_id, :titulo, :descricao, :imagem, NOW())");
    $stmt->bindParam(':usuario_id', $usuario_id);
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':imagem', $imagem);

    if ($stmt->execute()) {
        header("Location: perfil.php");
        exit;
    } else {
        echo "Erro ao adicionar projeto.";
    }
}
?>
