/* Any JavaScript here will be loaded for all users on every page load. */
/* Disable comments for specified pages at discretion without disabling feature
 * by: [[User:The 888th Avatar|The 888th Avatar]], with additions by [[User:Hasdi|Hasdi]]
 */

$(function() { 
	if (-1 < $.inArray("Hide comments", wgCategories)) {
		$('.WikiaArticleComments #article-comments').remove();
		$('a.wikia-button.comments.secondary').html('Komentar disembunyikan');
	}
});
 
$(function() {
	if (-1 < $.inArray("Disable comments", wgCategories)) {
		$('#article-comm').attr('disabled','disabled').text('Komentar pada artikel ini untuk sementara dinonaktifkan.');
		$('#article-comm-submit').attr('disabled','disabled');
		$('.article-comm-reply').remove();
		$('a.wikia-button.comments.secondary').html('Komentar dinonaktifkan');
	}
});