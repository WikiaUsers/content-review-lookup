/* <nowiki>
 * 
 * @module                  FANSUN.js
 * @description             Script for official wiki dark theming.
 * @author                  Speedit
 * @license                 CC-BY-SA 3.0
 * @notes                   Install FANSUN.css stylesheet(s) on the official
                            wiki(s) to use this script.
 * 
 */
;(function (window, mw, $) {

    // Double-run protection
    window.dev = window.dev || {};
    if (window.dev.dark) {
        return;
    }

    /**
     * @class               FANSUN
     * @classdesc           The main FANSUN class. Contains script logic
     *                      for post-render dark theming.
     */
    function FANSUN () {
        // Scoping to official wikis + FANSUN CSS import
        this.active =
            this.wikis.indexOf(mw.config.get('wgDBname')) > -1 &&
            $(document.body).css('color').match(/\d+/g).slice(0, 3)
                .map(Number).reduce(this.add) > 459;
        if (!this.active) {
            return;
        }
        // Dark theme class
        $(document.body).addClass(window.dev.colors
            ? 'oasis-dark-theme theme-fandomdesktop-dark ' +
              'menu-dark ' +
              'page-dark'
            : 'oasis-dark-theme theme-fandomdesktop-dark'
        ).removeClass('menu-bright page-bright theme-fandomdesktop-light');
    }

    /**
     * Helper method for numeric addition.
     * @method          add
     */
    FANSUN.prototype.add = function(a, c) {
        return +a+c;
    };

    /**
     * Database names for official wikis.
     * @type            {Array.<String>}
     */
    FANSUN.prototype.wikis = [
        'wikia',
        'ca',
        'de',
        'es',
        'fiwikia',
        'frfr',
        'it',
        'ja',
        'kowikia',
        'nlwikia',
        'plwikia',
        'ptcommunity',
        'ruwikia',
        'vicommunity',
        'zh',
        'dev',
        'infobox',
        'vstf',
        'communitycouncil'
    ];

    // Script bootloader
    $(function () {
        window.dev.dark = new FANSUN();
    });

}(window, mediaWiki, jQuery));