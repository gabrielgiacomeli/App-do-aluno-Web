document.addEventListener('DOMContentLoaded', function() {
    const textoOriginal = document.getElementById('textoOriginal');
    const textoResumido = document.getElementById('textoResumido');
    const gerarResumo = document.getElementById('gerarResumo');
    
    gerarResumo.addEventListener('click', async function() {
        if(textoOriginal.value.trim().length < 100) {
            alert('O texto precisa ter pelo menos 100 caracteres');
            return;
        }
        
        gerarResumo.disabled = true;
        gerarResumo.textContent = 'Processando...';
        
        try {
            const response = await fetch('https://api.resumotexto.com/v1/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer SUA_CHAVE_API'
                },
                body: JSON.stringify({
                    text: textoOriginal.value,
                    compression: document.getElementById('nivelResumo').value
                })
            });
            
            const data = await response.json();
            textoResumido.innerHTML = data.summary;
            salvarNoHistorico(data.summary);
        } catch (error) {
            console.error('Erro:', error);
            textoResumido.innerHTML = 'Erro ao gerar resumo. Tente novamente.';
        } finally {
            gerarResumo.disabled = false;
            gerarResumo.textContent = 'Gerar Resumo';
        }
    });
    
    function salvarNoHistorico(resumo) {
        // Implementar lógica de histórico
    }
});