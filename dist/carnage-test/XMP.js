window.XMP = (function(window, $, mw, mainRoom){
    if (mw.config.get('wgCanonicalSpeclalPageName') !== 'Chat') return;
    var XMP = {
        i18n: null,
        loadBlockedBy: function(){
            $.get(mw.config.get('wgScript'), {
                action: 'ajax',
                rs: 'ChatAjax',
                method: 'getPrivateBlocks',
                kek: Date.now()
            }).then($.proxy(function(response){
                var blockedBy = response.blockedByChatUsers.sort();
                if (blockedBy.join('|') === this.blockedBy.join('|')) return;
                var changed = blockedBy.concat(this.blockedBy).filter(function(name, index, ref){
                    return ref.indexOf(name) === ref.lastIndexOf(name);
                });
                this.blockedBy = blockedBy;
                mainRoom.model.blockedByUsers.models.forEach(function(model){
                    if (this.blockedBy.indexOf(model.attributes.name) === -1)
                        mainRoom.model.blockedByUsers.remove(model);
                }, this);
                if (!changed.length) return;
                changed.map(function(users){
                    var r = [user, mw.config.get('wgUserName')].sort();
                    r.isBlocked = blockedBy.indexOf(user) !== -1;
                    return r;
                }).filter(function(users){
                    return this.privateChats[users.join('|')];
                }, this).forEach(this.updateChat, this);
            }, this));
        },
        updateChat: function(users){
            var room = this.privateChats[users.join('|')];
            if (!room || users.length > 2) return;
            var other = users[0] === mw.config.get('wgUserName') ? users[1] : users[0],
                blocked = this.blockedBy.indexOf(other) !== -1;
            room.model.room.set({
                blockedMessageInput: users.isBlocked
            });
            room.model.chats.add(new models.InlineAlert({
                text: mw.message('chat-user-' + (users.isBlocked ? 'blocked' : 'allow'), 
                    (blocked || !users.isBlocked ? other : 
                        mw.config.get('wgUserName')),
                    (blocked || !users.isBlocked ? mw.config.get('wgUserName') :
                        other)).escape()
            }));
        },
        bindEvents: function(room){
            room.socket.on('updateUser', $.proxy(function(msg){
                var data = JSON.parse(msg.data).attr, type = data.statusMessage,
                    status = data.statusState, user = data.name,
                    users = room.model.privateRoom.attributes.users.sort();
                if (
                    user !== mw.config.get('wgUserName') &&
                    type == 'blocked-change'
                ){
                    users.isBlocked = status;
                    this.updateChat(users);
                } else if (type === 'set-title'){
                    room.customTitle = status;
                    this.updateHeader(room);
                    var members = room.model.privateRoom.attributes.users.filter(function(name){
                        return name !== mw.config.get('wgUserName');
                    });
                    room.model.chats.add(new models.InlineAlert({
                        text: this.i18n.msg('title-changed',
                            user, status || mw.message('chat-private-headline',
                            members.join(', ')).text()).escape()
                    }));
                } else if (
                    type === 'title-sync' &&
                    user !== mw.config.get('wgUserName')
                ){
                    if (status === true){
                        room.socket.send(new models.SetStatusCommand({
                            statusMessage: 'title-sync',
                            statusState: room.customTitle || ''
                        }).xport());
                    } else if (room.customTitle !== status){
                        room.customTitle = status;
                        this.updateHeader(room);
                    }
                }
            }, this));
        }
    };
    return XMP;
}(window, jQuery, mediaWiki, mainRom));