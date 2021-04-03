/*------ Пояснение ------*/
// После перехода на UCP данный скрипт имеет следующие особенности:
// * Выполняется один раз при загрузке страницы, после чего доступ к нему не возможен
// * Может не выдвавать ошибки при выполнении и не выполнять код после ошибки
// * К функциям, не привязанным к конкретным объектам DOM, после выполнения скрипта нельзя обратиться

/*------ Содержание ------*/
// * Импорт
// * Настройки
// * Кнопка "Back To Top"
// * Template:Hover fix
// * Template:ExtImg - Возможно не используется
// * Быстрый индекс - неизвестная функция. Генерирует страницу с побуквенным списком статей
// * Случайный фон страницы
// * Слайдер на jqueryUI - Используется на главной странице
// * Fix сворачиваемых, сортируемых таблиц
// * Fix галереи-слайдшоу после перехода на UCP

/*------ Импорт ------*/
// Викификатор
if (wgAction == 'edit' || wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
}

// Old Skyrim Map O0o___o0O
if (wgPageName == 'Карта_(Skyrim)')
	importScript("MediaWiki:SkyrimMap.js");

/*------ Настройки ------*/
// Автообновление служебных страниц (AJAX Recent Changes)
var ajaxPages = ["Служебная:Contributions","Служебная:NewPages","Служебная:RecentChanges","Служебная:WikiActivity","Служебная:NewFiles","Служебная:Log","Служебная:Видео"];
var AjaxRCRefreshText = 'Автообновление';
var AjaxRCRefreshHoverText = 'Включить автообновление';

// ToolTips
window.tooltips_config = {
	noCSS: true
};

// OggPlayer
var oggPlayerButtonOnly = true;

// Настройки викификатора
window.wfPluginsT = window.wfPluginsT || [];
window.wfPluginsT.push(function (txt, r) {
	r( /<br>/g, '<br />' );
	r( /\{\{примечания\}\}/g, '<references />' );
});

window.wfPlugins = window.wfPlugins || [];
window.wfPlugins.push(function (txt, r) {
	r( /([\wа-яА-ЯёЁ])’(?=[\wа-яА-ЯёЁ])/g, '$1\'' );
	r( /(\d+)\s*[\-\—]\s*(\d+)/g, '$1–$2' );
	r( /\b([MCDLXVI]+)\s*[\-\—]\s*([MCDLXVI]+)\b/g, '$1–$2' );
	r( /\{\{примечания\}\}/g, '<references />' );
});

/*------ Кнопка "Back To Top" в футоре Oasis theme ------*/
// Created by Noemon from Dead Space Wiki
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}

function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop"><button type="button" value="Наверх" onClick="$( &#39;body,html&#39; ).animate ({scrollTop: 0}, 600 );">Наверх</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools'); 
		hideFade ();
	}	
}
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop ();
	});
}

var ButtonStart = 800;
var BackToTop = true; // prevent duplication

/*------ Template:Hover fix ------*/
if ('ontouchstart' in window || 'onmsgesturechange' in window) {
	$(document.documentElement).addClass('touchscreen');
}

/*------ Template:ExtImg ------*/
function ExtImg() { 
	var ExtImg_Link = $(this).data('img');
	$(this).html('<a href="' + ExtImg_Link + '" target="_blank"><img src="' + ExtImg_Link + '" alt="External Image" width="128px" />');
}

/*------ Быстрый индекс ------*/
if (wgCanonicalSpecialPageName === 'Search') {
var SearchNavTrigger = $('#mw-content-text .search-tabs');
	SearchNavTrigger.append('<li class="normal"><a href="#" id="charindex">Быстрый индекс</a></li>');
	$('#charindex').click(function() {
		$('.results-wrapper').load('/wiki/The_Elder_Scrolls_Wiki:Быстрый_индекс?action=render').css('width','640px');
	});
}

/*------ Случайный фон страницы ------*/
var imgs = [
'https://static.wikia.nocookie.net/elderscrolls/images/c/cb/Bg1.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/a/a5/Bg2.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/f/ff/Bg3.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/3/32/Bg4.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/7/71/Bg5.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/7/71/Bg6.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/2/28/Bg7.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/c/c4/Bg8.jpg/revision/latest?path-prefix=ru',
'https://static.wikia.nocookie.net/elderscrolls/images/6/60/Bg9.jpg/revision/latest?path-prefix=ru'
];

document.getElementsByTagName("body")[0].setAttribute("style", 'background-image:url('
+ imgs[Math.floor((imgs.length) * Math.random())] + ') !important');

/*------ Sliders на jqueryUI ------*/
// by User:Tierrie
mw.loader.using( ['jquery.ui.tabs'], function() {
	$(document).ready(function() {
		$('.factions img').hide();
		$('.factions img').removeAttr('width').removeAttr('height');
		var l=$('.factions tr').eq(1).find('td').height();
		$('.factions tr').eq(1).find('img').css('max-height', l);
		$('.factions img').show();
		if ($('.factions tr').eq(1).find('td').width()>=$('.factions img').width()) {
			$('.factions tr').eq(1).find('td').width($('.factions img').width());
		}
		$('.id_upper').each(function() { $(this).html($(this).html().toUpperCase()); });
		var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
		$("[class^=portal_sliderlink]").click(function() { // bind click event to link
			$tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
			return false;
		});
		$('#portal_next').click(function() {
			$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
			return false;
		});
		$('#portal_prev').click(function() { // bind click event to link
			$tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
		return false;
		});
	});
});

/*------- Fix сворачиваемых, сортируемых таблиц ---------*/
// Восстанавливает показ шапки сортировки
// Автор: VitaZheltyakov
function fixTable(){
	$(".sortable").each(function( index, element ) {
		if (!$(element).hasClass("mw-collapsed")) {
			$(element).find("thead tr").show();
		}
	});
	
	$(".mw-collapsible-toggle").each(function( index, element ) {
		$( element ).mouseup(function(){
			var prt = $( element ).parents(".sortable");
			var prtS = $( element ).parents("tr");
			if (prt.hasClass("mw-collapsed")) {
				prt.find("thead tr").show();
			}
			else { prt.find("thead tr").not(prtS).hide();}
		});
	});
}

/*------- Fix галереи-слайдшоу после перехода на UCP ------*/
// Восстанавливает поддержку параметра widths у галерей-слайдшоу
// Восстанавливает открытие изображения в окне при нажатии на него в галерее-слайдшоу
// Исправляет работу автоматической обрезки
// Документация по API работы с изображениями: github.com/Wikia/vignette
// Автор: VitaZheltyakov
function slideRegenerate(){
	$(".wikia-slideshow").each(function(index, slideshow) {
		if ($(slideshow).find('.wikia-slideshow-first-image img').length === 0) return false;
		var slideWidth = parseInt($(slideshow).attr('widths').replace(/\D+/g,""));
		if (typeof(slideWidth) === 'undefined') { slideWidth = 300; }
		var slideCrop = $(slideshow).attr('crop');
		if (typeof(slideCrop) === 'undefined') { slideCrop = true; }
		if (slideCrop != 'false') { slideCrop = true; }
		else slideCrop = false;
		var slideImageDataKey = $(slideshow).find('.wikia-slideshow-first-image img').attr('data-image-key');
		var slideImageName = $(slideshow).find('.wikia-slideshow-first-image img').attr('src');
		var slideImageNameSlice = slideImageName.indexOf("/revision");
		slideImageName = slideImageName.substring(0, slideImageNameSlice);
		var slideImagesCount = $(slideshow).find('.wikia-slideshow-first-image').css('z-index');
		var slideImageIndex = slideImagesCount;
		$(slideshow).find('.wikia-slideshow-wrapper').css('width', slideWidth);
		$(slideshow).find('.wikia-slideshow-images').css({'width':slideWidth, 'height':Math.round(slideWidth*0.75)});
		if (slideCrop) {
			$(slideshow).find('.wikia-slideshow-first-image img.thumbimage').attr('src', slideImageName+'/revision/latest/top-crop-down/width/'+(slideWidth-2).toString()+'/height/'+(Math.round(slideWidth*0.75)-2).toString()+'?path-prefix=ru')
				.attr({'data-src':slideImageName+"/revision"});
		}
		else {
			$(slideshow).find('.wikia-slideshow-first-image img.thumbimage').attr('src', slideImageName+'/revision/latest/fixed-aspect-ratio/width/'+(slideWidth-2).toString()+'/height/'+(Math.round(slideWidth*0.75)-2).toString()+'?fill=transparent&path-prefix=ru')
				.attr({'data-src':slideImageName+"/revision"});
		}
		$(slideshow).find('.wikia-slideshow-images li img.thumbimage').attr({'width':slideWidth-2, 'height':Math.round(slideWidth*0.75)-2})
			.css({'width':slideWidth-2, 'height':Math.round(slideWidth*0.75)-2});
		$(slideshow).find('.wikia-slideshow-first-image a.wikia-slideshow-image').unbind('click')
			.addClass('image')
			.css('width', slideWidth-80)
			.attr('href', slideImageName+'/revision/latest?path-prefix=ru')
			.append($('<img>', {'data-image-key': slideImageDataKey}));
		$(slideshow).find('.wikia-slideshow-next, .wikia-slideshow-prev').unbind('click');
	
		$(slideshow).find('.wikia-slideshow-prev').mouseup(function(){
			$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
			slideImageIndex = Number.parseInt(slideImageIndex) + 1;
			if (slideImageIndex > slideImagesCount) slideImageIndex = 0;
			slideImageName = $(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-src');
			slideImageDataKey = $(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-image-key');
			slideImageNameSlice = slideImageName.indexOf("/revision");
			slideImageName = slideImageName.substring(0, slideImageNameSlice);
			if (slideCrop) {
				$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('src', slideImageName+'/revision/latest/top-crop-down/width/'+(slideWidth-2).toString()+'/height/'+(Math.round(slideWidth*0.75)-2).toString()+'?path-prefix=ru');
			}
			else {
				$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('src', slideImageName+'/revision/latest/fixed-aspect-ratio/width/'+(slideWidth-2).toString()+'/height/'+(Math.round(slideWidth*0.75)-2).toString()+'?fill=transparent&path-prefix=ru');
			}
			$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
			$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] a.wikia-slideshow-image').unbind('click')
				.addClass('image')
				.css('width', slideWidth-80)
				.attr('href', slideImageName+'/revision/latest?path-prefix=ru')
				.append($('<img>', {'data-image-key': slideImageDataKey}));		
			$(slideshow).find('.wikia-slideshow-toolbar-counter').text(String(Number.parseInt(slideImagesCount)-Number.parseInt(slideImageIndex)+1)+'/'+String(Number.parseInt(slideImagesCount)+1));
		});

		$(slideshow).find('.wikia-slideshow-next').mouseup(function(){
			$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
			slideImageIndex = Number.parseInt(slideImageIndex) - 1;
			if (slideImageIndex == -1) slideImageIndex = slideImagesCount;
			slideImageName = $(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-src');
			slideImageDataKey = $(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('data-image-key');
			slideImageNameSlice = slideImageName.indexOf("/revision");
			slideImageName = slideImageName.substring(0, slideImageNameSlice);
			if (slideCrop) {
				$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('src', slideImageName+'/revision/latest/top-crop-down/width/'+(slideWidth-2).toString()+'/height/'+(Math.round(slideWidth*0.75)-2).toString()+'?path-prefix=ru');
			}
			else {
				$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] img.thumbimage').attr('src', slideImageName+'/revision/latest/fixed-aspect-ratio/width/'+(slideWidth-2).toString()+'/height/'+(Math.round(slideWidth*0.75)-2).toString()+'?fill=transparent&path-prefix=ru');
			}
			$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"]').fadeToggle();
			$(slideshow).find('.wikia-slideshow-images li[style*="z-index: '+slideImageIndex+';"] a.wikia-slideshow-image').unbind('click')
				.addClass('image')
				.css('width', slideWidth-80)
				.attr('href', slideImageName+'/revision/latest?path-prefix=ru')
				.append($('<img>', {'data-image-key': slideImageDataKey}));	
			$(slideshow).find('.wikia-slideshow-toolbar-counter').text(String(Number.parseInt(slideImagesCount)-Number.parseInt(slideImageIndex)+1)+'/'+String(Number.parseInt(slideImagesCount)+1));
		});
	});
}

$(document).ready(function() {
	setTimeout(function(){ slideRegenerate(); }, 2000);
	setTimeout(function(){ fixTable(); }, 2000);
});