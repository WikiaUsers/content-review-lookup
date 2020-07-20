(function ($, settings) {
    // msg enshrinker. codename: ens
    var p = {},
        mwc = mw.config.get(['wgUserLanguage', 'wgContentLanguage']);
    p.settings = settings.ens || (settings.ens = {});
    if (p.settings.p) return;
    p.settings.p = true;
    p.languages = {
        // language list - start
        en: {
            more: 'more',
            less: 'less',
        },
        qqx: {
            more: '<more>',
            less: '<less>',
        },
        ar: {
            more: 'أكثر',
            less: 'أقل'
        },
        be: {
            more: 'больш',
            less: 'менш',
        },
        de: {
            more: 'mehr',
            less: 'weniger'
        },
        fr: {
            more: 'plus',
            less: 'moins'
        },
        pl: {
            more: 'więcej',
            less: 'mniej'
        },
        ru: {
            more: 'больше',
            less: 'меньше',
        },
        tr: {
            more: 'daha fazla',
            less: 'daha az',
        },
        uk: {
            more: 'більше',
            less: 'менше',
        },
        'zh-hans': {
            more: '展开',
            less: '折叠',
        },
        'zh-hant': {
            more: '展開',
            less: '折疊',
        },
        // language list - stop
    };
    p.defaults = {
        height: 70,
        selector: '.msg-body, .article-comm-text',
    };
    p.settings.height = p.settings.height || p.defaults.height;
    p.settings.selector = p.settings.selector || p.defaults.selector;
    p.settings.languages = $.extend(true, {}, p.languages, p.settings.languages);
    p.lang = $.extend(true, {},
        p.settings.languages.qqx,
        p.settings.languages.en || {},
        p.settings.languages[mwc.wgUserLanguage] ||
        p.settings.languages[mwc.wgContentLanguage] || {}
    );
    p.button = $('<span>', {
        class: 'ens-button wds-button',
        style: 'position:absolute;display:block;bottom:0;min-height:1px;height:3px;padding:0px 2px 11px 2px;width:100%;text-align:center;opacity:0.5;',
        text: p.lang.more
    });
    p.shrink = function (el) {
        var $el = $(el);
        if (!el.dataset.ensHeight || el.dataset.ensHeight == $el.height()) {
            // enshrink
            el.dataset.ensHeight = $el.height();
            el.dataset.ensOverflow = $el.css('overflow');
            $el.height(p.settings.height);
            $el.css({overflow: 'hidden'});
            $el.find('.ens-button').text(p.lang.more);
        } else {
            // enlarge
            $el.height(el.dataset.ensHeight);
            $el.css({overflow: el.dataset.ensOverflow});
            $el.find('.ens-button').text(p.lang.less);
        }// if
    };// shrink
    p.process = function process ($content) {
        var $target = $content.find(p.settings.selector);
        $target.each(function () {
            var $this = $(this);
            if ($this.height() > p.settings.height) {
                var $button = p.button.clone();
                $button.attr('title', $this.text());
                $this.append($button);
                p.shrink(this);
            }
        });// each msg
    };// process
    $('body').on('click', '.ens-button', function (e) {
        var $target = $(e.target).closest(p.settings.selector);
        if (!$target.length) return;
        p.shrink($target.get(0));
    });
    mw.hook('wikipage.content').add(p.process);
})(jQuery, window.fng || (window.fng = {}));