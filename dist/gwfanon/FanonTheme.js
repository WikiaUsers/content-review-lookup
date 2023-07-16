// Extracted from MediaWiki:Wikia.js. The passage was approved by Rappy after commenting out its invalid predecessor — https://gwfanon.fandom.com/wiki/Tablica_wiadomo%C5%9Bci:Mustafar29?threadId=4400000000001959759

if($('.pi-theme-fanon').length) {
	$('<div class="railModule rail-module fanon-railModule" />').append($('.pi-theme-fanon')).appendTo('.right-rail-wrapper');
	$(window).scroll();
}