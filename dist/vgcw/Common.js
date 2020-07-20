importArticles({
    type: 'script',
    articles: [
        // Test if an Element has a Certain Class
        'MediaWiki:Common.js/elementClass.js',
        // Togglers (toggles the display of elements on a page)
        'MediaWiki:Common.js/togglers.js',
    ]
});

$('#ogg_player_1 div').css("display","inline");
$('ul.WikiaMenuElement li a.createpage').replaceWith("<li><a href='/wiki/Create_Page'>Add a Page</a></li>");