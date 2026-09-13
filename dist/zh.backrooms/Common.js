// Fandom Compass图标
(function () {
    var img = $('<img>', { title: '本站点已是Fandom Compass计划的成员之一。' }).css({ 'height': '70px', 'position': 'relative', 'top': '20px', 'user-select': 'none' });
    $('<a>', { class: 'compass-wiki-badge', href: '//community.fandom.com/wiki/Fandom_Compass' }).append(img)
        .appendTo('.fandom-community-header__community-name-wrapper');
    function changeSrc() { img.attr('src', $('body').attr('data-theme') === 'dark' ? 'https://static.wikia.nocookie.net/backrooms/images/c/ca/Fandom_Compass_dark.png/revision/latest?cb=20250412193710&format=original&path-prefix=zh' : 'https://static.wikia.nocookie.net/backrooms/images/1/18/Fandom_Compass_light.png/revision/latest?cb=20250412193642&format=original&path-prefix=zh'); }
    changeSrc();
    new MutationObserver(changeSrc).observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
})();

// 遥控音频
(function () {
    $('.js-action-play').each(function () {
        var button = this;
        $(button).css('cursor', 'pointer');
        var targetId = $(button).attr('data-media-id');
        if (!targetId) return;
        var target = $('.media-id-' + targetId + ' .mw-file-element')[0];
        if (!target) return;
        $(button).on('click', function () {
            if (target.paused || target.ended) target.play();
            else target.pause();
        });
    });
})();

mw.loader.load(['mediawiki.util']);
mw.hook('wikipage.content').add(function () {
    // [[Template:JSImport]]
    $('span.import-js').each(function () {
        var articles = $(this).attr('data-articles').split('|');
        importArticles({ type: 'script', articles: articles });
        // 'importArticles' only supports articles in MediaWiki namespace
    });

    // [[Template:CSS]]
    $('span.import-css').each(function () {
        var $this = $(this);
        var css = mw.util.addCSS($this.attr('data-css'));
        var $style = $(css.ownerNode);
        $style.addClass('import-css').attr({
            'data-css-hash': $this.attr('data-css-hash'),
            'data-from': $this.attr('data-from'),
            'data-trigger': $this.attr('data-trigger')
        });
        var trigger = $this.attr('data-trigger');
        var triggerOpened = false;
        if (trigger !== 'none') {
            css.disabled = true;
            $('.csstrigger-' + trigger).css('cursor', 'pointer').click(function () {
                css.disabled = !css.disabled;
                triggerOpened = true;
            });
        }

        // 页顶CSS控件
        $('.css-toggler').click(function () {
            if (trigger !== 'none' && !triggerOpened) return;
            css.disabled = !css.disabled;
        });
    });

    // 页顶音频控件
    $('.audio-toggler').click(function () {
        $('audio').each(function () {
            if (this.paused || this.ended) this.play();
            else this.pause();
        });
    });

    // [[Template:Button Audio]]
    $('.t-audio').each(function () {
        var toggle = $(this).attr('data-toggle');
        if (!toggle) return;
        var $target = $('.t-audio-toggle-' + toggle);
        $target.click(function () {
            var audio = $target.find('audio')[0];
            if (!audio) return;
            if (audio.paused || audio.ended) audio.play();
            else audio.pause();
        });
    });

    // [[Template:SitenoticeTab]]
    $('.sitenotice-tab-container').each(function () {
        var $container = $(this);
        var $tabs = $container.children('.sitenotice-tab');
        var $tabNo = $container.find('.sitenotice-tab-no');
        function switchTab(offset) {
            return function () {
                var no = Number($tabNo.text()) + offset;
                var count = $tabs.length;
                if (no < 1) no = count;
                else if (no > count) no = 1;
                $tabs.hide().eq(no - 1).show();
                $tabNo.text(no);
            };
        }
        $container.find('.sitenotice-tab-arrow.prev').click(switchTab(-1));
        $container.find('.sitenotice-tab-arrow.next').click(switchTab(1));
    });

    // 修复讨论板链接
    $('a[target="_blank"]').each(function () {
        var $a = $(this);
        var href = $a.attr('href');
        try {
            var url = new URL(href, location.origin);
            if (url.origin === location.origin && (url.pathname === '/zh/f' || url.pathname.startsWith('/zh/f/')))
                $a.removeAttr('target');
        } catch (e) { }
    });
});

// CSS预览
(function () {
    var page = mw.config.get('wgPageName');
    var model = mw.config.get('wgPageContentModel');
    if (!page || model !== 'css') return;
    var key = 'cssPreview:' + page;
    var selector = 'style[data-injected-from="' + CSS.escape(page) + '"]';
    if (window[key] || $(selector).length) return;
    window[key] = true;
    fetch(mw.util.getUrl(page, { action: 'raw', ctype: 'text/css' }),
        { credentials: 'same-origin' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function (css) {
            if (!css || $(selector).length) return;
            $('<style>', { 'data-injected-from': page, text: css })
                .appendTo('head');
        })
        .catch(function (err) {
            delete window[key];
            console.error('加载CSS源失败: ', page, err);
        });
}());