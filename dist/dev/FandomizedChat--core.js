/**
 * @title           FandomizedChat
 * @description     This script allows the chat to be
 *                  modernized by adding plugins and
 *                  implementing new features.
 * @author          Ultimate Dark Carnage
 * @version         v5.0.1
 **/
(function(mw, $, mainRoom, config){
    if (typeof window.FandomizedChat !== 'undefined') return;
    function FandomizedChat(room){
        if (typeof room.roomId === 'undefined' && config.isDisabled) return;
        this._addHooks(['dev.colors','dev.i18n', 'dev.wds'])
            .done($.proxy(this._setup, this));
    }
 
    FandomizedChat.prototype._setup = function(colors, i18n, wds){
        this.i18no = i18n;
        this.colors = colors;
        this.wds = wds;
        this.fns = $.extend({}, config.fns);
        this.variables = $.extend({}, config.variables);
        this.room = mainRoom;
        this.i18nLoaded = $.Deferred();
        $.when(this.i18nLoaded).done($.proxy(this._process, this));
        this._loadi18n();
    };
 
    FandomizedChat.prototype._process = function(){
        this.wikiname = mw.config.get('wgPageName');
        this.self = mw.config.get('wgUserName');
        this.emoticons = mw.config.get('wgChatEmoticons');
        this.groups = mw.config.get('wgUserGroups');
        this.roomId = mw.config.get('wgChatRoomId');
    };
    
    FandomizedChat.prototype._loadi18n = function(){
        $.when(this.i18no.loadMessages('FandomizedChat'))
            .then($.proxy(function(i18n){
                this.i18n = i18n;
            }, this));
    };
 
    FandomizedChat.prototype._addHooks = function(hooks){
        var hooksLoaded = $.Deferred(), last = hooks.length - 1, args = [];
        Array.prototype.forEach.call(hooks, function(hook, index){
            mw.hook(hook).add(function(arg){
                args[args.length] = arg;
            });
            if (index === last){
                hooksLoaded.resolve.apply(this, args);
            }
        });
        return hooksLoaded;
    };
 
    FandomizedChat.prototype.isMemberOfGroup = function(groups){
        return groups.some($.proxy(function(group){
            return this.groups.indexOf(group) > -1;
        }, this));
    };
 
    FandomizedChat.prototype.checkGroups = function(group, callback, args){
        if (typeof args === 'object' && Array.isArray(args)){
            return this.isMemberOfGroup(group) && callback.apply(this, args);
        } else {
            return this.isMemberOfGroup(group) && callback.apply(this, []);
        }
    };
 
    FandomizedChat.prototype.importPlugins = function(plugins){
        var scripts = [], styles = [],
            base = 'u:dev:MediaWiki:FandomizedChat/', obj;
        if (typeof plugins === 'string'){
            obj = {};
            if (plugins.endsWith('.js')){
                obj.type = 'script';
            } else if (plugins.endsWidth('.css')){
                obj.type = 'style';
            } else return;
            obj.articles = base + plugins;
            importArticle(obj);
        } else if (typeof plugins === 'object' && Array.isArray(plugins)){
            Array.prototype.forEach.call(plugins, function(plugin){
                if (plugin.endsWith('.js')){
                    scripts[scripts.length] = base + plugin;
                } else if (plugin.endsWith('.css')){
                    styles[styles.length] = base + plugin;
                }
            });
            obj = [];
            if (scripts.length > 0){
                var script = {};
                script.type = 'script';
                script.articles = scripts;
                obj[obj.length] = script;
            }
            if (styles.length > 0){
                var style = {};
                style.type = 'style';
                style.articles = styles;
                obj[obj.length] = style;
            }
 
            importArticles.apply(window, obj);
        } else return;
    };
 
    $(importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js',
            'u:dev:MediaWiki:Colors/code.js',
            'u:dev:MediaWiki:WDSIcons/code.js'
        ]
    }, {
        type: 'style',
        articles: [
            'u:dev:MediaWiki:FandomizedChat/core.css'
        ]
    })).on('load', function(){
        var fandomizedChat = new FandomizedChat(mainRoom);
        fandomizedChat.importPlugins([
            'ui.js', 'library.js', 'ui.css', 'main.js',
            'main.css'
        ]);
        window.FandomizedChat = fandomizedChat;
    });
}(mediaWiki, jQuery, mainRoom, $.extend(window.fcConfig, {})));