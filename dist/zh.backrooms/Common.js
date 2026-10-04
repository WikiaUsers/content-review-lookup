(function () {
    // Fandom Compass图标
    var img = $('<img>', {
        title: '本站点已是Fandom Compass计划的成员之一。',
        style: 'height: 70px; position: relative; top: 20px; user-select: none;'
    });
    $('<a>', {
        class: 'compass-wiki-badge',
        href: '//community.fandom.com/wiki/Fandom_Compass'
    }).append(img)
        .appendTo('.fandom-community-header__community-name-wrapper');
    function changeSrc() {
        img.attr('src', $('body').attr('data-theme') === 'dark' ?
            '//images.wikia.nocookie.net/backrooms/zh/images/c/ca/Fandom_Compass_dark.png' // [[File:Fandom Compass dark.png]]
            : '//images.wikia.nocookie.net/backrooms/zh/images/1/18/Fandom_Compass_light.png' // [[File:Fandom Compass light.png]]
        );
    }
    changeSrc();
    new MutationObserver(changeSrc).observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
})();

mw.loader.load(['mediawiki.util']);
mw.hook('wikipage.content').add(function () {
    // [[Template:JSImport]]
    if (mw.config.get('wgCategories').includes('引入JS脚本的页面')) {
        var wgScript = mw.config.get('wgScript');
        $('span.import-js').each(function () {
            $.each($(this).attr('data-articles').split('|'), function (_, article) {
                article = article.trim();
                if (!/^MediaWiki:/i.test(article)) return; // Only scripts in *MediaWiki* namespace of *THIS* wiki
                $('script[data-from]').filter(function () { return $(this).attr('data-from') === article; }).remove(); // Reloading
                var url = wgScript + '?action=raw&ctype=text/javascript&title=' + encodeURIComponent(article);
                $('<script>', {
                    class: 'import-js',
                    type: 'text/javascript',
                    src: url,
                    'data-from': article
                }).appendTo('head');
            });
        });
    }

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

    // 遥控音频
    $('.js-action-play').each(function () {
        var button = this;
        var targetId = $(button).attr('data-media-id');
        var target = $('.media-id-' + targetId + ' .mw-file-element')[0];
        if (!targetId || !target) return;
        $(button).css('cursor', 'pointer').on('click', function () {
            if (target.paused || target.ended) target.play();
            else target.pause();
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
        try {
            var url = new URL($a.attr('href'), location.origin);
            if (url.origin === location.origin && (url.pathname === '/zh/f' || url.pathname.startsWith('/zh/f/'))) $a.removeAttr('target');
        } catch (e) { }
    });
});

// CSS预览
(function () {
    var page = mw.config.get('wgPageName');
    if (!page || mw.config.get('wgPageContentModel') !== 'css' || $('style[data-injected-from="' + page + '"]').length) return;
    fetch(mw.util.getUrl(page, {
        action: 'raw',
        ctype: 'text/css'
    }), { credentials: 'same-origin' })
        .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            return res.text();
        })
        .then(function (css) {
            if (!css) return;
            $('<style>', {
                'data-injected-from': page,
                text: css
            }).appendTo('head');
        })
        .catch(function (err) { });
}());