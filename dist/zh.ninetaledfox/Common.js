/* 此处的JavaScript将加载于所有用户每一个页面。 */
/**
 * 自动调用需要的组件
 */
$(function(){
    // 表格折叠
    if ($('table.collapsible').size() > 0 || mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') {
        mw.loader.load('ext.gadget.collapsible');
    }

    // Tab 插件
    if ($('.tabber').size() > 0 || mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') {
        mw.loader.load('ext.gadget.tabber');
    }

    // tt 模板优化
    var tip = $('.explain, abbr, acronym');
    if (tip.size() > 0) {
        mw.loader.using('jquery.tipsy', function(){
            tip.tipsy();
        });
    }

    // 新版MSP模板
    if ($('.sprite-icon').size() > 0 || $('.msp-multi').size() > 0 || mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit') {
        mw.loader.load('ext.gadget.msp');
    }

    if (mw.config.get('wgUserVariant') == 'zh-hant') {
        $('#n-calc-xy a').attr('href', 'http://wiki.52poke.com/calc/zh-hant/');
    }

    if (mw.config.get('wgTitle') == '神奇宝贝列表（按全国图鉴编号）/简单版') {
        $('#mw-content-text table.eplist td:nth-of-type(2)').each(function(){
            if ($.trim($(this).text()) == '[[]]') {
                $(this).text('');
            }
        });
    }

    var wishLink = $('a[href^="http://makeawish.52poke.net"]');
    if (wishLink.size() && mw.config.get('wgUserVariant') == 'zh-hant') {
        wishLink.attr('href', wishLink.attr('href').replace('zh-hans', 'zh-hant'));
    }

    // Experimental: Search HTTPS Only
    $('#searchform').attr('action', 'https://wiki.52poke.com/index.php');
});

(function() {
    if (mw.config.get('wgUserName')) {
        mw.config.set('Lazyload.imageHost', '//media.52poke.com');
        return;
    }
    mw.config.set('Lazyload.imageHost', '//s0.52poke.wiki');
    mw.config.set('Lazyload.disableHidpi', true);

    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    testWebP(function (supported) {
        if (supported && mw.config.get('wgTitle') !== '七賢人') {
            mw.config.set('Lazyload.imageHost', '//s1.52poke.wiki');
        }
    });
})();

// 在 iPad 上正常展示内容，避免默认以 980pt 放大
if (navigator.userAgent.indexOf('iPad') > -1) {
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0">');
}