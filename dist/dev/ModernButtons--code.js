// ModernButtons
// Version A by HM100

// General theming for right border

(function () {
        mw.util.addCSS('' +
        '.wikia-menu-button-submit input[type=submit], .wikia-menu-button > a, .wikia-menu-button > li > a {' +
            'border-right: 1px solid ' + wgSassParams['color-page'] + '!important;' +
        '}');

})();

// Import ModernButton CSS

importStylesheetPage('MediaWiki:ModernButtons.css', 'dev');