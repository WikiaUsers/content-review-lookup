/* Any JavaScript here will be loaded for all users on every page load. */

// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
	if( typeof( window.SKIP_TITLE_REWRITE ) != 'undefined' && window.SKIP_TITLE_REWRITE ) {
		return;
	}

	if( $('#title-meta').length == 0 ) {
		return;
	}

	var newTitle = $('#title-meta').html();
	if( skin == "oasis" ) {
		$('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('header.WikiaPageHeader > h1').attr('style','text-align:' + $('#title-align').html() + ';');
	} else {
		$('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
		$('.firstHeading').attr('style','text-align:' + $('#title-align').html() + ';');
	}
}

addOnloadHook( rewriteTitle );

// END JavaScript title rewrite

//For exclusive Staff of Kings flash game. See: http://indianajones.wikia.com/wiki/StaffofKings
indygamecode = '<object width="378" height="792"><param name="movie" value="https://images.wikia.nocookie.net/common/WikiaLoader.swf"><embed src="https://images.wikia.nocookie.net/common/WikiaLoader.swf" width="378" height="792"></embed></object>';
jQuery(function() {
  jQuery("#indiana_jones_flash_game").html(indygamecode);
});