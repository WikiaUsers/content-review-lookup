/* Any JavaScript here will be loaded for all users on every page load. */

/* Collapsible tables */
 
 var autoCollapse = 2;
 var collapseCaption = "隱藏";
 var expandCaption = "顯示";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( ButtonLink );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );
 
// End "Articletype positioning" script
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
/* End of Collapsible tables */

/* Switch */
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
                         border-left:0px solid #000; \
                     } \
                     .switch .active { \
                         font-weight:bold; \
                     } \
                     .switch .inactive { \
                         font-weight:normal; \
                     } \
                     .switch .container { \
                         border:0px solid #000; \
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
//</syntaxhighlight>
/* End of Switch */

/* Tooltips */
var tooltips_config = {
    waitForImages: true,
    noCSS: true,
};
 
var tooltips_list = [
    {
        classname: 'mod-tooltip',
        parse: '{'+'{<#mod#>|tt=<#tt#>|show=no}}',
    }
];
 
window.AddRailModule = [{prepend: true}];