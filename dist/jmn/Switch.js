//
//<syntaxhighlight lang="javascript">
/**
 * Switch.js
 * 
 * Adds a tabber-like switch
 * @todo Add an option to choose the default tab (default: 1)
 *
 * @author [[w:User:Fubuki風吹]]
 * See: {{Switch}}
 */
 
var sWitch = {
 
    /**
     * Adds numeric class to elements
     *
     * @function [args] [ [elem]: Selected element ]
     * @returns [none]
     */
    addClass: function ( elem ) {
        for ( i = 0; i < $( '.' + elem ).length; i++ ) {
            $( '.' + elem ).eq( i ).addClass( elem + '-' + ( i + 1 ) );
        }
    },
 
    /**
     * Adds basic onclick functionality to tabs
     *
     * @function [args] [ [index]: Index of the tab (added via sWitch.addClass()) ]
     * @returns [none]
     */
    onClick: function ( index ) {
        $( '.tab-' + index ).on( 'click', function ( e ) {
            $( '.switch .container' ).html( $( '.content-' + index ).html() );
            $( this ).removeClass( 'inactive' ).addClass( 'active' );
            $( this ).siblings( '.tab' ).removeClass( 'active' ).addClass( 'inactive' );
        } );
    },
 
    /**
     * Defaults
     *   - Hide the content
     *   - Make the first tab active
     *   - Show the content of the first tab in the container
     *
     * @function [args] [none]
     * @returns [none]
     */
    preset: function () {
        $( '.content' ).hide();
        $( '.tab-1' ).addClass( 'active' );
        $( '.switch .container' ).html( $( '.content-1' ).html() );
    },
 
    /**
     * CSS requirements
     *
     * @function [args] [none]
     * @returns [none]
     */
    CSS: function () {
        $.get( '/api.php?action=query&titles=MediaWiki:Switch.css&format=json', function ( data ) {
            if ( data.query.pages[ '-1' ] ) {
                mw.util.addCSS(
                    '.switch .tab { \
                         text-align:center; \
                         padding:2px 10px; \
                     } \
                     .switch .tab:not(:first-child) { \
                         border-left:1px solid #000; \
                     } \
                     .switch .active { \
                         font-weight:bold; \
                     } \
                     .switch .inactive { \
                         font-weight:normal; \
                     } \
                     .switch .container { \
                         border:1px solid #000; \
                     }'
                );
            } else {
                importStylesheetPage( 'MediaWiki:Switch.css', window.location.host.split( '.' )[ 0 ] );
            }
        } );
    },
 
    /**
     * Initialization
     *
     * @function [args] [none]
     * @returns [none]
     */
    init: function () {
        sWitch.CSS();
        sWitch.addClass( 'tab' );
        sWitch.addClass( 'content' );
        sWitch.preset();
        for ( i = 0; i < $( '.tab' ).length; i++ ) {
            sWitch.onClick( i + 1 );
        }
    }
}
 
/**
 * Run when DOM ready
 *
 * @function [args] [none]
 * @returns [none]
*/
$( function () {
    $( '.switch' ).each( function () {
        sWitch.init();
    } );
} );
//