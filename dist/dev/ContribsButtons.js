/**
 * @name            ContribsButtons
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Adds wiki-specific ContribsButtons styling.
 */
(function() {
    var config = mw.config.get([
        'wgCanonicalSpecialPageName',
        'wgSassParams'
    ]);
    if (
        window.ContribsButtonsLoaded ||
        config.wgCanonicalSpecialPageName !== 'Contributions'
    ) {
        return;
    }
    /**
     * @class Main
     * @classdesc Main ContribsButtons class
     */
    var Main = {
        /**
         * @method addCSS
         * @description Adds the button CSS
         * @returns {void}
         */
        addCSS: function () {
            var color = config.wgSassParams['color-buttons'];
            mw.util.addCSS(
'body.mw-special-Contributions #VSTFReportButtons .VSTFReportButton,\
body.mw-special-Contributions #contentSub:not(.contentSub) a,\
body.mw-special-Contributions #contentSub #contentSubSub a {\
    background:' + color + ';\
}\
body.mw-special-Contributions #VSTFReportButtons .VSTFReportButton:active,\
body.mw-special-Contributions #VSTFReportButtons .VSTFReportButton:focus,\
body.mw-special-Contributions #VSTFReportButtons .VSTFReportButton:hover,\
body.mw-special-Contributions #contentSub:not(.contentSub) a:active,\
body.mw-special-Contributions #contentSub:not(.contentSub) a:focus,\
body.mw-special-Contributions #contentSub:not(.contentSub) a:hover,\
body.mw-special-Contributions #contentSub #contentSubSub a:active,\
body.mw-special-Contributions #contentSub #contentSubSub a:focus,\
body.mw-special-Contributions #contentSub #contentSubSub a:hover {\
    background:' + window.dev.colors.parse(color).lighten(12) + ';\
}'
            );
        },
        /**
         * @method init
         * @description Adds the dev.colors hook and imports Colors
         * @returns {void}
         */
        init: function () {
            mw.hook('dev.colors').add(
                this.addCSS.bind(this)
            );
            importArticle({
                type: 'script',
                article: 'u:dev:MediaWiki:Colors/code.js'
            });
        }
    };
    mw.loader.using('mediawiki.util').then(
        Main.init.bind(Main)
    );
})();