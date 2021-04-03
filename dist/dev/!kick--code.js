/**
 * !kick.js
 *
 * Allows use of !kick command in Special:Chat
 * @author: [[w:User:.jun]]
 */
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserGroups'
    ]), i18n, hierarchy = window.KickHierarchy || [
        'staff',
        'wiki-manager',
        'sysop',
        'helper',
        'soap',
        'threadmoderator',
        'chatmoderator'
    ];
    if (
        config.wgCanonicalSpecialPageName !== 'Chat' ||
        !/staff|helper|sysop|wiki-manager|threadmoderator|chatmoderator|soap/.test(config.wgUserGroups.join())
    ) {
        return;
    }
    function inlineAlert(msg) {
        var $entry = $('<li>', {
            'class': 'inline-alert',
            text: msg
        });
        if ($('.Chat li').last().hasClass('inline-alert')) {
            $entry.addClass('continued');
        }
        $('.Chat ul').append($entry);
    }
    function getHighestGroup(user) {
        var min = 99;
        user.get('groups').forEach(function(group) {
            var index = hierarchy.indexOf(group);
            if (index !== -1 && min > index) {
                min = index;
            }
        });
        return min;
    }
    function keydown(e) {
        if (e.which !== 13 || $(this).val().substr(0, 5) !== '!kick') {
            return;
        }
        e.preventDefault();
        var username = $(this).val().substr(6),
            user = mainRoom.model.users.findByName(username),
            last = $('.Chat li').last().attr('data-user');
        if (!user) {
            inlineAlert(
                window.absentMessage ?
                    window.absentMessage.replace('<user>', username) :
                    i18n.msg('absent', username).plain()
            );
            return;
        }
        if (
            getHighestGroup(mainRoom.userMain) > getHighestGroup(user) &&
            window.NoKickHigherUps
        ) {
            inlineAlert(i18n.msg('higher', username).plain());
            return;
        }
        mainRoom.kick({
            name: username
        });
        $(this).val('');
    }
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('!kick').done(function (i18nd) {
            i18n = i18nd;
            $('[name="message"]').keydown(keydown);
        });
    });
    importArticle({
        type: 'script',
        article: 'u:dev:I18n-js/code.js'
    });
})();