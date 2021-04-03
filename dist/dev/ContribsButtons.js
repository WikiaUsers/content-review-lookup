/**
 * @name            ContribsButtons
 * @version         v1.0
 * @author          TheGoldenPatrik1
 * @description     Adds wiki-specific ContribsButtons styling.
 */
(function() {
    if (
        window.ContribsButtonsLoaded ||
        mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions'
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
            var color = window.dev.colors.fandom.menu;
            mw.util.addCSS(
'body.mw-special-Contributions #SOAPReportButtons .SOAPReportButton,\
body.mw-special-Contributions #contentSub a,\
body.mw-special-Contributions .mw-contributions-user-tools > .mw-changeslist-links span,\
body.mw-special-Contributions .quicklogs__content-sub:not(#quicklogs-container) > a {\
    background:' + color + ';\
}\
body.mw-special-Contributions #SOAPReportButtons .SOAPReportButton:active,\
body.mw-special-Contributions #SOAPReportButtons .SOAPReportButton:focus,\
body.mw-special-Contributions #SOAPReportButtons .SOAPReportButton:hover,\
body.mw-special-Contributions #contentSub a:active,\
body.mw-special-Contributions #contentSub a:focus,\
body.mw-special-Contributions #contentSub a:hover,\
body.mw-special-Contributions .mw-contributions-user-tools > .mw-changeslist-links span:active,\
body.mw-special-Contributions .mw-contributions-user-tools > .mw-changeslist-links span:focus,\
body.mw-special-Contributions .mw-contributions-user-tools > .mw-changeslist-links span:hover,\
body.mw-special-Contributions .quicklogs__content-sub:not(#quicklogs-container) > a:active,\
body.mw-special-Contributions .quicklogs__content-sub:not(#quicklogs-container) > a:focus,\
body.mw-special-Contributions .quicklogs__content-sub:not(#quicklogs-container) > a:hover {\
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