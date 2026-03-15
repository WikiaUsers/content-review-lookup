/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
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