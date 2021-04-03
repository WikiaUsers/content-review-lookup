/*******************************************************
* Quick redirect
* !TESTING 05:27, May 9, 2018 (UTC)
* Author：机智的小鱼君 & Dev wiki users
* Logs
**05:30, May 9, 2018 (UTC)：发布测试
**05:49, May 9, 2018 (UTC)：添加了取消功能
*******************************************************/
// <nowiki>
mw.loader.using([
    'mediawiki.api',
    'mediawiki.user'
], function () {
    var list = $('.page-header__contribution-buttons ul.wds-list');
    if (
        window.QuickRedirectLoaded ||
        !list.exists()
    ) {
        return; 
    }
    window.QuickRedirectLoaded = true;
    var token = mw.user.tokens.get('editToken'),
        api = new mw.Api(),
        i18n,
        summary,
        page = mw.config.get('wgPageName');
    function init (i18nData) {
        i18n = i18nData;
        summary = i18n.inContentLang().msg('summary').plain();
        list.append(
            $('<li>').append(
                $('<a>', {
                    id: 'ca-redirect-to',
                    text: i18n.msg('to').plain(),
                    click: redirectTo,
                    href: '#'
                })
            ),
            $('<li>').append(
                $('<a>', {
                    id: 'ca-redirect-from',
                    text: i18n.msg('from').plain(),
                    click: redirectFrom,
                    href: '#'
                })
            )
        );
    }
    function redirectTo () {
        var target = prompt(i18n.msg('promptTo', page).plain());
        if (target === null) {
            return;
        }
        api.post({
            action: 'edit',
            title: page,
            summary: summary+' → [['+target+']]',
            text:'#REDIRECT [['+target+']]',
            token: token
        })
        .done(function () {
            alert(i18n.msg('success', page, target).plain());
            location.reload(true);
        });
    }
    function redirectFrom () {
        var target = prompt(i18n.msg('promptFrom', page).plain());
        if (target === null) {
            return;
        }
        api.post({
            action: 'edit',
            title: target,
            summary: summary+' → [['+page+']]',
            text:'#REDIRECT [['+page+']]',
            token: token
        }) 
        .done(function () {
            alert(i18n.msg('success', target, page).plain());
        });
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('Quick redirect').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});