<?php
session_start();
require_once "../config/conexao.php";

// Variável de erro para feedback
$erro = "";

// Verifica se os dados foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Pega e limpa os dados
    $email = trim($_POST['email'] ?? '');
    $senha = trim($_POST['senha'] ?? '');

    // Verifica se os campos não estão vazios
    if (!empty($email) && !empty($senha)) {
        // Consulta o usuário no banco de dados
        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // Verifica se encontrou o usuário e se a senha bate
        if ($user && password_verify($senha, $user['senha'])) {
            // Autenticado com sucesso
            $_SESSION['usuario'] = $user['nome_completo'];
            $_SESSION['email'] = $user['email'];
            header("Location: ../Index/index.html");
            exit;
        } else {
            // Login inválido
            $_SESSION['erro_login'] = "E-mail ou senha inválidos!";
            header("Location: login.php"); // ou o caminho do seu formulário de login
            exit;
        }
    } else {
        // Campos vazios
        $_SESSION['erro_login'] = "Preencha todos os campos!";
        header("Location: login.php");
        exit;
    }
}
?>
