(function($) {
	if (window.PreviewRail) return;
	window.PreviewRail = true;
	$( '#wikiPreview' ).prepend('<div class="wikiPreview__wrapper__right with-rail"><div class="wikiPreview__toggle-button"><button class="right-rail-toggle"><svg class="wds-icon wds-icon-tiny"><use xlink:href="#wds-icons-menu-control-tiny"></use></svg></button></div></div>');
	
	$(function() {
		$(".wikiPreview__toggle-button").click(function() {
			$("#wikiPreview .wikiPreview__wrapper__right").toggleClass("with-rail");
		});
	});
	
	importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:PreviewRail.css'
    });	
})(jQuery);