/*----------------------------- Пояснение ------------------------------------*/
// Скрипт имеет следующие особенности:
// * Выполняется один раз при загрузке страницы, после чего доступ к нему не возможен
// * Может не выдвавать ошибки при выполнении и не выполнять код после ошибки
// * К функциям, не привязанным к конкретным объектам DOM, после выполнения скрипта нельзя обратиться

/*----------------------------- Содержание -----------------------------------*/
// * Импорт
// * Настройки
// * Блок "Новые страницы"
// * Кнопка "Back To Top"
// * Случайный фон страницы
// * Слайдер на jqueryUI - Используется на главной странице
// * Вспрывающие подсказки при наведении на ссылку
// * Изменение раскладки выделеного текста в редакторе кода
// * Fix сворачиваемых, сортируемых таблиц
// * Fix галереи-слайдшоу после перехода на UCP
// * Добавление функции отображения маркеров при мастабировании интерактивной карты
// * Подключение функций после загрузки страницы

// Переопределение переменных wiki, чтобы скрипты ниже использовали общие значения
window.wikiconfig = mw.config.values;
/*-------------------------------- Импорт ------------------------------------*/
// Викификатор
if (wikiconfig.wgAction == 'edit' || wikiconfig.wgAction == 'submit') {
	importScriptURI('http://ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
}

/*------------------------------- Настройки ----------------------------------*/
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
	r( /\*\[/g, '* [' );
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

/*----------------------------- Блок "Новые страницы" ------------------------*/
// Блок правой панели. Всзято с вики "Убежище"
$(function(){
	if (
		$('#WikiaRail').length
		&& wikiconfig.wgCanonicalNamespace != 'Special'
		&& wikiconfig.wgCanonicalNamespace != 'MediaWiki'
	)
	$('<section class="rail-module"></section>')
		.appendTo('#WikiaRail')
		.load('/ru/index.php?title=Template:RailModuleNewPages&action=render');
});

/*----------------------------- Кнопка "Back To Top" -------------------------*/
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
	if ( wikiconfig.skin == 'fandomdesktop' ) {
		$('<div id="backtotop" onClick="$( &#39;body,html&#39; ).animate ({scrollTop: 0}, 600 );">&#11014;</div>').appendTo('#WikiaBar'); 
	}
	hideFade();
}
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop ();
	});
}

var ButtonStart = 800;
var BackToTop = true; // prevent duplication

/*------------------------- Случайный фон страницы ---------------------------*/
function randomBackground () {
	var backgroundLight = [
	'https://static.wikia.nocookie.net/elderscrolls/images/b/b6/Background-13.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/f/f0/Background-14.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/e/eb/Background-15.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/9/9c/Background-16.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/0/0c/Background-17.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/2/2d/Background-18.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/4/4f/Background-19.jpg/revision/latest?path-prefix=ru'
	];
	
	var backgroundDark = [
	'https://static.wikia.nocookie.net/elderscrolls/images/c/cb/Bg1.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/a/a5/Bg2.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/f/ff/Bg3.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/3/32/Bg4.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/7/71/Bg5.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/7/71/Bg6.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/2/28/Bg7.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/c/c4/Bg8.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/6/60/Bg9.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/5/58/Background-04.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/1/13/Background-07.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/3/30/Background-08.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/e/e5/Background-20.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/b/bd/Background-22.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/4/4f/Background-23.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/a/a6/Background-26.jpg/revision/latest?path-prefix=ru',
	'https://static.wikia.nocookie.net/elderscrolls/images/1/10/Background-29.jpg/revision/latest?path-prefix=ru'
	];
	
	if (document.getElementsByTagName("body")[0].classList.contains('theme-fandomdesktop-dark')) {
		document.getElementsByTagName("body")[0].setAttribute("style", 'background-image:url('+ backgroundDark[Math.floor((backgroundDark.length) * Math.random())] + ') !important');
	}
	if (document.getElementsByTagName("body")[0].classList.contains('theme-fandomdesktop-light')) {
		document.getElementsByTagName("body")[0].setAttribute("style", 'background-image:url('+ backgroundLight[Math.floor((backgroundLight.length) * Math.random())] + ') !important');
	}
}

/*------------------------ Sliders на jqueryUI -------------------------------*/
// by User:Tierrie
var slideTime = 15000; // Время показа слайда (+1-3 секунды чтобы слайдеры не делали это одновременно)
mw.loader.using( ['oojs-ui-windows'], function() {
	$(document).ready(function() {
		$(".portal_slider").each(function(index, portal_slider) {
			$(portal_slider).tabs({ fx: {opacity:'toggle', duration:100} } );
			$("[class^=portal_sliderlink]").click(function() {
				$(portal_slider).tabs('select', this.className.replace("portal_sliderlink_", ""));
				return false;
			});
			$(portal_slider).find('#portal_next').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				return false;
			});
			$(portal_slider).find('#portal_prev').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') === 0) ? ($(portal_slider).tabs('length')-1) : $(portal_slider).tabs('option', 'selected') - 1 );
				return false;
			});
			var timerId = setTimeout(function tick() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				timerId = setTimeout(tick, slideTime + Math.floor(Math.random() * 3000));
			}, slideTime + Math.floor(Math.random() * 3000));
		});
	});
});

/*---------------- Вспрывающие подсказки при наведении на ссылку -------------*/
// Скрипт при наведении на ссылку анализирует целевую статью. Если он находит там текст с css-классом linkPreviewText, то создаётся окно предпросмотра.
// В окне предпросмотра отображается текст с css-классом linkPreviewText и изображение из контейнера с css-классом linkPreviewImage.
// Данные классы добавлены в большинство шаблонов. Изображения-ссылки не обрабатываются.
// Основано на скрипте LinkPreview.
// Автор: VitaZheltyakov
(function wrapper ($) {
	// Необходимые переменные
	var urlVars = new URLSearchParams(location.search);
	var Settings = window.pPreview || {},
		mwc = mw.config.get(['wgScriptPath', 'wgSassParams', 'wgArticlePath']);

	// killswitch
	Settings.dontrun = urlVars.get('nolp');
	if (Settings.dontrun) return;

	// Переменные по умолчанию
	var Defaults = {
		dock: '#mw-content-text, #article-comments',
		defimage: 'https://static.wikia.nocookie.net/elderscrolls/images/6/6c/Link_Preview_-_preloader.gif/revision/latest?cb=20210426191046&path-prefix=ru',
		noimage : 'https://vignette.wikia.nocookie.net/elderscrolls/images/8/89/Wiki-wordmark.png/revision/latest?cb=20191231170042&path-prefix=ru',
		delay : 100, // Задержка появления подсказки
		tlen : 1000, // Максимальная длина текста
		csize : 500, // Количество кэшированных страниц
		includeText : '.linkPreviewText:first', // Стили текста, которые включаются в окно предпросмотра
		includeImage : '.linkPreviewImage img', // Селектор получения изображения окна предпросмотра
	};
	var pp = {};
	pp.sync = []; //synchronization element
	var ncache = []; //{href, data}
	var loc = {lefts: 5, tops: 5}; //left: x, top: y, lefts: left-shift, clientx
	var currentEl = {}; //{href, ?data}
	//var api = new mw.Api();
	var apiUri;
	//exports
	Settings.wrapper = wrapper;
	Settings.context = this;
	Settings.f = {init: init, main: main, createuri: createUri, getpreview: ngetPreview,
					showpreview: nshowPreview, hidepreview: nhidePreview, cache: ncache,
					cacheof: ncacheOf, chkimagesrc: chkImageSrc};

	mw.loader.using(['mediawiki.util', 'mediawiki.Uri'], init);

	// Служебная функция - Запуск обработки целевой страницы
	pp.start = function (e) {
		if (e) {
				if (pp.sync.indexOf(e) > -1) {
					return false;
				}
		}
		Settings.process = true;
		pp.sync.push(e || Settings.process);
		return true;
	};
	
	// Служебная функция - Остановка обработки целевой страницы
	pp.stop = function (e) {
		hlpaHover();
		var epos = pp.sync.indexOf(e);
		if (epos !== -1) {
				pp.sync.splice(epos, 1);
		} else {
				pp.sync.splice(0, 1);
		}
		if (pp.sync.length === 0) {
				Settings.process = false;
		}
	};

	// Служебная функция - Проверка дубликатов в кэше
	pp.cachedupl = function () {
		var el = null;
		outer:
		for (var i = 0, len = ncache.length; i < len; i++) {
				for (var k = i + 1; k < len; k++) {
					if (ncache[i].href === ncache[k].href) {
						el = {v: ncache[i].href, i: i, k: k};
						break outer;
					}
				}
		}
	};

	// Функция иницилизации
	function init () {
		if (window.pPreview && window.pPreview.version) {
				return;
		}
		Settings.version = '1.0';
		apiUri = new mw.Uri({path: mwc.wgScriptPath + '/api.php'});
		//use api.v1/article/details
		Settings.apid = Settings.apid !== undefined ? Settings.apid : false;
		//show preview delay, ms
		Settings.delay = Settings.delay !== undefined ? Settings.delay : Defaults.delay;
		//suppress hover events for x ms
		//Settings.throttling = timeout until x
		Settings.throttle = Settings.throttle !== undefined ? Settings.throttle : 100;
		Settings.throttling = false;
		Settings.process = false;//processing data
		Settings.tlen = Settings.tlen !== undefined ? Settings.tlen : Defaults.tlen; //max text length
		//do not remove portable infobox on preprocess stage
		Settings.pibox = Settings.pibox !== undefined ? Settings.pibox : false;
		//cache size
		Settings.csize = Settings.csize !== undefined ? Settings.csize : Defaults.csize;
		Settings.defimage = Settings.defimage !== undefined ? Settings.defimage : Defaults.defimage; //default image path
		//no image found. class: npage-preview-noimage
		Settings.noimage = Settings.noimage !== undefined ? Settings.noimage : Defaults.noimage;
		//request to perform scaling
		Settings.scale = Settings.scale !== undefined ? Settings.scale : {r: '?', t: '/scale-to-width-down/250?'};
		//container (#WikiaMainContent, #mw-content-text etc)
		Settings.dock = !!Settings.dock ? Settings.dock : Defaults.dock;
		Settings.RegExp = Settings.RegExp || {}; //regexps
		//links 2 ignore
		Settings.RegExp.ilinks = Settings.RegExp.ilinks || [];
		//content to process. non-exclusive inclusion
		Settings.RegExp.includeText = Settings.RegExp.includeText || Defaults.includeText;
		Settings.RegExp.includeImage = Settings.RegExp.includeImage || Defaults.includeImage;
		//Settings.RegExp.hash = Settings.RegExp.hash || new RegExp('#.*');
		Settings.RegExp.wiki = Settings.RegExp.wiki || new RegExp('^.*?\/wiki\/', 'i');
		//delete tags
		Settings.RegExp.dtag = Settings.RegExp.dtag || new RegExp('<.*>', 'gm');
		//preprocess data (remove scripts)
		Settings.RegExp.prep = Settings.RegExp.prep || [];
		//set len restriction for apid.abstract
		if (Settings.apid) {
				Settings.tlen = (Settings.tlen > 500) ? 500 : Settings.tlen;
		}
		//ensure #mw-content-text is processed
		Settings.fixContentHook = Settings.fixContentHook !== undefined ? Settings.fixContentHook : true;
		window.pPreview = Settings;
		var thisPage = (createUri(location) || {}).truepath;
		//run once
		//dump sass params
		var sasses = '';
		$.each(mwc.wgSassParams, function(k, v) {
				sasses = sasses + '--sass-' + k + ':' + v + ';\n';
		});//each sassparam
		if (sasses.length) {
				sasses = ':root {\n' + sasses + '}';
				mw.util.addCSS(sasses);
		}
		Settings.RegExp.ilinks.push(thisPage); // ignore this page
		Settings.RegExp.ilinks.push(new RegExp(apiUri.path)); //ignore unknown
		var r;
		if (Settings.RegExp.prep instanceof RegExp) {
				r = Settings.RegExp.prep;
				Settings.RegExp.prep = [r];
		}//if regexp.prep is regexp
		if (!(Settings.RegExp.prep instanceof Array)) {
				Settings.RegExp.prep = [];
		}//if regexp.prep is not array
		Settings.RegExp.prep.push(/<script>[\s\S]*?<\/script>/igm);
		Settings.RegExp.prep.push(/<ref>[\s\S]*?<\/ref>/igm);
		Settings.defimage = chkImageSrc(Settings.defimage) ? Settings.defimage : Defaults.defimage;
		Settings.noimage = chkImageSrc(Settings.noimage) ? Settings.noimage : Defaults.noimage;
		Settings.f.pp = pp;
		window.ajaxCallAgain = window.ajaxCallAgain || [];
		window.ajaxCallAgain.push(main);
		mw.hook('wikipage.content').add(main);
		mw.hook('ppreview.ready').fire(Settings);
	}
	
	// Основная функция вызова
	function main ($cont) {
		if (Settings.fixContentHook && $cont && $cont.length) {
				Settings.fixContentHook = false;
				if ($cont.selector !== '#mw-content-text') {
					main($('#mw-content-text'));
				}
		}
		var $content, arr = [];
		Settings.dock.split(',').forEach(function (v) {
				var $c = {};
				if ($cont) {
					$c = ($cont.is(v) || $cont.parents(v).length) ? $cont : {};
				} else {
					$c = $(v);
				}
				$.merge(arr, $c);
		});
		$content = $(arr);
		$content.find('a').each(function() {
			var $el = $(this);
			// Запрет обработки ссылок с класом image и кнопок ("отмена" в редакторе) для избежания ошибки
			if ((!$el.hasClass('image'))&&(!$el.hasClass('oo-ui-buttonElement-button'))) {
				if ($el.attr('href')) {
					// Запрет обработки ссылок на правку статьи, кнопки "отпатрулировано", на просмотр изменений и истории, на откат, на сноски
					if (($el.attr('href').indexOf('action=edit') == -1)&&($el.attr('href').indexOf('action=markpatrolled') == -1)&&($el.attr('href').indexOf('diff=') == -1)&&($el.attr('href').indexOf('action=history') == -1)&&($el.attr('href').indexOf('action=rollback') == -1)&&($el.attr('href').indexOf('#') != 0)) {
						$el.off('mouseenter.pp mouseleave.pp');
						$el.on('mouseenter.pp', aHover);
						$el.on('mouseleave.pp', nhidePreview);
					}
				}
			}
		});
	}
	
	// Функция проверки существования изображения
	function chkImageSrc (src) {
		if (!src) return false;
		var url;
		try {
				url = new mw.Uri(src);
				return (/(\.wikia\.(com|org)|\.fandom\.com|\.wikia\.nocookie\.net)$/.test(url.host));
		}
		catch (e) {
				return false;
		}
		return false;
	}
	
	// Служебная функция - Получение ссылки
	function createUri (href, base) {
		var h;
		try {
				h = new mw.Uri(href.toString());
				h.pathname = h.path;
				h.hostname = h.host;
		} catch (e) {
				h = undefined;
		}
		if (h) {
				try {
					h.truepath = decodeURIComponent(h.pathname.replace(Settings.RegExp.wiki, ''));
					h.interwiki = h.path.split('/wiki/')[0];
					h.islocal = mwc.wgArticlePath.split('/wiki/')[0] === h.interwiki;
				}
				catch (e) {
					h = undefined;
				}
		}
		return h;
	}

	// Служебная функция - Помошник обработки hover-а
	function hlpaHover () {
		if (Settings.throttling) {
				clearTimeout(Settings.throttling);
				Settings.throttling = false;
		}
	}
	
	// Функция обработки hover-а
	function aHover (ev) {
		ev.stopPropagation();
		// Блокировка повторной обработки
		if (Settings.throttling || Settings.process) {
				return false;
		}
		Settings.throttling = setTimeout(hlpaHover, Settings.throttle);
		var hel = createUri($(ev.currentTarget).attr('href')) || {};
		// Если ссылка уже обрабатывается
		if (hel && hel.truepath && currentEl.href == hel.truepath) {
				return false;
		}
		currentEl.href = hel.truepath;
		currentEl.islocal = hel.islocal;
		currentEl.interwiki = hel.interwiki;
		// Устанавливаем положение окна предпросмотра
		loc.left = ev.pageX;
		loc.top = ev.pageY;
		loc.clientX = ev.clientX;
		loc.clientY = ev.clientY;
		setTimeout(ngetPreview.bind(this, ev), Settings.delay);
		return false;
	}
	
	// Служебная функция - Получение объекта
	function getObj (data, key) {
		var ret = [], r;
		for (var k in data) {
				if (data[k] instanceof Object) {
					if (k === key) {
						ret.push(data[k]);
					}
					r=getObj(data[k], key);
					if (r) ret=ret.concat(r);
				}
		}
		return ret;
	}
	
	// Служебная функция - Получение значения объекта
	function getVal (data, key) {
		var ret = [], r;
		for (var k in data) {
				if (data[k] instanceof Object) {
					r=getVal(data[k], key);
					if (r) {
						ret=ret.concat(r);
					}
				} else {
					if (k === key) {
						ret.push(data[k]);
					}
				}
		}
		return ret;
	}
	
	// Функция формирования окна предпросмотра
	function hlpPreview (uri, div, img, force, withD) {
		// Подгрузка изображения и создание текста
		var im, d;
		im = $('img', div);
		if (!Settings.apid && !withD) {
				if (img) {
					// Масштабирование изображения
					im.attr('src', Settings.scale ? img.replace(Settings.scale.r, Settings.scale.t) : img);
				} else {
					im.attr('src', Settings.noimage);
					im.addClass('npage-preview-noimage');
				}
		}
		d = {href: uri.truepath, data: div, uri: uri};
		ncache.push(d);
		nshowPreview(d.data, d.uri, force);
		pp.stop(d.href);
	}
	
	// Основная функция получения данных для предпросмотра
	function ngetPreview (ev, forcepath, withD) {
		var nuri = createUri($(ev.currentTarget).attr('href')) || {};
		nuri.truepath = forcepath || nuri.truepath;
		if (!nuri || !nuri.truepath) {
				return;
		}
		// Ссылка уже обрабатывается
		if (!pp.start(nuri.truepath)) {
				return;
		}
		//save bandwith
		// withd means fallback request, that should not be cancelled early
		if (!forcepath && !withD && (nuri.truepath != currentEl.href)) {
				pp.stop(nuri.truepath);
				return;
		}
		var ndata = ncacheOf(nuri.truepath);
		if (ndata) {
				nshowPreview(ndata.data, nuri, forcepath ? true : false);
				pp.stop(nuri.truepath);
				return false;
		}
		// Получаем данные целевой ссылки
		var apipage,
				iwrap = $('<img>', {src: Settings.defimage}),
				twrap = $('<div/>'),
				div = $('<div/>', {class: 'npage-preview'});
		if (Settings.apid || withD) {
				apipage = new mw.Uri(nuri.interwiki + '/api/v1/Articles/Details');
				apipage.extend({titles: nuri.truepath, abstract: Math.min(Settings.tlen, 500)});
				$.getJSON(apipage).done(function(data) {
					if (!data || data.error) {
						Settings.RegExp.ilinks.push(nuri.truepath); //and ignore it
						pp.stop(nuri.truepath);
						return this;
					}
					var item = data.items[Object.keys(data.items)[0]];
					if (!item) {
						Settings.RegExp.ilinks.push(nuri.truepath); //and ignore it
						pp.stop(nuri.truepath);
						return this;
					}
					iwrap.attr('src', item.thumbnail || Settings.noimage);
					iwrap.addClass(item.thumbnail ? '' : 'npage-preview-noimage');
					twrap.text(item.abstract);
					div.append(iwrap).append(twrap);
					hlpPreview(nuri, div, item.thumbnail, forcepath ? true : false, withD);
					return this;
				})
				.fail(function(data) {
					Settings.RegExp.ilinks.push(nuri.truepath); //and ignore it
					pp.stop(nuri.truepath);
					return this;
				});
				return;
		}
		apipage = new mw.Uri({path: nuri.interwiki + '/api.php'});
		apipage.extend({action: 'parse', page: nuri.truepath,
						prop: 'images|text', format: 'json', disablepp: '', redirects: ''});
		$.getJSON(apipage).done(function(data) {
				//parse: {text: {*: text}, images: []}
				if (!data.parse) {
					Settings.RegExp.ilinks.push(nuri.truepath); //and ignore it
					pp.stop(nuri.truepath);
					return this;
				}
				var img = $(data.parse.text['*']).find(Settings.RegExp.includeImage).attr('data-image-name');
				// Проверяем сущестование выборки чтобы избежать ошибки
				if ($(data.parse.text['*']).find(Settings.RegExp.includeText).length != 0) {
					var text = $(data.parse.text['*']).find(Settings.RegExp.includeText)[0].outerHTML;
				}
				else {
					pp.stop(nuri.truepath);
					return;
				}
				if (!img && !text) {
					pp.stop(nuri.truepath);
					if (Settings.apid || withD) {
						Settings.RegExp.ilinks.push(nuri.truepath); //and ignore it
						return this;
					} else {
						// last try; via api.v1
						return ngetPreview(ev, null, true);
					}
				}
				if (text=='') {
					pp.stop(nuri.truepath);
					return this;
				}
				text = $('<div/>', {class: 'tmpdivclass', style: 'visibility:hidden;display:none;'}).html(text);
				if (!Settings.pibox) { //remove portable infobox
					text.find('aside').prevAll().remove();
					text.find('aside').remove();
				}
				//convert 2 text
				text = text.text();
				//text clean up
				text = text ? text.replace(Settings.RegExp.dtag, '') : '';
				text = text.trim().substr(0, Settings.tlen);
				if (text.length > 0) {
					twrap.text(text);
					div.append(twrap);
				}
				div.prepend(iwrap);
				if (img) {
					//action=query&titles=file:.jpg&iiprop=url&prop=imageinfo&format=xml
					var im = 'file:' + img.trim();
					var apiimage = new mw.Uri({path: nuri.interwiki + '/api.php'});
					apiimage.extend({action: 'query', redirects: '',
									titles: im, iiprop: 'url', prop: 'imageinfo', format: 'json'});
					$.getJSON(apiimage.toString()).done(function(data) {
						var im, d1;
						d1 = data.query;
						if (d1.redirects) {
								var imRed = getVal(getObj(d1, 'redirects'), 'to');
								if (imRed.length > 0) {
									imRed = imRed[0];
								} else {
									//no url found
									iwrap.attr('src', Settings.noimage);
									return this;
								}
								var apiim = apiimage.clone().extend({titles: imRed});
								//resolve redirect
								$.getJSON(apiim.toString(), function(data) {
									var im = getVal(getObj(data, 'pages'), 'url');
									if (im.length > 0) {
										im = im[0];
									} else {
										//no url found. again
										im = false;
									}
									hlpPreview(nuri, div, im, forcepath ? true : false);
								}); //getjson. resolve redirect
						} else {
								im = getVal(getObj(d1, 'imageinfo'), 'url');
								if (im.length > 0) {
									im = im[0];
								} else {
									im = false;
								}
								hlpPreview(nuri, div, im, forcepath ? true : false);
						} //if redirects
						return this; //should be promise. but well
					}).fail(function(obj, stat, err) {
						hlpPreview(nuri, div, false, forcepath ? true : false);
						return this;
					});
				} else {
					hlpPreview(nuri, div, false, forcepath ? true : false);
				}
			// Удаляем подсказки по умолчанию
			$(ev.currentTarget).removeAttr("title");
		})
		.fail(function(obj, stat, err){
				pp.stop(nuri.truepath);
		});

		return false;
	}
	
	// Функция показа окна предпросмотра
	function nshowPreview (data, target, force) {
		if (!force && (currentEl.href !== target.truepath)) {
				return false;
		}
		
		// Скрытие открытых окн предпросмотра
		$('.npage-preview').remove();
		$('body').append($(data));

		// Предварительное скрытие окна предпросмотра
		$(data).css({left: -10000, top: -10000});
		$(data).show(200, function() { //;//fadeIn('fast');
				// Определение положения окна предпросмотра
				if ((loc.clientY + $(data).height()) > $(window).height()) {
					loc.top -= ($(data).height() + loc.tops);
				} else {
					loc.top += loc.tops;
				}
				if ((loc.clientX + $(data).width()) > $(window).width()) {
					loc.left -= ($(data).width() + loc.lefts);
				} else {
					loc.left += loc.lefts;
				}
		
				// Помещение окна в нужное место
				loc.left = loc.left > 0 ? loc.left : 0;
				loc.top = loc.top > 0 ? loc.top : 0;
				$(data).css({
					left: force ? $('body').scrollLeft() : loc.left,
					top: force ? $('body').scrollTop() : loc.top});
				mw.hook('ppreview.show').fire(data);
		});
	}
	
	// Функция скрытия окна предпросмотра
	function nhidePreview (data) {
		currentEl.href = '';
		$('.npage-preview').remove();
		//clear throttling
		hlpaHover();
	}
	
	// Функция работы с кэшем
	function ncacheOf (href) {
		// Возвращает кэш или null
		if (ncache.length > Settings.csize) ncache = []; //clear cache
		for (var i = 0, len = ncache.length; i < len; i++) {
				if (ncache[i].href === href) {
					return ncache[i];
				}
		}
		return null;
	}
})(jQuery);

/*----------- Изменение раскладки выделеного текста в редакторе кода ---------*/
// Основано на скрипте Wikificator.
// Автор: VitaZheltyakov
function switcher() {
	var Switcher_CantWork = 'Не поддерживается вашим браузером.';
	var Switcher_FullText = 'Выделите фрагмент текста для изменения раскладки.';

	// Регистрируем новый инструмент
	function registerSwitcher() {
		registerTool({
			name: 'switcher',
			position: 100,
			title: 'Раскладка',
			label: 'Изменить раскладку',
			callback: switchLayout,
			classic: {
				icon: 'https://static.wikia.nocookie.net/elderscrolls/images/a/a8/Switcher-icon.png/revision/latest?path-prefix=ru',
			},
			visual: {
				icon: 'https://static.wikia.nocookie.net/elderscrolls/images/a/a8/Switcher-icon.png/revision/latest?path-prefix=ru',
				modes: ['source'],
				addRightAway: true,
			},
		});
	}

	// Добавляем новуй инструмент на страницах редактирования
	if (wikiconfig.wgAction == 'edit' || wikiconfig.wgAction == 'submit') {
		registerSwitcher();
	}

	// Основная функция. Вызов происходит по нажатию на кнопку
	function switchLayout() {
		// Проверяем, поддерживает ли браузер регулярные выражения (RegExp) 
		if ('code'.replace(/d/g, 'r') != 'core') {
			alert(Switcher_CantWork);
			return
		}
		
		var $input, caretPosition, textScroll,
		txt = '',
		$CodeMirrorVscrollbar = $( '.CodeMirror-vscrollbar' );

		$input = $( '#wpTextbox1' );

		if ( $input ) {
			$input.focus();
			caretPosition = $input.textSelection( 'getCaretPosition', { startAndEnd: true } );
			if ( caretPosition ) {
				textScroll = ( $CodeMirrorVscrollbar.length ? $CodeMirrorVscrollbar : $input )
					.scrollTop();
				// Если ничего не выделено
				if ( caretPosition[0] === caretPosition[1] ) {
					alert(Switcher_FullText);
					return;
				} else {
					txt = $input.textSelection( 'getSelection' );
					processText();
					$input.textSelection( 'encapsulateSelection', {
						replace: true,
						peri: txt
					} );
					$input.textSelection( 'setSelection', {
						start: caretPosition[0],
						end: caretPosition[0] + txt.length
					} );
				}
				( $CodeMirrorVscrollbar.length ? $CodeMirrorVscrollbar : $input )
					.scrollTop( textScroll );
			}
			// Если что-то пошло не так
			else {
				alert(Switcher_CantWork);
				return;
			}
		}

		//Здесь производим замену в переменной txt - это отразится на выделенном фрагменте текста 
		function processText() {
			txt = txt.replace(/f/g, 'а');
			txt = txt.replace(/,/g, 'б');
			txt = txt.replace(/d/g, 'в');
			txt = txt.replace(/u/g, 'г');
			txt = txt.replace(/l/g, 'д');
			txt = txt.replace(/t/g, 'е');
			txt = txt.replace(/`/g, 'ё');
			txt = txt.replace(/;/g, 'ж');
			txt = txt.replace(/p/g, 'з');
			txt = txt.replace(/b/g, 'и');
			txt = txt.replace(/q/g, 'й');
			txt = txt.replace(/r/g, 'к');
			txt = txt.replace(/k/g, 'л');
			txt = txt.replace(/v/g, 'м');
			txt = txt.replace(/y/g, 'н');
			txt = txt.replace(/j/g, 'о');
			txt = txt.replace(/g/g, 'п');
			txt = txt.replace(/h/g, 'р');
			txt = txt.replace(/c/g, 'с');
			txt = txt.replace(/n/g, 'т');
			txt = txt.replace(/e/g, 'у');
			txt = txt.replace(/a/g, 'ф');
			txt = txt.replace(/\[/g, 'х');
			txt = txt.replace(/w/g, 'ц');
			txt = txt.replace(/x/g, 'ч');
			txt = txt.replace(/i/g, 'ш');
			txt = txt.replace(/o/g, 'щ');
			txt = txt.replace(/]/g, 'ъ');
			txt = txt.replace(/s/g, 'ы');
			txt = txt.replace(/m/g, 'ь');
			txt = txt.replace(/'/g, 'э');
			txt = txt.replace(/\./g, 'ю');
			txt = txt.replace(/z/g, 'я');

			txt = txt.replace(/F/g, 'А');
			txt = txt.replace(/</g, 'Б');
			txt = txt.replace(/D/g, 'В');
			txt = txt.replace(/U/g, 'Г');
			txt = txt.replace(/L/g, 'Д');
			txt = txt.replace(/T/g, 'Е');
			txt = txt.replace(/~/g, 'Ё');
			txt = txt.replace(/:/g, 'Ж');
			txt = txt.replace(/P/g, 'З');
			txt = txt.replace(/B/g, 'И');
			txt = txt.replace(/Q/g, 'Й');
			txt = txt.replace(/R/g, 'К');
			txt = txt.replace(/K/g, 'Л');
			txt = txt.replace(/V/g, 'М');
			txt = txt.replace(/Y/g, 'Н');
			txt = txt.replace(/J/g, 'О');
			txt = txt.replace(/G/g, 'П');
			txt = txt.replace(/H/g, 'Р');
			txt = txt.replace(/C/g, 'С');
			txt = txt.replace(/N/g, 'Т');
			txt = txt.replace(/E/g, 'У');
			txt = txt.replace(/A/g, 'Ф');
			txt = txt.replace(/\{/g, 'Х');
			txt = txt.replace(/W/g, 'Ц');
			txt = txt.replace(/X/g, 'Ч');
			txt = txt.replace(/I/g, 'Ш');
			txt = txt.replace(/O/g, 'Щ');
			txt = txt.replace(/\}/g, 'Ъ');
			txt = txt.replace(/S/g, 'Ы');
			txt = txt.replace(/M/g, 'Ь');
			txt = txt.replace(/"/g, 'Э');
			txt = txt.replace(/>/g, 'Ю');
			txt = txt.replace(/Z/g, 'Я');
			txt = txt.replace(/\//g, '.');
			txt = txt.replace(/\?/g, ',');
			txt = txt.replace(/\^/g, ':');
			txt = txt.replace(/\$/g, ';');
			
			txt = txt.replace(/є/g, 'э');
			txt = txt.replace(/Є/g, 'Э');
			txt = txt.replace(/ї/g, 'ъ');
			txt = txt.replace(/Ї/g, 'Ъ');
			txt = txt.replace(/\u0456/g,'ы');
			txt = txt.replace(/\u0406/g, 'Ы');
		}
	}
}

/*---------------- Fix сворачиваемых, сортируемых таблиц ---------------------*/
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

/*-------------- Fix галереи-слайдшоу после перехода на UCP ------------------*/
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

/*------- Добавление функции отображения маркеров при мастабировании карты ---*/
// После обновления карт не работает
/*function interactiveMapZoom() {
	window.setInterval(function() {
	  if ($(".leaflet-proxy").css("transform").split(',')[3] < 0.125) {
	    $(".leaflet-marker-icon").each(function( index ) {
	      if (($(this).attr("alt") == "zone3")||($(this).attr("alt") == "zone2")) {
	      	$(this).hide();
	      }
	      if ($(this).attr("alt") == "zone1") {
	      	$(this).show();
	      }
	    })
	  }
	  else if ($(".leaflet-proxy").css("transform").split(',')[3] >= 0.25) {
	    $(".leaflet-marker-icon").each(function( index ) {
	      $(this).show();
	    })
	  }
	  else {
	   $(".leaflet-marker-icon").each(function( index ) {
	      if (($(this).attr("alt") == "zone1")||($(this).attr("alt") == "zone2")) {
	      	$(this).show();
	      }
	      if ($(this).attr("alt") == "zone3") {
	      	$(this).hide();
	      }
	    })
	  }
	},500);
}
*/
/****************** Подключение функций после загрузки страницы ***************/
$(document).ready(function() {
	randomBackground();
	fixTable();
	//if ($("div.interactive-maps-container").length) {interactiveMapZoom();} // Запускаем при наличии интерактивной карты на странице
	setTimeout(function(){ slideRegenerate(); }, 2000); // Запускаем отложено, т.к. галереи подгружаются не сразу
	setTimeout(function(){ switcher(); }, 5000); // Запускаем отложено, т.к. инструменты подгружаются не сразу
	/* Фикс иконки и интерактива изображений в теле статьи */
	// setTimeout(function(){ $("a.image:last-child div").hide() }, 5000);
});