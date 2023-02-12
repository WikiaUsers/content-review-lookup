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

    /**
     * Returns config based on input variable.
     * Defaults to a pre-configured value if any problems arise.
     */
    function aceSettings() {
        var inputSettings = window.aceCustomSettings;
        const defaultSettings = { wrap: true };

        // No input - return defaults
        if ( !inputSettings ) {
            return defaultSettings;
        } else if ( typeof inputSettings !== 'object' ) {
            // Bad input type
            console.error( 'aceCustomSettings variable has to be an object!' );
            return defaultSettings;
        }

        // Ensure that theme key is a string, delete it otherwise
        if ( inputSettings.theme && typeof inputSettings.theme !== 'string' ) {
            console.error( 'aceCustomSettings.theme has to be a string!' );
            delete inputSettings.theme;
        }

        // Normalize theme syntax and sanitize theme input
        if ( inputSettings.theme ) {
            inputSettings.theme = inputSettings.theme.replace( /[^a-z0-9\-_\.\/]/gi, '' );

            if ( !/\.\/theme\/.*/.test( inputSettings.theme ) ) {
                inputSettings.theme = './theme/' + inputSettings.theme;
            }
        }

        return inputSettings;
    }

    /**
     * Extended `codeEditor.configure` hook
     *
     * Use this because Fandom loading default themes conflicts with this script
     * Adds 150ms interval waiting for Fandom's changes to be applied
     *
     * @param {Function} callback
     */
    function aceHook( callback ) {
        mw.hook( 'codeEditor.configure' ).add( function() {
            const fandomAceClasses = '.ace_editor.ace-tm,.ace_editor.ace-twilight,.ace_editor.ace-dawn';
            const fandomAddTheme = setInterval( function() {
                if ( !!document.querySelector( fandomAceClasses ) ) {
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