// You Shall Not Pass Script
// Personal only
(function(window) {
    'use strict';
    var d = window.document,
        $s = d.querySelector(
            ':not(.editpage-intro-wrapper) .permissions-errors'
        );
    if (window.YouShallNotPassLoaded || !$s) {
        return;
    }
    window.YouShallNotPassLoaded = true;
    function init(i18n) {
        importArticle({
            type: 'style',
            article: 'u:dev:MediaWiki:YouShallNotPass/style.css'
        });
        var elem = d.createElement('div');
        elem.classList.add('ysnp');
        elem.innerHTML = i18n.msg('text').plain();
        $s.innerHTML = '';
        $s.insertBefore(elem, $s.firstChild);
    }
    mw.hook('dev.i18n').add(function(i18n) {
        i18n.loadMessages('YouShallNotPass').then(init);
    });
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
})(this || window);