/**
 * 11:08, 18 November, 2013 (UTC)
 * QQX
 * https://dev.wikia.com/wiki/QQX  
 * Adds a button for ?uselang=qqx'ifying any page.
 * Supports default skin defined in preferences
 * @author: Dimension10 (https://dev.wikia.com/wiki/User:Dimension10)
 * (Note: Idea from [[SkinSwitchButton/code.js]] by [[User:UltimateSupreme]],
 * I also couldn't be able to code this kind of JavaScript without having their code to fork.)
 */

/*jshint browser:true, jquery:true */
/*global mw */
(function() {
    'use strict';
    if (window.QQXLoaded || mw.config.get('wgUserLanguage') === 'qqx') {
        return;
    }
    window.QQXLoaded = true;
    function init(i18n) {
        $('#WikiaBarWrapper .tools').append(
            $('<li>', {
                id: 'ca-lang-qqx'
            }).append(
                $('<a>', {
                    href: new mw.Uri().extend({uselang: 'qqx'}).toString(),
                    title: i18n.msg('title').plain(),
                    text: window.qqxText || 'QQX'
                })
            )
        );
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('QQX').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:I18n-js/code.js'
    });
})();