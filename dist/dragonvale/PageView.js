(function ($, mw) {
    'use strict';
    // The historical local filename predates the wiki rename to PageView.js.
    if (window.dvPageViewLoaded) return;
    window.dvPageViewLoaded = true;
    $(function () {
        mw.loader.using('mediawiki.api').then(function () {
            if (!mw.config.get('wgUserName')) return;
            var configuration;
            var applied = new WeakSet();
            function matches(page) {
                var matcher = page.matcher || {};
                var name = (mw.config.get('wgPageName') || '').replace(/_/g, ' ');
                var action = mw.config.get('wgAction');
                if (page.enabled === false) return false;
                if (matcher.pagePattern && !new RegExp(matcher.pagePattern).test(name)) return false;
                if (matcher.namespace !== undefined && matcher.namespace !== mw.config.get('wgNamespaceNumber')) return false;
                if (matcher.contentModel && matcher.contentModel !== mw.config.get('wgPageContentModel')) return false;
                if (matcher.action && matcher.action !== action) return false;
                if (matcher.editMode && matcher.editMode !== action) return false;
                // Historic whitelist entries bypass the custom view.
                if (Array.isArray(matcher.whitelist) && (matcher.whitelist.indexOf(mw.config.get('wgUserId')) !== -1 ||
                    matcher.whitelist.indexOf(mw.config.get('wgUserName')) !== -1)) return false;
                return !(matcher.excludeAdmin && (mw.config.get('wgUserGroups') || []).indexOf('sysop') !== -1);
            }
            function applyViews() {
                if (!configuration) return;
                configuration.forEach(function (page) {
                    try {
                        if (!matches(page) || !page.selector || !page.id || document.getElementById(page.id)) return;
                        var $target = $(page.selector).first();
                        if (!$target.length || applied.has($target[0])) return;
                        var tag = page.tag || 'div';
                        if (!/^(div|section|article|span|main)$/i.test(tag)) throw new Error('Unsupported container tag');
                        var $views = Array.isArray(page.views) && page.views.length ? $(page.views.join(',')) : $();
                        var $container = $(document.createElement(tag)).attr({ id: page.id, 'class': page.class || '',
                            'data-page': (mw.config.get('wgPageName') || '').replace(/_/g, ' ') });
                        applied.add($target[0]);
                        $target.replaceWith($container);
                        $views.hide();
                        mw.hook('dragonedit.container').fire($container);
                    } catch (error) { console.error('PageView: invalid view configuration', error); }
                });
            }
            mw.hook('wikipage.content').add(applyViews);
            new mw.Api().get({ action: 'query', prop: 'revisions', titles: 'Data:PageViews.json',
                rvprop: 'content', rvslots: 'main', formatversion: 2 }).then(function (result) {
                var page = result.query.pages[0];
                if (page.missing || !page.revisions) throw new Error('Data:PageViews.json is missing');
                configuration = JSON.parse(page.revisions[0].slots.main.content);
                if (!Array.isArray(configuration)) throw new Error('PageViews must be an array');
                applyViews();
                var observer = new MutationObserver(applyViews);
                observer.observe(document.body, { childList: true, subtree: true });
                window.addEventListener('pagehide', function () { observer.disconnect(); }, { once: true });
            }).catch(function (error) { console.error('PageView: unable to load custom views', error); });
        }).catch(function (error) { console.error('PageView: unable to load API', error); });
    });
})(jQuery, mediaWiki);