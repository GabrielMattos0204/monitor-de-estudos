const blocos2h30 = [
    { nome: "Bloco 1 — CONTEÚDO PRINCIPAL", min: 50 },
    { nome: "Bloco 2 — Vídeo/Aula + Aprofundamento", min: 40 },
    { nome: "Bloco 3 — Questões", min: 40 },
    { nome: "Bloco 4 — Revisão dos Erros", min: 20 }
];

const blocos1h30 = [
    { nome: "Bloco 1 — CONTEÚDO PRINCIPAL", min: 30 },
    { nome: "Bloco 2 — Vídeo/Aula + Aprofundamento", min: 25 },
    { nome: "Bloco 3 — Questões", min: 25 },
    { nome: "Bloco 4 — Revisão dos Erros", min: 10 }
];

let blocosAtuais = blocos2h30;
let indiceBloco = 0;
let tempoRestante = blocosAtuais[0].min * 60;
let timerInterval = null;

function atualizarTela() {
    const min = Math.floor(tempoRestante / 60).toString().padStart(2, '0');
    const seg = (tempoRestante % 60).toString().padStart(2, '0');
    document.getElementById('timer').innerText = `${min}:${seg}`;
    document.getElementById('block-name').innerText = blocosAtuais[indiceBloco].nome;
}

function toggleTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById('start-btn').innerText = "Continuar";
    } else {
        document.getElementById('start-btn').innerText = "Pausar";
        timerInterval = setInterval(() => {
            if (tempoRestante > 0) {
                tempoRestante--;
                atualizarTela();
            } else {
                tocarAlerta();
                proximoBloco();
            }
        }, 1000);
    }
}

function proximoBloco() {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('start-btn').innerText = "Iniciar";
    
    if (indiceBloco < blocosAtuais.length - 1) {
        indiceBloco++;
        tempoRestante = blocosAtuais[indiceBloco].min * 60;
        atualizarTela();
    } else {
        alert("🎉 Sessão de estudos concluída! Parabéns por manter a sequência.");
        indiceBloco = 0;
        tempoRestante = blocosAtuais[0].min * 60;
        atualizarTela();
    }
}

function setModo(horas) {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('start-btn').innerText = "Iniciar";
    indiceBloco = 0;
    blocosAtuais = (horas === 2.5) ? blocos2h30 : blocos1h30;
    tempoRestante = blocosAtuais[0].min * 60;
    atualizarTela();
}

function tocarAlerta() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1);
}

// Inicializa a tela ao carregar o arquivo
atualizarTela();