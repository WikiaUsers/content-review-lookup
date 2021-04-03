/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* Викификатор */

function addWikifButton() {
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return;
    var i = document.createElement('img');
    i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
    i.alt = i.title = 'викификатор';
    i.onclick = Wikify;
    i.style.cursor = 'pointer';
    toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
        addOnloadHook(addWikifButton);
}

/* AJAX-обновление некоторых страниц */

window.ajaxPages = [
    "Служебная:Watchlist",
    "Служебная:Contributions",
    "Служебная:Сообщество",
    "Служебная:WikiActivity",
    "Служебная:RecentChanges"
]; 
window.AjaxRCRefreshText = 'Автообновление'; //Отображаемое название
window.AjaxRCRefreshHoverText = 'Автоматически обновлять страницу'; //Отображаемая подсказка

/* Fix галереи-слайдшоу после перехода на UCP */
// Автор: VitaZheltyakov с The Elder Scrolls Wiki
function slideRegenerate(){
	if ($('.wikia-slideshow-first-image img').length === 0) return false;
	var slideWidth = $('#slideshow-0').attr('widths');
	if (typeof(slideWidth) === 'undefined') { slideWidth = 300; }
	var slideImageDataKey = $('.wikia-slideshow-first-image img').attr('data-image-key');
	var slideImageName = $('.wikia-slideshow-first-image img').attr('src');
	var slideImageNameSlice = slideImageName.indexOf("/revision");
	slideImageName = slideImageName.substring(0, slideImageNameSlice);
	var slideImagesCount = $('.wikia-slideshow-first-image').css('z-index');
	var slideImageIndex = slideImagesCount;
	$('.wikia-slideshow-wrapper').css('width', slideWidth);
	$('.wikia-slideshow-images').css({'width':slideWidth, 'height':slideWidth*0.75});
	$('.wikia-slideshow-first-image img.thumbimage').attr('src', slideImageName+'/revision/latest/smart/width/'+(slideWidth-2).toString()+'/height/'+(slideWidth*0.75-2).toString()+'?path-prefix=ru')
		.attr({'data-src':slideImageName+"/revision"});
	$('.wikia-slideshow-images li img.thumbimage').attr({'width':slideWidth-2, 'height':slideWidth*0.75-2})
		.css({'width':slideWidth-2, 'height':slideWidth*0.75-2});
	$('.wikia-slideshow-first-image a.wikia-slideshow-image').unbind('click')
		.addClass('image')
		.css('width', slideWidth-80)
		.attr('href', slideImageName+'/revision/latest?path-prefix=ru')
		.append($('<img>', {'data-image-key': slideImageDataKey}));
	$('.wikia-slideshow-next, .wikia-slideshow-prev').unbind('click');
	
	$('.wikia-slideshow-prev').mouseup(function(){
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
		slideImageIndex = Number.parseInt(slideImageIndex) + 1;
		if (slideImageIndex > slideImagesCount) slideImageIndex = 0;
		slideImageName = $('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-src');
		slideImageDataKey = $('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-image-key');
		slideImageNameSlice = slideImageName.indexOf("/revision");
		slideImageName = slideImageName.substring(0, slideImageNameSlice);
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('src', slideImageName+'/revision/latest/smart/width/'+(slideWidth-2).toString()+'/height/'+(slideWidth*0.75-2).toString()+'?path-prefix=ru');
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] a.wikia-slideshow-image').unbind('click')
			.addClass('image')
			.css('width', slideWidth-80)
			.attr('href', slideImageName+'/revision/latest?path-prefix=ru')
			.append($('<img>', {'data-image-key': slideImageDataKey}));		
		$('.wikia-slideshow-toolbar-counter').text(String(Number.parseInt(slideImagesCount)-Number.parseInt(slideImageIndex)+1)+'/'+String(Number.parseInt(slideImagesCount)+1));
	});

	$('.wikia-slideshow-next').mouseup(function(){
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
		slideImageIndex = Number.parseInt(slideImageIndex) - 1;
		if (slideImageIndex == -1) slideImageIndex = slideImagesCount;
		slideImageName = $('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-src');
		slideImageDataKey = $('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-image-key');
		slideImageNameSlice = slideImageName.indexOf("/revision");
		slideImageName = slideImageName.substring(0, slideImageNameSlice);
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('src', slideImageName+'/revision/latest/smart/width/'+(slideWidth-2).toString()+'/height/'+(slideWidth*0.75-2).toString()+'?path-prefix=ru');
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
		$('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] a.wikia-slideshow-image').unbind('click')
			.addClass('image')
			.css('width', slideWidth-80)
			.attr('href', slideImageName+'/revision/latest?path-prefix=ru')
			.append($('<img>', {'data-image-key': slideImageDataKey}));	
		$('.wikia-slideshow-toolbar-counter').text(String(Number.parseInt(slideImagesCount)-Number.parseInt(slideImageIndex)+1)+'/'+String(Number.parseInt(slideImagesCount)+1));
	});
}

$(document).ready(function() {
	setTimeout(function(){ slideRegenerate(); }, 2000);
});