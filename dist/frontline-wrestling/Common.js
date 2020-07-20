/**
 * Helper script for the .hlist class in [[MediaWiki:Common.css]] and [[MediaWiki:Wikia.css]]
 * Add pseudo-selector class to last-child list items in IE8
 * @source mediawiki.org/wiki/Snippets/Horizontal_lists
 * @revision 6 (2014-08-23)
 * @author [[User:Edokter]]
 */
( function ( mw, $ ) {
    var profile = $.client.profile();
    if ( profile.name === 'msie' && profile.versionNumber === 8 ) {
        mw.hook( 'wikipage.content' ).add( function ( $content ) {
            $content.find( '.hlist' ).find( 'dd:last-child, dt:last-child, li:last-child' )
                .addClass( 'hlist-last-child' );
        } );
    }
}( mediaWiki, jQuery ) );

/* Style for horizontal lists (separator following item).
   @source mediawiki.org/wiki/Snippets/Horizontal_lists
   @revision 9 (2016-08-10)
   @author [[User:Edokter]]
 */
.hlist dl,
.hlist ol,
.hlist ul {
    margin: 0;
    padding: 0;
}
/* Display list items inline */
.hlist dd,
.hlist dt,
.hlist li {
    margin: 0;
    display: inline;
}
/* Display nested lists inline */
.hlist.inline,
.hlist.inline dl,
.hlist.inline ol,
.hlist.inline ul,
.hlist dl dl, .hlist dl ol, .hlist dl ul,
.hlist ol dl, .hlist ol ol, .hlist ol ul,
.hlist ul dl, .hlist ul ol, .hlist ul ul {
    display: inline;
}
/* Hide empty list items */
.hlist .mw-empty-li,
.hlist .mw-empty-elt {
    display: none;
}
/* Generate interpuncts */
.hlist dt:after {
    content: ": ";
}
.hlist dd:after,
.hlist li:after {
    content: " · ";
    font-weight: bold;
}
.hlist dd:last-child:after,
.hlist dt:last-child:after,
.hlist li:last-child:after {
    content: none;
}
/* Add parentheses around nested lists */
.hlist dd dd:first-child:before, .hlist dd dt:first-child:before, .hlist dd li:first-child:before,
.hlist dt dd:first-child:before, .hlist dt dt:first-child:before, .hlist dt li:first-child:before,
.hlist li dd:first-child:before, .hlist li dt:first-child:before, .hlist li li:first-child:before {
    content: " (";
    font-weight: normal;
}
.hlist dd dd:last-child:after, .hlist dd dt:last-child:after, .hlist dd li:last-child:after,
.hlist dt dd:last-child:after, .hlist dt dt:last-child:after, .hlist dt li:last-child:after,
.hlist li dd:last-child:after, .hlist li dt:last-child:after, .hlist li li:last-child:after {
    content: ")";
    font-weight: normal;
}
/* Put ordinals in front of ordered list items */
.hlist ol {
    counter-reset: listitem;
}
.hlist ol > li {
    counter-increment: listitem;
}
.hlist ol > li:before {
    content: " " counter(listitem) "\a0";
}
.hlist dd ol > li:first-child:before,
.hlist dt ol > li:first-child:before,
.hlist li ol > li:first-child:before {
    content: " (" counter(listitem) "\a0";
}