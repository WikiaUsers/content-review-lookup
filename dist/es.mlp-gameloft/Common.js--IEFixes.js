/* Scripts specific to Internet Explorer */

/**
 * Add IE specific CSS
 */
var ieCSS;

/* In print IE (7?) does not like line-height */
ieCSS += '@media print { sup, sub, p { line-height: normal; } } ';

/* IE overflow bug */
ieCSS += 'div.overflowbugx { overflow-x: scroll !important; overflow-y: hidden !important; } ' +
         'div.overflowbugy { overflow-y: scroll !important; overflow-x: hidden !important; } ';

/* IE zoomfix. Use to fix right floating div/table inside tables. */
ieCSS += '.iezoomfix div, .iezoomfix table { zoom: 1; } ';

mw.util.addCSS( ieCSS );

/**
 * Description: Fixes IE horizontal scrollbar bug
 * Maintainers: [[User:Tom-]]?
 */
var oldWidth;
var docEl = document.documentElement;

var fixIEScroll = function () {
    if ( !oldWidth || docEl.clientWidth > oldWidth ) {
        doFixIEScroll();
    } else {
        setTimeout( doFixIEScroll, 1 );
    }
    oldWidth = docEl.clientWidth;
}

var doFixIEScroll = function () {
    docEl.style.overflowX = ( docEl.scrollWidth - docEl.clientWidth < 4 ) ? 'hidden' : '';
}

document.attachEvent( 'onreadystatechange', fixIEScroll );
document.attachEvent( 'onresize', fixIEScroll );

/**
 * Helper script for .hlist class in Common.css
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 5 (2013-12-22)
 * @author [[User:Edokter]]
 */
( function ( mw, $ ) {
    var profile = $.client.profile();
    if ( profile.versionNumber === 8 ) {
        /* IE 8: Add pseudo-selector class to last-child list items */
        mw.hook( 'wikipage.content' ).add( function ( $content ) {
            $content.find( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
                .addClass( 'hlist-last-child' );
        } );
    }
    else if ( profile.versionNumber <= 7 ) {
        /* IE 7 and below: Generate interpuncts and parentheses */
        mw.hook( 'wikipage.content' ).add( function ( $content ) {
            var $hlists = $content.find( '.hlist' );
            $hlists.find( 'dt:not(:last-child)' )
                .append( ': ' );
            $hlists.find( 'dd:not(:last-child)' )
                .append( '<b>·</b> ' );
            $hlists.find( 'li:not(:last-child)' )
                .append( '<b>·</b> ' );
            $hlists.find( 'dl dl, dl ol, dl ul, ol dl, ol ol, ol ul, ul dl, ul ol, ul ul' )
                .prepend( '( ' ).append( ') ' );
        } );
    }
}( mediaWiki, jQuery ) );