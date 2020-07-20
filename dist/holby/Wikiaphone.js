importScriptPage('MediaWiki:Common.js', 'casualty');
 
function HomeLink() {
	$('.mobile-wikiname a').replaceWith('<a class="newlink" href="/wiki/Casualty_Wiki" ><img style="margin-left:-5px;" src="https://images.wikia.nocookie.net/__cb42/casualty/images/8/89/Wiki-wordmark.png"></a>');
}
$(HomeLink);