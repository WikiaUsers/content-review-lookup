// Message wall tags
window.wallTags = {
    color: '#00e2e2',
    size: 80,
    glow: true,
    glowColor: '#7c063b',
    glowSize: 30,
    tags: [
        {
            user: "Mario&LuigiBowser'sInsideStory",
            text: "Bureaucrat"
        },
        {
            user: "BrickleBot",
            text: "Bot"
        }
    ]
};
 
(function(){
    if ([1200, 1201].indexOf(mw.config.get('wgNamespaceNumber')) === -1){
         return;
    }
    setInterval(function(){
        $('.edited-by a').each(function(){
            for (var i = 0; i < window.wallTags.tags.length; i++){
                if ($(this).text() === window.wallTags.tags[i].user) {
                    $(this).parent().find('a.subtle').replaceWith(
                        $('<span>', {
                            class: "WallTag", 
                            style: 'color: ' + (window.wallTags.color || 'white') + '; font-size: ' + (window.wallTags.size ? String(window.wallTags.size) : '100') + '%;' + (window.wallTags.glow === true ? 'text-shadow: ' + (window.wallTags.glowColor ? window.wallTags.glowColor +' 0px 0px ' + (window.wallTags.glowSize ? String(window.wallTags.glowSize) : '10') + 'px' : (window.wallTags.color ? window.wallTags.color : 'white') + ' 0px 0px 10px;') : ''),
                            text: '(' + window.wallTags.tags[i].text + ')'
                        })
                    );
                }
            }
        });
    }, 1000);
})();
// Username template
(function(){
    if (!$('span.insertusername').exists() || mw.config.get('wgUserName') === null) return;
    setInterval(function(){
        $('span.insertusername').html(mw.config.get('wgUserName'));
    }, 1000);
})();

// New masthead name template
 
(function(){
    if(!$('.newMastheadName').length || [2, 1200].indexOf(mw.config.get('wgNamespaceNumber')) === -1) return;
    var newTitle = $('.newMastheadName').text();
    $('h1[itemprop="name"]').html(mw.html.escape(newTitle));
})();
 
// Youtube audio template
(function(){
    if (!$('.youtube-audio-body').length) return;
    $('.youtube-audio-body').each(function(){
        var id = $(this).find('.youtube-audio').attr('data-id');
        if (id.length === 0) return;
        $(this).find('span.youtube-audio').replaceWith(
            $('<iframe>', {
                class: 'youtube-frame',
                src: 'https://youtube.com/embed/' + id + '?autoplay=1',
                width: '0',
                height: '0'
            })
        );
    });
})();