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