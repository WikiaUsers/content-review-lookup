(function load($, mw, mainRoom, config){
    if (!mainRoom.isInitialized){
        load($, mw, mainRoom, config);
    } else {
        var statsMenu = Object.create(null);
        statsMenu.createMenu = function(userObj){
            var attrs = userObj.attrs, name = attrs.name, status = attrs.statusState,
                editCount = attrs.editCount, avatar = attrs.avatarSrc, groups = attrs.groups, selfGroups = mw.config.get('wgUserGroups'),
                isModerator = ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop', 'discussions-moderator', 'chatmoderator'].some(function(group){
                    return selfGroups.indexOf(group) > -1;
                }),
                userIsModerator = ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop', 'discussions-moderator', 'chatmoderator'].some(function(group){
                    return groups.indexOf(group) > -1;
                });
            
        };
        statsMenu.openMenu = function(cid){
            var obj = mainRoom.model.chats._byCid[cid];
            if (typeof obj === 'undefined') return;
            var username = obj.attributes.name,
                userObj = mainRoom.model.chats.findByName(username);
            this.createMenu(userObj);
        };
        $('.Chat li').each(function(){
            var $msg = $(this), $target = null;
            $msg.on('contextmenu', function(event){
                if (event.ctrlKey || $(event.target).is('.inline-alert')){
                    event.preventDefault();
                    event.stopPropagation();
                    $target = $(event.delegateTarget || event.target);
                    var cid = $target.attr('id').replace('entry-', '');
                    statsMenu.openMenu(cid);
                }
            });
        });
        
        mainRoom.model.chats.bind('afteradd', function(child){
            var cid = child.cid;
            statsMenu.openMenu(cid);
        });
    }
}(jQuery, mediaWiki, mainRoom, $.extend({}, window.ChatMenuConfig)));