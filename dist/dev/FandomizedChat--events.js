(function(mw, $, mainRoom, factory){
    var global = typeof window == 'undefined' ? window : this,
        config = typeof window.FandomizedChatConfig == 'object' ? window.FandomizedChatConfig : {};
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat'){
        factory(mw, $, mainRoom);
    }
}(this.mediaWiki, this.jQuery, this.mainRoom, function(mw, $, mainRoom){
    $(document).on('mousemove', function(event){
        if (event.pageY < 150){
            $('.ChatWindow').addClass('Chat-header--show');
            $('#ChatHeader').addClass('header--show');
        } else {
            $('.ChatWindow').removeClass('Chat-header--show');
            $('#ChatHeader').removeClass('header--show');
        }
    });
}));