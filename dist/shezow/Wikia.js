importArticle({type:'script', article:'w:c:dev:DisplayClock/code.js'});

/* Add a tag for "bureaucrat" to user profile header when bureaucrats category present
 * Add a tag for "moderator" to user profile header when moderator category present
 * Add a tag for "rollback" to user profile header when rollback editors category present
 * by: [[User:JECZKIE13]]
 */ 
$(document).ready(function() {
	if (-1 < $.inArray("Bureaucrats", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Bureaucrat</span>');
	}
	if (-1 < $.inArray("Moderators", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Moderator</span>');
	}
	if (-1 < $.inArray("Rollback Editors", wgCategories)) {
		$('.masthead-info hgroup').append('<span class="tag">Rollback</span>');
	}
});

// Add CANCEL Button for new RTE
importScript('MediaWiki:Wikia.js/cancelButton.js');
// END Add CANCEL Button for new RTE

/* Add a talk button to pages. http://community.wikia.com/wiki/Admin_Forum:Looking_for_JS_to_add_a_Talk_button?oldid=751269 */
$('<a class="wikia-button comments secondary" data-id="comment" href="/wiki/' + wgCanonicalNamespace + '_talk:' + wgTitle + '" accesskey="t">Talk</a>').insertAfter('#WikiaPageHeader a[href="#WikiaArticleComments"]');

.WikiaPage .WikiaPageBackground{
background: url("http://images4.wikia.nocookie.net/shezow/images/thumb/f/f0/Pink-Wallpaper-pink-color-898011_1024_768.jpg/212px-Pink-Wallpaper-pink-color-898011_1024_768.jpg") no-repeat fixed center bottom pink;
}