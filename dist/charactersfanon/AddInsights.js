require(['wikia.window', 'jquery', 'mw'], function (window, $, mw) {
    if (window.AddInsightsRun) {
        return;
    }
    window.AddInsightsRun = true;
    var $sidebar = $('.insights-module-list'),
        $list = $('.insights-landing-nav-list'),
        $list2 = $('.insights-nav-list'),
        affectsSidebar = window.AffectsSidebar || false,
        items = window.ItemsToAdd || [],
        i18n;
 
    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:AddInsights.css'
    });
 
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
 
    function addItem(item) {
        var name = item.Name || '<i>[ ' + i18n.msg('unnamed').parse() + ' ]</i>',
            description = item.Description || '<i>[ ' + i18n.msg('NoDesc').parse() + ' ]</i>',
            page = item.Page || '';
        if (page.indexOf(mw.config.get('wgFormattedNamespaces')[14] + ':') === 0) {
            $.ajax({
                url: mw.util.wikiScript('api'),
                data: {
                    action: 'query',
                    list: 'categorymembers',
                    cmtitle: page,
                    cmlimit: 'max',
                    cmprop: '',
                    format: 'json'
                },
                success: function (result) {
                    processItem(name, description, page, item.Override, result.query.categorymembers.length);
                }
            });
        } else {
            processItem(name, description, page, item.Override);
        }
    }
 
    function addInsights(i18nd) {
        i18n = i18nd;
        items[0] = items[0] || {
            'Name': '???',
            'Page': mw.config.get('wgPageName'),
            'Description': [
                i18n.msg('descNotAdded').escape(),
                '<i>' + i18n.msg('descNotify').escape() + '</i>',
                '<i>' + i18n.msg('descAdmin').parse() + '</i>',
                '<i><strong>' + i18n.msg('descCache').parse() + '</strong></i>'
            ].join('\n')
        };
        items.forEach(addItem);
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('AddInsights').then(addInsights);
    });
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:I18n-js/code.js'
        });
    }
 
});