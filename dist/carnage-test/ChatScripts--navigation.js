;(function(mw, $, module){
    var config = $.extend(module, {
        version: '0.0.1 alpha',
        mw: mw.config.get(['wgServer', 'wgUserName']),
        dbName: config.mw.wgServer.replace(/http:\/\/(.*)\.wikia\.com/gi, '$1'),
        isCCChat: ['wikia', 'community', 'c'].indexOf(config.dbName),
        self: mw.config.get('wgUserName', wgUserName),
        emoticons: mw.config.get('wgChatEmoticons', wgChatEmoticons),
        items: {
            'Customization': {},
            'Features': {}
        },
        cookie: {
            _set: function _set(name, data){
                var domain = config.mw.wgServer.replace(/http:\/\/(.*)/gi, '$1');
                document.cookie =
                    name + '=' + data +
                    '; max-age=' + 60*60*24*150 +
                    '; path=/; domain=' + domain;
            },
            _get: function _get(name, pos){
                var x, y, cookie_array = document.cookie.split(';');
                for (var i = 0; i < cookie_array.length; i++){
                    x = cookie_array[i].substr(0, cookie_array[i].indexOf('='));
                    y = cookie_array[i].substr(cookie_array[i].indexOf('=') + 1);
                    x = x.replace(/^\s+|\s+$/g,"");
                    
                    if (x == name){
                        var style_obj = y.split(/\,(?:\s+|)/g);
                        return unescape(style_obj[pos]);
                    }
                }
            }
        },
        users: mainRoom.model.users.map(function(child){
            return child.attributes.name;
        }).sort()
    });
})(this.mediaWiki, this.jQuery, (window.ChatNavigation = window.ChatNavigation || {}));