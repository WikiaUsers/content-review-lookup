/* Any JavaScript here will be loaded for all users on every page load. */
/* Special:Random > Special:Random/main
 * By [[w:c:avatar:User:Porter21]]
 */

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('ul.subnav-2.accent li a[href="/wiki/Special:Random"]').attr('href', '/wiki/Special:Random/main');
	}
});