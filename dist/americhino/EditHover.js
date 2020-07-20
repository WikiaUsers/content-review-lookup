// Purges the page when Ctrl+Shift+P or Command+Shift+P is pressed
// Author: KurwaAntics
 
( function ( $, mw ) {
 
    function purgePage () {
        var page = encodeURIComponent( mw.config.get( 'wgPageName' ) );
        $.get( '/index.php?title=' + page + '&action=purge', function () {
            location.reload( true );
        } );
        $('html,body').css( {
            display: 'block',
            overflow: 'hidden'
        } );
        $( '<div style="background: url(\'/skins/common/images/ajax.gif\') no-repeat fixed center center white;height: 100%;left: 0;opacity: 0.25;position: absolute;top: 0;width: 100%;z-index: 1000000000;"></div>' ).appendTo( document.body )
        .css( 'height', $( window ).height() );
    }
 
    if ( !$("body").hasClass("editor") ) {
        $(document).keydown(function(event) {
            if( (event.ctrlKey || event.metaKey) && event.shiftKey && event.which == 80 ) {
                purgePage();
            }
        });
    }
 
} ( jQuery, mediaWiki ) );