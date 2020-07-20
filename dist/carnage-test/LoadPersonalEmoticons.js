(function(window, $, mw, mainRoom){
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
    var LPE = {
        source: 'User:' + mw.config.get('wgUserName') + '/Emoticons',
        init: function(){
            this.emoticons = {};
            this.obj = {};
            this.loaded = false;
            return this;
        }
    };
    
    LPE.init.prototype = {
        constructor: LPE.init,
        load: function(){
            var params = {
                format: 'json',
                action: 'query',
                prop: 'revisions',
                rvprop: 'content',
                titles: LPE.source.split('|')[0],
                indexpageids: true
            };
            $.ajax({
                method: 'GET',
                dataType: 'json',
                url: '/api.php',
                data: params
            }).done($.proxy(this.parse, this));
        },
        parse: function(data){
            if (data.query.pageids.indexOf('-1') > -1) return;
            var pageid = data.query.pageids[0], page = data.query.pages[pageid];
            if (page.revisions){
                var revision = page.revisions[0], string = revision['*'];
                string = string.trim().replace(/\/\*[\s\S]*?\*\//g, '');
                var mapping = new EmoticonMapping();
                mapping.loadFromWikiText(string);
                mw.config.set('wgChatUserEmoticons', mapping._settings);
                this.obj = mapping._settings;
                Object.keys(mapping._settings).forEach(function(key){
                    var value = mapping._settings[key], aliases = value.slice(1), name = value[0];
                    this.emoticons[name] = { src: key, aliases: aliases };
                }, this);
                this.loaded = true;
                this.bind();
            } else return;
        },
        parseText: function(text){
            var res = text;
            Object.keys(this.obj).forEach(function(src){
                var arr = this.obj[src], pattern, combo, r;
                r = arr.map(function(s){
                    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
                });
                combo = r.join('|');
                pattern = new RegExp(combo, 'g');
                res = res.replace(pattern, src);
            }, this);
            return res;
        },
        sendMessage: function(){
            var context = this;
            return function(event){
                if (!this.active) return true;
                if (event.which !== 13 || event.shiftKey) return false;
                event.preventDefault();
                window.mainRoom.resetActivityTimer();
                var $text = this.viewDiscussion.getTextInput(),
                    send = context.parseText.call(context, $text.val().trim()),
                    value = $text.val().trim();
                if (value && send && value.length <= this.maxCharacterLimit){
                    var entry = new window.models.ChatEntry({
                        name: mw.config.get('wgUserName'),
                        text: value
                    });
                    if (this.isMain()) this.socket.send(entry.xport());
                    else {
                        if (
                            this.afterInitQueue.length < 1 ||
                            this.model.users.length < 2
                        ){
                            this.mainController.socket.send(
                                this.model.privateRoom.xport()
                            );
                        }
                        if (this.isInitialized) this.socket.send(entry.xport());
                        else {
                            this.afterInitQueue.push(entry.xport());
                            entry.set({
                                avatarSrc: mw.config.get('wgChatMyAvatarUrl'),
                                temp: true
                            });
                            this.models.chats.add(entry);
                        }
                    }
                }
                $text.val('').focus();
                $('body').removeClass('warn limit-near limit-reached');
            };
        },
        bind: function(){
            NodeChatController.prototype.sendMessage = this.sendMessage();
            mainRoom.viewDiscussion.unbind('sendMessage');
            mainRoom.viewDiscussion.bind('sendMessage', 
                $.proxy(window.mainRoom.sendMessage, window.mainRoom)
            );
        }
    };
    
    return (window.LPE = new LPE.init());
}(this, jQuery, mediaWiki, $.extend({}, window.mainRoom))).load();