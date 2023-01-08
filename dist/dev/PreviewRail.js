(function($) {
	var togglebutton = "<div class='wikiPreview__wrapper__right with-rail'><button class='wikiPreview__toggle-button'><svg class='wds-icon wds-icon-tiny'><use xlink:href='#wds-icons-menu-control-tiny'></use></svg></button></div>";
	
	function togglerail () {
		$(".wikiPreview__toggle-button").click(function() {
			$(".wikiPreview__wrapper__right").toggleClass("with-rail");
		});
	}
	mw.hook( 've.activationComplete' ).add( function () {
		var surface = ve.init.target.getSurface();
		if ( surface.getMode() === 'visual' ) {
			$( '.ve-active .page__main' ).prepend(togglebutton);
			togglerail();
		} else if ( surface.getMode() === 'source' ) {
			$(".ve-ui-summaryPanel-previewButton .oo-ui-buttonElement-button").click(function() {
				$( '.oo-ui-window-frame' ).prepend(togglebutton);
				togglerail();
			});
		}
	} );
	
	$( '#wikiPreview' ).prepend(togglebutton);
	togglerail();
	
	importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:PreviewRail.css'
    });	
})(jQuery);