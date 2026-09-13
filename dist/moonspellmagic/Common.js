/* Any JavaScript here will be loaded for all users on every page load. */
function renderMoonspellSources(wds, $context) {
    var $container = ($context || $(document)).find('.moonspell-sources-container');
    
    if (!$container.length) return;
    if ($container.find('.moonspell-sources-group').length > 0) return;

    var groups = [
        {
            title: 'Official',
            items: [
                { 
                    url: 'https://shop.mattel.com/pages/monster-high-moonspell-magic', 
                    label: 'Mattel Official',
                    getIcon: function() { return wds.icon('external-small'); } 
                },
                { 
                    url: 'https://www.youtube.com/@MattelImagine', 
                    label: 'Mattel Imagine YouTube',
                    getIcon: function() { return wds.icon('youtube') || wds.brand('youtube'); } 
                },
                { 
                    url: 'https://www.instagram.com/monsterhigh/', 
                    label: 'Instagram',
                    getIcon: function() { return wds.icon('instagram') || wds.brand('instagram'); } 
                },
                { 
                    url: 'https://www.facebook.com/MonsterHigh/', 
                    label: 'Facebook',
                    getIcon: function() { return wds.icon('facebook-small') || wds.icon('facebook'); } 
                }
            ]
        },
        {
            title: 'Wiki',
            items: [
                { 
                    url: 'https://www.youtube.com/@MoonspellMagicWiki', 
                    label: 'YouTube',
                    getIcon: function() { return wds.icon('youtube') || wds.brand('youtube'); } 
                },
                { 
                    url: 'https://discord.gg/TjN8MAPFgC', 
                    label: 'Discord',
                    getIcon: function() { return wds.icon('discord') || wds.brand('discord'); } 
                }
            ]
        }
    ];

    groups.forEach(function(group) {
        var $groupWrapper = $('<div>', { 'class': 'moonspell-sources-group' });
        var $header = $('<h3>', { 'class': 'moonspell-sources-header', 'text': group.title });
        var $iconsList = $('<div>', { 'class': 'moonspell-sources-list' });

        group.items.forEach(function(item) {
            var iconElement = item.getIcon();

            if (!iconElement) return;

            $(iconElement).attr({
                'class': 'wds-icon wds-icon-small',
                'aria-hidden': 'true',
                'focusable': 'false'
            });

            var $link = $('<a>', {
                'class': 'page-side-tool',
                'href': item.url,
                'target': '_blank',
                'rel': 'nofollow noreferrer noopener',
                'aria-label': item.label
            }).append(iconElement);

            $iconsList.append($link);
        });

        $groupWrapper.append($header, $iconsList);
        $container.append($groupWrapper);
    });
}

mw.hook('dev.wds').add(function(wds) {
    mw.hook('wikipage.content').add(function($content) {
        renderMoonspellSources(wds, $content);
    });

    renderMoonspellSources(wds, $(document));
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:WDSIcons/code.js'
});