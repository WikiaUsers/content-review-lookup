importArticles({
    type: "script",
    articles: [
        "MediaWiki:SpoilersToggle.js",
        "MediaWiki:Collapsible.js",
    ]
});

$(function() {
    $('.global-navigation__logo').prepend(
        $('<img>', {
            src: 'https://static.wikia.nocookie.net/central/images/9/99/Fandom_Pride.png/revision/latest/scale-to-width-down/33',
            style: 'margin-bottom: 6px'
        })
    );
    
    $('svg.wds-icon').remove();
});


/* Any JavaScript here will be loaded for all users on every page load. */