// Based on MediaWiki:Wikia.js. The passage was approved by Rappy after commenting out its invalid predecessor — https://gwfanon.fandom.com/wiki/Tablica_wiadomo%C5%9Bci:Mustafar29?threadId=4400000000001959759
	if($('.pi-theme-countdown').length) {
    $('<section class="railModule rail-module countdown-railModule" />').append($('.pi-theme-countdown')).appendTo('#WikiaRail');
    $(window).scroll();
}