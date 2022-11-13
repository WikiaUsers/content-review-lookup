/**
 * InactiveUsers
 *
 * documentation at: https://dev.fandom.com/wiki/InactiveUsers
 * © Peter Coester, 2012
 * 
 * continued as UserTags: https://dev.fandom.com/wiki/UserTags
 */

(function ($, mw) {
    'use strict';

    if (!mw.config.get('profileUserName') || window.InactiveUsersLoaded) {
        return;
    }
    window.InactiveUsersLoaded = true;

    var module = $.extend({
        gone: [],
        months: 3
    }, window.InactiveUsers);
    var preloads = 3;

    function isoDateNDaysAgo(days) {
        return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
    }

    function init(i18n) {
        var $container = $('#userProfileApp .user-identity-header__attributes');

        var user = mw.config.get('profileUserName');

        new mw.Api().get({
            action: 'query',
            list: 'usercontribs|users',
            uclimit: 1,
            ucprop: 'title|timestamp',
            ucuser: user,
            ucstart: isoDateNDaysAgo(0),
            ucend: isoDateNDaysAgo(30 * Math.max(Number(module.months) || 1, 1)),
            ususers: user,
            usprop: 'gender',
            formatversion: 2
        }).done(function(data) {
            if (
                !data.batchcomplete ||

                // The user doesn't exist
                data.query.users[0].missing ||

                // The user has contributed
                data.query.usercontribs.length ||

                // or is marked as gone
                module.gone.indexOf(user) !== -1
            ) {
                return;
            }

            var gender = data.query.users[0].gender || 'unknown';
            var text = typeof module.text === 'string' ?
                module.text :
                typeof module.text === 'object' ?
                    typeof module.text[gender] === 'string' ?
                        module.text[gender] :
                        module.text.unknown :
                    i18n.msg('inactive-' + gender).plain();
            $container.append(
                $('<span>', {
                    'class': 'tag user-identity-header__tag inactive-user',
                    'text': text
                })
            );
        });
    }

    function preload() {
        if (--preloads > 0) {
            return;
        }
        window.dev.i18n.loadMessages('InactiveUsers').done(init);
    }

    var checkExist = setInterval(function () {
        if ($('#userProfileApp').length) {
            clearInterval(checkExist);
            preload();
        }
    }, 500);
    mw.loader.using('mediawiki.api').then(preload);
    mw.hook('dev.i18n').add(preload);

    importArticle({
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
}(window.jQuery, window.mediaWiki));