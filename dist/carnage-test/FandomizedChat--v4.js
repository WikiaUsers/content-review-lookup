/**
 * @title FandomizedChat
 * @description This script makes the chat more modern and
 *              adds more features to it.
 * @version 4.0
 * @author Ultimate Dark Carnage
 **/

/**
 * Creating the core object by initializing an
 * anonymous function, allowing the script to
 * start when the page loads.
 **/
 
window.FandomizedChat = (function(mw, $, mainRoom, config){
    /**
     * Checking if the script has been disabled
     **/
    if (config.disableFandomizedChat) return;
    /**
     * Enable the library by default in order to
     * avoid causing errors.
     **/
    importArticle({ type: 'script', article: 'MediaWiki:FandomizedChat/library.js' });
    /**
     * Creating the core object for the script and
     * checking if the core object has been inserted
     * into the script.
     **/
    var FandomizedChat = $.extend({}, FandomizedChat);
    /**
     * -- NEW --
     * Creating an object that allows variables to be
     * used within the script and parsed in the chat.
     **/
    FandomizedChat.__VARIABLES__ = $.extend({
        SITENAME: mw.config.get('wgSiteName'),
        DBNAME: mw.config.get('wgDBName'),
        SELF: mw.config.get('wgUserName'),
        GROUPS: mw.config.get('wgUserGroups'),
        SERVER: mw.config.get('wgServer'),
        ROOMID: mw.config.get('wgChatRoomId'),
        EMOTICONS: mw.config.get('wgChatEmoticons'),
        SELFAVATAR: mw.config.get('wgChatMyAvatarUrl')
    }, config.variables);
    /**
     * -- NEW --
     * Creating an object that allows functions to be
     * used within the script.
     **/
    FandomizedChat.__FN__ = $.extend({
        plural: function(value, singular, plural){
            if (typeof(value = !isNaN(value) ? Number(value) : value) === 'number' && (value > 0 && value <= 1)){
                return typeof plural !== 'undefined' ? plural : singular;
            } else {
                return singular;
            }
        },
        whois: function(user){
            var userData = mainRoom.model.users.findByName(user),
                string = '',
                data = {
                    USERNAME: user,
                    AVATAR: userData.attributes.avatarSrc,
                    GROUPS: FandomizedChat.exclude(userData.attributes.groups, ['*', 'poweruser']).join(', '),
                    SINCE: FandomizedChat.parseDate(userData.attributes.since),
                    EDITCOUNT: userData.attributes.editCount,
                    MODERATOR: userData.attributes.isModerator ? 'TRUE' : 'FALSE'
                };
            string = '<pre class="WhoIs whois">';
            $.each(data, function(value, name){
                name = name.replace('_', ' ');
                string += name + ': ' + value;
                if (Object.keys(data).indexOf(name) < Object.keys(data).length - 1){
                    string += '\n';
                }
            });
            string += '</pre>';
            return string;
        }
    }, config.fn);
    /**
     * Creating an object to allow translations to
     * be used.
     **/
    FandomizedChat.I18N = $.extend(true, {
        'en': {
            GROUP_NAMES: {
                // Global groups (with administrative privileges)
                'staff': 'Fandom Staff',
                'helper': 'Fandom Helper',
                'vstf': 'VSTF',
                // Wiki-wide groups (with administrative privileges)
                'bureaucrat': 'Bureaucrat',
                'admin': 'Administrator',
                'chatmoderator': 'Chat Moderator',
                'discussions-moderator': 'Discussions Moderator',
                // Global groups (without administrative privileges)
                'vanguard': 'Vanguard',
                'councilor': 'Councilor',
                // Wiki-wide groups (without administrative privileges)
                'rollback': 'Rollbacker',
                'patroller': 'Patroller',
                'codeeditor': 'Code Editor'
            }
        },
        'be': {
            GROUP_NAMES: {
                // Global groups (with administrative privileges)
                'staff': 'Супрацоўнік ФЭНДОМА',
                'helper': 'Памочнік ФЭНДОМА',
                'vstf': 'VSTF',
                // Wiki-wide groups (with administrative privileges)
                'bureaucrat': 'Бюракрат',
                'admin': 'Адміністратар',
                'chatmoderator': 'Мадэратар чату',
                'discussions-moderator': 'Мадэратар абмеркаванняў',
                // Global groups (without administrative privileges)
                'vanguard': 'Vanguard',
                'councilor': 'Дараднік',
                // Wiki-wide groups (without administrative privileges)
                'rollback': 'Адкатчык',
                'patroller': 'Патрульны',
                'codeeditor': 'Рэдактар кода'
            }
        },
        'ru': {
            GROUP_NAMES: {
                // Global groups (with administrative privileges)
                'staff': 'Сотрудник ФЭНДОМА',
                'helper': 'Помощник ФЭНДОМА',
                'vstf': 'VSTF',
                // Wiki-wide groups (with administrative privileges)
                'bureaucrat': 'Бюрократ',
                'admin': 'Администратор',
                'chatmoderator': 'Модератор чата',
                'discussions-moderator': 'Модератор обсуждений',
                // Global groups (without administrative privileges)
                'vanguard': 'Vanguard',
                'councilor': 'Советник',
                // Wiki-wide groups (without administrative privileges)
                'rollback': 'Откатчик',
                'patroller': 'Патрульный',
                'codeeditor': 'Редактор кода'
            }
        },
        'uk': {
            GROUP_NAMES: {
                // Global groups (with administrative privileges)
                'staff': 'Співробітник ФЕНДОМу',
                'helper': 'Помічник ФЕНДОМу',
                'vstf': 'VSTF',
                // Wiki-wide groups (with administrative privileges)
                'bureaucrat': 'Бюрократ',
                'admin': 'Адміністратор',
                'chatmoderator': 'Модератор чату',
                'discussions-moderator': 'Модератор обговорень',
                // Global groups (without administrative privileges)
                'vanguard': 'Vanguard',
                'councilor': 'Радник',
                // Wiki-wide groups (without administrative privileges)
                'rollback': 'Відкатник',
                'patroller': 'Патрульний',
                'codeeditor': 'Редактор коду'
            }
        }
    }, config.i18n);
    /**
     * Creating a default object for the messages
     **/
    FandomizedChat.MSG = (function(i18n){
        var lang = mw.config.get('wgUserLanguage');
        if (typeof lang == 'undefined' || lang === '' || lang === null){
            lang = mw.config.get('wgContentLanguage');
            if (typeof lang == 'undefined' || lang === '' || lang === null){
                lang = 'en';
            }
        }
        return i18n[lang];
    }(FandomizedChat.I18N));
    /**
     * @method enablePlugins
     * @param plugin {String|Array} The name(s) of the plugin(s) to enable.
     * @param callback {Function} (optional) The callback used after adding the plugins.
     * @return void
     **/
    FandomizedChat.enablePlugins = function(plugin, callback){
        var def_name = 'MediaWiki:FandomizedChat/';
        if (typeof plugin == 'object' && Array.isArray(plugin)){
            FandomizedChat.importResources(plugin.map(function(p){ return def_name + p; }), callback);
        } else {
            FandomizedChat.importResource(def_name + plugin, callback);
        }
    };
    /**
     * @method pluginEnabled
     * @param plugin {String} The name of the plugin to check.
     * @return {Boolean}
     **/
    FandomizedChat.pluginEnabled = function(plugin){
        var def_name = 'FandomizedChat/',
            name = def_name + plugin,
            uri = encodeURIComponent(name),
            $source = $('script[src*="' + uri + '"]');
        if ($source.length){
            return true;
        } else {
            var $source2 = $('link[href*="' + uri + '"]');
            if ($source2.length){
                return true;
            } else {
                return false;
            }
        }
    };
    /**
     * Load a certain number of plugins by default.
     **/
    $(function(){
        FandomizedChat.enablePlugins(['main.js', 'options.js', 'chatbans.js', 'message-count.js', 'chat-alerts.js', 'user-tag.js']);
    });
    /**
     * Returning the primary object
     **/
    return FandomizedChat;
}(this.mediaWiki, this.jQuery, this.mainRoom, $.extend({}, this.FCconfig)));