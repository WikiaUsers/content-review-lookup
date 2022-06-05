/**
 * ChangeModelButton.js
 * @author MonkeysHK <https://dev.fandom.com/wiki/User:MonkeysHK>
 * @license CC-BY-SA 3.0
 */

$.when(mw.loader.using(['mediawiki.api', 'mediawiki.jqueryMsg']), mw.hook('wikipage.content'))
    .then(function () {
        return new mw.Api().loadMessagesIfMissing(['changecontentmodel-legend']);
    })
    .then(function () {
        var config = mw.config.get([
            'wgIsArticle',
            'wgPageName',
            'wgUserGroups',
        ]);

        if (
            !config.wgIsArticle ||
            window.ChangeModelButtonLoaded ||
            !/content-moderator|sysop|content-volunteer|soap|helper|wiki-specialist|wiki-representative|staff/.test(config.wgUserGroups.join('\n'))
        ) {
            return;
        }

        window.ChangeModelButtonLoaded = true;

        if ($(".page-header__actions .wds-dropdown a:contains(Change content model)").length === 0)
            $('.page-header__contribution-buttons .wds-list, .page-header__actions .wds-list').first().append(
                $('<li>').append(
                    $('<a>', {
                        text: mw.msg('changecontentmodel-legend'),
                        href: new mw.Title('ChangeContentModel', -1).getUrl({
                            pagetitle: config.wgPageName.replaceAll('_', ' ')
                        }),
                    })
                )
            );
    });