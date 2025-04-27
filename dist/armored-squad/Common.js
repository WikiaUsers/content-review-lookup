/* Any JavaScript here will be loaded for all users on every page load. */
(function () {
    mw.hook('dev.wds').add(function (wds) {
        var menuLinks = document.querySelectorAll('li.wds-dropdown a[data-tracking="custom-level-1"] span');
        
        for (var i = 0; i < menuLinks.length; i++) {
            var span = menuLinks[i];
            var icon = document.createElement('img');
            icon.setAttribute('class', 'navigation-item-icon');
            icon.setAttribute('style', 'width: 25px; height: 25px; margin-right: 4px; vertical-align: middle;');

            if (span.textContent.trim() === 'Armored Squad') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Armored_Squad_Header.png'));
                span.parentNode.insertBefore(icon, span);
            }
            else if (span.textContent.trim() === 'Mechs') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Mechs_Header.png'));
                span.parentNode.insertBefore(icon, span);
            }
            else if (span.textContent.trim() === 'Weapons') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Weapons_Header.png'));
                span.parentNode.insertBefore(icon, span);
            }
            else if (span.textContent.trim() === 'Community') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Community_Header.png'));
                span.parentNode.insertBefore(icon, span);
            }
        }
    });

    importArticle({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    });
})();