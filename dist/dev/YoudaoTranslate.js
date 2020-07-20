/**
*Author:铁桶
**/
require([
    'jquery',
    'mw',
    'wikia.window'
], function( $, mw, window ) {
    var config = mw.config.get([
        'wgAction'
    ]);
    if (window.UseYoudaoTranslate === false || config.wgAction !== 'view') {
        return;
    }
    window.UseYoudaoTranslate = false;
 
    function init(i18n) {
        $('<a>', {
            class: 'wds-button wds-is-secondary',
            id: 'YoudaoTranslate',
            href: 'http://webtrans.yodao.com/webTransPc/index.html' + '?from=auto'  + '&to=auto' + '&type=1' + '&url=' + location.href,
            target: ( !window.YoudaoTranslateNewTab ? '_blank' : null ),
            text: i18n.msg( 'translate-text' ).plain(),
            title: i18n.msg( 'translate-title' ).plain()
        }).appendTo( '.page-header__contribution-buttons' );
    }
 
    mw.hook( 'dev.i18n' ).add(function(i18n) {
        i18n.loadMessages( 'YoudaoTranslate' ).then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
});