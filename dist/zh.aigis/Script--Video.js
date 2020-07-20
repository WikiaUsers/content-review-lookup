/*
[[Category:Wikia]]
[[Category:MediaWiki]]
[[Category:Script]]
[[Category:Project]]
[[Category:Video]]
*/
(function(){
    
    $('.video-link:not([data-done])')
        .attr('data-done', true)
        .each(function(){
            var _this = $(this);
            
            var _video = $();
            
            switch (_this.attr('data-site'))
            {
                case 'nicovideo':
                    
                    _video = $('<iframe/>')
                        .attr('src', 'http://ext.nicovideo.jp/thumb_watch/' + _this.attr('data-id') + '?thumb_mode=html')
                    ;
                    
                    break;
            }
            
            if (_video.size())
            {
                _video
                    .width(_this.attr('data-width') || 425)
                    .height(_this.attr('data-height') || 250)
                    .css({
                        display: 'block',
                    })
                    .appendTo(_this)
                ;
            }
        })
    ;
    
})();