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
// * Вспрывающие подсказки при наведении на ссылку
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

/* Вспрывающие подсказки при наведении на ссылку */
// Скрипт при наведении на ссылку анализирует целевую статью. Если он находит там текст с css-классом linkPreviewText, то создаётся окно предпросмотра.
// В окне предпросмотра обображается текст с css-классом linkPreviewText и изображение из контейнера с css-классом linkPreviewImage.
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
		includeText : ['.linkPreviewText'], // Стили текста, которые включаются в окно предпросмотра
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
					cacheof: ncacheOf, chkimagesrc: chkImageSrc, preprocess: preprocess};

	mw.loader.using(['mediawiki.util', 'mediawiki.Uri'], init);

	// Служебная функция
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
	
	// Служебная функция
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
		//parse whole page. debug purposes mainly
		Settings.wholepage = urlVars.get('wholepage') || (Settings.wholepage !== undefined ? Settings.wholepage : false);
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
				// Запрет обработки ссылок с класом image для избежания ошибки
				if (!$el.hasClass('image')) {
					if ($el.attr('href')) {
						// Запрет обработки ссылок правки статьи
						if ($el.attr('href').indexOf('action=edit') == -1) {
							// Запрет обработки ссылок на сноски
							if ($el.attr('href').indexOf('#') != 0) { 
								$el.off('mouseenter.pp mouseleave.pp');
								$el.on('mouseenter.pp', aHover);
								$el.on('mouseleave.pp', nhidePreview);
							}
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
	
	// Функция выбора необходимого текста с целевой страницы
	function preprocess (text) {
		if (!(Settings.RegExp.prep instanceof Array) || Settings.RegExp.prep.length < 1) return '';
		var s = text,
				$s = $('<div>').html(s);
		if (Settings.RegExp.includeText && (Settings.RegExp.includeText instanceof Array)) {
				s = Settings.RegExp.includeText.map(function(v) {
					var $v = $s.find(v);
					if ($v.length) {
						$s.remove(v);
						return $v.map(function() {return this.outerHTML}).toArray().join();
					} else {
						return false;
					}
				})
				.filter(Boolean).join() || '';
		}
		Settings.RegExp.prep.forEach(function (v) {
				s = s.replace(v, '');
		});
		return s;
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
		
	// Неизвестная функция!!!!!!!!! - может вырезать
	function escapeRegExp(str) {
		return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	} //escapeRegExp
	
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
		if (!Settings.wholepage) apipage.extend({section: 0});
		$.getJSON(apipage).done(function(data) {
				//parse: {text: {*: text}, images: []}
				if (!data.parse) {
					Settings.RegExp.ilinks.push(nuri.truepath); //and ignore it
					pp.stop(nuri.truepath);
					return this;
				}
				var img = $(data.parse.text['*']).find(Settings.RegExp.includeImage).attr('data-image-name');
				var text = data.parse.text['*'];
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
				//preprocess (cleanup)
				text = preprocess(text);
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