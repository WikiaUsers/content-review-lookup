/* Forked from: https://en.wikipedia.org/wiki/User:Enterprisey/undelete-backlink.js by Wikipedia user Enterprisey  */

$( function () {
    if( mw.config.get( "wgPageName" ) === "Special:Undelete" &&
            window.location.search.indexOf( "timestamp=" ) >= 0 ) {
        mw.loader.using( [ "mediawiki.util" ], function () {
            $( "#content" ).prepend( $( "<div>" )
                .attr( "id", "contentSub2" )
                .append( "< ", $( "<a>" )
                    .attr( "href", mw.util.getUrl( "Special:Undelete", { target: mw.config.get( "wgRelevantPageName" ) } ) )
                    .text( "All deleted revisions" ) ) );
        } );
    }
} );