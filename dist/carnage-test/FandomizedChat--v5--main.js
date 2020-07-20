(function($, mw, FandomizedChat){
    function FandomizedChatMain(room){
        if (typeof room.roomId === 'undefined') return;
        this._addHooks(['fc.ui', 'fc.lib', 'dev.highlight'])
            .done($.proxy(this._setup, this));
    }
    
    FandomizedChatMain.prototype._addHooks = FandomizedChat._addHooks;
 
    FandomizedChatMain.prototype._setup = function(ui, lib, hljs){
        this.ui = ui;
        this.lib = lib;
        this.highlight = hljs;
        this.users = this._getUsers();
        this.userData = this._getUserData();
        this.roomId = mainRoom.roomId;
        this.init();
    };
    
    FandomizedChatMain.prototype._parsers = $.extend(config.parsers, {
        bold: {
            pattern: /(?:\'{3})(.*)(?:\'{3})/gi,
            result: '<span class="bold">$1</span>' 
        },
        blockcode: {
            pattern: /(?:~{4}(?:(\w+|))\n)(.*)(?:\n~{4})/gim,
            result: '<pre class="code" data-ext="$1">$2</pre>'
        },
        code: {
            pattern: /(?:\~)(.*)(?:\~)/gi,
            result: '<code>$1</code>'
        },
        italic: {
            pattern: /(?:\'{2})(.*)(?:\'{2})/gi,
            result: '<span class="italic">$1</span>'
        },
        strikethrough: {
            pattern: /(?:\~\+)(.*)(?:\+\~)/gi,
            result: '<span class="strikethrough">$1</span>'
        },
        underline: {
            pattern: /(?:\-\-)(.*)(?:\-\-)/gi,
            result: '<span class="underline">$1</span>'
        }
    });
    
    FandomizedChatMain.prototype.afterSend = function(callback, inlineAlert){
        inlineAlert = typeof inlineAlert === 'boolean' ? inlineAlert : false;
        this.room.model.chats.bind('afteradd', $.proxy(function(c){
            if (typeof this.roomId === 'undefined' && (c.attributes.isInlineAlert && inlineAlert)) return;
            callback.call(this, c);
        }, this));
        this.room.model.privateUsers.bind('add', $.proxy(function(u){
            var roomId = u.attributes.roomId,
                room = this.room.chats.privates[roomId];
            room.model.chats.bind('afteradd', $.proxy(function(c){
                if (c.attributes.isInlineAlert && !inlineAlert) return;
                callback.call(this, c);
            }, this));
        }, this));
        Object.keys(this.room.chats.privates).forEach($.proxy(function(key){
            var room = this.room.chats.privates[key];
            room.model.chats.bind('afteradd', $.proxy(function(c){
                if (c.attributes.isInlineAlert && !inlineAlert) return;
                callback.call(this, c);
            }, this));
        }, this));
    };
    
    FandomizedChatMain.prototype.roomChange = function(room, callback){
        var Room = typeof room !== 'function' ? room : this.room;
        callback = typeof room !== 'function' ? callback : room;
        Room.model.room.bind('change', callback);
    };
    
    FandomizedChatMain.prototype.getPM = function(user){
        var room = user.attributes.roomId;
        return this.room.chats.privates[room];
    };
    
    FandomizedChatMain.prototype.pmChange = function(user, callback){
        this.roomChange(this.getPM(user), callback);
    };
    
    FandomizedChatMain.prototype.dragEmoticons = function(chat){
        var $msg = $('#entry-' + chat.cid);
        $msg.find('img').each(function(index, img){
            $(img).on('dragstart', function(event){
                var emoteParser = new DOMParser(),
                    $emote = $(emoteParser.parseFromString(img.alt, 'text/html').body),
                    emote = $emote.text();
                event.dataTransfer.setData('text/plain', emote);
            });
        });
    };
    
    FandomizedChatMain.prototype.shortcuts = $.extend(window.FCshortcuts, {
        openEmoticonPanel: {
            keys: {
                ctrl: true,
                shift: true,
                keyName: 'E'
            },
            handler: function(){}
        },
        help: {
            keys: {
                ctrl: true,
                alt: true,
                keyName: 'H'
            },
            iterable: false,
            handler: function(){}
        }
    });
}(jQuery, mediaWiki, window.FandomizedChat));