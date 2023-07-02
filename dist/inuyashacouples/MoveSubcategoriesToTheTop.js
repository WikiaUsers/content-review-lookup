-function (config) {
    // moves subcats to trending pages
    if (!window.mw || !window.mw.Api) return;
    var position = 0,// 0: after, 1: before, 2: into (not implmntd), 3: instead of (not implmntd)
        mwc = mw.config.get(['wgNamespaceNumber', 'wgUserName', 'wgPageName']),
        api = new mw.Api(),
        lazy = {counter: []},
        $target = $('.category-page__trending-pages'),
        $ul = $('<ul>', {
            class: 'cathoist-container category-page__trending-pages',
        });
    if (config.loaded || !mwc.wgUserName || mwc.wgNamespaceNumber !== 14) return;
    config.loaded = !0;
    config.countMeth = (config.countMeth && ['escape', 'markdown', 'parse', 'plain'].indexOf(config.countMeth) > -1) ? config.countMeth : 'parse';
    if (!$target.length) {
        $target = $('.category-page__total-number');
        position = 1;
    }
    if (!$target.length) return;
    api.get({
        action: 'query',
        generator: 'categorymembers',
        gcmtype: 'subcat',
        gcmlimit: 500,
        gcmtitle: mwc.wgPageName,
        prop: 'categoryinfo',
    })
    .done(function(data) {
        if (!data || data.error) {
            console.log('cathoist.get error', data);
            return;
        }
        var cats = Object.values((data.query || {}).pages || {});
        if (!cats.length) return;
        cats.forEach(function(cat) {
            var catinfo = cat.categoryinfo || {},
                $a = $('<a>', {
                    class: 'category-page__trending-page-title',
                    text: cat.title,
                    href: new mw.Title(cat.title).getUrl()
                }),
                $li = $('<li>', {
                    class: 'category-page__trending-page',
                }),
                $count = $('<span>', {
                    class: 'cathoist-count',
                    text: ' (' + catinfo.size + ')',
                    title: '<cathoist-count-title>',
                });
            lazy.counter.push({
                msg: 'cathoist-count-title',
                el: $count,
                meth: config.countMeth || 'parse',
                attr: {type: 'attr', name: 'title'},
                param: [catinfo.subcats, catinfo.pages, catinfo.files]
            });
            $li.append($a).append($count);
            $ul.append($li);
        });
        if (lazy.counter.length) {
            mw.hook('dev.i18nbeta').add(function(i18n) {
                i18n.loadMessages('MoveSubcategoriesToTheTop').done(function(i18n) {
                    if (!lazy || !lazy.counter || !lazy.counter.length) return;
                    lazy.counter.forEach(function(data) {
                        var msg = i18n.msg.apply(i18n.msg, [data.msg].concat(data.param || []));
                        msg.lazyUpdate(data.meth, data.el, data.attr);
                    });
                });
            });
            if (!window.dev || !window.dev.i18nbeta) importArticle({ type: 'script', article: 'u:dev:I18n-js/beta.js' });
        }
        switch (position) {
            case 0:
                $ul.insertAfter($target);
                break;
            case 1:
                $ul.insertBefore($target);
                break;
            case 2:
                // insert into the $target
                break;
            case 3:
                // replace the $target
                break;
        }
    })
    .fail(function(data) {
        console.log('cathoist.fail', data);
    });

    //importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });
    //importArticle({ type: 'script', article: 'u:dev:I18n-js/beta.js' });
}(window.catHoist = window.catHoist || {});