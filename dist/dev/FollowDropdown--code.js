/**
 * FollowDropdown
 *
 * Documentation: <https://dev.wikia.com/wiki/FollowDropdown>
 * Description: Adds a link to ?action=watch below the edit dropdown button.
 * @author Algorithmz
 * @author KockaAdmiralac
 */
(function() {
    var $list = $('.page-header__contribution-buttons .wds-list'),
    config = mw.config.get([
        'wgArticleId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgUserLanguage'
    ]),
    title,
    $form;
    if (
        !$list.exists() ||
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
    function apiCallback(d) {
        if (d.error) {
            return;
        }
        var el = d.watchlistraw[0], msg = d.query.allmessages;
        if (el && el.title === title.getPrefixedText()) {
            insert('unwatch', msg[0]['*']);
        } else {
            insert('watch', msg[1]['*']);
        }
        $form = $('<form>', {
            action: mw.util.getUrl(config.wgPageName),
            enctype: 'multipart/form-data',
            id: 'FollowDropdownForm',
            method: 'post'
        }).append($.map({
            action: 'watch',
            title: config.wgPageName,
            wpEditToken: mw.user.tokens.get('editToken')
        }, mapInput)).appendTo(document.body);
    }
    function click(e) {
        e.preventDefault();
        $form.submit();
    }
    function insert(action, text) {
        $list.append(
            $('<li>').append(
                $('<a>', {
                    click: click,
                    href: mw.util.getUrl(config.wgPageName, {
                        action: action
                    }),
                    text: text
                })
            )
        );
    }
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util',
        'mediawiki.Title'
    ], function() {
        title = new mw.Title(config.wgPageName);
        new mw.Api().get({
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