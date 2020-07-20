/* Main page */
/* Code via http://battleborn.wikia.com/wiki/MediaWiki:Common.js by MarkvA */
/** Characters box **/
function portraitHoverSetup() {
	var portraitItem = $('.mainpage-box-characters .hero'),
	characterImageParentItem = $('.mainpage-box-characters .character .image'),
	characterCaptionItem = $('.mainpage-box-characters .character .caption');
 
	portraitItem.mouseover(function(event) {
		var portrait, name, url,
		characterLinkItem = $('.mainpage-box-characters .character a'),
		characterImageItem = $('.mainpage-box-characters .character .image img'),
		characterCaptionLinkItem = $('.mainpage-box-characters .character .caption a');
 
		url = $(event.currentTarget).attr('data-url');
		portrait = $(event.currentTarget).attr('data-portrait');
		name = $(event.currentTarget).attr('data-name');
		if (portrait) {
			characterLinkItem.attr('href', url);
			characterImageItem.attr('src', portrait);
			characterCaptionLinkItem.text(name);
		}
	});
 
	characterImageParentItem.wrapInner('<a href=""></a>');
	characterCaptionItem.wrapInner('<a href=""></a>');
	portraitItem.first().trigger('mouseover');
}
 
$(document).ready(function() {
	portraitHoverSetup();
});