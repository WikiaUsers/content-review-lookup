(function($) {
	var togglebutton = "<div class='wikiPreview__wrapper__right with-rail'><button class='wikiPreview__toggle-button'><svg class='wds-icon wds-icon-tiny'><use xlink:href='#wds-icons-menu-control-tiny'></use></svg></button></div>";
	
	$( 'body' ).prepend(togglebutton);
	
	$(function() {
		$(".wikiPreview__toggle-button").click(function() {
			$(".wikiPreview__wrapper__right").toggleClass("with-rail");
		});
	});
	
	importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:PreviewRail2.css'
    });	
})(jQuery);