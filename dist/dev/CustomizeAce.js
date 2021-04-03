/**
 * Apply custom user settings to Ace editor embeds
 *
 * @author Rail
 * @todo Fix AbuseFilter implementation
 */
;( function( mw, window ) {
    'use strict';

    // Prevent unnecessary loading
    if ( ['edit', 'submit'].indexOf( mw.config.get( 'wgAction' ) ) === -1 || window.aceCustomSettingsLoaded ) {
        return;
    }

    function aceSettings() {
        var inputSettings = window.aceCustomSettings;
        const defaultSettings = { wrap: true };

        // No input
        if ( !inputSettings ) {
            return defaultSettings;
        } else if ( typeof inputSettings !== 'object' ) {
            // Bad input type
            console.error( 'aceCustomSettings variable has to be an object!' );
            return defaultSettings;
        }

        // Normalize theme syntax
        if ( inputSettings.theme && !/\.\/theme\/.*/.test( inputSettings.theme ) ) {
            inputSettings.theme = './theme/' + inputSettings.theme;
        }

        return inputSettings;
    }

    /**
     * Extended `codeEditor.configure` hook
     * Use this because Fandom loading default themes conflicts with this script
     *
     * @param {Function} callback
     */
    function aceHook( callback ) {
        mw.hook( 'codeEditor.configure' ).add( function() {
            const fandomAddTheme = setInterval( function() {
                if ( !!document.querySelector( '.ace_editor.ace-twilight,.ace_editor.ace-dawn' ) ) {
                    clearInterval( fandomAddTheme );
                    callback();
                }
            }, 150 );
        } );
    }

    aceHook( function() {
        const aceEditArea = document.getElementsByClassName( 'ace_editor' )[0];
        const aceInstance = ace.edit( aceEditArea );

        aceInstance.setOptions( aceSettings() );
        window.aceCustomSettingsLoaded = true;
    } );
} )( mediaWiki, this );