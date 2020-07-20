    function renderPage () {
        var page = encodeURIComponent( mw.config.get( 'wgPageName' ) );
        $.get( '/index.php?title=' + page + '&action=render', function () {
            location.reload( true );
        } );
        $('html,body').css( {
            display: 'block',
            overflow: 'hidden'
        } );
        $( '<div style="background: url(\'/skins/common/images/ajax.gif\') no-repeat fixed center center white;height: 100%;left: 0;opacity: 0.25;position: absolute;top: 0;width: 100%;z-index: 1000000000;"></div>' ).appendTo( document.body )
        .css( 'height', $( window ).height() );
    }