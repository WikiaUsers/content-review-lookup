/* Any JavaScript here will be loaded for all users on every page load. */
/* Disable comments for specified pages at discretion without disabling feature
 * by: [[User:The 888th Avatar|The 888th Avatar]], with additions by [[User:Hasdi|Hasdi]]
 */
function Hiddencomments() {
	if (-1 < $.inArray("Ukryte komentarze", wgCategories)) {
		$('.WikiaArticleComments #article-comments').remove();
		$('a.wikia-button.comments.secondary').html('Komentarze ukryte');
	}
};
addOnloadHook(Hiddencomments);
 
function Disablecomments() {
	if (-1 < $.inArray("Wyłączone komentarze", wgCategories)) {
		$('#article-comm').attr('disabled','disabled').text('Komentowanie tego artykułu zostało tymczasowo wyłączone.');
		$('#article-comm-submit').attr('disabled','disabled');
		$('.article-comm-reply').remove();
		$('a.wikia-button.comments.secondary').html('Komentarze wyłączone');
	}
};
addOnloadHook(Disablecomments);