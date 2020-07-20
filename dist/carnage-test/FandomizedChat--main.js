window.FandomizedChat = (function(mw, $, mainRoom, config){
    var FandomizedChat = $.extend({}, window.FandomizedChat);
    FandomizedChat.enablePlugins('style.js');
    
    FandomizedChat.createScrollBar = function(){
        var $publicList = $('#WikiChatList'),
            $privateList = $('#PrivateChatList');
        [$publicList, $privateList].map(function($chatListUL){
            var $html = $chatListUL.prop('outerHTML'),
                $scrollable = $('<div />', { 'class': 'WikiChatScrollable fc-scrollable' });
            $scrollable.html(function(){
                var $that = $(this),
                    $scrollbar = $('<div />', { 'class': 'fc-scrollbar scrollbar' });
                $scrollbar.html(function(){
                    var $arrow_u = $('<a />', { 'class': 'fc-scroll-arrow arrow-up' }),
                        $arrow_d = $('<a />', { 'class': 'fc-scroll-arrow arrow-down' }),
                        $track = $('<div />', { 'class': 'fc-scrollbar-track fc-track' }),
                        $thumb = $('<span />', { 'class': 'fc-scrollbar-thumb fc-thumb' });
                    $track.html($thumb);
                    return [$arrow_u, $track, $arrow_d];
                });
                return [$html, $scrollbar];
            });
            $chatListUL.replaceWith($scrollable);
        });
        
        this.activateScrollbar();
    };
    
    FandomizedChat.activateScrollbar = function(){
        $('.fc-scrollable').each(function(){
            var $scrollable = $(this),
                $track = $scrollable.children('.fc-track'),
                $thumb = $track.children('.fc-thumb'),
                height = parseInt($scrollable.prop('offsetHeight'), 10),
                contentHeight = parseInt($scrollable.children().eq(0).prop('offsetHeight'), 10),
                trackHeight = parseInt($track.prop('offsetHeight'), 10),
                distance = contentHeight - height,
                speed = config.scrollSpeed || 50,
                current = 0;
            
            $scrollable.children().eq(0).css('top', current + 'px');
            $track.css('height', Math.round(trackHeight * height / contentHeight) + 'px');
            $scrollable.on('scroll mousewheel wheel DOMMouseScroll', function(event){
                event = window.event || event;
                var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail));
                
                if ((delta == -1 && current * speed >= -distance) || (delta == 1 && current * speed < 0)){
                    current = current + delta;
                }
                
                $scrollable.childern().eq(0).css('top', (current * speed) + 'px');
                $thumb.css('top', (0 - Math.round(trackHeight * (current * speed) / contentHeight)) + 'px');
                
                event.preventDefault();
            }, false);
        });
    };
    
    return FandomizedChat;
}(this.mediaWiki, this.jQuery, this.mainRoom, $.extend({}, this.FCConfig)));