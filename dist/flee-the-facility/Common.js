// Custom message wall tags

window.wallTags = {
    color: '#ff0a0a',
    size: 80,
    glow: true,
    glowColor: '#c30000',
    glowSize: 30,
    tags: [
        {
            user: 'Mario&LuigiBowser\'sInsideStory',
            text: 'Bureaucrat'
        }
    ]
};


function loadWallTags() {
    if ([1200, 1201].indexOf(mw.config.get('wgNamespaceNumber')) == -1) return;
    window.wallTags.tags.forEach(function(i) {
        $('.edited-by a').each(function() {
            if ($(this).text() == i.user) {
                $(this).parent().find('a.subtle').replaceWith(
                    $('<span>', {
                        class: 'WallTag', 
                        style: 'color: ' + (window.wallTags.color || 'white') + '; font-size: ' + (window.wallTags.size ? String(window.wallTags.size) : '100') + '%;' + (window.wallTags.glow === true ? 'text-shadow: ' + (window.wallTags.glowColor ? window.wallTags.glowColor +' 0px 0px ' + (window.wallTags.glowSize ? String(window.wallTags.glowSize) : '10') + 'px' : (window.wallTags.color ? window.wallTags.color : 'white') + ' 0px 0px 10px;') : ''),
                        text: '(' + i.text + ')'
                    })
                );
            }
        });
    });
}

$(document).click(function(e) {
    if ($(e.target).is('.Pagination a')) {
        var interval = setInterval(function() {
            if ($('a.subtle').exists()) {
                clearInterval(interval);
                // Make absolutely sure that a.subtle exists
                setTimeout(loadWallTags, 500);
            }
        }, 900);
    }
});

$(window).load(loadWallTags);