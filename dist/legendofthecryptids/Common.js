/* Any JavaScript here will be loaded for all users on every page load. */

// Disable commenting on Trading Post (disambiguation) page
 
if ( wgPageName == 'Trading_Post_(disambiguation)' ) {
	var commentChecker = setInterval(function(){checkIfComments()},2000);
 
	function checkIfComments() {
		if ( !($("#WikiaArticleComments").hasClass("loading")) ) {
			$('.MiniEditorWrapper').remove();
			$('.article-comm-reply').remove();
			$('#article-comments-counter-header').text("Commenting is disabled.");
		}
	}
}