/**
 * FollowDropdown
 *
 * Documentation: <https://dev.wikia.com/wiki/FollowDropdown>
 * Description: Adds a link to ?action=watch below the edit dropdown button.
 * @author Algorithmz
 * @author KockaAdmiralac
 */
(function() {
    var $list = $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list'),
        config = mw.config.get([
            'stylepath',
            'wgArticleId',
            'wgNamespaceNumber',
            'wgPageName',
            'wgUserLanguage'
        ]),
        title,
        $link,
        api,
        messages,
        unwatch;
    if (
        $list.length === 0 ||
        config.wgArticleId === 0 ||
        window.FollowDropdownLoaded
    ) {
        return;
    }
    window.FollowDropdownLoaded = true;
    function mapInput(value, key) {
        return $('<input>', {
            name: key,
            type: 'hidden',
            value: value
        });
    }
    function click(e) {
        if (e.ctrlKey) {
            return;
        }
        e.preventDefault();
        var params = {
            action: 'watch',
            titles: config.wgPageName,
            token: mw.user.tokens.get('watchToken'),
            unwatch: unwatch ? true : undefined
        };
        api.post(params).done(function(data) {
            if (!data.error) {
                unwatch = !unwatch;
                var $newLink = createLink();
                $link.replaceWith($newLink);
                $link = $newLink;
            }
        });
        $link.html($('<span>', {
            'class': 'mw-ajax-loader'
        }));
    }
    function createLink() {
        return $('<a>', {
            click: click,
            href: mw.util.getUrl(config.wgPageName, {
                action: unwatch ? 'unwatch' : 'watch'
            }),
            text: messages[Number(!unwatch)]
        });
    }
    function apiCallback(d) {
        if (d.error) {
            return;
        }
        var el = d.watchlistraw[0], msg = d.query.allmessages;
        messages = msg.map(function(msg) {
            return msg['*'];
        });
        unwatch = el && el.title === title.getPrefixedText();
        $link = createLink();
        $list.append($('<li>').append($link));
    }
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util',
        'mediawiki.Title'
    ], function() {
        title = new mw.Title(config.wgPageName);
        api = new mw.Api();
        api.get({
            action: 'query',
            list: 'watchlistraw',
            meta: 'allmessages',
            ammessages: 'unwatch|watch',
            amlang: config.wgUserLanguage,
            wrcontinue: title.namespace + '|' + title.getMainText(),
            wrlimit: 1
        }).done(apiCallback);
    });
})();