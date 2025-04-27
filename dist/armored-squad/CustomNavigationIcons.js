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
            else if (span.textContent.trim() === 'Community') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Community_Icon.png'));
                span.parentNode.insertBefore(icon, span);
            }
            else if (span.textContent.trim() === 'Wiki Guidelines') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Wiki_Guidelines_Navigation_Icon.png'));
                span.parentNode.insertBefore(icon, span);
            }
            else if (span.textContent.trim() === 'Stubs') {
                icon.setAttribute('src', mw.config.get('wgArticlePath').replace('$1', 'Special:Redirect/file/Stubs_Icon.png'));
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