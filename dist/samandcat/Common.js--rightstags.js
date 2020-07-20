/* Add a tag for "bureaucrat" to user profile header when bureaucrat category present
 * by: [[User:The 888th Avatar]]
 */

$(function() {
	if (wgNamespaceNumber == 2) {
		if (-1 < $.inArray("Bureaucrats", wgCategories)) {
			$('.masthead-info hgroup').append('<span class="tag">bureaucrat</span>');
		}
	}
});

$(function() {
	if (wgNamespaceNumber == 2) {
		if (-1 < $.inArray("Rollbacks", wgCategories)) {
			$('.masthead-info hgroup').append('<span class="tag">rollback</span>');
		}
	}
});

$(function() {
	if (wgNamespaceNumber == 2) {
		if (-1 < $.inArray("Inactive users", wgCategories)) {
			$('.masthead-info hgroup').append('<span class="tag">inactive</span>');
		}
	}
});