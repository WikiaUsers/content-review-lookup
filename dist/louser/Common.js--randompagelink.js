/* Special:Random > Special:Random/main
 * By [[User:Louser]]
 */

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('ul.subnav-2.accent li a[href="/wiki/Special:Random"]').attr('href', '/wiki/Special:Random/main');
	}
});