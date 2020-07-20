// ******************
// Collapsible tables
// ******************
 
importScriptPage('ShowHide/code.js', 'dev');

/* Autoplay videos */
$(window).on('load', function() {
	$('.mw-content-text .autoplay .play-circle').each(function() {
		$(this).click();
	});
});

/*Shows IP's of Anonns*/
importArticles({
    type: "script",
    articles: [
        "w:c:dev:RevealAnonIP/code.js"
    ]
});