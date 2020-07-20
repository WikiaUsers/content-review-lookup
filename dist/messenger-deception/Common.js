// Message wall tags
window.wallTags = {
    color: 'blue', 
    size: 80, 
    glow: true, 
    glowColor: 'purple', 
    glowSize: 40,
    tags: [
        {
            user: "Messenger of Heaven",
            text: "Bureaucrat • Founder"
        },
        {
            user: "Mario&LuigiBowser'sInsideStory",
            text: "Volunteer • Administrator"
        },
        {
            user: "Madiyunu",
            text: "Chat Moderator"
        },
        {
            user: "TheKorraFanatic",
            text: "Chat Moderator"
        },
        {
            user: "SlendyBot",
            text: "Chat Moderator • Bot"
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

// AjaxRC
window.ajaxSpecialPages = ["Recentchanges", "WikiActivity", "Contributions", "Log"];
window.ajaxIndicator = 'https://images.wikia.nocookie.net/__cb20100609110347/software/images/a/a9/Indicator.gif';
window.ajaxRefresh = 60000;
window.AjaxRCRefreshText = 'Auto-refresh';