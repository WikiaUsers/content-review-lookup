(function() {
	importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:UCX.css'
    });	

	$(document).scroll(function () {
    	var nav = $(".wds-community-header");
    	var offset = $(".WikiaPageContentWrapper").offset().top

    	nav.toggleClass("fixed", $(this).scrollTop() >= offset);

    	if ($(this).scrollTop() >= offset) {
    		nav.css("display", "flex");
    	} else {
    		nav.css("display", "block");
    	}
	});
})();

/* Now you can access Search via pressing Fandom logo */
$('*[data-tracking-label="logo"]').attr('href', mw.config.get("wgScriptPath") + "/wiki/Special:Search");