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
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Изображения в профайлах
var img =  {};
img["Ramdim"] = ['<img src="https://images.wikia.nocookie.net/__cb20140207193554/masseffect/ru/images/d/dd/IRammstein.png?uselang=ru" width="120px" height="120px">'];
if (typeof img[wgTitle] != "undefined") {
$('<div style="position:absolute; left:580px; top: 0px;">' + img[wgTitle] + '</div>').appendTo('.masthead-info');
}

window.railWAM = {
    logPage:"Project:WAM Log"
};