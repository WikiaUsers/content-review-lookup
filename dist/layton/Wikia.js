/* Any JavaScript here will be loaded for users using the Oasis skin */
/* See also: [[MediaWiki:Common.js]] */

/* Main Code - Start */
$(document).ready( function() {
    
    /* START Puzzle Code - Only runs in Puzzle namespace */
    if(mw.config.get('wgNamespaceNumber') == 112) {
    	
		/* Subtitle Fix **************************************************
		 *
		 * Adds the "Puzzle page" subheader to puzzle pages
		 * By [[User:Tjcool007]] from [[w:c:layton]]
		 */
		if(mw.config.get('wgAction') == 'view') {
			if($("#WikiaPageHeader .header-title h2").length) {
				$("#WikiaPageHeader .header-title h2").prepend('Puzzle page | ');
			} else {
				$('<h2/>').text('Puzzle page').appendTo("#WikiaPageHeader .header-title");
			}
		}
    	
    }
    /* END Puzzle Code */

});
/* Main Code - End */