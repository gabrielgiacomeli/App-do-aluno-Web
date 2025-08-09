let tempo = 90;
let intervalo;
const temasEnem = [
    "Desafios para a formação educacional de surdos no Brasil",
    "Manipulação do comportamento do usuário pelo controle de dados na internet",
    "Caminhos para combater a intolerância religiosa no Brasil",
    "Publicidade infantil em questão no Brasil",
    "Caminhos para combater o racismo no Brasil",
    "A persistência da violência contra a mulher na sociedade brasileira",
    "O movimento imigratório para o Brasil no século XXI",
    "Desafios da mobilidade urbana no Brasil",
    "Viver em rede no século XXI: os limites entre o público e o privado",
    "O indivíduo frente à ética nacional",
    "O trabalho na construção da dignidade humana"
];

function iniciarTimer() {
    document.getElementById('timer').innerText = "01:30";
    tempo = 90;
    clearInterval(intervalo);
    document.getElementById("redacao").disabled = false;
    intervalo = setInterval(() => {
        if (tempo <= 0) {
            clearInterval(intervalo);
            document.getElementById("redacao").disabled = true;
            document.getElementById("btnSortear").disabled = false;
            alert("Tempo esgotado!");
        } else {
            tempo--;
            let minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
            let segundos = String(tempo % 60).padStart(2, '0');
            document.getElementById('timer').innerText = `${minutos}:${segundos}`;
        }
    }, 1000);
}

function contarLinhas() {
    let linhas = document.getElementById("redacao").value.split('\n').length;
    document.getElementById("contador").innerText = `Linhas: ${linhas}/30`;
    if (linhas > 30) {
        document.getElementById("erro").innerText = "Número de linhas excedido!";
    } else {
        document.getElementById("erro").innerText = "";
    }
}

function sortearTema() {
    let temaEscolhido = temasEnem[Math.floor(Math.random() * temasEnem.length)];
    document.getElementById("tema").innerText = "Tema: " + temaEscolhido;
    document.getElementById("btnSortear").disabled = true;
    iniciarTimer();
}

function corrigirRedacao() {
    let texto = document.getElementById("redacao").value;
    if (texto.length === 0) {
        document.getElementById("correcao").innerText = "Digite uma redação para corrigir.";
        return;
    }

    let erros = texto.match(/\b(vc|pq|eh|naum)\b/gi); // Verificando abreviações
    let nota = 1000;

    let competencias = {
        normaLingua: Math.floor(Math.random() * 151) + 50, // Notas entre 50 e 200
        compreensaoTema: Math.floor(Math.random() * 151) + 50,
        organizacao: Math.floor(Math.random() * 151) + 50,
        coesao: Math.floor(Math.random() * 151) + 50,
        propostaIntervencao: Math.floor(Math.random() * 151) + 50
    };

    nota = Object.values(competencias).reduce((a, b) => a + b, 0);

    document.getElementById("correcao").innerText = erros ? "Evite abreviações como: " + erros.join(", ") : "Nenhum erro encontrado!";
    document.getElementById("nota").innerText = `Nota final: ${nota}/1000\n\n` +
        `Norma padrão: ${competencias.normaLingua}/200\n` +
        `Compreensão do tema: ${competencias.compreensaoTema}/200\n` +
        `Organização das informações: ${competencias.organizacao}/200\n` +
        `Coesão e coerência: ${competencias.coesao}/200\n` +
        `Proposta de intervenção: ${competencias.propostaIntervencao}/200`;

    // Sugestões de melhoria baseadas no texto
    let sugestoes = [];
    if (erros) {
        sugestoes.push("Reveja o uso de abreviações. Evite utilizar formas como 'vc', 'pq', 'eh', 'naum'.");
    }
    if (texto.match(/[.!?]{2,}/)) {
        sugestoes.push("Evite o uso excessivo de pontuação, como mais de um ponto de interrogação ou exclamação.");
    }
    if (texto.match(/[^\w\s!.,?áéíóúãõâêîôû]/gi)) {
        sugestoes.push("Atenção ao uso de acentuação e caracteres especiais.");
    }
    if (!texto.match(/[.,!?]/)) {
        sugestoes.push("Verifique a pontuação. Sentenças longas precisam de vírgulas ou pontos.");
    }

    if (sugestoes.length > 0) {
        document.getElementById("suggestions").style.display = "block";
        const suggestionList = document.getElementById("suggestionList");
        suggestionList.innerHTML = "";
        sugestoes.forEach(sugestao => {
            let li = document.createElement("li");
            li.textContent = sugestao;
            suggestionList.appendChild(li);
        });
    } else {
        document.getElementById("suggestions").style.display = "none";
    }

    document.getElementById("nota").style.display = "none";
}

function verNota() {
    document.getElementById("nota").style.display = "block";
}
