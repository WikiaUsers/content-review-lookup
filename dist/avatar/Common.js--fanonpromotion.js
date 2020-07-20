/* Adds Template:FanonPromotion to all fanon pages
 * by: [[User:MateyY]], fixes by [[User:The 888th Avatar]]
 */

$(function() {
	if (wgNamespaceNumber === 112) {
		$('<div id="fanonpromotioncontainer"/>').appendTo($("#WikiaArticle")).load("/wiki/Template:FanonPromotion .fanonpromotionbox");
	}
});