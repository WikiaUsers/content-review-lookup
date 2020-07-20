/* Any JavaScript here will be loaded for all users on every page load. */
/* Add a tag for "rollback" to user profile header when rollback user category present
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
	if (wgNamespaceNumber == 2) {
		if (-1 < $.inArray("Pengguna pengembali revisi", wgCategories)) {
			$('.masthead-info hgroup').append('<span class="tag">pengembali revisi</span>');
		}
	}
});