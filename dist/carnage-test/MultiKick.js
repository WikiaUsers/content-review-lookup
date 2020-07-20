(function($, mw, mainRoom, window){
    var MultiKick = {};
    MultiKick.modal = function(){};
    MultiKick.data = [];
    MultiKick.createUI = function(){
        var users = mainRoom.model.users.map(function(user){
            var name = user.attributes.name,
                avatar = user.attributes.avatarSrc,
                isMod = user.attributes.isModerator || user.attributes.isStaff;
            return {
                username: name,
                avatar: avatar,
                isMod: isMod
            };
        });
        
        return $('<aside />', {
            'class': 'MultiKickMenu multi-kick-menu mkm',
            'id': 'MultiKickMenu',
            html: [
                $('<header />', {
                    'class': 'MultiKickHeader multi-kick-header',
                    html: $('<h2 />', {
                        'class': 'MultiKickHeading multi-kick-heading',
                        text: 'Multi Kick',
                        on: {
                            'click': function(event){
                                event.preventDefault();
                                var $mkm = $('#MultiKickMenu');
                                if ($mkm.hasClass('active')){
                                    $mkm.removeClass('active');
                                } else {
                                    $mkm.addClass('active');
                                }
                            }
                        }
                    })
                }),
                $('<section />', {
                    'class': 'MultiKickContent multi-kick-content',
                    html: function(){
                        var count = users.length, max = 2,
                            $ul = $('<ul />', {
                                'class': 'MultiKickList multi-kick-list'
                            }),
                            html = '';
                            isOdd = count % 2 !== 0,
                            last = count - 1;
                        for (var i = 0; i < count; i++){
                            var user = users[i];
                            if (i === 0){
                                html += '<li class="MultiKickGroup multi-kick-group">';
                                html += MultiKick.createUserItem(user, i, false);
                            } else {
                                if (isOdd && i === last){
                                    html += '<li class="MultiKickGroup multi-kick-group">';
                                    html += MultiKick.createUserItem(user, i, true);
                                    html += '</li>';
                                } else if (i % max === 0){
                                    html += '</li>';
                                    html += '<li class="MultiKickGroup multi-kick-group">';
                                    html += MultiKick.createUserItem(user, i, false);
                                } else {
                                    html += MultiKick.createUserItem(user, i, false);
                                }
                            }
                        }
                        $ul.html(html);
                        return $ul;
                    }
                })
            ]
        });
    };
    MultiKick.createUserItem = function(user, i, isLast){
        return '<div class="MultiKickItem multi-kick-item' + (user.isMod ? ' mkm-mod' : '') + (isLast ? ' mkm-full' : '') + '" data-user="' + user.username + '" data-isMod="' + Number(user.isMod) + '" data-avatar="' + user.avatar + '">' +
                    '<input type="checkbox" id="multi-kick-item-' + i + '" />' +
                    '<label for="multi-kick-item-' + i + '" class="MultiKickUser multi-kick-user">' +
                        '<img class="multi-kick-avatar" src="' + user.avatar + '" />' +
                        '<span class="multi-kick-username username">' + user.username + '</span>' +
                    '</label>' +
                '</div>';
    };
    
    window.MultiKick = MultiKick;
}(jQuery, mediaWiki, mainRoom, window));