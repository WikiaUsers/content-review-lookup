// Message wall tags by Mario&LuigiBowser'sInsideStory
window.wallTags = {
    color: '#ef3b56',
    size: 80,
    glow: true,
    glowColor: '#86f73b',
    glowSize: 30,
    tags: [
        {
            user: "Mario&LuigiBowser'sInsideStory",
            text: "Bureaucrat • Coding Assistant • Bot Operator"
        },
        {
            user: "TheKorraFanatic",
            text: "Bureaucrat • Bot Operator"
        },
        {
            user: "BrickleBot",
            text: "Bot"
        },
        {
            user: "JANETHEBot",
            text: "Bot"
        },
        {
            user: "Chase McFly",
            text: "Bureaucrat"
        },
        {
            user: "The real JANE THE KILLER",
            text: "Bureaucrat",
        },
        {
            user: "Messenger of Heaven",
            text: "Administrator"
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
                            style: 'color: ' + (window.wallTags.color || 'white') + '; font-size: ' + (window.wallTags.size ? String(window.wallTags.size) : '100') + '%;' + (window.wallTags.glow === true ? 'text-shadow: ' + (window.wallTags.glowColor ? window.wallTags.glowColor +' 0px 0px ' + (window.wallTags.glowSize ? window.wallTags.glowSize : '10') + 'px' : (window.wallTags.color ? window.wallTags.color : 'white') + ' 0px 0px 10px;') : ''),
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
    if (!$('span.insertusername').length || mw.config.get('wgUserName') === null) return;
    setInterval(function(){
        $('span.insertusername').html(mw.config.get('wgUserName'));
    }, 1000);
})();

// lock old blogs config
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "This blog has not be commented on in <expiryDays>. There is no need to add a new comment."
};