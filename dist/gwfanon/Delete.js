$('.page-header__contribution-buttons .wds-list')
    .prepend($('<li>')
    .append($('<a>', { 
        href: '/wiki/Project:Usuń_stronę?action=edit&preload=Project%3AUsuń_stronę/preload&section=new&editintro=Star+Wars+Fanonpedia%3AUsuń+stronę%2Feditintro&preloadtitle='+wgPageName, 
        text: 'Poproś o usunięcie' 
    }))
);