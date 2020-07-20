;(function(root, $, mw, udf){
    root.chatags = { images: true, videos: true }; 
    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:EmoticonsWindow/code.js',
            'u:shining-armor:MediaWiki:ChatTags/code.js',
            'u:dev:MediaWiki:TitleNotifications/code.js',
            'u:dev:MediaWiki:FucodeLogger.js',
            'u:dev:MediaWiki:ExtendedPrivateMessaging/code.js',
            'u:dev:MediaWiki:Pings.js',
            'u:dev:MediaWiki:ChatBlockButton/code.2.js',
            'u:dev:MediaWiki:ChatAnnouncements/code.js',
            'u:dev:MediaWiki:IsTyping.js',
        ]
    });
    var theme = +$.cookie("chatTheme");
    var themes = ["", "dark"];
    var names = ['Default Theme', 'Dark Theme'];
    $('.ChatWindow').addClass(themes[theme]);
    $('.Rail').append('<div class="change-theme-button button">'+names[theme^1]+'</div>');
    mw.util.addCSS('.change-theme-button {position: absolute; bottom: 0; left: 0; right: 0; text-align: center;}');
    $('.change-theme-button').click(function(e){
       $('.ChatWindow').removeClass(themes[theme]);
       $('.change-theme-button').text(names[theme]);
       $('.ChatWindow').addClass(themes[theme ^= 1]);
       $.cookie("chatTheme", "" + theme);
    });
    mw.hook('chatags.init').add(function() {
        chatags.tags.user = function(s,t) {
            if (t.charAt(0) !== '/') {
                try {
                    t = t.split('="');
                    t[1] = t[1].replace('"', '');
                    s = s.replace('[user="' + t[1] + '"]', '<a href="/wiki/User:' + mw.html.escape(t[1]) + '">' + mw.html.escape(t[1]) + '</a>');
                } catch (e) {
                    console.log(e);
                }
            }
            return s;
        };
        chatags.tags.spoiler = function(s,t){
            if (t.charAt(0) === '/') {
                s = s.replace('[/spoiler]', '</span>');
            } else {
                s = s.replace('[spoiler]', '<span class="spoiler">');
            }
            return s;
        }
        chatags.tags.link = function(s, t){
            if (t.charAt(0) === '/') {
                s = s.replace('[/link]', '</a>');
            } else {
                try {
                    t = t.split('="');
                    t[1] = t[1].replace('"', '');
                    s = s.replace('[link="' + t[1] + '"]', '<a href="http://' + mw.html.escape(t[1]) + '">');
                } catch (e) {
                    console.log(e);
                }
            }
            return s;  
        };
    });
})(this, this.jQuery, this.mediaWiki);