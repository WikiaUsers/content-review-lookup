(function(mw, $, mainRoom, config){
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    function IsTyping(){
        this.doScroll = config.doScroll || false;
        this.mainRoomDisabled = config.mainRoomDisabled || false;
        this.privateRoomDisabled = config.privateRoomDisabled || false;
        this.filterSelf = config.filterSelf || true;
        this.$indicator = config.$indicator || false;
        this.ignore = config.ignore || [];
        this.statusTTL = 8000;
        this.ownStatusThrottle = 6000;
        this.scrollBy = 20;
        this.data = {};
        this.messages = {
            avatar: '<img class="wds-avatar" src="{{avatarSrc}}" />',
            avatars: [],
            avatarStack: '<div class="wds-avatar-stack">{{avatars}}</div>',
            pl: ['is', 'are'],
            typing: '{{avatarStack}} {{users}} {{pl}} {{typingMsg}}',
            typingMsg: 'typing...',
            user: '<span class="username">{{username}}</span>',
            users: []
        };
        this.fns = {
            pl: function(strings, count){
                if (!isNaN(count)){
                    count = Number(count);
                    if (Math.ceil(count) === 1){
                        return strings[0];
                    } else {
                        return strings[1];
                    }
                }
                return '';
            },
            avatars: function(src){
                return this.parseTemplate('avatar', { avatarSrc: src });
            }
        };
    }
    
    IsTyping.prototype.setMessage = function(name, value){
        this.messages[name] = value;
    };
    
    IsTyping.prototype.parseTemplate = function parse(template, options){
        var templates = $.extend(this.messages, options),
            fns = $.extend(this.fns, {}),
            value = this.messages[template],
            pattern = /\{\{([a-z][\w\-]*)\}\}/gi,
            count = templates.count;
        delete templates.count;
        if (Array.isArray(value)){
            if (typeof this.fns[template] === 'function'){
                switch {
                    case 'pl':
                    case 'plural':
                        return $.proxy(this.fns[template], this, value, value.length)();
                    case 'users':
                    case 'usernames':
                        var string = '', users = [];
                        if (value > 3){
                            users = value.slice(0, 3);
                            string = users.join(', ') + 'and more';
                        } else if (value === 3){
                            users = value;
                            string = users.slice(0, 2).join(', ') + 'and ' + users.slice(2);
                        } else if (value === 2){
                            users = value;
                            string = users.join(' and ');
                        } else {
                            users = value;
                            string = users[0];
                        }
                        return string;
                    default:
                        return value.map($.proxy(this.fns[template], this));
                }
            }
        } else if (typeof value === 'string' && pattern.test(value)){
            value = value.replace(pattern, $.proxy(function(match, $1){
                return parse($1, {});
            }, this));
            return value;
        } else {
            return value;
        }
    };
    
    IsTyping.prototype.parseMessages = function(msg, options){
        var pattern = /\{\{([a-z][\w\-]*)\}\}/gi,
            messages = $.extend(this.messages, options, {});
        msg = msg.replace(pattern, $.proxy(function(match, $1){
            if ($1 === 'pl') return this.parseTemplate($1, {});
            else if (this.messages.hasOwnProperty($1)) return this.parseTemplate($1, {});
            else return match;
        }, this));
        return msg;
    };
    
    IsTyping.prototype.setImmediate = function(callback){
        setTimeout($.proxy(callback, this), 0);
    };
    
    IsTyping.prototype.getCurrentRoom = function(){
        if (mainRoom.activeRoom === 'main' || mainRoom.activeRoom === null)
            return mainRoom;
        return mainRoom.chats.privates[mainRoom.activeRoom];
    };
    
    IsTyping.prototype.getRoomState = function(room){
        if (typeof room !== 'undefined'){
            return this.data[room.roomId];
        } else return null;
    };
    
    IsTyping.prototype.getUserData = function(username){
        if (typeof username === 'string'){
            return mainRoom.model.users.findByName(username).attributes;
        } else {
            return mainRoom.model.users.map(function(model){
                return model.attributes;
            }).sort(function(a, b){
                return a.name.localeCompare(b.name);
            });
        }
    };
    
    IsTyping.prototype.getAvatarSrc = function(username){
        var userData = this.getUserData(username);
        return userData.avatarSrc;
    };
    
    IsTyping.prototype.sendTypingState = function(status, room){
        if (typeof room === 'undefined') room = this.getCurrentRoom();
        var state = this.getRoomState(room), isMain = room.isMain();
        if (
            (state.typing.indexOf(mw.config.get('wgUserName')) === -1 && status === false) ||
            (isMain && this.mainRoomDisabled) ||
            (!isMain && this.privateRoomDisabled)
        ) return;
        state.last = status ? Date.now() : 0;
        room.socket.send(new models.SetStatusCommand({
            statusMessage: 'typingState',
            statusState: status
        }).xport());
    };
    
    IsTyping.prototype.startTyping = function(name, state, room){
        if (state.typing.indexOf(name) === -1) state.typing.push(name);
        if (state.timeouts[name]) clearTimeout(state.timeouts[name]);
        state.timeouts[name] = setTimeout(
            $.proxy(this.stopTyping, this, name, state, room),
            this.statusTTL
        );
    };
    
    IsTyping.prototype.stopTyping = function(name, state, room){
        var index = state.typing.indexOf(name);
        if (index !== -1) state.typing.splice(index, 1);
        if (state.timeouts[name]){
            clearTimeout(state.timeouts[name]);
            delete state.timeouts[name];
        }
        
        if (this.getCurrentRoom() == room){
            this.updateTypingIndicator(this.filterNames(state.typing));
        }
    };
    
    IsTyping.prototype.filterNames = function(users){
        return users.filter($.proxy(function(user){
            return (
                (user !== mw.config.get('wgUserName') || !this.filterSelf) &&
                (this.ignore.indexOf(user) === -1)
            );
        }, this));
    };
    
    IsTyping.prototype.updateTyping = function(room, name, status){
        var state = this.getRoomState(room);
        if (status) this.startTyping(name, state, room);
        else this.stopTyping(name, state);
        
        if (this.getCurrentRoom() === room){
            if (
                (room.isMain() && this.mainRoomDisabled) ||
                (!room.isMain() && this.privateRoomDisabled)
            ){
                this.updateTypingIndicator([]);
            } else {
                this.updateTypingIndicator(this.filterNames(state.typing));
            }
        }
    };
    
    IsTyping.prototype.updateTypingIndicator = function(names){
        var room = this.getCurrentRoom(),
            state = this.getRoomState(room),
            usernames = names || this.filterNames(state.typing),
            $chatWindow = $(document.body),
            div = this.doScroll ? room.viewDiscussion.chatDiv.get(0) : null,
            hasClass = $chatWindow.hasClass('is-typing');
        if (!names.length){
            $chatWindow.removeClass('is-typing');
            IsTyping.$indicator.html('');
            if (
                this.doScroll && hasClass &&
                div.scrollTop + div.clientHeight != div.scrollHeight
            ){
                div.scrollHeight;
                div.scrollTop -= this.scrollBy
            }
            return;
        }
        
        var avatars = names.map($.proxy(function(name){
                return this.getAvatarSrc(name);
            }, this));
        this.setMessage('users', names);
        this.setMessage('avatars', avatars);
        var message = this.parseMessage(this.typing);
        $body.addClass('is-typing');
        this.$indicator.html(message);
        if (this.doScroll && !hasClass){
            div.scrollHeight;
            div.scrollTop += this.scrollBy;
        }
    };
    
    IsTyping.prototype.socketHandler = function(room, message){
        var data = JSON.parse(message.data).attrs,
            status = data.statusState,
            name = data.name;
        if (data.statusMessage === 'typingState') this.updateTyping(room, name, status);
    };
    
    IsTyping.prototype.initChat = function(room){
        this.data[room.roomId] = {
            timeouts: {},
            typing: [],
            last: 0
        };
        room.socket.on('updateUser', $.proxy(this.socketHandler, this, room));
    };
    
    IsTyping.prototype.onPrivateRoom = function(user){
        var roomId = user.attributes.roomId,
            room = mainRoom.chats.privates[roomId];
        this.initChat(room);
    };
    
    IsTyping.prototype.onKeyDown = function(event){
        var textarea = event.target,
            value = textarea.value,
            room = this.getCurrentRoom(),
            state = this.getRoomState(room);
        this.setImmediate(function(){
            if (value == textarea.value) return;
            if (!textarea.value) this.sendTypingState(false);
            else if (Date.now() - state.last > this.ownStatusThrottle) this.sendTypingState(true);
        });
    };
    
    IsTyping.prototype.onBlur = function(){
        this.sendTypingState(false);
    };
    
    IsTyping.prototype.onPrivateClick = function(){
        if (mainRoom.activeRoom === 'main' || !mainRoom.activeRoom){
            this.sendTypingState(false, mainRoom);
        }
    };
    
    IsTyping.prototype.main = function(){
        this.$indicator = this.$indicator || (new ChatAlert()).tojQuery().appendTo('.ChatWindow');
        this.initChat(mainRoom);
        mainRoom.model.privateUsers.bind('add', $.proxy(this.onPrivateRoom, this));
        mainRoom.viewDiscussion.getTextInput()
                .on('keydown', $.proxy(this.onKeyDown, this))
                .on('blur', $.proxy(this.onBlur, this));
        mainRoom.viewUsers._callbacks.privateListClick.unshift($.proxy(this.onPrivateClick, this));
        mainRoom.viewUsers.bind('privateListClick', $.proxy(this.updateTypingIndicator, this, null));
        $('#Rail .wordmark').click($.proxy(this.setImmediate, this, this.updateTypingIndicator));
    };
    
    $(importArticle({
        type: 'style',
        article: 'u:carnage-test:MediaWiki:IsTyping/code.css'
    })).load(function(){
        var isTyping = new IsTyping();
        isTyping.main();
    });
}(mediaWiki, jQuery, mainRoom, $.extend(window.isTyping, {})));