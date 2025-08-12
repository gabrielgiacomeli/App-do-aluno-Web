<?php
require_once "../config/conexao.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = trim($_POST['nome_completo']);
    $email = trim($_POST['email']);
    $senha = $_POST['senha'];
    $conf_senha = $_POST['confirmar_senha'];
    $nivel = $_POST['nivel_estudo'];
    $curso = trim($_POST['curso_area']);
    $instituicao = trim($_POST['instituicao']);

    // Validação
    if ($senha !== $conf_senha) {
        $erro = "As senhas não coincidem!";
    } else {
        $hash = password_hash($senha, PASSWORD_DEFAULT);

        $sql = "INSERT INTO usuarios (nome_completo, email, senha, nivel_estudo, curso_area, instituicao) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);

        try {
            $stmt->execute([$nome, $email, $hash, $nivel, $curso, $instituicao]);
            header("Location: ../login/login.php");
            exit;
        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                $erro = "E-mail já cadastrado!";
            } else {
                $erro = "Erro ao cadastrar: " . $e->getMessage();
            }
        }
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Cadastro</title>
    <link rel="stylesheet" href="Cadastro.css">
    <script src="Cadastro.js" defer></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
    <nav>  
        <img src="../imagens/logo.jpg.jpg" alt="logo" class="logo">
        <span>App do aluno</span>
        <a href="../login/login.php">Login</a>
    </nav>

    <div class="container">
        <form method="POST" action="">
            <?php if (!empty($erro)) echo "<p style='color:red;'>$erro</p>"; ?>

            <!-- Etapa 1 -->
            <div id="etapa1" class="etapa">
                <h2>Etapa 1: Informações Pessoais</h2>
                <input type="text" name="nome_completo" placeholder="Nome Completo" required>
                <input type="email" name="email" placeholder="E-mail" required>
                <input type="password" name="senha" placeholder="Senha" required>
                <input type="password" name="confirmar_senha" placeholder="Confirme sua senha" required>
                <button type="button" id="btnProximo1">Próximo</button>
            </div>

            <!-- Etapa 2 -->
            <div id="etapa2" class="etapa" style="display: none;">
                <h2>Etapa 2: Informações Acadêmicas</h2>
                <select name="nivel_estudo" required>
                    <option value="" disabled selected>Selecione seu nível de estudo</option>
                    <option value="ensino-medio">Ensino Médio</option>
                    <option value="graduacao">Graduação</option>
                    <option value="pos-graduacao">Pós-Graduação</option>
                    <option value="mestrado">Mestrado</option>
                    <option value="doutorado">Doutorado</option>
                </select>
                <input type="text" name="curso_area" placeholder="Curso ou Área de Estudo" required>
                <input type="text" name="instituicao" placeholder="Instituição de Ensino" required>
                <button type="button" id="btnVoltar2">Voltar</button>
                <button type="submit">Cadastrar</button>
            </div>
        </form>
    </div>
</body>
</html>
