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
