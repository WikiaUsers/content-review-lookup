// ==UserScript==
// @name           Main Page Animations
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Animates selected elements on the mainpage.
// @include        http://*.wikia.com/*
// ==/UserScript==
 

//Opens and closes community links
$('#communitytitle').click(function(){
	if (timerTime > 0) {
		jQuery.noop();
	} else {
		if ($('#communitylinks').hasClass('closed')) {
			$('#communitylinks').removeClass('closed').addClass('opened').animate({ height: "285px" }, 1000).css('padding-top','5px');
			$('#communitytitle').text('Свернуть список сообществ');
			timerTime = 500
		} else if ($('#communitylinks').hasClass('opened')) {
			$('#communitylinks').removeClass('opened').addClass('closed').animate({ height: "0px" }, 1000).css('padding-top','0px');
			$('#communitytitle').text('Развернуть список сообществ');
			timerTime = 500
		}
	}
});