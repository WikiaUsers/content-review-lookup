/* 1. Wolfs-Zentrale Dropdown in die Werkzeugleiste (WikiaBar) einfügen */

(function() {
    var toolbarLabel = 'WOLFS-ZENTRALE 🐺';
    var toolbarLinks = [
        { label: 'Übersicht', link: '/wiki/Wolfs-Zentrale' },
        { label: 'Regeln', link: '/wiki/Regeln' },
        { label: 'Anmeldung', link: '/wiki/Anmeldung' }
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

/* 3. Nach-Oben-Scroll-Button */
mw.hook('wikipage.content').add(function() {
    if ($('#scroll-to-top-button').length) return;

    var $button = $('<div>')
        .attr('id', 'scroll-to-top-button')
        .text('▲')
        .attr('title', 'Nach oben scrollen');

    $('body').append($button);
});

/* Skript für einklappbare Tabellen & Navboxen */
mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
    importScriptPage('MediaWiki:CollapsibleTables.js', 'dev');
});