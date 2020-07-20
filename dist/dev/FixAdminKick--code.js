/*
* FixAdminKick
* Allows admins to kick other admins in chat
* @author Ozank Cx
* Thanks to Dorumin for contributing
*/
function adminkick(i18n) {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgUserGroups',
        'wgUserName'
    ]);
    if (config.wgCanonicalSpecialPageName !== 'Chat') {
        return;
    }
    var alias = mainRoom.onKickOrBan;
    mainRoom.onKickOrBan = function(kickEvent, mode) {
        var oldUsers = $.extend(true, {}, mainRoom.model.users);
        alias.call(mainRoom, kickEvent, mode);
        console.log(oldUsers);
        if(mode === 'unbanned') {
            var user = oldUsers.findByName(kickEvent.get('kickedUserName'));
            if(user.get('canPromoteModerator')) {
                $('.Chat .inline-alert:last').text(
                    mw.message(
                        'chat-user-was-kicked',
                        kickEvent.get('kickedUserName'),
                        kickEvent.get('moderatorName')
                    ).escaped()
                );
            }
        }
    };
    
    // Exit if you're not an admin
    if (config.wgUserGroups.indexOf('sysop') === -1) {
        return;
    }
    
    // Add CSS
    mw.util.addCSS('.UserStatsMenu .actions ul li.admin-kick .icon {background-position: -428px 0px;}');
    
    // Attach the admin kick over the existing one
    mainRoom.viewUsers.bind('mainListClick', function(e) {
        var user = mainRoom.model.users.findByName(e.name);
        if (user && !user.get('canPromoteModerator')) {
            return;
        }
        if ($('.admin-actions').children().length == 2) {
            $('.admin-actions .kick').removeClass('kick').addClass('admin-kick').click(function() {
                $('.UserStatsMenu').css('display', 'none');
                mainRoom.socket.socket.send(new models.BanCommand({
                    userToBan: e.name,
                    reason: i18n.msg('reason').plain()
                }).xport());
            });
        }
    });
}

mw.hook('dev.i18n').add(function(lib) {
    lib.loadMessages('FixAdminKick').then(adminkick);
});

importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
});