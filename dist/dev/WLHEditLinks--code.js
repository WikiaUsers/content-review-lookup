(function () {
    'use strict';

    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgNamespaceNumber',
        'wgVersion'
    ]);
    var isWhatLinksHere = config.wgCanonicalSpecialPageName === 'Whatlinkshere';
    var isFilePage = config.wgNamespaceNumber === 6;
    var i18n;
    var isUCP = config.wgVersion !== '1.19.24';

    if (window.WLHEditLinksLoaded || !(isWhatLinksHere || isFilePage) || isUCP) {
        return;
    }

    window.WLHEditLinksLoaded = true;

    function addEditLinks(selector, className) {
        $(selector).each(function () {
            var $elem = $(this);

            $('<span>', {
                class: className
            })
                .before(' ')
                .append('(')
                .append(
                    $('<a/>', {
                        text: i18n.msg('edit-link-label').plain(),
                        href: new mw.Uri($elem.attr('href'))
                            .extend({action: 'edit'})
                            .toString()
                    })
                )
                .append(')')
                .insertAfter($elem);
        });
    }

    function addEditLinksToWhatLinksHere() {
        var selector = '#mw-whatlinkshere-list li a:not([title="Special:WhatLinksHere"]):not([title*="Thread:"]):not([title*="Message Wall:"]):not([title*="Board:"])';
        var className = 'mw-whatlinkshere-edit';

        addEditLinks(selector, className);
    }

    function addEditLinksToFilePages() {
        var selector = '.grid-3 a';
        var className = 'mw-imagepage-section-linkstoimage-edit';

        addEditLinks(selector, className);

        var pageListContent = document.querySelector('.page-list-content');
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.removedNodes.forEach(function (node) {
                    if ($(node).hasClass('wikiaThrobber')) {
                        addEditLinks(selector, className);
                    }
                });
            });
        });

        if (pageListContent) {
            observer.observe(pageListContent, {
                childList: true
            });
        }
    }

    mw.hook('dev.i18n').add(function (i18nObject) {
        i18nObject.loadMessages('WLHEditLinks').done(function (messages) {
            i18n = messages;

            if (isWhatLinksHere) {
                addEditLinksToWhatLinksHere();
            }

            if (isFilePage) {
                addEditLinksToFilePages();
            }
        });
    });

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:I18n-js/code.js'
        ]
    });
})();