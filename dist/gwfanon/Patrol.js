$('.page-header__contribution-buttons .wds-list')
    .prepend($('<li>')
    .append($('<a>', { 
        href: '/wiki/Specjalna:Rejestr/patrol?page='+wgPageName, 
        text: 'Sprawdzone edycje' 
    }))
);