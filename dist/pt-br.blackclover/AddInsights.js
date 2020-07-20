(function() {
    if (window.AddInsightsRun) {
        return;
    }
    window.AddInsightsRun = true;
    var $sidebar = $('.insights-module-list'),
        $list = $('.insights-landing-nav-list'),
        $list2 = $('.insights-nav-list'),
        affectsSidebar = window.AffectsSidebar || false,
        items = window.ItemsToAdd || [
            {
                'Name': 'Personagens',
                'Page': '',
                'Description': [
                    'The administrator of this wiki didn\'t add the "ItemsToAdd" array.',
                    '<i>If you are a user of this wiki and an administrator doesn\'t know about this, you probably should notify them about this error.</i>',
                    '<i>If you are the wiki administrator, please refer to the <a href="//dev.wikia.com/wiki/AddInsights">installation manual</a> for instructions on how to fix this.</i>',
                    '<i><strong>If you still see this after a wiki administrator has fixed this, you may need to break your browser\'s cache. You can look up instructions on how to do this with your favorite search engine.</strong></i>'
                ].join('\n')
            }
        ];
    mw.util.addCSS('.insights-icon-other {' +
        'background-image: url("https://images.wikia.nocookie.net/dev/images/0/04/AddInsights.svg");' +
    '}');
    function makeItem(page, name, length, type) {
        var $link = $('<a>', {
            'class': 'insights-' + type + '-link',
            href: mw.util.getUrl(page)
        });
        if (length) {
            $link.append(
                $('<div>', {
                    'class': 'insights-red-dot'
                }).append(
                    $('<div>', {
                        'class': 'insights-red-dot-count',
                        text: length > 500 ? '500+' : length
                    })
                )
            );
        }
        $link.append(' ', name);
        return $('<li>', {
            'class': 'insights-' + type + '-item insights-icon-other'
        }).append($link);
    }
    function processItem(name, description, page, override, length) {
        if ($sidebar.exists() && (affectsSidebar || override)) {
            $sidebar.append(makeItem(page, name, length, 'module'));
        }
        if ($list.exists()) {
            $list.append(
                $('<li>', {
                    'class': 'insights-landing-nav-item insights-icon-other'
                }).append(
                    $('<a>', {
                        href: mw.util.getUrl(page)
                    }).append(
                        $('<h3>', { html: name })
                    ),
                    $('<p>', { html: description })
                )
            );
        }
        if ($list2.exists()) {
            $list2.append(makeItem(page, name, length, 'nav'));
        }
    }
    items.forEach(function(item) {
        var name = item.Name || '<i>[ Unnamed ]</i>',
            description = item.Description || '<i>[ No Description ]</i>',
            page = item.Page || '',
            isCategory;
        if (page.slice(0, 9) == 'Category:') {
            $.ajax({
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: page,
                    cmlimit: 'max',
                    format: 'json'
                },
                success: function (result) {
                    processItem(name, description, page, item.Override, result.query.categorymembers.length);
                }
            });
        } else {
            processItem(name, description, page, item.Override);
        }
    });
})();