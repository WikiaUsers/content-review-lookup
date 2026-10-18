(function () {
    'use strict';
    const $body = $('body'),
        $head = $('head'),
        config = mw.config,
        wgPageName = config.get('wgPageName'),
        wgCategories = config.get('wgCategories'),
        wgScript = config.get('wgScript');

    // 自定快捷重定向
    mw.hook('wikiEditor.toolbarReady').add(() => {
        const options = $('.tool[rel="redirect"]').data('action').options;
        options.peri = '目标页面';
        options.post = ']]\n[[Category:重定向页面]]';
    });

    // Fandom Compass徽章
    (() => {
        const $img = $('<img>', {
            title: '本站点已是Fandom Compass计划的成员之一。'
        }),
            changeSrc = () => {
                $img.attr(
                    'src',
                    $body.attr('data-theme') === 'dark'
                        ? '//images.wikia.nocookie.net/backrooms/zh/images/c/ca/Fandom_Compass_dark.png'
                        : '//images.wikia.nocookie.net/backrooms/zh/images/1/18/Fandom_Compass_light.png'
                );
            };
        $('<a>', {
            class: 'compass-wiki-badge',
            href: '//community.fandom.com/wiki/Fandom_Compass'
        })
            .append($img)
            .appendTo('.fandom-community-header__community-name-wrapper');
        changeSrc();
        new MutationObserver(changeSrc)
            .observe($body[0], {
                attributes: true,
                attributeFilter: ['data-theme']
            });
    })();

    mw.hook('wikipage.content').add(() => {

        // [[Template:JSImport]]
        if (wgCategories.includes('引入JS脚本的页面')) {
            $('span.import-js').each(function () {
                $(this).attr('data-articles').split('|').forEach(article => {
                    article = article.trim();
                    if (!/^MediaWiki:/i.test(article)) return;
                    $(`script[data-from="${article}"]`).remove();
                    $('<script>', {
                        class: 'import-js',
                        type: 'text/javascript',
                        src: `${wgScript}?action=raw&ctype=text/javascript&title=${encodeURIComponent(article)}`,
                        'data-from': article
                    })
                        .appendTo($head);
                });
            });
        }

        // [[Template:CSS]]
        $('span.import-css').each(function () {
            const $this = $(this),
                css = mw.util.addCSS($this.attr('data-css')),
                $style = $(css.ownerNode),
                trigger = $this.attr('data-trigger');
            $style
                .addClass('import-css')
                .attr({
                    'data-css-hash': $this.attr('data-css-hash'),
                    'data-from': $this.attr('data-from'),
                    'data-trigger': trigger
                });
            let triggerOpened = false;
            if (trigger !== 'none') {
                css.disabled = true;
                $(`.csstrigger-${trigger}`)
                    .css('cursor', 'pointer')
                    .on('click', () => {
                        css.disabled = !css.disabled;
                        triggerOpened = true;
                    });
            }
            $('.css-toggler').on('click', () => {
                if (trigger !== 'none' && !triggerOpened) return;
                css.disabled = !css.disabled;
            });
        });

        // 页顶音频控件
        $('.audio-toggler').on('click', () => {
            $('audio').each(function () {
                this.paused || this.ended
                    ? this.play()
                    : this.pause();
            });
        });

        // 遥控音频
        $('.js-action-play').each(function () {
            const $button = $(this),
                target = $(`.media-id-${$button.attr('data-media-id')} .mw-file-element`)[0];
            if (!target) return;
            $button
                .css('cursor', 'pointer')
                .on('click', () => {
                    target.paused || target.ended
                        ? target.play()
                        : target.pause();
                });
        });

        // [[Template:SitenoticeTab]]
        $('.sitenotice-tab-container').each(function () {
            const $container = $(this),
                $tabs = $container.children('.sitenotice-tab'),
                $tabNo = $container.find('.sitenotice-tab-no'),
                switchTab = offset => {
                    let no = Number($tabNo.text()) + offset,
                        count = $tabs.length;
                    if (no < 1) no = count;
                    if (no > count) no = 1;
                    $tabs.hide().eq(no - 1).show();
                    $tabNo.text(no);
                };
            $container.find('.sitenotice-tab-arrow.prev')
                .on('click', () => switchTab(-1));
            $container.find('.sitenotice-tab-arrow.next')
                .on('click', () => switchTab(1));
        });

        // 修复讨论板链接
        $('a[target="_blank"]').each(function () {
            try {
                const $this = $(this),
                    url = new URL($this.attr('href'), location.origin);
                if (
                    url.origin === location.origin &&
                    (url.pathname === '/zh/f' || url.pathname.startsWith('/zh/f/'))
                )
                    $this.removeAttr('target');
            } catch (e) { }
        });

    });

    // CSS预览
    if (
        wgPageName &&
        config.get('wgPageContentModel') === 'css' &&
        !$(`style[data-injected-from="${CSS.escape(wgPageName)}"]`).length
    ) {
        fetch(
            mw.util.getUrl(wgPageName, {
                action: 'raw',
                ctype: 'text/css'
            }),
            { credentials: 'same-origin' }
        )
            .then(res => res.text())
            .then(css => {
                $('<style>', {
                    'data-injected-from': wgPageName,
                    text: css
                })
                    .appendTo($head);
            })
            .catch(() => { });
    }
})();