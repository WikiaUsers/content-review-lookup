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

	var notificationcontainer = document.getElementsByClassName("wds-banner-notification__container");
    if (!notificationcontainer) return
	notificationcontainer[0].appendChild(conversionnotice);

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