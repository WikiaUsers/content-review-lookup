//404 error screen (for mobile)
$( function() {
    var $graceContainer = $( '.grace' );
    
    if ( $graceContainer.length ) {
        var pageName = mw.config.get( 'wgPageName' );
        var fullPageName = mw.config.get( 'wgRelevantPageName' ) || pageName;
        
        var imgRotateSrc = 'https://static.wikia.nocookie.net/grace-rbx/images/0/0e/Grace_Logo.png';
        var imgFadeSrc   = 'https://static.wikia.nocookie.net/grace-rbx/images/2/21/Grace_Glow.png';
        var imgRippleSrc = 'https://static.wikia.nocookie.net/grace-rbx/images/3/32/Grace_Circle_Ring.png/revision/latest?cb=20260731003329';

        var $imgFade = $( '<img>' ).addClass( 'grace-center grace-bg-fade' ).attr( 'src', imgFadeSrc );
        var $imgRotate = $( '<img>' ).addClass( 'grace-center grace-fg-rotate' ).attr( 'src', imgRotateSrc );
        
        $graceContainer.append( $imgFade, $imgRotate );

        
        var buttonsHtml = 
            '<div class="grace-button-container">' +
                '<table style="width: 100%; border-collapse: separate; border-spacing: 5px; margin: 0 auto; text-align: center; font-family: \'Single Day\', sans-serif; user-select: none;">' +
                    '<tr>' +
                        '<td><a href="https://grace-rbx.fandom.com/wiki/Special:Search/' + encodeURIComponent(pageName) + '"><div class="grace-button">Related Pages</div></a></td>' +
                        '<td><a href="https://grace-rbx.fandom.com/wiki/Special:Log?page=' + encodeURIComponent(fullPageName) + '"><div class="grace-button">Related Logs</div></a></td>' +
                        '<td><a href="https://grace-rbx.fandom.com/wiki/' + encodeURIComponent(fullPageName) + '?action=edit"><div class="grace-button">Create Page</div></a></td>' +
                    '</tr>' +
                '</table>' +
            '</div>';

        $graceContainer.append( buttonsHtml );

        var spawnRipple = function() {
            if ( !$( '.grace' ).length ) {
                return;
            }

            var $wrapper = $( '<div>' ).addClass( 'grace-ripple-wrapper' );
            var $rippleImg = $( '<img>' ).addClass( 'grace-ripple' ).attr( 'src', imgRippleSrc );

            $wrapper.append( $rippleImg );
            $graceContainer.append( $wrapper );

            setTimeout( function() {
                $wrapper.remove();
            }, 8000 );
        };

        spawnRipple();
        setInterval( spawnRipple, 2500 );
    }
} );