$('.page-header__actions .wds-list')
    .prepend($('<li>')
    .append($('<a>', { 
        href: '/index.php?action=edit&preload=Szablon%3AUsuń_pojedynczą_stronę%2Fpreload&editintro=Szablon%3AUsuń_pojedynczą_stronę%2Feditintro&title=Star_Wars_Fanonpedia:Usuń_stronę/'+mw.config.get('wgPageName'), 
    text: 'Poproś o usunięcie' 
    }))
);