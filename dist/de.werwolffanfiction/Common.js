/* 1. Wolfs-Zentrale Dropdown in die Werkzeugleiste (WikiaBar) einfügen */

(function() {
    var toolbarLabel = 'WOLFS-ZENTRALE 🐺';
    var toolbarLinks = [
    { label: 'Übersicht', link: '/de/wiki/Wolfs-Zentrale' },
    { label: 'Regeln', link: '/de/wiki/Regeln' },
    { label: 'Anmeldung', link: '/de/wiki/Anmeldung' }
];

    var toolbarWrapper = document.querySelector('#WikiaBar .tools')
                      || document.querySelector('#WikiaBar .wikia-bar-anon');
    if (!toolbarWrapper) return;

    var toolbarElement = document.createElement('li');
    toolbarElement.classList.add('custom', 'menu', 'wds-dropdown', 'wds-is-hoverable', 'wds-is-flipped');

    var linksHtml = toolbarLinks.map(function(link) {
        return '<li><a href="' + link.link + '" class="wds-dropdown__content-link">' + link.label + '</a></li>';
    }).join('');

    toolbarElement.innerHTML =
        '<a class="wds-dropdown__toggle wds-button wds-is-secondary" href="#">' +
            '<span>' + toolbarLabel + '</span>' +
            '<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg>' +
        '</a>' +
        '<div class="wds-dropdown__content wds-is-right">' +
            '<h2 style="margin-left: 16px; font-size: 14px; margin-top: 10px; margin-bottom: 5px; font-weight: bold;">Unser Forenspiel</h2>' +
            '<ul class="wds-list wds-is-linked">' +
                linksHtml +
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