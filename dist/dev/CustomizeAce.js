/**
 * Apply custom user settings to Ace editor embeds
 *
 * @author Rail
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
    
    function aceHook() {
    	const aceEditArea = document.getElementsByClassName( 'ace_editor' )[0];
        const aceInstance = ace.edit( aceEditArea );

        aceInstance.setOptions( aceSettings() );
        window.aceCustomSettingsLoaded = true;
    }

    mw.hook( 'codeEditor.configure' ).add(aceHook);
    
    // AbuseFilter doesn't have a hook (yet - https://phabricator.wikimedia.org/T273270)
    if ( mw.config.get('wgCanonicalSpecialPageName') === 'AbuseFilter' && document.getElementById('wpAceFilterEditor') ) {
    	const interval = setInterval(function() {
    		if ( !document.getElementById('wpAceFilterEditor').classList.contains('ace-tm') ) {
    			return;
    		}
    		clearInterval(interval);
    		aceHook();
    	}, 100);
    }
} )( mediaWiki, this );