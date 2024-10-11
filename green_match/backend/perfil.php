<?php
session_start();
include 'config.php';

if (!isset($_SESSION['usuario_id'])) {
    header("Location: login.php");
    exit;
}

$usuario_id = $_SESSION['usuario_id'];
$stmt = $conn->prepare("SELECT * FROM usuarios WHERE id = :id");
$stmt->bindParam(':id', $usuario_id);
$stmt->execute();
$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

// Obtendo projetos do usuário
$stmt = $conn->prepare("SELECT * FROM projetos WHERE usuario_id = :usuario_id");
$stmt->bindParam(':usuario_id', $usuario_id);
$stmt->execute();
$projetos = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil - GreenMatch</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <header>
        <nav>
            <ul>
                <li><a href="logout.php">Sair</a></li>
                <li><a href="adicionar_projeto.php">Adicionar Projeto</a></li>
                <li><a href="editar_perfil.php">Editar Perfil</a></li>
            </ul>
        </nav>
    </header>
    <h1>Bem-vindo, <?php echo htmlspecialchars($usuario['nome']); ?></h1>
    <h2>Seu Perfil</h2>
    <p>Email: <?php echo htmlspecialchars($usuario['email']); ?></p>
    <p>Data de Nascimento: <?php echo htmlspecialchars($usuario['data_nascimento']); ?></p>

    <h2>Seus Projetos</h2>
    <ul>
        <?php foreach ($projetos as $projeto): ?>
            <li>
                <h3><?php echo htmlspecialchars($projeto['titulo']); ?></h3>
                <img src="../uploads/<?php echo htmlspecialchars($projeto['imagem']); ?>" alt="Imagem do projeto">
                <p><?php echo htmlspecialchars($projeto['descricao']); ?></p>
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
