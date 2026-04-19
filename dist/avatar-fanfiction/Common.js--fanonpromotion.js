/* Adds Template:FanonPromotion to all fanon pages
 * by: [[User:MateyY]], fixes by [[User:The 888th Avatar]]
 */

$(function() {
	if (mw.config.get('wgNamespaceNumber') === 112) {
		$('<div id="fanonpromotioncontainer"/>').appendTo($("#page-content")).load("/wiki/Template:FanonPromotion .fanonpromotionbox");
	}
});