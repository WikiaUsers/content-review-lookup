/**
 * Name:        Minimalism - VSTF.js
 * Version:     v1.0
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Makes editor syntax highlighting on VSTF
 *              Wiki dark and sets the dark mode variables
 */
(function() {
    var config = mw.config.get([
        'wgCityId',
        'wgIsEditPage'
    ]);
    if (config.wgCityId !== '65099') {
        return;
    }
    window.wgIsDarkTheme = true;
    if (config.wgIsEditPage) {
        require(['WikiTextSyntaxHighlighter'], function(sh) {
            sh.reset();
            var $tb = $('#wpTextbox1'),
                $par = $tb.parent();
            $tb.insertAfter($par.parent().find('#toolbar'));
            $par.remove();
            sh.init($tb[0], {
                boldOrItalicColor: '#44466d',
                commentColor: '#4d1a19',
                entityColor: '#474d23',
                externalLinkColor: '#244d491',
                headingColor: '#44466d',
                hrColor: '#44466d',
                listOrIndentColor: '#4d1a19',
                parameterColor: '#66331e',
                signatureColor: '#66331e',
                tagColor: '#662946',
                tableColor: '#5e5129',
                templateColor: '#5e5129',
                wikilinkColor: '#245477'
            });
        });
    }
    $('body').addClass('page-dark oasis-dark-theme');
})();