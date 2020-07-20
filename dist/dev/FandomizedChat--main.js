(function($, mw, mainRoom, FandomizedChat){
    /**
     * Creating the main object
     **/
    function Main(room){
        this.plugins = ['fc.ui', 'fc.lib', 'dev.highlight'];
        this.roomId = room.roomId;
        this.fc = FandomizedChat;
        this.self = mw.config.get('wgUserName');
        this.groups = mw.config.get('wgUserGroups');
        this.loaded = false;
        this.init(this.setup);
    }
    
    Main.prototype.init = function(callback){
        this.fc._addHooks(this.plugins)
            .done($.proxy(callback, this));
    };
    
    Main.prototype.setup = function(ui, lib, hljs){
        this.ui = ui;
        this.lib = lib;
        this.highlight = hljs;
        this.loaded = true;
    };
    
    Main.prototype.base = {};
    
    function GetUserRight(options){
        this.user = options.user;
        this.right = options.right;
        this.action = options.action;
        this.reason = options.reason;
        this.fc = FandomizedChat;
    }
    
    GetUserRight.prototype.message = function(res){
        var tuple = [], userrights = result.userrights,
            ur_user = userrights.user,
            removed = userrights.removed[0],
            added = userrights.added[0], name, user;
        if (this.action === 'remove'){
            if (removed === this.right){
                name = 'userrights_removed_' + this.right;
                user = this.user;
            } else {
                name = 'userrights_not_' + this.right;
                user = ur_user;
            }
        } else if (added === this.right){
            name = 'userrights_added_' + this.right;
            user = this.user;
        } else {
            name = 'userrights_is_' + this.right;
            user = ur_user;
        }
        return [name, user];
    };
    
    GetUserRight.prototype.getToken = function(user, callback){
        var Api = new mw.Api();
        Api.get({
            'action': 'query',
            'list': 'users',
            'ustoken': 'userrights',
            'ususers': user,
            'format': 'json'
        }).then($.proxy(callback, this, user));
    };
    
    GetUserRight.prototype.setRight = function(user, token){
        var Api = new mw.Api(),
            us_token = token.query.users[0].userrightstoken,
            params = {
                'format': 'json',
                'action': 'userrights',
                'user': user,
                'token': us_token
            };
        params[this.action] = this.right;
        if (this.reason) params.reason = this.reason;
        Api.post(params).then($.proxy(this.sendMessage, this));
    };
    
    GetUserRight.prototype.sendMessage = function(res){
        this.inlineAlert(this.fc.i18n.msg.apply(
            this.fc.i18n, this.message(res)
        ).escape());
    };
    
    GetUserRight.prototype.inlineAlert = function(message){
        this.fc.inlineAlert(message);
    };
    
    Main.prototype.base.getUserRight = function(options){
        return new GetUserRight(options);
    };
    
    function MultiKick(options){
        this.users = ArrayMap.sort(options.users, function(a, b){
            return a.localeCompare(b);
        });
        this.length = this.users.length;
        this.index = 0;
        this.fc = FandomizedChat;
        this.self = this.fc.self;
        this.isMod = this.fc.isMember(this.self, 'mod');
        this.isAdmin = this.fc.isMember(this.self, 'admin');
    }
    
    MultiKick.prototype.kick = function(user){
        var isMod = this.fc.isMember(user, 'mod'),
            hasUserData = this.fc.hasUserData(user);
        if (!this.isMod) return;
        if (hasUserData && !(isMod && this.isAdmin)){
            var params = { name: user };
            mainRoom.kick(params);
        }
    };
    
    MultiKick.prototype.init = function(){
        if (this.length === 0) return;
        while ((user = this.users[this.index])){
            this.kick(user);
            this.index++;
        }
    };
    
    Main.prototype.base.multiKick = function(options){
        return new MultiKick(options);
    };
    
    function MultiBan(options){
        this.users = ArrayMap.sort(options.users, function(a, b){
            return a.name.localeCompare(b.name);
        });
        this.length = this.users.length;
        this.index = 0;
        this.fc = FandomizedChat;
        this.self = this.fc.self;
        this.isMod = this.fc.isMember(this.self, 'mod');
        this.isAdmin = this.fc.isMember(this.self, 'admin');
    }
    
    MultiBan.prototype.ban = function(user){
        var username = user.name, expiry = user.expiry,
            reason = user.reason,
            isMod = this.fc.isMember(username, 'mod'),
            hasUserData = this.fc.hasUserData(user);
        if (!this.isMod) return;
        if (hasUserData(username) && !(isMod && this.isAdmin)){
            var banCommand = new models.BanCommand({
                userToBan: username,
                time: expiry,
                reason: reason
            });
            mainRoom.socket.send(banCommand.xport());
        }
    };
    
    MultiBan.prototype.init = function(){
        if (this.length === 0) return;
        while ((user = this.users[this.index])){
            this.ban(user);
            this.index++;
        }
    };
    
    Main.prototype.base.multiBan = function(options){
        return new MultiBan(options);
    };
    
    function Block(options){
        this.fc = FandomizedChat;
        this.self = this.fc.self;
        this.isAdmin = this.fc.isMember(this.self, 'admin');
        this.param = {};
        this.param.action = 'block';
        this.param.autoblock = 0;
        this.param.format = 'json';
        this.param.token = mw.user.tokens.get('editToken');
        this.param.user = options.user;
        this.param.expiry = options.expiry;
        this.param.reason = options.reason;
        this.param.nocreate = options.nocreate || '';
        this.param.allowusertalk = options.allowusertalk || '';
        if (this.param.nocreate === false) delete this.param.nocreate;
        if (this.param.allowusertalk === false) delete this.param.allowusertalk;
    }
    
    Block.prototype.init = function(){
        var Api = new mw.Api();
        Api.post(this.param).done($.proxy(function(data){
            if (!data.error){
                this.inlineAlert(
                    this.param.username + ' ' 
                    + this.fc.i18n.msg('block_success').plain()
                );
                mainRoom.kick({ name: this.param.username });
            } else {
                this.inlineAlert(
                    this.fc.i18n.msg('block_error').plain() + ' '
                    + data.error.code
                );
            }
        }, this)).fail($.proxy(function(){
            this.inlineAlert(
                this.fc.i18n.msg('block_error_other').plain()
            );
        }, this));
    };
    
    Block.prototype.inlineAlert = function(message){
        this.fc.inlineAlert(message);
    };
    
    Main.prototype.base.block = function(options){
        return new Block(options);
    };
    
    function MultiBlock(options){
        this.users = ArrayMap.sort(options.users, function(a, b){
            return a.username.localeCompare(b.username);
        });
        this.length = this.users.length;
        this.index = 0;
    }
    
    MultiBlock.prototype.init = function(){
        if (this.length === 0) return;
        while ((user = this.users[this.index])){
            var block = new Block(user);
            block.init();
            this.index++;
        }
    };
    
    Main.prototype.base.multiBlock = function(options){
        return new MultiBlock(options);
    };
    
    function AFK(options){
        this.away = true;
        this.active = true;
        this.timer = 0;
        this.fc = FandomizedChat;
        this.room = mainRoom;
        this.delay = options.delay || 10000;
        this.event = options.event || window.event;
        this.awayEvents = [];
        this.backEvents = [];
        this.interval = null;
    }
    
    AFK.prototype.setBack = function(){
        if (!this.away) return;
        this.away = false;
        this.inlineAlert(
            this.fc.i18n.msg('toggle_status_is_here').escape()
        );
        var statusCommand = new models.SetStatusCommand({
            statusState: window.STATUS_STATE_PRESENT,
            statusMessage: ''
        });
        this.room.socket.send(statusCommand.xport());
    };
    
    AFK.prototype.setAway = function(){
        this.away = true;
        this.inlineAlert(
            this.fc.i18n.msg('toggle_status_is_away').escape()
        );
        var statusCommand = new models.SetStatusCommand({
            statusState: window.STATUS_STATE_AWAY,
            statusMessage: ''
        });
        this.room.socket.send(statusCommand.xport());
    };
    
    AFK.prototype.toggleState = function(){
        if (this.active === false) return;
        if (this.away){
            this.setBack();
            this.triggerBack();
            this.activateTimer();
        } else {
            this.setAway();
            this.triggerAway();
            this.activateTimer();
        }
    };
    
    AFK.prototype.activateTimer = function(){
        if (this.timer <= this.delay){
            this.interval = setInterval($.proxy(function(){
                this.timer++;
            }, this), 1);
            this.active = false;
        } else {
            clearInterval(this.interval);
            this.active = true;
            this.interval = null;
        }
    };
    
    AFK.prototype.triggerAway = function(){
        if (this.awayEvents.length > 0){
            var index = 0;
            while ((awayEvent = this.awayEvents[index])){
                awayEvent.call(this, this.event);
                index++;
            }
        }
    };
    
    AFK.prototype.triggerBack = function(){
        if (this.backEvents.length > 0){
            var index = 0;
            while ((backEvent = this.backEvents[index])){
                backEvent.call(this, this.event);
                index++;
            }
        }
    };
    
    AFK.prototype.onBack = function(callback){
        this.backEvents[this.backEvents.length] = callback;
    };
    
    AFK.prototype.onAway = function(callback){
        this.awayEvents[this.awayEvents.length] = callback;
    };
    
    AFK.prototype.bind = function(name, callback){
        if (['present', 'here'].indexOf(name) > -1){
            this.onBack(callback);
        } else if (name === 'away'){
            this.onAway(callback);
        }
    };
    
    Main.prototype.base.afk = function(options){
        return new AFK(options);
    };
}(jQuery, mw, mainRoom, window.FandomizedChat));