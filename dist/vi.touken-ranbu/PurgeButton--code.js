/* jshint browser:true, jquery:true */
/* global mediaWiki */
require(['wikia.window', 'jquery', 'mw', 'ext.wikia.design-system.loading-spinner'], function(window, $, mw, Spinner) {
    'use strict';
 
    var config = mw.config.get([
        'skin',
        'wgNamespaceNumber'
    ]), $button, spinnerHTML = new Spinner(38, 2).html.replace('wds-block', 'wds-spinner__block').replace('wds-path', 'wds-spinner__stroke');
 
    if (config.wgNamespaceNumber < 0 || window.PurgeButtonsLoaded || $('#control_purge').exists()) {
        return;
    }
    window.PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)
 
    if (!window.dev || !window.dev.i18n) {
        importArticle({
            type: 'script',
            article: 'u:dev:MediaWiki:I18n-js/code.js'
        });
    }
 
    function purgePage() {
        $.get('?action=purge', function() {
            location.reload(true);
        });
        $('html, body').css({
            overflow: 'hidden',
            display: 'block'
        });
        $('<div>').css({
            background: 'rgba(255, 255, 255, 0.5)',
            position: 'fixed',
            height: '100%',
            width: '100%',
            left: '0',
            top: '0',
            'z-index': '1000000000'
        }).html(spinnerHTML).appendTo(document.body);
    }
 
    function addOasisPurgeButton() {
        switch (config.wgNamespaceNumber) {
            case 500:
            case 502:
                // Blog namespaces
                $('.page-header__contribution-buttons').append($button.addClass('wds-button wds-is-squished wds-is-secondary'));
                break;
            default:
                // .UserProfileActionButton is for root user pages (they don't use new page header yet)
                $('.UserProfileActionButton .wikia-menu-button .WikiaMenuElement, .page-header__contribution-buttons .wds-list').first()
                    .append($('<li>').append($button));
        }
    }
 
    function addPurgeButton(i18n) {
        i18n.useUserLang();
        $button = $('<a>', {
            'class': 'custom-purge-button',
            href: '#',
            title: i18n.msg('purge').plain(),
            text: window.PurgeButtonText || i18n.msg('refresh').plain()
        }).click(purgePage);
        switch(config.skin) {
            case 'uncyclopedia':
            case 'monobook':
                $('#p-cactions > .pBody > ul').append($('<li>', { id: 'ca-purge' }).append($button));
                break;
            case 'oasis':
            case 'wikia':
                addOasisPurgeButton();
                break;
        }
    }
 
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('PurgeButton').then(addPurgeButton);
    });
});