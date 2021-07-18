!function (cfg) {
    var urlVars = new URLSearchParams(location.search),
        mwc = mw.config.get(['wgIsArticle', 'wgCategories', 'wgScript', 'wgScriptPath', 'wgPageName', 'wgFormattedNamespaces', 'wgUserLanguage']);
    if (!mwc.wgIsArticle || (mwc.wgCategories && mwc.wgCategories.length === 0)) return;
    var $cats = $('#articleCategories'),
        msgs = {
            cqrARemove: '<cqr-ask-remove>',
            cqrARemoveTitle: '<cqr-ask-remove-title>',
            cqrSuccess: '<cqr-success>',
            cqrNochange: '<cqr-nochange>',
            cqrFailRead: '<cqr-fail-read>',
            cqrFailWrite: '<cqr-fail-write>',
        },
        $x = $('<span>', {
            class: 'cqr-x',
            text:'x',
            href: 'cqr-x',
        });

    function log() {
        if (!cfg.debug) return;
        var a = [].slice.call(arguments);
        a.unshift('cqr');
        return console.log.apply(this, a);
    }// log
    
    function cook(text) {
        // capitalize and despacelize text
        if (!text) return '';
        var escapeRegex = mw.RegExp.escape || mw.util.escapeRegExp;
        return '[' + text.slice(0, 1).toUpperCase() + text.slice(0, 1).toLowerCase() + ']' + escapeRegex(text.slice(1)).replace(/[ _]/g, '[ _]');
    }// cook
    
    function getPage(pagename) {
        // get page content helper
        // not cached in order to minimize edit conflicts
        return $.get(mwc.wgScript, {action: 'raw', title: pagename});
    }// getData

    function savePage(pagename, content) {
        // save page content helper
        return $.post(mwc.wgScriptPath + '/api.php', {
            action: 'edit',
            title: pagename,
            text: content,
            watchlist: 'nochange',
            summary: 'category removed',
            minor: 'true',
            format: 'json',
            token: mw.user.tokens.get('editToken')
        });
    }// savePage
    
    function removeCat(cat) {
        // remove the cat. returns promise {status, data}
        // status: 0=ok, 1=zero replacements, 2=getpage fail, 3=savepage fail
        // data by status: 0: new data; 1: old data; 2/3: fail response
        var def = $.Deferred();
        getPage(mwc.wgPageName)
        .done(function(data) {
            var re = new RegExp('\\[\\[([Cc]ategory|' + cook(mwc.wgFormattedNamespaces[14]) + '):' + cook(cat) + '(\\|.*?)?' + '\\]\\]', 'g'),
                dataNew = data.replace(re, '');
            if (data === dataNew) {
                log('rc no replacements was made', re, data);
                def.reject({status: 1, data: data});
                return this;
            }
            log('rc dump', re, '\n', data, '\n', dataNew);
            savePage(mwc.wgPageName, dataNew)
            .done(function(data) {
                log('rc save done', this, data);
                if (!data || data.error) {
                    data.error = data.error || {};
                    def.reject({
                        status: 3,
                        data: (data.error.code || '') + ' ' + (data.error.info || '') +
                            ((data.error.code && data.error.info) ? '' : (' ' + data))
                    });
                } else {
                    def.resolve({status: 0, data: dataNew});
                }
            })// savePage done
            .fail(function(data) {
                log('rc save fail', data);
                def.reject({status: 3, data: data});
            });// savePage
            return this;
        })// getPage done
        .fail(function(data) {
            log('rc fail', data);
            def.reject({status: 2, data: data});
            return this;
        });// getPage
        return def.promise();
    }// removeCat

    function try2removeCat($container, cat) {
        // remove dispatcher
        // $container: parent li of the cat; cat: cat
        log('t2r', $container, cat);
        // we don't need x anymore:
        // if success, then nothing to x; if fail, then cat can't be x'ed
        $container.find('.cqr-x').remove();
        removeCat(cat)
        .done(function(d) {
            // hide removed cat. not remove, because of reasons
            $container.hide();
            report(msgs.cqrSuccess, 'confirm');
        })
        .fail(function(d) {
            switch (d.status) {
            case 1:
                report(msgs.cqrNochange, 'notify');
                break;
            case 2:
                report(msgs.cqrFailRead + '<br>' + d.data, 'warn');
                break;
            case 3:
                report(msgs.cqrFailWrite + '<br>' + d.data, 'warn');
                break;
            }
        });
    }// try2removeCat
    
    function report(content, type) {
        // report result helper
        mw.notify(content, {
            autoHideSeconds: 10,
            type: type
        });
    }// report
    
    function ask($container, cat) {
        // ask to del the cat. returns promise
        // resolve on lmb; reject on anykey (theoretically) or timer
        // $container: parent li of the cat; [cat]: cat
        var def = $.Deferred(),
            $ask = $('<span>', {
                class: 'cqr-ask button',
                text: msgs.cqrARemove,
                title: msgs.cqrARemoveTitle,
            }),
            timer = setTimeout(function() {
                $ask.remove();
                def.reject();
            }, 10000);
        $ask.click(function(e) {
            e.preventDefault();
            clearTimeout(timer);
            $ask.remove();
            if (e.which === 1) {
                def.resolve();
            } else {
                def.reject();
            }
            return !1;
        });
        // clean up. orphans will be invalidated automatically
        $('.cqr-ask').remove();
        $ask.width($container.width());
        $container.prepend($ask);
        return def.promise();
    }// ask
    
    function i18nLoad() {
        if (cfg.i18nloaded || mwc.wgUserLanguage === 'qqx') return;
        cfg.i18nloaded = !0;
        mw.hook('dev.i18nbeta').add(function(i18n) {
            i18n.loadMessages('CategoryQuickRemove').done(function(i18n) {
                msgs.cqrARemove = i18n.msg('cqr-ask-remove')
                    .lazyUpdate($('.cqr-ask').toArray(), {
                        type: 'fn',
                        name: 'text'
                    })
                    .plain();
                msgs.cqrARemoveTitle = i18n.msg('cqr-ask-remove-title')
                    .lazyUpdate($('.cqr-ask').toArray(), {
                        type: 'attr',
                        name: 'title'
                    })
                    .plain();
                msgs.cqrSuccess = i18n.msg('cqr-success').plain();
                msgs.cqrNochange = i18n.msg('cqr-nochange').plain();
                msgs.cqrFailRead = i18n.msg('cqr-fail-read').plain();
                msgs.cqrFailWrite = i18n.msg('cqr-fail-write').plain();
            });
        });
        if (!window.dev || !window.dev.i18nbeta) importArticle({type: 'script', article: 'u:dev:I18n-js/beta.js'});
    }// i18nLoad
    
    cfg.debug = cfg.debug || urlVars.get('debug') || urlVars.get('debug1');
    // unexpected behavior in the debug mode is expected and totally by design
    cfg.loaded = cfg.debug ? false : cfg.loaded;
    if (cfg.loaded || !$cats.length) return;
    cfg.loaded = !0;
    $('.cqr-x').remove();
    $cats.find('li:not(.tool):not(.last)').append($x.clone());
    $cats.find('.cqr-x').click(function(e) {
        var $this = $(this),
            $container = $this.closest('li'),
            cat = $container.find('a:first').text();
        log('cat', cat);
        i18nLoad();
        ask($container, cat).done(try2removeCat.bind(this, $container, cat));
        return !1;
    });
    cfg.exports = {
        log: log,
        cook: cook,
        getPage: getPage,
        savePage: savePage,
        removeCat: removeCat,
        try2removeCat: try2removeCat,
        report: report,
        ask: ask,
        i18nLoad: i18nLoad,
    };
    importArticle({type: 'style', article: 'u:dev:MediaWiki:CategoryQuickRemove.css'});
    mw.loader.using(['mediawiki.notify', 'mediawiki.util']);
}((window.fng = window.fng || {}).cqr = window.fng.cqr || {});