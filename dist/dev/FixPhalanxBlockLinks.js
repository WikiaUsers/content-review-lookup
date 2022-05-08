(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' || window.FixPhalanxBlockLinksLoaded) {
        return;
    }
    window.FixPhalanxBlockLinksLoaded = true;

    function handler (data) {
        if (!data.query.userinfo.rights.includes('block')) {
            return;
        }
        if (data.query.blocks[0]) {
            return;
        }
        
        var specialNamespace = data.query.namespaces[-1]['*'];
        var mapping = {};
        data.query.specialpagealiases.forEach(function (x) {
            mapping[x.realname] = specialNamespace + ':' + x.aliases[0];
        });
        var unblockelement = $('.mw-contributions-user-tools a[title^="' + mapping.Unblock + '/"]');

        if (!unblockelement.length) {
            return;
        }

        $('.mw-contributions-user-tools a[title^="' + mapping.Block + '"]').text(data.query.allmessages[0]['*']);
        unblockelement.parent().hide();
    }

    mw.loader.using('mediawiki.api').then(function () {
        new mw.Api().get({
            action: 'query',
            meta: 'userinfo|allmessages|siteinfo',
            uiprop: 'rights',
            list: 'blocks',
            bkusers: mw.config.get('profileUserName'),
            bklimit: 1,
            ammessages: 'blocklink',
            amlang: mw.config.get('wgUserLanguage'),
            siprop: 'namespaces|specialpagealiases'
        }).done(handler);
    });
})();