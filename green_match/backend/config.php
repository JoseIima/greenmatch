<?php
$host = 'localhost';
$db = 'db_greenmatch'; // nome do banco de dados
$user = 'root'; // usuário do banco de dados
$pass = ''; // senha do banco de dados

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
