/**
 * @name NotifyConversion.js
 * @description Display banner notification for users set in a specific language (zh)
 */
!(function () {
 
    // 变量
    var conf = mw.config.get(),
        variant = conf.wgUserVariant,
        url = new URL(location.href),
        now = Date.now()
 
    // 在特定条件下不弹框
    if (
        sessionStorage.getItem('zhConversionNotify') === 'skip' || //本次会话忽略过
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
    var $content = $('<div>', { id: 'time-' + now }).append(
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
            conf.wgUserId ? $('<a>', { class: 'wds-button', target: '_balnk', href: mw.util.getUrl('Special:Preferences'), text: wgUVS('更改我的内容语言变种首选项', '變更我的內容語言變體偏好設定'), style: 'margin-left: 1.5em' }) : ''
        ),
        $('<label>', { style: 'display: block; margin: 0; padding: 0; font-size: 12px' }).append(
            $('<input>', { type: 'checkbox' }),
            '不再提示'
        )
    )
 
    // new一个弹窗
    var banner = new BannerNotification($content.prop('outerHTML'), 'warn');
 
    // 显示弹窗
    banner.show()
 
    // 点击关闭
    banner.onClose(function () {
        if ($('#time-' + now).find('input[type="checkbox"]').prop('checked')) {
            sessionStorage.setItem('zhConversionNotify', 'skip')
        }
    })
 
})();