/*
 * Name:         GiveChatMod
 * Description:  Allows you to promote or demote user directly in chat
 * Author:       Rendann
 * Support:      Kopcap94
 * Scripts used:
 * https://dev.wikia.com/wiki/MediaWiki:ChatBlockButton/code.2.js
 * https://dev.wikia.com/wiki/MediaWiki:MassCategorization/code.js
 */
 
(function( $, mw ) {
    var c = mw.config.get([
            'wgUserName',
            'wgUserGroups',
            'wgCanonicalSpecialPageName'
        ]);

    if (
        c.wgCanonicalSpecialPageName !== 'Chat' ||
        c.wgUserGroups.indexOf('sysop') === -1 ||
        window.GiveChatModLoaded
    ) {
        return;
    }
    window.GiveChatModLoaded = true;

    var i18n, api, call;

    function init(i18np) {
        if(typeof window.mainRoom === 'undefined') {
            // A fatal error somehow happened
            return;
        }
        i18n = i18np;
        i18n.useUserLang();
        api = new mw.Api();
        var alias = mainRoom.viewUsers.showMenu;
        mainRoom.viewUsers.showMenu = function(element, actions) {
            alias.call(this, element, actions);
            show();
        };
    }

    function show() {
        var $menu = $('#UserStatsMenu'),
            $kick = $menu.find('.kick');
        if(!$kick.exists()) {
            return;
        }
        var $button = $kick
                .clone()
                .addClass('give-chat-moderator')
                .removeClass('kick')
                .prependTo($menu.find('.admin-actions'));
        call = !mainRoom.model.users
            .findByName($menu.find('.username').text())
            .get('isModerator');
        $button.find('.label').text(msg(call ? 'buttonPromote' : 'buttonDemote'));
        $button.find('svg')[0].setAttribute('viewBox', '0 0 24 24');
        $button.find('path').attr('d', call ?
            'M11 13v9a1 1 0 1 0 2 0v-9h9a1 1 0 1 0 0-2h-9V2a1 1 0 1 0-2 0v9H2a1 1 0 1 0 0 2h9z' :
            'M4.414 15H16a5 5 0 1 0 0-10H2a1 1 0 0 1 0-2h14a7 7 0 1 1 0 14H4.414l3.293 3.293a1 1 0 0 1-1.414 1.414l-5-5a.997.997 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 1.414L4.414 15z'
        );
        $button.click(click);
    }

    function click() {
        if(confirm(msg('prompt'))) {
            changeRights(
                $('#UserStatsMenu .info ul .username').text(),
                call
            );
        }
    }

    function changeRights(t, s) {
        api.get({
            action: 'query',
            list: 'users',
            ususers: t,
            ustoken: 'userrights',
        }, function(d) {
            var mess = msg(s ? 'logPromote' : 'logDemote', c.wgUserName, t),
            opts = {
                action: 'userrights',
                user: t,
                token: d.query.users[0].userrightstoken,
                reason: mess
            };
            opts[s ? 'add' : 'remove'] = 'chatmoderator';
            api.post(opts, function(res) {
                mainRoom.model.chats.add(new models.InlineAlert({ text: mess }));
                $('[name="message"]')
                    .val('')
                    .removeAttr('disabled')
                    .focus();
            });
        });
    }

    function msg(type, param1, param2) {
        return i18n.msg(type, param1, param2).plain();
    }

    importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });

    $(function() {
        mw.loader.using('mediawiki.api').then(function() {
            mw.hook('dev.i18n').add(function(i18no) {
                i18no.loadMessages('GiveChatMod').then(init);
            });
        });
    });
})(jQuery, mediaWiki);