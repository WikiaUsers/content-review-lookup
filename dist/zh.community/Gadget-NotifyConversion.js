/**
 * @name NotifyConversion.js
 * @description Display banner notification for users set in a specific language (zh)
 */
mw.loader.using('mediawiki.util').then(function () {
 
    // 变量
    var conf = mw.config.get(),
        variant = conf.wgUserVariant,
        url = new URL(location.href)
        // now = Date.now()
 
    // 在特定条件下不弹框
    if (
        // now - localStorage.getItem('zhConversionNotify') < 30 * 24 * 60 * 60 * 1000 || / 一个月内忽视
        conf.wgContentLanguage !== 'zh' || // 语言变体不是zh
        conf.wgAction !== 'view' || // 不是浏览模式
        !conf.wgArticleId || // 页面不存在
        (variant !== 'zh' && variant !== 'zh-hans' && variant !== 'zh-hant') || // 已经是可靠的语言变体
        mw.util.getParamValue('uselang', url.href) // 使用URL参数所设置的语言
    ) {
        return
    }
 
    // 生成链接
    function variantLink(lang, text) {
        return $('<a>', { class: 'wds-button wds-is-secondary', href: mw.util.getUrl(conf.wgPageName, { variant: lang }), text: text }).css('margin-right', '.5em')
    }
 
    // new一个弹窗内容
    var $content = $('<div>', { id: 'time-' + now, class: 'wds-banner-notification__text' }).append(
        $('<div>').append(
            wgUVS('您现在使用的中文变体可能会影响一些词语繁简转换的效果。', '您現在使用的中文變體可能會影響一些詞語繁簡轉換的效果。'),
            $('<small>').append(
                '（',
                $('<a>', { target: '_balnk', href: '//zh.wikipedia.org/wiki/Help:字词转换的模式选择说明', text: wgUVS('了解更多', '了解更多') }),
                '）'
            )
        ),
        $('<div>', { text: wgUVS('建议您根据您的偏好切换到下列变体：', '建議您根據您的偏好切換到下列變體：'), style: 'font-size: 12px' }),
        $('<div>').append(
            variantLink('zh-cn', '大陆简体'),
            variantLink('zh-tw', '臺灣正體'),
            variantLink('zh-hk', '香港繁體'),
            conf.wgUserId ? $('<a>', { class: 'wds-button primary', target: '_blank', href: mw.util.getUrl('Special:Preferences'), text: wgUVS('更改我的内容语言变种首选项', '變更我的內容語言變體偏好設定'), style: 'margin-left: 1.5em; color: var(--wds-primary-button-label-color);' }) : '',
            conf.wgUserId ? $('<a>', { class: 'wds-button wds-is-secondary', target: '_blank', href: mw.util.getUrl('Special:Preferences#mw-prefsection-gadgets'), text: wgUVS('保持关闭此通知', '保持關閉此通知'), style: 'margin-left: 1.5em; color: var(--wds-secondary-button-label-color--hover;' }) : ''
        ) /* ,
        $('<label>', { style: 'display: block; margin: 0; padding: 0; font-size: 12px' }).append(
            $('<input>', { type: 'checkbox' }),
            '不再提示'
        ) */
    )

    /* 显示弹窗 */
	var conversionnoticeraw = '<div class="wds-banner-notification wds-warning warn"><div class="wds-banner-notification__icon"><svg class="wds-icon wds-icon-small" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M2.618 15.995L9 3.199l6.382 12.796H2.618zm15.276.554l-8-16.04C9.555-.17 8.445-.17 8.105.51l-8 16.04A1.003 1.003 0 0 0 1 18h16c.347 0 .668-.18.85-.476a.998.998 0 0 0 .044-.975zM8 7.975V9.98a1 1 0 1 0 2 0V7.975a1 1 0 1 0-2 0m1.71 4.3c-.05-.04-.1-.09-.16-.12a.567.567 0 0 0-.17-.09.61.61 0 0 0-.19-.06.999.999 0 0 0-.9.27c-.09.101-.16.201-.21.33a1.01 1.01 0 0 0-.08.383c0 .26.11.52.29.711.19.18.44.291.71.291.06 0 .13-.01.19-.02a.635.635 0 0 0 .19-.06.59.59 0 0 0 .17-.09c.06-.04.11-.08.16-.12.18-.192.29-.452.29-.712 0-.132-.03-.261-.08-.382a.94.94 0 0 0-.21-.33" fill-rule="evenodd"></path></svg></div><!-- span class="wds-banner-notification__text" -->' + $content.prop('outerHTML') + '<!-- /span --><svg class="wds-icon wds-icon-tiny wds-banner-notification__close" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M7.426 6.001l4.278-4.279A1.008 1.008 0 1 0 10.278.296L6 4.574 1.723.296A1.008 1.008 0 1 0 .295 1.722l4.278 4.28-4.279 4.277a1.008 1.008 0 1 0 1.427 1.426L6 7.427l4.278 4.278a1.006 1.006 0 0 0 1.426 0 1.008 1.008 0 0 0 0-1.426L7.425 6.001z" fill-rule="evenodd"></path></svg></div>';

	var conversionnoticewrapper = document.createElement('div');
	conversionnoticewrapper.innerHTML = conversionnoticeraw;
	var conversionnotice = conversionnoticewrapper.firstChild;

	var notificationcontainer = document.getElementsByClassName("wds-banner-notification__container");
    if (!notificationcontainer) return
	notificationcontainer[0].appendChild(conversionnotice);
 
    /* Unable to use
    / new一个弹窗
    var banner = new BannerNotification($content.prop('outerHTML'), 'warn');
 
    / 显示弹窗
    banner.show()
 
    / 点击关闭
    banner.onClose(function () {
        if ($('#time-' + now).find('input[type="checkbox"]').prop('checked')) {
            localStorage.setItem('zhConversionNotify', now)
        }
    })
    */
 
});