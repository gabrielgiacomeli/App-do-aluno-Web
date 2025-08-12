<?php
$host = "143.106.241.4";      // Servidor MySQL
$dbname = "cl204045"; // Nome do banco de dados
$username = "cl204045";       // Usuário do MySQL
$password = "cl*20042007";           // Senha do MySQL (se tiver, coloque aqui)

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão com o banco de dados: " . $e->getMessage());
}
