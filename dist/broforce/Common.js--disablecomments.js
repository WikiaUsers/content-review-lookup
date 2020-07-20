/* From Avatar Wiki */

/* Disable comments for specified pages at discretion without disabling feature
 * by: [[User:The 888th Avatar|The 888th Avatar]], with additions by [[User:Hasdi|Hasdi]]
 */

$(function() { 
	if (-1 < $.inArray("Hide comments", wgCategories)) {
		$('.WikiaArticleComments #article-comments').remove();
		$('a.wikia-button.comments.secondary').html('Comments hidden');
	}
});
 
$(function() {
	if (-1 < $.inArray("Disable comments", wgCategories)) {
		$('#article-comm').attr('disabled','disabled').text('Comments on this article have temporarily been disabled.');
		$('#article-comm-submit').attr('disabled','disabled');
		$('.article-comm-reply').remove();
		$('a.wikia-button.comments.secondary').html('Comments disabled');
	}
});