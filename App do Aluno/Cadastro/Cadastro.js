document.addEventListener("DOMContentLoaded", () => {
    const etapa1 = document.getElementById("etapa1");
    const etapa2 = document.getElementById("etapa2");
    const btnProximo1 = document.getElementById("btnProximo1");
    const btnVoltar2 = document.getElementById("btnVoltar2");

    btnProximo1.addEventListener("click", () => {
        etapa1.style.display = "none";
        etapa2.style.display = "block";
    });

    btnVoltar2.addEventListener("click", () => {
        etapa2.style.display = "none";
        etapa1.style.display = "block";
    });
});
