$('.page-header__actions .wds-list')
    .prepend($('<li id="request-delete">')
    .append($('<a>', { 
        href: '/index.php?action=edit&preload=Szablon%3AUsuń_pojedynczą_stronę%2Fpreload&editintro=Szablon%3AUsuń_pojedynczą_stronę%2Feditintro&title=Star_Wars_Fanonpedia:Usuń_stronę/'+mw.config.get('wgPageName'), 
    text: 'Poproś o usunięcie' 
    }))
);
$('.page-header__actions .wds-list')
    .prepend($('<li id="wayback-save">')
    .append($('<a>', { 
        href: 'https://web.archive.org/save/https://gwfanon.fandom.com/wiki/'+mw.config.get('wgPageName'), 
    text: 'Wykonaj zrzut' 
    }))
);
$('.page-header__actions .wds-list')
    .prepend($('<li id="wayback-see">')
    .append($('<a>', { 
        href: 'https://web.archive.org/web/*/https://gwfanon.fandom.com/wiki/'+mw.config.get('wgPageName'), 
    text: 'Zobacz zrzuty' 
    }))
);
$('.page-header__actions .wds-list')
    .prepend($('<li id="log-see">')
    .append($('<a>', { 
        href: 'https://gwfanon.fandom.com/wiki/Specjalna:Rejestr?page='+mw.config.get('wgPageName'), 
    text: 'Przejrzyj rejestr' 
    }))
);