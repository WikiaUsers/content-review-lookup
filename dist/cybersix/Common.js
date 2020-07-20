/* Any JavaScript here will be loaded for all users on every page load. */

// {{USERNAME}}
$(function() {
    if ( mw.config.get( 'wgUserName' ) !== null )
        $( '.insertusername' ).text( mw.config.get( 'wgUserName' ) );
});
// END {{USERNAME}}

var oggPlayerButtonOnly = false;

window.railWAM = {
    logPage: ''Project:log WAM''
};