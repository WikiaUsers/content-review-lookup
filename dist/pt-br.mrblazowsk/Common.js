/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
/* Alternância contínua de cores usando classes .cr-odd-row / .cr-even-row */
$(function() {
    function aplicarAlternanciaInfobox($infobox) {
        // Seleciona filhos diretos relevantes para alternar: imagens e dados
        var $linhas = $infobox.children().filter(function() {
            var $el = $(this);
            if ($el.is('.pi-title') || $el.is('.pi-header')) {
                return false;
            }
            // Incluir .pi-data e .pi-image
            if ($el.is('.pi-data') || $el.is('.pi-image')) {
                return true;
            }
            return false;
        });
        // Limpa classes antigas
        $linhas.removeClass('cr-odd-row cr-even-row');
        // Aplica alternância sequencial
        $linhas.each(function(index) {
            var $linha = $(this);
            if (index % 2 === 0) {
                $linha.addClass('cr-odd-row');
            } else {
                $linha.addClass('cr-even-row');
            }
        });
    }

    // Ao carregar, processa cada infobox portátil
    $('.portable-infobox').each(function() {
        aplicarAlternanciaInfobox($(this));
    });

    // Se as infoboxes puderem aparecer dinamicamente, re-executar em hooks adequados:
    // mw.hook('wikipage.content').add(function($content) {
    //     $content.find('.portable-infobox').each(function() {
    //         aplicarAlternanciaInfobox($(this));
    //     });
    // });
    
    // Opcional: se seções recolhidas mudam, reaplicar após clique no toggle
    $(document).on('click', '.pi-header', function() {
        var $infobox = $(this).closest('.portable-infobox');
        aplicarAlternanciaInfobox($infobox);
    });
});