/* Any JavaScript here will be loaded for all users on every page load. */
/* Adds Template:FanonPromotion to all fanon pages
 * by: [[User:MateyY]], fixes by [[User:The 888th Avatar]]
 */

$(function() {
	if (wgNamespaceNumber === 112) {
		$('<div id="fanonpromotioncontainer"/>').appendTo($("#WikiaArticle")).load("/id/wiki/Template:PromosiFanon .fanonpromotionbox");
	}
});