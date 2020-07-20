(function($, mw, window, FandomizedChat){
    function Modifications(){ $.extend(this, FandomizedChat); }
    Modifications.prototype.badges = {
        'staff': 'staff',
        'helper': 'helper',
        'vstf': 'vstf',
        'global-discussions-moderator': 'global-discussions-moderator',
        'admin': ['bureaucrat', 'sysop', 'admin'],
        'discussions-moderator': ['discussions-moderator', 'chatmoderator'],
        'content-moderator': 'content-moderator'
    };
    Modifications.prototype.getBadge = function(user){
        var order = this.order.groups,
            badges = this.badges,
            sorted = this.sortBy(order, this.groups[user]);
        return this.base.getBadge(sorted, badges);
    };
    Modifications.prototype.ChatHeader = {};
    Modifications.prototype.ChatHeader.wrapper = $('<header />', {
        'class': 'WikiChatHeader chat-header',
        'id': 'chat-header'
    });
    Modifications.prototype.ChatHeader.createUserNav = function(){
        var userdata = this.getUserData(this.self),
            avatar = userdata.avatarSrc,
            name = userdata.name,
            isAway = userdata.statusState === window.STATUS_STATE_AWAY,
            $user = $('<div />').addClass('chat-user-box').html([
                $('<div />').addClass('wds-avatar').html(
                    $('<img />').addClass('wds-avatar__image')
                )
            ]),
            $list = $('<div />').addClass('chat-user-nav').html([
            ]);
    };
}(jQuery, mediaWiki, window, window.FandomizedChat));