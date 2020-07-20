 importScriptPage('MediaWiki:Common.js', 'test.casualty');

function HomeLink() {
	$('.mobile-wikiname a').replaceWith('<a class="newlink" href="/wiki/Casualty_Test_Wiki" ><img style="margin-left:-5px;" src="https://images.wikia.nocookie.net/__cb6/casualtytest/images/8/89/Wiki-wordmark.png"></a>');
}
$(HomeLink);