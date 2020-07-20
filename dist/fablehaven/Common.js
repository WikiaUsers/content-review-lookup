importArticle({type:'script', article:'u:w:MediaWiki:Snow.js'});
importArticles({
    type: 'script',
    articles: [
        'u:dev:ExtendedNavigation/code.js'
    ]
});

/* Fade-in fade-out effect for images */

$(document).ready(function() {
	$('div.fadeout img').mouseenter(function(){
		$(this).animate({opacity:0},800);
	}).mouseleave(function(){
		$(this).animate({opacity:1},800);
	});
});