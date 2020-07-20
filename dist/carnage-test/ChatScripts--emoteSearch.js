;(function(mw, $){
    var mw_config = mw.config.get([
        'wgPageName',
        'wgCanonicalSpecialPageName',
        'wgUserName',
        'wgChatEmoticons'
    ]);
    
    if (mw_config.wgCanonicalSpecialPageName == 'Chat' || mw_config.wgPageName == 'Special:Chat'){
        var emoticons = {},
            mapping = new EmoticonMapping();
        mapping.loadFromWikiText(mw_config.wgChatEmoticons);
        Object.keys(mapping._settings).forEach(function(image){
            var emote_data = mapping._settings[image];
            Array.prototype.forEach.call(emote_data, function(emote){
                emoticons[emote] = image;
            });
        });
        
        var $emoticon_sidebar = $();
    }
})(this.mediaWiki, this.jQuery);