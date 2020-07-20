(function( $ ) {
    var checker, info, $that, tab_id;

    function init_tabs( t ) {
        $that = $( 'div[data-tab-body=' + t + ']' );

        info = $that.find( '.switcher-tab:first-child .switcher-text' ).prop( 'innerHTML' );
        $that.find( '.switcher-tab:first-child .switcher-text' ).parents( '.switcher-info' ).find( '.switcher-output' ).append( info );

        $that.find( '.switcher-tab' ).on( 'click', function() {
            var $that = $( this ).parents( '.switcher-info' );

            $that.find( '.switcher-toggle' ).toggleClass( 'switcher-toggle' );
            $( this ).toggleClass( 'switcher-toggle' );

            info = $( this ).find( '.switcher-text' ).prop( 'innerHTML' );
            $that.find( '.switcher-output' ).html( '' ).append( info );
        });
    }

    function init() {
        if ( !$( '.switcher-info' ).length ) return;

        $( '.switcher-tab:first-child .switcher-text' ).each( function() {
            info = $( this ).prop( 'innerHTML' );
            $( this ).parents( '.switcher-info' ).find( '.switcher-output' ).append( info );
        });

        $( '.switcher-tab' ).on( 'click', function() {
            $( this )
              .parents( '.switcher-info' )
              .find( '.switcher-toggle' )
              .toggleClass( 'switcher-toggle' );

            $( this ).toggleClass( 'switcher-toggle' );

            info = $( this ).find( '.switcher-text' ).prop( 'innerHTML' );
            $( this ).parents( '.switcher-info' ).find( '.switcher-output' ).html( '' ).append( info );
        });
    }
    
    function new_bind() {
        $( '#mw-content-text .tabs li:first-child a' ).parent().addClass( 'checked' );
        $( '#mw-content-text .tabs li a' ).on( 'click', function() {
            if ( $( this ).parent().hasClass( 'checked' ) ) return;
            $( this ).parent().addClass( 'checked' );

            tab_id = $( this ).parent().attr( 'data-tab' );
            $target = $( 'div[data-tab-body=' + tab_id + ']' );

            $( 'div[data-tab-body=' + tab_id + ']' ).bind( 'DOMSubtreeModified', function() {
                if ( !$( this ).find( '.switcher-info' ).length ) {
                    return;
                }

                $( this ).unbind( 'DOMSubtreeModified' );
                init_tabs( tab_id );
            });
        });
    }

    if ( $( '[id^=flytabs]' ).length ) {
        checker = setInterval( function() {
            if ( !$( 'div[data-tab-body=flytabs_00]' ).length ) {
                return;
            }
            clearInterval( checker );

            $( 'div[data-tab-body=flytabs_00]' ).bind( 'DOMSubtreeModified', function() {
                if ( !$( this ).find( '.switcher-info' ).length ) return;

                $( this ).unbind( 'DOMSubtreeModified' );
                init_tabs( 'flytabs_00' );
            });

            new_bind();
        }, 500);
        return;
    }

    init();
})( this.jQuery );