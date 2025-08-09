document.addEventListener("DOMContentLoaded", function () {
    const etapa1 = document.getElementById("etapa1");
    const etapa2 = document.getElementById("etapa2");
    const btnProximo1 = document.getElementById("btnProximo1");
    const btnVoltar2 = document.getElementById("btnVoltar2");

    // Mostra a etapa 2 e esconde a etapa 1
    btnProximo1.addEventListener("click", function () {
        etapa1.style.display = "none";
        etapa2.style.display = "block";
    });

    // Mostra a etapa 1 e esconde a etapa 2
    btnVoltar2.addEventListener("click", function () {
        etapa2.style.display = "none";
        etapa1.style.display = "block";
    });
});