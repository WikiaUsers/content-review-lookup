(function($, mw, mainRoom, window){
    if (typeof window.FandomizedChat === 'object' || !mainRoom.roomId) return;
    function FandomizedChat(roomId){
        this.roomID = roomId;
        this.wikiName = mw.config.get('wgSiteName');
        this.wikiServer = mw.config.get('wgServer');
        this.self = mw.config.get('wgUserName');
        this.groups = mw.config.get('wgUserGroups');
        this.cityID = mw.config.get('wgCityId');
        this.avatar = mw.config.get('wgChatMyAvatarUrl');
        this.lang = mw.config.get('wgUserLanguage') || mw.config.get('wgContentLanguage') || 'en';
        this.users = mainRoom.model.users.map(function(c){
            return c.attributes.name;
        });
        this.config = $.extend({}, window.FC);
        this.$load = $.Deferred();
        this.loadIndex = 0;
        this.resources = ['dev.colors', 'dev.chat', 'dev.i18n'];
        this.colors = null;
        this.chat = null;
        this.i18no = null;
        this.starterScripts = ['library.js', 'main.js', 'ui.js'];
        this.starterStyles = ['core.css', 'main.css'];
        this.variables = {};
        this.fn = {};
        this.i18n = {};
        this.loaderResources = [{ name: 'mediawiki.api', loaded: false }, {  name: 'mediawiki.util', loaded: true }];
        return this;
    }
    
    FandomizedChat.prototype.setVariables = function(){
        this.variables = $.extend(this.variables, this.config.variables, {
            roomID: this.roomID,
            wikiName: this.wikiName,
            wikiServer: this.wikiServer,
            groups: this.groups.join(', '),
            coppa: this.i18n.coppa,
            coppaLink: 'https://coppa.org/ ' + this.i18n.coppa,
            shrug: '¯\\_(ツ)_/¯',
            today: this.getDateString(),
            now: [this.getDateString(), this.getTimeString()].join(' '),
            cityID: this.cityID,
            avatar: this.avatar
        });
    };
    
    FandomizedChat.prototype.setFn = function(){
        this.fn = $.extend(this.fn, this.config.fn, {
            plural: function(value, strings){
                return this.plural(value, strings);
            },
            whois: function(user){
                var userData = new UserData(user), string = '',
                    data = {
                        'USERNAME': ['username'], 'AVATAR': ['avatar'],
                        'GROUPS': ['groups'], 'SINCE': ['date:since'],
                        'EDITCOUNT': ['editcount'], 'IS_MODERATOR': ['string:isModerator']
                    };
                $.each(data, $.proxy(function(key, value){
                    var type = null, s = '';
                    if (key.indexOf(':') > -1){
                        var types = {
                            'string': function(key, obj){ return String(obj[key]); },
                            'date': function(key, obj){ return this.parseDate(obj[key]); },
                            'number': function(key, obj){ return Number(obj[key]); }
                        };
                    }
                }, this));
            }
        });
    };
    
    FandomizedChat.prototype.getI18n = function(i18no){
        $.when(i18no.loadMessages('FandomizedChat')).done($.proxy(function(i18n){
            $.each(i18n._messages[this.lang], $.proxy(function(key, value){
                this.i18n[key] = value;
            }, this));
        }, this));
    };
    
    FandomizedChat.prototype.init = function(){
        var hooks = new Hooks(this.resources);
        hooks.multiAdd($.proxy(function(){
            var args = [].slice.call(arguments);
            this.colors = args[this.resources.indexOf('dev.colors')];
            this.chat = args[this.resources.indexOf('dev.chat')];
        }, this));
    };
}(jQuery, mediaWiki, mainRoom, window));