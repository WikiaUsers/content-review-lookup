/* Import CSS */
function importCSS(url){
	var tag= document.createElement('link');
	tag.type='text/css';
	tag.href= url;
	tag.rel='stylesheet';
	document.body.appendChild(tag);
};
importCSS('http://wbvdkt.wikia.com/wiki/MediaWiki:Universal_flexible_width.css?action=raw&ctype=text/css');

/* Adding sidebar */
$('#WikiaPage').before('<div id="WikiaSidebar"></div>');

/* Moving elements in to sidebar */
$('#WikiHeader').appendTo('#WikiaSidebar');
$('#WikiaRail > *').appendTo('#WikiaSidebar');
/* Moving links in button menus to their own area */
$('#WikiaSidebar .WikiHeader .buttons .contribute a').appendTo('#WikiaSidebar .WikiHeader .buttons');
$('#WikiaSidebar .WikiHeader .buttons .contribute').remove();
$('#WikiaSidebar .WikiHeader .buttons').prepend('<h1>Contribute</h1>');
$('#WikiaPageHeader .tally').insertAfter('#WikiaSidebar #WikiHeader .wordmark');

/* Setting up article header and moving stuff in to it */
$('#WikiaPage').before('<div id="WikiaActionHeader"></div>');
$('#WikiaPageHeader nav.wikia-menu-button a').appendTo('#WikiaActionHeader');
	$('#WikiaPageHeader nav').remove();
$('#WikiaPageHeader a[accesskey="t"]').appendTo('#WikiaActionHeader');
$('#WikiaSearch').appendTo('#WikiaActionHeader');

/* Styles */
$('#WikiaActionHeader > a').addClass('wikia-button');
$('#WikiaSidebar').addClass('WikiaPage');
$('#WikiaActionHeader').addClass('WikiaPage');
$('<div class="WikiaPageBackground"></div>').prependTo('#WikiaSidebar');
$('<div class="WikiaPageBackground"></div>').prependTo('#WikiaActionHeader');

$('#WikiaSidebar #WikiHeader .tally em').append(' pages');
$('#WikiaSidebar #LatestPhotosModule a.wikia-button').removeClass('wikia-button');
$('#WikiaSidebar #LatestPhotosModule .tally').insertAfter('#LatestPhotosModule h1');
$('#WikiaSidebar #LatestPhotosModule .tally em').append(' photos on this wiki');
$('#WikiaSidebar .ChatModule').prepend('<h1>Chat</h1>');
$('#WikiaSidebar .ChatModule .chat-total').insertAfter('#WikiaSidebar .ChatModule div:first-of-type h1');
$('#WikiaSidebar .ChatModule .chat-total').prepend('Users in chat: ');

/* Changing to square-ish logo from Monobook */
$('#WikiHeader .wordmark img').attr({'src':'https://images.wikia.nocookie.net/' + wgDBname + '/images/b/bc/Wiki.png','width':'100%','height':'100%'});