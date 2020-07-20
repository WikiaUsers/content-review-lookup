( function($, mw, window) {
    var techUpdate = {
        board: 'Subforum:Aktualizacje_techniczne',
        title: 'Dziennik wdrożeń ___ ' + new Date().getFullYear() + ': '
    };
    if ( window.techUpdateLoaded || techUpdate.board !== mw.config.get('wgPageName') ) return;
    window.techUpdateLoaded = true;
    
    var $title = $( '#ForumNewMessage textarea.title' );

    function handler() {
        $title.val( techUpdate.title );
        $( '#ForumNewMessage textarea.body' ).trigger( 'focus' );
        $title.off( 'focus', handler );
    }

    $title.on( 'focus', handler );
} )( jQuery, mediaWiki, this );