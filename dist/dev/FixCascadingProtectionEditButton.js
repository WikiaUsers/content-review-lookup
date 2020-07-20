(function () {
    var config = mw.config.get([
        'wgArticleId',
        'wgPageName'
    ]);
    if (window.FixCascadingProtectionEditButtonLoaded || config.wgArticleId === 0 || !$('#ca-edit, #ca-ve-edit').length) {
        return;
    }
    window.FixCascadingProtectionEditButtonLoaded = true;

    function init (msg) {
        new mw.Api().get({
            action: 'query',
            meta: 'userinfo',
            uiprop: 'rights',
            prop: 'info',
            inprop: 'protection',
            titles: config.wgPageName,
            format: 'json'
        }).done(function (d) {
            if (
                d.query.userinfo.rights.includes('protect') &&
                d.query.pages[config.wgArticleId].protection &&
                d.query.pages[config.wgArticleId].protection.some(function (item) { return item.source; })
            ) {
                $('#ca-edit, #ca-ve-edit').empty().append(dev.wds.icon('pencil-small'), '&nbsp;&nbsp;', document.createTextNode(msg));
            }
        });
    }

    var preloads = 3;
    function preload () {
        if (--preloads === 0) {
            window.dev.fetch('edit').then(init);
        }
    }
    mw.hook('dev.fetch').add(preload);
    mw.hook('dev.wds').add(preload);
    mw.loader.using('mediawiki.api').then(preload);
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:WDSIcons/code.js',
            'u:dev:MediaWiki:Fetch.js'
        ]
    });
})();