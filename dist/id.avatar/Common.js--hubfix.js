/* Any JavaScript here will be loaded for all users on every page load. */
/* Temporary fix for Wikia hubs: Gaming > Entertainment
 * by: [[User:The 888th Avatar]]
 */

$(function() {
	if (skin == "oasis" || skin == "wikia") {
		$('.CorporateFooter .WikiaHubBranding .wordmark').html('<img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite logo3">');
		$('.hub').html('<a class="hub3" href="http://www.wikia.com/Entertainment">[ Hiburan ]</a>');
	}
});