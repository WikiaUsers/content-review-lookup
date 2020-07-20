/* Any JavaScript here will be loaded for all users on every page load. */
/* Main page */
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


/* AJAX on other pages */
var ajaxPages = [
    "Special:Watchlist",
    "Special:Contributions",
    "Special:WikiActivity",
    "Special:RecentChanges"
];
var AjaxRCRefreshText = 'Auto-Refresh';
 
var PurgeButtonText = 'Refresh';
 
/* Revealing IP of anons in commentaries to admins */
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat'] };