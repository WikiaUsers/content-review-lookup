/**
 * @name            TalkPageManagement
 * @version         v1.4
 * @author          TheGoldenPatrik1
 * @protect         <nowiki>
 * @description     Adds a button to quickly create and protect talk pages.
 */
mw.loader.using([
    'mediawiki.api',
    'mediawiki.Title',
    'mediawiki.user',
    'mediawiki.util'
]).then(function () {
    var config = mw.config.get([
        'wgArticleId',
        'wgNamespaceNumber',
        'wgPageName',
        'wgUserGroups'
    ]);
    if (
        [4,6,8,10,12,14,112,116,828].indexOf(config.wgNamespaceNumber) === -1 ||
        config.wgArticleId === 0 ||
        window.TalkPageManagementLoaded
    ) {
        return;
    }
    window.TalkPageManagementLoaded = true;
    var token = mw.user.tokens.get('editToken'),
    Api = new mw.Api(),
    groups = /sysop|content-moderator|rollback/.test(config.wgUserGroups.join()),
    title = new mw.Title(config.wgPageName);
    title.namespace += 1;
    var titleText = title.getPrefixedText();
    Api.get({
        cb: Date.now,
        action: 'query',
        titles: titleText
    }).done(function (d) {
        if (
            d.error ||
            !d.query.pages[-1]
        ) {
            return;
        }
        $('.page-header__contribution-buttons .wds-list').append(
            $('<li>').append(
                $('<a>', {
                    href: '#',
                    id: 'ca-create',
                    text: 'Create Talk',
                    click: click
                })
            )
        );
        function click () {
            $.ajax({
                type: 'POST',
                url: mw.util.wikiScript('api'),
                dataType: 'json',
                data: {
                    action: 'edit',
                    title: titleText,
                    summary: 'Creating [[Help:Talk pages|Talk]] via [[MediaWiki:Gadget-TalkPageManagement/Documentation|Script]]',
                    text: (window.CustomCreate ? prompt('Enter wikitext', window.DefaultWikitext || '{{Talk}}') : window.DefaultWikitext || '{{Talk}}'),
                    format: 'json',
                    token: token
                }
            }).done(function (data) {
                if (data.error) {
                    new BannerNotification('An error occured while creating the page.', 'error').show();
                } else if (!groups) {
                    new BannerNotification('Talk page created!', 'success').show();
                } else {
                    Api.post({
                        action: 'protect',
                        expiry: 'indefinite',
                        protections: 'move=sysop',
                        watchlist: 'nochange',
                        title: titleText,
                        reason: '[[Help:Talk pages|Talk Page]]',
                        token: token
                    })
                    .done(function (data) { 
                        if (data.error) {
                            new BannerNotification('An error occurred while protecting the page.', 'error').show();
                        } else {
                            new BannerNotification('Talk page created and protected!', 'success').show();
                        }
                    });
                }
            });
        }
    });
});