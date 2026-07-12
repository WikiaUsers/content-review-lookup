// MediaWiki:Module-ColorInvert.js
// 全页面颜色取反模块
// 导入后自动生效，也可通过 window.ColorInvert 手动控制

(function(window, $, mw) {
    'use strict';

    // 防止重复加载
    if (window.ColorInvert && window.ColorInvert._loaded) return;

    var styleId = 'wiki-color-invert-style';
    var $style = null;

    /**
     * 创建/获取反色样式标签
     */
    function getStyleEl() {
        if (!$style) {
            $style = $('#' + styleId);
            if (!$style.length) {
                $style = $('<style>', {
                    id: styleId,
                    type: 'text/css'
                }).appendTo('head');
            }
        }
        return $style;
    }

    /**
     * 启用反色
     */
    function enable() {
        var css = [
            'html {',
            '    filter: invert(1) hue-rotate(180deg);',
            '    background-color: #fff;',
            '}',
            // 对图片和视频再次反转，保持它们原本的颜色
            'img, video, canvas, iframe, .no-invert {',
            '    filter: invert(1) hue-rotate(180deg);',
            '}'
        ].join('\n');

        getStyleEl().html(css);
        document.documentElement.classList.add('color-inverted');

        // 保存状态到本地存储
        try {
            localStorage.setItem('wiki-color-invert', 'true');
        } catch (e) {}

        mw.hook('colorInvert.toggle').fire(true);
    }

    /**
     * 关闭反色
     */
    function disable() {
        var $el = getStyleEl();
        $el.html('');
        document.documentElement.classList.remove('color-inverted');

        try {
            localStorage.setItem('wiki-color-invert', 'false');
        } catch (e) {}

        mw.hook('colorInvert.toggle').fire(false);
    }

    /**
     * 切换反色状态
     */
    function toggle() {
        if (isEnabled()) {
            disable();
        } else {
            enable();
        }
    }

    /**
     * 判断当前是否已启用反色
     */
    function isEnabled() {
        return document.documentElement.classList.contains('color-inverted');
    }

    // 对外暴露的API
    window.ColorInvert = {
        _loaded: true,
        enable: enable,
        disable: disable,
        toggle: toggle,
        isEnabled: isEnabled
    };

    // 如果之前保存过启用状态，自动恢复
    try {
        var saved = localStorage.getItem('wiki-color-invert');
        if (saved === 'true') {
            $(function() {
                enable();
            });
        }
    } catch (e) {}

    // 触发就绪事件，方便其他脚本感知
    mw.hook('colorInvert.ready').fire(window.ColorInvert);

    console.log('[ColorInvert] 模块已就绪，使用 ColorInvert.toggle() 切换反色');

})(window, jQuery, mediaWiki);