/**
 * @name        RCKey
 * @description Restores broken G + R keyboard shortcut
 * @author      Rail01
 * @author      Luqgreg
 */
require([
    'jquery',
    'mw',
    'wikia.window'
], function( $, mw, window ) {
    if (
        mw.config.get( 'wgAction' ) === 'edit' ||
        window.RCKeyLoaded
    ) return;
    window.RCKeyLoaded = true;

    function init() {
        var keys = {};
        var input = false;

        $(document).on('keydown', function(e) {
            keys[e.which] = true;

            if (keys[71] && keys[82] && !input) {
                location.replace(
                    mw.util.getUrl( 'Special:RecentChanges' )
                );
            }
        }).on('keyup', function(e) {
            keys[e.which] = false;
        });
        
        $('input, textarea').on('keydown', function() {
            input = true;
        }).on('keyup', function() {
            input = false;
        });
    }

    mw.loader.using('mediawiki.util').then(init);
});