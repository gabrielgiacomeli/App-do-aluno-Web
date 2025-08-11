<?php
require_once "../config/conexao.php";

$email = "gabriel20040745@gmail.com"; // Email do usuário que você quer deletar

$sql = "DELETE FROM usuarios WHERE email = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo "Usuário deletado com sucesso!";
} else {
    echo "Nenhum usuário encontrado com esse e-mail.";
}
