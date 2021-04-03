/** DeleteUserpage
 * @author: Sophie
 * @attribution: Thundercraft5 (suggestion for configuration options and protections)
 * @use: Add an button to delete the user's page with a option to protect it.
*/

(function () {
    if (
        $('.mw-special-Contributions #delete-userpage').length ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions'
    ) {
        return;
    }
    var msgs;
    var preloads = 2;
    var ucp = mw.config.get('wgVersion') !== '1.19.24';
    var user = ucp ? mw.config.get('profileUserName') : $('.UserProfileMasthead .masthead-info h1').text();
    var userpage = mw.config.get('wgFormattedNamespaces')[2] + ':' + user;
    var selector = ucp ? $('.mw-contributions-user-tools > .mw-changeslist-links > span:last-child') : $('#contentSub > a:last-child');
    var config = $.extend({}, window.DeleteUserpage);
    
    function doProtect () {
        new mw.Api().post({
            action: 'protect',
            expiry: config.expiry || 'infinite',
            protections: 'create=' + (config.level || 'sysop'),
            title: userpage,
            reason: config.protectReason || config.reason || '',
            token: mw.user.tokens.get('editToken'),
            format: 'json'
        }).done(function () {
            window.location.reload();
        }).fail(function (e) {
            console.error('[DeleteUserpage] ' + e);
        });
    }
    
    function doDelete () {
        new mw.Api().post({
            action: 'delete',
            title: userpage,
            reason: config.deleteReason || config.reason || '',
            token: mw.user.tokens.get('editToken'),
            format: 'json'
        }).done(function () {
            if (config.protect && (config.noConfirm || confirm(msgs[2]))) {
                doProtect();
            } else {
                window.location.reload();
            }
        }).fail(function (e) {
            console.error('[DeleteUserpage] ' + e);
        });
    }

    function click () {
        if (config.noConfirm || confirm(msgs[1])) {
            doDelete();
        }
    }

    function appendLink () {
        var element = $('<a>', {
            href: '#',
            click: click,
            id: 'delete-userpage',
            text: msgs[0]
        });

        if (ucp) {
            selector.after(element);
            element.wrap('<span></span>');
        } else {
            selector.after(' | ', element);
        }
    }

    function handler (d) {
        if (
            d.query.userinfo.rights.includes('delete') &&
            !d.query.pages['-1'] &&
            d.query.pages[Object.keys(d.query.pages)[0]].revisions[0].user !== user
        ) {
            if (localStorage.getItem('fetch-CanDelete')) {
                localStorage.removeItem('fetch-CanDelete');
            }
            appendLink();
        }
    }

    function init () {
        window.dev.fetch({
            request: function (resolve, reject) {
                new mw.Api().get({
                    action: 'query',
                    meta: 'userinfo',
                    uiprop: 'rights',
                    prop: 'revisions',
                    rvprop: 'user',
                    rvdir: 'newer',
                    rvlimit: 1,
                    titles: userpage,
                    format: 'json'
                }).done(function (d) {
                    if (d.error) {
                        reject(d.error.code);
                    } else {
                        resolve(d);
                    }
                }).fail(function () {
                    reject(false);
                });
            },
            name: 'CanDelete',
            noCache: true
        }).then(handler);
    }

    function preload () {
        if (--preloads === 0) {
            window.dev.i18n.loadMessages('DeleteUserpage').then(function (i18n) {
                msgs = [
                    i18n.msg('label').plain(),
                    i18n.msg('delete-confirm').plain(),
                    i18n.msg('protect-confirm').plain()
                ];
            });
            init();
        }
    }

    mw.hook('dev.fetch').add(preload);
    mw.hook('dev.i18n').add(preload);

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:Fetch.js',
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
})();