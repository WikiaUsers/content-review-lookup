/* Add a tag for "bureaucrat" to user profile header when bureaucrats category present
 * Add a tag for "moderator" to user profile header when moderator category present
 * Add a tag for "rollback" to user profile header when rollback editors category present
 * by: [[User:Technology Wizard]]
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

/* Add a talk button to pages. http://community.wikia.com/wiki/Admin_Forum:Looking_for_JS_to_add_a_Talk_button?oldid=751269 */
$('<a class="wikia-button comments secondary" data-id="comment" href="/wiki/' + wgCanonicalNamespace + '_talk:' + wgTitle + '" accesskey="t">Talk</a>').insertAfter('#WikiaPageHeader a[href="#WikiaArticleComments"]');


// ================================================================== //
// Importierte Skripte
// ================================================================== //

importArticles({
    type: "script",
    articles: [
        "MediaWiki:AdvancedOasisUI.js",
        "w:c:dev:InactiveUsers/code.js"
    ]
});


// ================================================================== //
// Versetzt die Bearbeiten-Schaltfläche auf Benutzerseiten in eine 
// logischere Position
// ================================================================== //

$(function() {
    $('.UserProfileActionButton').prependTo('.tabs-container').css({
        marginRight: '400px',
        float: 'right',
        marginTop: '4px'
    });
});