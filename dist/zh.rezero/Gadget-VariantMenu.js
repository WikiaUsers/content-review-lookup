/* 
 * @name VariantMenu.js
 * @desc JavaScript temporary implement for MAIN-21654
 */
(function () {

	if ($('.page-header__page-subtitle').length) {
		var variantlistcontainer = document.getElementsByClassName("page-header__page-subtitle")[0];
		variantlistcontainer.innerHTML = variantlistcontainer.innerHTML.replace(/(((  \|  )*<a href="([^"]*)" rel="nofollow" id="ca-varlang-([0-9]|[1-9]([0-9]*))">([^<]*)<\/a>)(  \|  <a href="([^"]*)" rel="nofollow" id="ca-varlang-([0-9]|[1-9]([0-9]*))">([^<]*)<\/a>)*)/, '');

		var pagesubtitlecontainer = document.getElementsByClassName("page-header__main")[0];
		pagesubtitlecontainer.innerHTML = pagesubtitlecontainer.innerHTML.replace('<div class="page-header__page-subtitle"></div>', '');
	}

	if ( mw.config.get('wgPageContentModel') !== 'wikitext' &&  mw.config.get('wgPageContentModel') !== 'Scribunto' ) {
		return;
	}

	if ( mw.config.get('wgAction') !== 'view' ) {
		return;
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

	var variantmenu = '<div class="wds-dropdown page-header__languages page-header__variants"><div class="wds-dropdown__toggle"><span data-tracking="variant-dropdown">' + variantname(variant) + '</span><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 12 12" class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron" id="wds-icons-dropdown-tiny"><defs><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></defs><use fill-rule="evenodd" xlink:href="#dropdown-tiny-a"><template shadowmode="closed"><path id="dropdown-tiny-a" d="M6.0001895,8.80004571 C5.79538755,8.80004571 5.5905856,8.72164496 5.43458411,8.56564348 L2.23455364,5.365613 C2.00575146,5.13681083 1.93695081,4.79280755 2.06095199,4.4936047 C2.18415316,4.19440185 2.47695595,4 2.80015903,4 L9.20021997,4 C9.52342305,4 9.81542583,4.19440185 9.93942701,4.4936047 C10.0634282,4.79280755 9.99462754,5.13681083 9.76582536,5.365613 L6.56579489,8.56564348 C6.4097934,8.72164496 6.20499145,8.80004571 6.0001895,8.80004571 Z"></path></template></use></svg></div><div class="wds-dropdown__content wds-is-not-scrollable wds-is-right-aligned" style="z-index: 2;"><ul class="wds-list wds-is-linked">' +  variantlink('zh') +  variantlink('zh-hans') +  variantlink('zh-hant') +  variantlink('zh-cn') +  variantlink('zh-hk') +  variantlink('zh-mo') +  variantlink('zh-my') +  variantlink('zh-sg') +  variantlink('zh-tw') + '</ul></div></div>';

	var variantmenucontainer = document.getElementsByClassName("page-header__contribution")[0].getElementsByTagName("div")[0];
	variantmenucontainer.innerHTML = '<!--Empty div to ensure $actionButton is always pushed to bottom of the container-->\n' + variantmenu + variantmenucontainer.innerHTML.replace('<!--Empty div to ensure $actionButton is always pushed to bottom of the container-->', '');

	$('head').append('<style type="text/css">.page-header__variants + .page-header__languages{margin-left: 5px;}</style>');

})();