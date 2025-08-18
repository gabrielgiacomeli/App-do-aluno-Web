// ==========================================================
// VARIÁVEIS GLOBAIS
// ==========================================================
let tempo = 90 * 60;
let intervalo;
let isPaused = false; // NOVA VARIÁVEL para controlar o estado de pausa
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

// ==========================================================
// ELEMENTOS DO DOM (melhor pegar as referências uma vez só)
// ==========================================================
const textarea = document.getElementById("redacao");
const contadorElemento = document.getElementById("contador");
const erroElemento = document.getElementById("erro");
const btnPausar = document.getElementById("btnPausar");
const timerDisplay = document.getElementById('timer');

// ==========================================================
// FUNÇÕES PRINCIPAIS
// ==========================================================

function atualizarContador() {
    const numCaracteres = textarea.value.length;
    const meta = 1600;
    contadorElemento.innerText = `Caracteres: ${numCaracteres}/${meta}`;
    erroElemento.innerText = "";
}

textarea.addEventListener('input', atualizarContador);

function iniciarTimer() {
    tempo = 90 * 60;
    isPaused = false; // Garante que o timer não comece pausado
    clearInterval(intervalo);
    
    timerDisplay.innerText = "01:30:00";
    btnPausar.innerText = "Pausar Timer";
    btnPausar.style.display = 'inline-block'; // Mostra o botão de pausa

    textarea.disabled = false;
    textarea.value = "";
    textarea.focus();
    atualizarContador();
    document.getElementById("correcao").innerHTML = "";
    document.getElementById("nota").style.display = "none";
    document.getElementById("suggestions").style.display = "none";
    
    iniciarIntervalo(); // Inicia o cronômetro
}

function iniciarIntervalo() {
    intervalo = setInterval(() => {
        if (tempo <= 0) {
            clearInterval(intervalo);
            textarea.disabled = true;
            btnPausar.style.display = 'none'; // Esconde o botão de pausa
            alert("Tempo esgotado!");
            timerDisplay.innerText = "00:00:00";
        } else {
            tempo--;
            let horas = String(Math.floor(tempo / 3600)).padStart(2, '0');
            let minutos = String(Math.floor((tempo % 3600) / 60)).padStart(2, '0');
            let segundos = String(tempo % 60).padStart(2, '0');
            timerDisplay.innerText = `${horas}:${minutos}:${segundos}`;
        }
    }, 1000);
}

// ***** NOVA FUNÇÃO PARA PAUSAR E RETOMAR *****
function pausarRetomarTimer() {
    // Se o timer estiver rodando, pause.
    if (!isPaused) {
        clearInterval(intervalo);
        isPaused = true;
        btnPausar.innerText = "Retomar Timer";
        textarea.disabled = true; // Impede a digitação enquanto pausado
    // Se o timer estiver pausado, retome.
    } else {
        isPaused = false;
        btnPausar.innerText = "Pausar Timer";
        textarea.disabled = false;
        iniciarIntervalo(); // Recomeça o ciclo do cronômetro de onde parou
    }
}

function sortearTema() {
    let temaEscolhido = temasEnem[Math.floor(Math.random() * temasEnem.length)];
    document.getElementById("tema").innerText = temaEscolhido;
    iniciarTimer();
}

function corrigirRedacao() {
    clearInterval(intervalo);
    btnPausar.style.display = 'none'; // Esconde o botão de pausa
    textarea.disabled = true;
    const texto = textarea.value;

    if (texto.trim().length < 1600) {
        document.getElementById("correcao").innerText = "Sua redação precisa atingir o mínimo de 1600 caracteres para ser corrigida.";
        return;
    }

    let competencias = { normaLingua: 200, compreensaoTema: 200, organizacao: 200, coesao: 200, propostaIntervencao: 200 };
    let sugestoes = [];
    const abreviacoes = texto.match(/\b(vc|pq|td|msm|tbm|eh|naum)\b/gi);
    if (abreviacoes) {
        competencias.normaLingua -= 40;
        sugestoes.push(`Evite abreviações como: ${[...new Set(abreviacoes)].join(", ")}.`);
    }
    if (texto.length > 30 && !texto.includes(',')) {
        competencias.normaLingua -= 20;
        sugestoes.push("Use vírgulas para separar ideias e dar mais clareza ao seu texto.");
    }
    if (texto.trim().split(/\s+/).length < 150) {
        competencias.compreensaoTema -= 60;
        sugestoes.push("Seu texto parece um pouco curto. Tente desenvolver mais os argumentos para abordar o tema completamente.");
    }
    const paragrafos = texto.trim().split(/\n+/).length;
    if (paragrafos < 3) {
        competencias.organizacao -= 80;
        sugestoes.push("Estruture sua redação em mais parágrafos (idealmente 3 ou 4) para separar a introdução, o desenvolvimento e a conclusão.");
    }
    const conectivos = texto.match(/\b(portanto|entretanto|além disso|contudo|no entanto|desse modo)\b/gi);
    if (!conectivos || conectivos.length < 2) {
        competencias.coesao -= 50;
        sugestoes.push("Utilize mais conectivos (ex: 'além disso', 'portanto') para ligar suas frases e parágrafos.");
    }
    const palavrasIntervencao = texto.match(/\b(governo|sociedade|mídia|escolas|deve|criar|promover|conscientizar)\b/gi);
    if (!palavrasIntervencao || palavrasIntervencao.length < 3) {
        competencias.propostaIntervencao -= 70;
        sugestoes.push("Sua proposta de intervenção pode ser mais detalhada. Lembre-se de dizer O QUE fazer, QUEM deve fazer e COMO deve ser feito.");
    }
    for (const c in competencias) {
        if (competencias[c] < 40) competencias[c] = 40;
    }
    const notaFinal = Object.values(competencias).reduce((a, b) => a + b, 0);
    document.getElementById("correcao").innerText = "Análise da redação concluída. Clique em 'Ver Nota' para o resultado.";
    const notaElement = document.getElementById("nota");
    notaElement.innerHTML = `<b>Nota final: ${notaFinal}/1000</b><br><br>` +
        `Competência 1 (Norma Padrão): ${competencias.normaLingua}/200<br>` +
        `Competência 2 (Compreensão do Tema): ${competencias.compreensaoTema}/200<br>` +
        `Competência 3 (Organização): ${competencias.organizacao}/200<br>` +
        `Competência 4 (Coesão): ${competencias.coesao}/200<br>` +
        `Competência 5 (Proposta de Intervenção): ${competencias.propostaIntervencao}/200`;
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
    notaElement.style.display = "none";
}

function verNota() {
    const notaElement = document.getElementById("nota");
    if (notaElement.innerHTML !== "") {
        notaElement.style.display = "block";
    }
}