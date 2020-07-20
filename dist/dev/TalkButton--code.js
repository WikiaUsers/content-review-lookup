// Talk page button
// Created by Lil' Miss Rarity
// MIT OS License
mw.loader.using([
    'mediawiki.api',
    'mediawiki.Title',
    'mediawiki.util'
]).then(function() {
    var config = mw.config.get([
        'wgArticleId',
        'wgNamespaceNumber',
        'wgPageName'
    ]);

    if (
        (window.TalkButtonNamespaces || [0]).indexOf(config.wgNamespaceNumber) === -1 ||
        $('.page-header__contribution-buttons ul #ca-talk').exists() ||
        config.wgArticleId === 0 ||
        window.TalkButtonLoaded
    ) {
        return;
    }
    window.TalkButtonLoaded = true;

    var title = new mw.Title(config.wgPageName);
    title.namespace += 1;
    var titleText = title.getPrefixedText();
    new mw.Api().get({
        action: 'query',
        titles: titleText,
        prop: 'info',
        meta: 'allmessages',
        inprop: 'revcount',
        ammessages: 'oasis-page-header-talk'
    }).done(function(d) {
        if (d.error) {
            return;
        }
        var text = d.query.allmessages[0]['*'],
            pages = d.query.pages;
        if (!pages[-1]) {
            text += ' (' + pages[Object.keys(pages)[0]].revcount + ')';
        }
        $('<li>').append(
            $('<a>', {
                'class': 'TalkButtonBubble',
                href: mw.util.getUrl(titleText),
                id: 'ca-talk',
                text: text
            })
        ).appendTo('.page-header__contribution-buttons .wds-list');
    });
});