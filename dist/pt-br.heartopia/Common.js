/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
window.onload=function() {
	if (document.querySelector('.ht-clock-number')) {
        updateHeartopiaClocks();
        setInterval(updateHeartopiaClocks, 10000); // Checa a cada 10 segundos (leve)
    }
}

document.addEventListener('mouseover', function(e) {
    const wrapper = e.target.closest('.detalhes-wrapper');
    if (!wrapper) return;

    const content = wrapper.querySelector('.detalhes-content');
    const table = wrapper.closest('table');
    
    if (content) {
        content.style.display = 'block';
        content.style.left = "0px";
        content.style.right = "auto";
        content.style.top = "100%";
        content.style.bottom = "auto";

        const rectContent = content.getBoundingClientRect();
        const rectTable = table.getBoundingClientRect();

        // Se passar da borda direita da tabela, alinha à direita
        if (table && rectContent.right > rectTable.right) {
            content.style.left = "auto";
            content.style.right = "0px";
        }
        
        // Se passar da borda de baixo da tabela, alinha acima
        if (table && rectContent.bottom > rectTable.bottom) {
        	content.style.top = "auto";
        	content.style.bottom = "100%";
        }
    }
});
    
document.addEventListener('mouseout', function(e) {
    const wrapper = e.target.closest('.detalhes-wrapper');
    if (!wrapper) return;

    const content = wrapper.querySelector('.detalhes-content');
    
    if (content) {
        content.style.display = 'none';
    }
});

document.querySelectorAll('.criatura-titulo').forEach(function(container) {
    const link = container.querySelector('a');
    if (!link) return;

    let fontSize = 28; 
    const maxHeight = 48;

    link.style.fontSize = fontSize + 'px';
    link.style.display = 'block';
    link.style.lineHeight = '0.9';

    while (link.offsetHeight > maxHeight && fontSize > 8) {
        fontSize--;
        link.style.fontSize = fontSize + 'px';
    }
});

document.querySelectorAll('.criatura-linha').forEach(function(container) {
    const conteudo = container.querySelector('.conteudo');
    if (!conteudo) return;

    let fontSize = 13; 
    const maxHeight = 23;

    conteudo.style.fontSize = fontSize + 'px';
    conteudo.style.display = 'block';

    while (conteudo.offsetHeight > maxHeight && fontSize > 8) {
        fontSize--;
        conteudo.style.fontSize = fontSize + 'px';
        conteudo.style.lineHeight = '0.9';
    }
});


/** * Relógio Heartopia - Versão Otimizada
 * Atualiza apenas os elementos necessários sem sobrecarregar a página.
 */

function updateHeartopiaClocks() {
    const clocks = document.querySelectorAll('.ht-clock-number');
    if (clocks.length === 0) {
    	return;
    }

    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

    clocks.forEach(clock => {
        const offset = parseInt(clock.getAttribute('data-offset'));
        const serverTime = new Date(utc + (3600000 * offset));
        
        const h = serverTime.getHours();
        const m = serverTime.getMinutes();
        const timeStr = h.toString().padStart(2, '0') + ':' + m.toString().padStart(2, '0');
        
        // Atualiza o horário
        if (clock.textContent !== timeStr) {
            clock.textContent = timeStr;
            
            // Atualiza o período e ícone apenas se a hora mudar
            const parent = clock.parentElement;
            let periodo = "";
        	if (h >= 0 && h < 6) periodo = "Noite";
        	else if (h >= 6 && h < 12) periodo = "Amanhecer";
        	else if (h >= 12 && h < 18) periodo = "Dia";
        	else periodo = "Crepúsculo"; // 18h às 23h59

            const textSpan = parent.querySelector('.ht-text');
            const iconSpan = parent.querySelector('.ht-icon');
            
            if (textSpan && textSpan.textContent !== periodo) {
                textSpan.textContent = periodo;
                // Ajuste o nome do arquivo exatamente como está na sua wiki (com ou sem espaço)
                const fileName = periodo + " Icone.png";
                iconSpan.innerHTML = '<img src="/pt-br/wiki/Especial:Redirecionar/file/' + encodeURIComponent(fileName) + '" style="width:16px; height:16px; vertical-align:middle;">';
            }
        }
    });
}