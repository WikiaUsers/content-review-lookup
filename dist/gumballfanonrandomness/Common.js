// message wall tags
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
            user: "AsTheAA",
            text: "Administrator"
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
    if (mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
})();