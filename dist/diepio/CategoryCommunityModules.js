/**
 * @name            CategoryCommunityModules
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @protect         <nowiki>
 * @description     Makes the Special:Community modules pull from categories.
 */
require([
    'wikia.window',
    'jquery',
    'mw'
], function (window, $, mw) {
    'use strict';
    if (
        window.CategoryCommunityModulesLoaded ||
        mw.config.get('wgPageName') !== 'Special:Community'
    ) {
        return;
    }
    window.CategoryCommunityModulesLoaded = true;
    var settings = {
        'popularpages': 'Cleanup',
        'expand-article': 'Stubs'
    };
    var exclude = [];
    function init () {
        $.each(settings, process);
    }
    function process (k, v) {
        var cat = 'Category:' + v;
        var $container = $('.community-page-card-module[data-tracking="community-page-insights-' + k + '"]');
        $container.find('a.community-page-card-module-full-list-link').attr(
            'href',
            mw.util.getUrl(cat)
        );
        new mw.Api().get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: cat,
            cmprop: 'title',
            cmlimit: 'max'
        }).done(function (d) {
            if (d.error) {
                error(d.error);
                return;
            }
            var pages = [];
            d.query.categorymembers.forEach(function (value) {
                pages.push(value.title);
            });
            if (pages.length < 3) {
                $container.html('<i>No pages found!</i>');
                return;
            }
            $container.find('.community-page-card-module-article-data').each(function (index) {
                if (index + 1 > pages.length) {
                    return;
                }
                var $a = $(this).find('a');
                var page = random(pages);
                $a.attr(
                    'href',
                    mw.util.getUrl(page, {
                        action: 'edit'
                    })
                ).addClass('category-community-link');
                $a.find('span').text(page);
            });
        }).fail(error);
    }
    function random (pages) {
        var num = Math.floor(Math.random() * (pages.length + 1));
        var item = pages[num];
        if (exclude.indexOf(item) === -1) {
            exclude.push(item);
            return item;
        }
        return random(pages);
    }
    function error (err) {
        var notice = err || 'unknown';
        console.error('[CategoryCommunityModules] An error occured: ' + notice + '.');
    }
    mw.loader.using([
        'mediawiki.api',
        'mediawiki.util'
    ]).then(init);
});