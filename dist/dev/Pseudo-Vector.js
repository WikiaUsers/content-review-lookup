/* Pseudo-Vector - style the MonoBook skin like Vector */

/*jslint browser, single */
/*global window, jQuery, mediaWiki */

(function ($, mw) {
    'use strict';

    // double-run protection + only run in monobook
    if (window.pseudoVectorLoaded || mw.config.get('skin') !== 'monobook') {
        return;
    }
    window.pseudoVectorLoaded = true;

    // default prefs + translations
    var prefs = {
        loadCss: true,
        addReadTab: true,
        addContributionsTab: false,
        disableWatchIcon: false,
        visualEditorIcons: false,
        language: mw.config.get('wgUserLanguage'),
        blacklist: [],
        cssArticles: [],
        readMsg: {
            // translations from https://translatewiki.net/wiki/Special:Translations?message=MediaWiki:Vector-view-view
            ar: 'اقرأ',
            be: 'Чытаць',
            de: 'Lesen',
            en: 'Read',
            es: 'Leer',
            el: 'Ανάγνωση',
            fr: 'Lire',
            fy: 'Lês',
            it: 'Leggi',
            ja: '閲覧',
            nl: 'Lezen',
            pl: 'Czytaj',
            'pt-br': 'Ler',
            qqx: '(pseudovector-read)',
            ru: 'Читать',
            uk: 'Читати',
            zh: '阅读'
        }
    };

    // load any custom prefs + make global
    window.pseudoVector = $.extend(true, prefs, window.pseudoVector);
    prefs = window.pseudoVector;

    // should Pseudo-Vector CSS be loaded?
    if (prefs.loadCss) {
        prefs.cssArticles.push('u:dev:MediaWiki:Pseudo-Vector.css');
    }

    // use the Visual Editor iconset on the editor toolbar
    if (prefs.visualEditorIcons) {
        prefs.cssArticles.push('u:dev:MediaWiki:MonobookIconsVE/light.css');
    }

    // if there are CSS pages to load and current domain is not in the blacklist, load CSS
    if (prefs.cssArticles.length && $.inArray(location.hostname, prefs.blacklist) === -1) {
        mw.loader.load(
            '//dev.wikia.com/load.php' +
                    '?debug=' + mw.config.get('debug') +
                    '&lang=' + encodeURIComponent(prefs.language) +
                    '&mode=articles' +
                    '&articles=' + encodeURIComponent(prefs.cssArticles.join('|')) +
                    '&only=styles',
            'text/css'
        );
    }

    // JS-based tweaks
    $(function () {
        // add 'Search' box text placeholder
        $('#searchInput').attr('placeholder', $('#mw-searchButton').val());

        // add 'Read' tab
        if (prefs.addReadTab && mw.config.get('wgArticleId')) {
            var $readTab = $('<li id="ca-view">').append(
                $('<a>', {
                    href: mw.util.getUrl(mw.config.get('wgRelevantPageName')),
                    text: prefs.readMsg[prefs.language] || prefs.readMsg.en
                })
            );

            // is another action tab selected already?
            if (!$('#p-cactions li.selected').not(':nth-child(1), :nth-child(2)').length) {
                $readTab.addClass('selected');
            }

            $('#ca-edit, #ca-viewsource').before($readTab);
        }

        // add 'Contributions' tab on pages in the user namespaces
        if (prefs.addContributionsTab && $.inArray(mw.config.get('wgNamespaceNumber'), [2, 3, 1200]) !== -1) {
            var $contribTab = $('#t-contributions').clone().attr('id', 'ca-contribs');
            $('#p-cactions li:nth-child(2)').after($contribTab);
        }

        // use text instead of icon on 'Watch'/'Unwatch' tab
        if (prefs.disableWatchIcon) {
            $('#ca-watch, #ca-unwatch').addClass('no-watch-icon');
        }
    });
}(jQuery, mediaWiki));