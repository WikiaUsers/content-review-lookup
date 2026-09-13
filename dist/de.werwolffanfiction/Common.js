/* 1. Spiele-Zentrale Dropdown in die Werkzeugleiste (WikiBar) einfügen */
(function() {
    var toolbarLabel = 'WFW & BotC';
    
    var werwolfLinks = [
        { label: 'Alle Werwolf-Rollen (Kategorie)', link: '/de/wiki/Kategorie:WFW-Rollen' },
        { label: 'Werwolf A-Z', link: '/de/wiki/Kategorie:WFW' },
        { label: 'Set-Builder & Balancing', link: '/de/wiki/Werwolf:Set_Builder' }
    ];

    var botcLinks = [
        { label: 'BotC Main Page / Uebersicht', link: '/de/wiki/Main_Page' },
        { label: 'BotC Alle Seiten (Kategorie)', link: '/de/wiki/Kategorie:BotC' },
        { label: 'BotC Spielmoeglichkeiten & Sets', link: '/de/wiki/BotC:Spielmoeglichkeiten' }
    ];

    /* KORREKTUR: WikiaBar statt WikiBar */
    var toolbarWrapper = document.querySelector('#WikiaBar .tools') 
                      || document.querySelector('#WikiaBar .wikia-bar-anon');
    if (!toolbarWrapper) return;

    var toolbarElement = document.createElement('li');
    toolbarElement.classList.add('custom', 'menu', 'wds-dropdown', 'wds-is-hoverable', 'wds-is-flipped');

    function createLinkList(links) {
        return links.map(function(link) {
            return '<li><a href="' + link.link + '" class="wds-dropdown__content-link">' + link.label + '</a></li>';
        }).join('');
    }

    toolbarElement.innerHTML = 
        '<a class="wds-dropdown__toggle wds-button wds-is-secondary" href="#">' +
            '<span>' + toolbarLabel + '</span>' +
            '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>' +
        '</a>' +
        '<div class="wds-dropdown__content wds-is-right" style="max-height: 420px; overflow-y: auto;">' +
            '<h2 style="margin-left: 16px; font-size: 13px; font-weight: bold; margin-top: 8px; margin-bottom: 4px; color: #d12222;">Werwolf & Anhang</h2>' +
            '<ul class="wds-list wds-is-linked">' +
                createLinkList(werwolfLinks) +
            '</ul>' +
            '<hr style="margin: 8px 16px; border: 0; border-top: 1px solid #ccc;">' +
            '<h2 style="margin-left: 16px; font-size: 13px; font-weight: bold; margin-top: 8px; margin-bottom: 4px; color: #722ed1;">Blood on the Clocktower</h2>' +
            '<ul class="wds-list wds-is-linked">' +
                createLinkList(botcLinks) +
            '</ul>' +
        '</div>';

    toolbarWrapper.insertBefore(toolbarElement, toolbarWrapper.firstChild);
})();


/* 2. Benutzername in {{USERNAME}} einfügen */
$(function() {
    var userName = mw.config.get('wgUserName');
    if (userName) {
        $('.insertusername').text(userName);
    }
});

/* 3. Nach-Oben-Scroll-Button in der WikiaBar */
(function() {
    var toolbarWrapper = document.querySelector('#WikiaBar .tools') 
                      || document.querySelector('#WikiaBar .wikia-bar-anon');
    if (!toolbarWrapper || document.querySelector('#custom-back-to-top')) return;

    var backToTopBtn = document.createElement('li');
    backToTopBtn.id = 'custom-back-to-top';
    backToTopBtn.classList.add('custom', 'wikiabar-button');
    
    backToTopBtn.innerHTML = '<a href="#" class="wds-button wds-is-secondary" style="font-weight: bold;">NACH OBEN ▲</a>';

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toolbarWrapper.appendChild(backToTopBtn);
})();

/* 4. Skript für einklappbare Tabellen & Navboxen */
mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
    importScriptPage('MediaWiki:CollapsibleTables.js', 'dev');
});