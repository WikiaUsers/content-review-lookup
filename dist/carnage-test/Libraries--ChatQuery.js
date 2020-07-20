;(function(mw, $, ChatQuery){
    // Configurations
    ChatQuery = $.extend({
        version: '1.0.0',
        language: mw.config.get('wgUserLanguage', wgUserLanguage) || 'en',
        emoticons: mw.config.get('wgChatEmoticons', wgChatEmoticons),
        chatWindow: 'body.ChatWindow',
        chatHeader: '.ChatHeader',
        chatBody: '.Chat',
        rail: '.Rail',
        textbox: '.Write',
        room: mainRoom
    }, ChatQuery);
    
    // Functions
    ChatQuery = $.extend({
        _get: function(type, options){
            var arr = null;
            options = options || {};
            switch (type){
                case 'users':
                case 'user list':
                    arr = mainRoom.model.users.map(function(user){
                        var name = user.attributes.name;
                        if (name !== '')
                            return name;
                    }).sort();
                    break;
                case 'emoticons':
                case 'emotes':
                case 'emoticon list':
                    arr = {};
                    var mapping = new EmoticonMapping();
                    mapping.loadFromWikiText(ChatQuery.emoticons);
                    Object.keys(mapping._settings).forEach(function(image){
                        if (options.allkeys){
                            var emote_data = mapping._settings[image];
                            Array.prototype.forEach.call(emote_data, function(emote){
                                arr[emote] = image;
                            });
                        } else {
                            var _key = mapping._settings[image][0];
                            arr[_key] = image;
                        }
                    });
                    break;
                case 'messages':
                case 'chat':
                case 'chat messages':
                    arr = [];
                    mainRoom.model.chats.forEach(function(child, index){
                        arr[index] = child;
                    });
                    setInterval(function(){
                        mainRoom.model.chats.forEach(function(child, index){
                            arr[index] = child;
                        });
                    }, 1000);
                    break;
                default:
                    arr = null;
            }
            return arr;
        },
        _set: function(type, value){
            switch (type){
                case 'status':
                    if (value == 'here')
                        mainRoom.setBack();
                    else if (value == 'away')
                        mainRoom.setAway();
                    else
                        console.log('Not a valid status state. Try again');
                    break;
                default:
                    return false;
            }
        }
    }, ChatQuery);
})(this.mediaWiki, this.jQuery, window.ChatQuery = window.ChatQuery || {});