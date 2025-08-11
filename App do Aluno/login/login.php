<?php
session_start();
require_once "../config/conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $senha = trim($_POST['senha']);
    $erro = "";

    if (!empty($email) && !empty($senha)) {
        $sql = "SELECT * FROM usuarios WHERE email = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($senha, $user['senha'])) {
            $_SESSION['usuario'] = $user['nome_completo'];
            $_SESSION['email'] = $user['email'];
            header("Location: ../Index/index.html");
            exit;
        } else {
            $erro = "E-mail ou senha inválidos!";
        }
    } else {
        $erro = "Preencha todos os campos!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>login</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='login.css'>
    <script src='login.js'></script>
    <link rel="icon" href="../imagens/logo.jpg.jpg">
</head>
<body>
    <nav>  
        <img src="../imagens/logo.jpg.jpg" alt="logo" class="logo">
        <span>App do aluno</span>
        <a href="../cadastro/cadastro.php">Cadastro</a>
    </nav>

    <div class="container">
        <form method="POST" action="">
            <h2>Faça seu login</h2>
            <?php if (!empty($erro)) echo "<p style='color:red;'>$erro</p>"; ?>
            <input type="email" name="email" placeholder="E-mail" required>
            <input type="password" name="senha" placeholder="Senha" required>
            <button type="submit">Entrar</button>
        </form>
    </div>
</body>
</html>
