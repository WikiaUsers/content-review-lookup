/* Any JavaScript here will be loaded for all users on every page load. */

/* MediaWiki:Gadget-site-lib.js */
window.wgUXS = function (wg, hans, hant, cn, tw, hk, sg, zh, mo, my) {
	var ret = {
		'zh': zh || hans || hant || cn || tw || hk || sg || mo || my,
		'zh-hans': hans || cn || sg || my,
		'zh-hant': hant || tw || hk || mo,
		'zh-cn': cn || hans || sg || my,
		'zh-sg': sg || hans || cn || my,
		'zh-tw': tw || hant || hk || mo,
		'zh-hk': hk || hant || mo || tw,
		'zh-mo': mo || hant || hk || tw
	}
	return ret[wg] || zh || hant || hans || tw || cn || hk || sg || mo || my; // 保證每一語言有值
}
 
window.wgULS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
	return wgUXS(mw.config.get('wgUserLanguage'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};
 
window.wgUVS = function (hans, hant, cn, tw, hk, sg, zh, mo, my) {
	return wgUXS(mw.config.get('wgUserVariant'), hans, hant, cn, tw, hk, sg, zh, mo, my);
};
 
window.importScriptCallback = function(page, ready) {
	importScriptURICallback(mw.config.get('wgServer') + mw.config.get('wgScript') + '?title=' + mw.util.wikiUrlencode(page) + '&action=raw&ctype=text/javascript', ready);
};
 
window.importScriptURICallback = jQuery.getScript;

/* Temporary fix: Remove style="height: 0px;" in <div class="banner-notifications-placeholder" style="height: 0px;"> */
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 1000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 2000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 3000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 4000);
setTimeout(function(){
	document.getElementsByClassName("banner-notifications-placeholder")[0].removeAttribute("style");
}, 5000);

/* 
 * @name VariantMenu.js
 * @desc JavaScript temporary implement for MAIN-21654
 */
(function () {

	if ( mw.config.get('wgPageContentModel') !== 'wikitext' &&  mw.config.get('wgPageContentModel') !== 'Scribunto' ) {
		return;
	}

	if ( mw.config.get('wgAction') !== 'view' ) {
		return;
	}

	if ($('.page-header__page-subtitle').length) {
		var variantlistcontainer = document.getElementsByClassName("page-header__page-subtitle")[0];
		variantlistcontainer.innerHTML = variantlistcontainer.innerHTML.replace(/(((  \|  )*<a href="([^"]*)" rel="nofollow" id="ca-varlang-([0-9]|[1-9]([0-9]*))">([^<]*)<\/a>)(  \|  <a href="([^"]*)" rel="nofollow" id="ca-varlang-([0-9]|[1-9]([0-9]*))">([^<]*)<\/a>)*)/, '');

		var pagesubtitlecontainer = document.getElementsByClassName("page-header__main")[0];
		pagesubtitlecontainer.innerHTML = pagesubtitlecontainer.innerHTML.replace('<div class="page-header__page-subtitle"></div>', '');
	}

	if ( wgArticleId === 0 || typeof wgArticleId === 'undefined' || wgArticleId === null ){
		return;
	}

	var url = window.location.href;

	var tidylink = url.replace(/((#)(.)*)/, '');

	var variant = mw.config.get('wgUserVariant');

	var variantid = function (lang){
		if ( lang === 'zh' ){
			return '0';
		} else if ( lang === 'zh-hans' ){
			return '1';
		} else if ( lang === 'zh-hant' ){
			return '2';
		} else if ( lang === 'zh-cn' ){
			return '3';
		} else if ( lang === 'zh-hk' ){
			return '4';
		} else if ( lang === 'zh-mo' ){
			return '5';
		} else if ( lang === 'zh-my' ){
			return '6';
		} else if ( lang === 'zh-sg' ){
			return '7';
		} else if ( lang === 'zh-tw' ){
			return '8';
		} else {
			return '';
		}
	};

	var variantname = function (lang){
		if ( lang === 'zh' ){
			return '不转换';
		} else if ( lang === 'zh-hans' ){
			return '简体';
		} else if ( lang === 'zh-hant' ){
			return '繁體';
		} else if ( lang === 'zh-cn' ){
			return '大陆简体';
		} else if ( lang === 'zh-hk' ){
			return '香港繁體';
		} else if ( lang === 'zh-mo' ){
			return '澳門繁體';
		} else if ( lang === 'zh-my' ){
			return '大马简体';
		} else if ( lang === 'zh-sg' ){
			return '新加坡简体';
		} else if ( lang === 'zh-tw' ){
			return '臺灣正體';
		} else {
			return '';
		}
	};

	var variantlink = function (lang){
		if ( tidylink.includes('?variant=') ){
			return '<li><a href="' + tidylink.replace(/(\?variant=zh)(-hans|-hant|-cn|-tw|-hk|-sg|-mo|-my|)/, '?variant=' + lang) + '" id="ca-varlang-' + variantid(lang) + '">' + variantname(lang) + '</a></li>';
		} else if ( tidylink.includes('?') && tidylink.includes('&variant=') ){
			return '<li><a href="' + tidylink.replace(/((\&)variant=zh)(-hans|-hant|-cn|-tw|-hk|-sg|-mo|-my|)/, '&variant=' + lang) + '" id="ca-varlang-' + variantid(lang) + '">' + variantname(lang) + '</a></li>';
		} else if ( tidylink.includes('?') ){
			return '<li><a href="' + tidylink + '&variant=' + lang + '" id="ca-varlang-' + variantid(lang) + '">' + variantname(lang) + '</a></li>';
		} else {
			return '<li><a href="' + tidylink + '?variant=' + lang + '" id="ca-varlang-' + variantid(lang) + '">' + variantname(lang) + '</a></li>';
		}
	};

	var variantmenu = '<div class="wds-dropdown page-header__languages page-header__variants"><div class="wds-dropdown__toggle"><span data-tracking="variant-dropdown">' + variantname(variant) + '</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"><template shadowmode="closed"><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></template></use></svg></div><div class="wds-dropdown__content wds-is-right-aligned"><ul class="wds-list wds-is-linked">' +  variantlink('zh') +  variantlink('zh-hans') +  variantlink('zh-hant') +  variantlink('zh-cn') +  variantlink('zh-hk') +  variantlink('zh-mo') +  variantlink('zh-my') +  variantlink('zh-sg') +  variantlink('zh-tw') + '</ul></div></div>';

	var variantmenucontainer = document.getElementsByClassName("page-header__contribution")[0].getElementsByTagName("div")[0];
	variantmenucontainer.innerHTML = '<!--Empty div to ensure $actionButton is always pushed to bottom of the container-->\n' + variantmenu + variantmenucontainer.innerHTML.replace('<!--Empty div to ensure $actionButton is always pushed to bottom of the container-->', '');

	$('head').append('<style type="text/css">.page-header__variants + .page-header__languages{margin-left: 5px;}</style>');

})();

/* NotifyConversion.js */
(function () {

	if ( mw.config.get('wgPageContentModel') !== 'wikitext' &&  mw.config.get('wgPageContentModel') !== 'Scribunto' ) {
		return;
	}
	
	var wgUserVariant = mw.config.get('wgUserVariant');
	if ( wgUserVariant !== 'zh' && wgUserVariant !== 'zh-hans' && wgUserVariant !== 'zh-hant' ) {
		return;
	}
	
	if ( mw.config.get('wgAction') !== 'view' ) {
		return;
	}
	
	if ( $.cookie('conversion-notice') ) {
		return;
	}
 
	if ( wgArticleId === 0 || typeof wgArticleId === 'undefined' || wgArticleId === null ){
		return;
	}
 
	var url = window.location.href;

	var tidylink = url.replace(/((#)(.)*)/, '');

	if ( url.includes('?uselang=') ){
		return;
	}
 
	var variant = mw.config.get('wgUserVariant');
 
	if ( variant !== 'zh' && variant !== 'zh-hans' && variant !== 'zh-hant' ){
		return;
	}
 
	var variantlink = function (lang, text) {
		if ( tidylink.includes('?variant=') ){
			return '<a class="wds-button wds-is-secondary" href="' + tidylink.replace(/(\?variant=zh)(-hans|-hant|-cn|-tw|-hk|-sg|-mo|-my|)/, '?variant=' + lang) + '">' + text + '</a>'
		} else if ( tidylink.includes('?') && url.includes('&variant=') ){
			return '<a class="wds-button wds-is-secondary" href="' + tidylink.replace(/((\&)variant=zh)(-hans|-hant|-cn|-tw|-hk|-sg|-mo|-my|)/, '&variant=' + lang) + '">' + text + '</a>'
		} else if ( url.includes('?') ){
			return '<a class="wds-button wds-is-secondary" href="' + tidylink + '&variant=' + lang + '">' + text + '</a>'
		} else {
			return '<a class="wds-button wds-is-secondary" href="' + tidylink + '?variant=' + lang + '">' + text + '</a>'
		}
	}
 
	var btnpref = function (){
		if ( typeof wgUserId !== 'undefined' && wgUserId !== null ){
			return '　　<a class="wds-button" href="/zh/wiki/Special:Preferences">' + wgUVS('更改我的内容语言变种首选项', '變更我的內容語言變體偏好設定') + '</a>'
		} else {
			return ''
		}
	}

	var conversionnoticeraw = '<div class="wds-banner-notification wds-warning warn"><div class="wds-banner-notification__icon"><svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M2.618 15.995L9 3.199l6.382 12.796H2.618zm15.276.554l-8-16.04C9.555-.17 8.445-.17 8.105.51l-8 16.04A1.003 1.003 0 0 0 1 18h16c.347 0 .668-.18.85-.476a.998.998 0 0 0 .044-.975zM8 7.975V9.98a1 1 0 1 0 2 0V7.975a1 1 0 1 0-2 0m1.71 4.3c-.05-.04-.1-.09-.16-.12a.567.567 0 0 0-.17-.09.61.61 0 0 0-.19-.06.999.999 0 0 0-.9.27c-.09.101-.16.201-.21.33a1.01 1.01 0 0 0-.08.383c0 .26.11.52.29.711.19.18.44.291.71.291.06 0 .13-.01.19-.02a.635.635 0 0 0 .19-.06.59.59 0 0 0 .17-.09c.06-.04.11-.08.16-.12.18-.192.29-.452.29-.712 0-.132-.03-.261-.08-.382a.94.94 0 0 0-.21-.33" fill-rule="evenodd"></path></svg></div><span class="wds-banner-notification__text">' + wgUVS('您现在使用的中文变体可能会影响一些词语繁简转换的效果。', '您現在使用的中文變體可能會影響一些詞語繁簡轉換的效果。') + '<small>（<a href="//zh.wikipedia.org/wiki/Help:字词转换的模式选择说明">' + wgUVS('了解更多', '了解更多') + '</a>）</small><br /><small>' + wgUVS('建议您根据您的偏好切换到下列变体：', '建議您根據您的偏好切換到下列變體：') + '</small><br />' + variantlink('zh-cn', '大陆简体') + ' ' + variantlink('zh-tw', '臺灣正體') + ' ' + variantlink('zh-hk', '香港繁體') + btnpref() + '</span><svg class="wds-icon wds-icon-tiny wds-banner-notification__close" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M7.426 6.001l4.278-4.279A1.008 1.008 0 1 0 10.278.296L6 4.574 1.723.296A1.008 1.008 0 1 0 .295 1.722l4.278 4.28-4.279 4.277a1.008 1.008 0 1 0 1.427 1.426L6 7.427l4.278 4.278a1.006 1.006 0 0 0 1.426 0 1.008 1.008 0 0 0 0-1.426L7.425 6.001z" fill-rule="evenodd"></path></svg></div>';

	var conversionnoticewrapper = document.createElement('div');
	conversionnoticewrapper.innerHTML = conversionnoticeraw;
	var conversionnotice = conversionnoticewrapper.firstChild;

	var notificationcontainer = document.getElementsByClassName("wds-banner-notification__container")[0];
	notificationcontainer.appendChild(conversionnotice);

	/*
	$btn.click(function () {
		$box.remove()
	});

	$btndonotshow.click(function () {
		$.cookie('conversion-notice', 1, {path: "/", expires: 365});
		$box.remove()
	});
	*/

})();