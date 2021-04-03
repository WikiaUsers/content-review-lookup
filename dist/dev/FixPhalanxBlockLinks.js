(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions' || window.FixPhalanxBlockLinksLoaded) {
        return;
    }
    window.FixPhalanxBlockLinksLoaded = true;
    var ucp = mw.config.get('wgVersion') !== '1.19.24';
    var preloads = 2;

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

        var element = ucp ? '.mw-contributions-user-tools' : '#contentSub';
        var blockurl = mw.util.getUrl(mapping.Block);
        var unblockurl = mw.util.getUrl(mapping.Unblock);
        var unblockelement = $(element + ' a[href^="' + unblockurl + '/"]');

        if (!unblockelement.length) {
            return;
        }

        $(element + ' a[href^="' + blockurl + '"]').text(data.query.allmessages[0]["*"]);
        if (ucp) {
            unblockelement.parent().hide();
        } else {
            unblockelement.hide();
            unblockelement[0].previousSibling.remove();
        }
    }

    function init () {
        var user = ucp ? mw.config.get('profileUserName') : $('.UserProfileMasthead .masthead-info h1').text();

        new mw.Api().get({
            action: 'query',
            meta: 'userinfo|allmessages|siteinfo',
            uiprop: 'rights',
            list: 'blocks',
            bkusers: user,
            bklimit: 1,
            ammessages: 'blocklink',
            amlanguage: mw.config.get('wgUserLanguage'),
            siprop: 'namespaces|specialpagealiases',
            format: 'json'
        }).done(handler);
    }

    function preload () {
        if (--preloads === 0) {
            init();
        }
    }

    mw.loader.using('mediawiki.api').then(preload);
    mw.loader.using('mediawiki.util').then(preload);
})();