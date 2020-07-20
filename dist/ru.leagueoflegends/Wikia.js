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