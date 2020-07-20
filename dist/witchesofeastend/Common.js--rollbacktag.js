/* Add a tag for "rollback" to user profile header when rollback user category present
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
	if (wgNamespaceNumber == 2) {
		if (-1 < $.inArray("Rollback users", wgCategories)) {
			$('.masthead-info hgroup').append('<span class="tag">rollback</span>');
		}
	}
});