// MPC
!function( $ ) {
    if ( !$( '.media-player').length ) return;

    $( '.media-player' ).each( function() {
        var _e = $( this ),
            _v = _e.attr( 'data-video' );

        _e.html( 
            $( '<iframe />', {
                width: 250,
                height: 150,
                allowfullscreen: true,
                src: '//www.youtube.com/embed/' + encodeURIComponent( _v ) + '?feature=player_embedded'
            })
        );
    });
} ( jQuery );

// Принудительная загрузка изображений в инфобоксах в обход lzy
!function( $ ) {
    if ( $( '.infBlock' ).length < 2 ) return;
    
    $( '.infBlock img.lazyload' ).each( function() {
        $( this )
          .attr( 'src', $( this ).attr( 'data-src' ) )
          .attr( 'class', 'lazyloaded' );
    });
}( jQuery );

// Сюда же - принудительная загрузка изображений на заглавной, в частности - в слайдере
!function( $, mw ) {
	if ( !mw.config.get( 'wgIsMainPage' ) ) return;

	$( 'img.lazyload' ).each( function() {
		$( this )
          .attr( 'src', $( this ).attr( 'data-src' ) )
          .attr( 'class', 'lazyloaded' );
    });
}( jQuery, mediaWiki );

!function( $ ) {
    if ( $( '.jsClickTheme').length === 0 ) return;

    $( '.jsClickTheme[data-attr!=1], .jsClickButton[data-attr=1]' ).hide();

    $( '.jsClickButton' ).on( 'click', function( e ) {
        var attr = $( e.currentTarget ).attr( 'data-attr' );

        $( '.jsClickTheme[data-attr!=' + attr + '], .jsClickButton[data-attr=' + attr + ']' ).hide();
        $( '.jsClickTheme[data-attr=' + attr + '], .jsClickButton[data-attr!=' + attr + ']' ).show();
    });
}( jQuery );