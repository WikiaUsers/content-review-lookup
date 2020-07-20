(function(mw, $, mainRoom){
    function MessageUser(){
        this.roomId = mainRoom.roomId;
        this.isContinued = false;
        this.isInlineAlert = false;
        this.globalRights = ['staff', 'helper', 'vstf', 'councilor', 'vanguard', 'global-discussions-moderator'];
        this.localRights = ['bureaucrat', 'sysop', 'content-moderator', 'discussions-moderator', 'chatmoderator', 'rollback', 'codeeditor', 'bot'];
        this.allUsers = this.getUsers();
    }
    
    MessageUser.prototype.main = function($msg){
        if ($msg.hasClass('inline-alert')) this.isInlineAlert = true;
        if ($msg.hasClass('continued')) this.isContinued = true;
        if (this.isInlineAlert) return;
        this.username = $msg.find('.username').text();
        this.userData = this.findUserData(this.username);
        this.mainGroup = this.findMainGroup();
        this.message = $msg;
        this.process();
    };
    
    MessageUser.prototype.process = function(){
        if (!this.message.hasClass(this.mainGroup)){
            this.message.addClass(this.mainGroup);
        }
    };
    
    MessageUser.prototype.findUserData = function(username){
        var index = 0, userData = this.allUsers, target = null;
        for (index; index < userData.length; index++){
            var item = userData[index];
            if (item.name === username){
                target = item;
                break;
            }
        }
        return target;
    };
    
    MessageUser.prototype.findMainGroup = function(){
        var groups = this.userData.groups,
            globalGroups = groups.filter($.proxy(function(group){
                return this.globalRights.indexOf(group) > -1;
            }, this)).sort($.proxy(function(a, b){
                var _groups = this.globalRights;
                if (_groups.indexOf(a) > _groups.indexOf(b)) return 1;
                else if (_groups.indexOf(a) < _groups.indexOf(b)) return -1;
                return 0;
            }, this)),
            mainGroup = '';
        if (globalGroups.length){
            mainGroup = globalGroups[0];
        } else {
            var localGroups = groups.filter($.proxy(function(group){
                return this.localRights.indexOf(group) > -1;
            }, this)).sort($.proxy(function(a, b){
                var _groups = this.globalRights;
                if (_groups.indexOf(a) > _groups.indexOf(b)) return 1;
                else if (_groups.indexOf(a) < _groups.indexOf(b)) return -1;
                return 0;
            }, this));
            if (localGroups.length){
                mainGroup = localGroups[0];
            }
        }
    };
    
    MessageUser.prototype.getUsers = function(){
        return mainRoom.model.users.map(function(child){
            return child.attributes;
        }).sort(function(a, b){
            return a.name.localeCompare(b.name);
        });
    };
    
    MessageUser.prototype.updateUsers = function(){
        this.allUsers = this.getUsers();
    };
    
    mainRoom.socket.bind('chat:add', function(){
        var messageUser = new MessageUser();
        $('#WikiaPage #Chat_' + mainRoom.roomId + ' ul > li').each(function(){
            messageUser.main($(this));
        });
    });
}(mediaWiki, jQuery, mainRoom));