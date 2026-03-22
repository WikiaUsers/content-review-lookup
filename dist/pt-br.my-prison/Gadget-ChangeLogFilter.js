 // Exportado de My Prison Wiki (EN) e traduzido para esta wiki
 // Criado especificamente para a estrutura da página Change Log

mw.hook('wikipage.content').add(function ($content) {
    var $placeholder = $('#search-placeholder');
    if (!$placeholder.length || $('#inpage-search').length || window.location.href.includes('action=')) return;

    var debounceTimer;

    // INTERFACE DA BARRA DE BUSCA
    var $container = $('<div id="inpage-search"></div>');
    var $input = $('<input type="search" id="pageSearchInput" placeholder="Filtrar Log de Alterações (ex: Inverno, V74, Corrigido)..." style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; background: var(--theme-page-background-color); color: var(--theme-page-text-color); box-sizing: border-box;">');
    var $status = $('<div id="searchStatus"></div>');
    
    $container.append($input, $status);
    $placeholder.replaceWith($container);

    function getUpdateGroups() {
        var groups = [];
        // Mapeia apenas as versões (H3)
        $('.mw-parser-output > h3').each(function() {
            var $header = $(this);
            var $contentBetween = $header.nextUntil('h3, h2'); // Para o próximo H3 ou próximo ANO (H2)
            groups.push({
                header: $header,
                content: $contentBetween,
                fullText: ($header.text() + ' ' + $contentBetween.text()).toLowerCase()
            });
        });
        return groups;
    }

    function clearHighlights() {
        $('.page-search-highlight').each(function() {
            var parent = this.parentNode;
            $(this).replaceWith(this.textContent);
            if (parent) parent.normalize();
        });
    }

    function applyHighlight($elements, term) {
        var regex = new RegExp('(' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        
        $elements.find('span, li, b, i, code, h3').addBack('h3').not('h2').contents().filter(function() {
            return this.nodeType === 3 && this.textContent.match(regex);
        }).each(function() {
            var highlightedText = this.textContent.replace(regex, '<span class="page-search-highlight">$1</span>');
            $(this).replaceWith(highlightedText);
        });
    }

    function executeSearch() {
        var query = $input.val().trim().toLowerCase();
        var groups = getUpdateGroups();
        var matchCount = 0;

        clearHighlights();

        if (!query) {
            $('.mw-parser-output > *').show();
            $status.text('');
            return;
        }

        $('.mw-parser-output > *').not('#inpage-search, .log-header, .noprint').hide();
        // Mantém os anos (H2) visíveis apenas como divisores
        $('.mw-parser-output > h2').show(); 

        groups.forEach(function(group) {
            // Verifica se o termo está no título da versão (H3) ou nos itens abaixo dela
            if (group.fullText.indexOf(query) !== -1) {
                group.header.show();
                group.content.show();
                applyHighlight(group.header.add(group.content), query);
                matchCount++; 
            }
        });

        $status.text(matchCount > 0 ? 'Encontradas ' + matchCount + ' versões correspondentes.' : 'Nenhum resultado encontrado.');
    }

    $input.on('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(executeSearch, 250);
    });
});