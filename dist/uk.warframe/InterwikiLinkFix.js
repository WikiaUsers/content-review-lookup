/* InterwikiLinkFix.js
замінює застарілу локацію англомовної вікі на нову
*/
$(function() {
	var $intervikiLink = $(".page-header__languages [data-tracking-label=lang-en]");
	
	if ($intervikiLink.length) {
		$intervikiLink.attr("href", $intervikiLink.attr("href").replace("warframe.fandom.com/wiki/", "wiki.warframe.com/w/"));
	}
});