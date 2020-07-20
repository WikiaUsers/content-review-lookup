var diff = (function( diff, oldid, beforeId, afterId ) {
        if ( !$( '.diff' ).length || !diff ) {
            return null;
        }
 
        if ( diff === 'next' ) {
            beforeId = oldid;
            afterId = oldid + 1;
        } else if ( diff === 'prev' ) {
            beforeId = oldid - 1;
            afterId = oldid;
        } else {
            beforeId = oldid;
            afterId = parseInt( diff );
        }
 
        var revisionBefore = {
            // Revision id
            id: beforeId,
            // Time of the revision
            time: $( '#mw-diff-otitle1' ).find( 'a:first-child' ).text().split( 'as of ' )[ 1 ],
            // Author of the revision
            author: $('#mw-diff-otitle2' ).children( 'a' ).text(),
            // Whether the revision is minor or not
            minor: ( $( '#mw-diff-otitle3' ).children( '.minoredit' ).length
                    ? true
                    : false
                ),
            // The summary of the revision
            summary: (function( summary ) {
                    return summary.substring( 1, summary.length - 1 );
                })( $( '#mw-diff-otitle3' ).children( '.comment' ).text() ),
            // The URL of the revision
            viewURL: url + '?oldid=' + beforeId,
            // The URL to edit the revision
            editURL: actionURLs.edit + '&oldid=' + beforeId
        };
 
        var revisionAfter = {
            // Revision id
            id: afterId,
            // Time of the revision
            time: $( '#mw-diff-ntitle1' ).find( 'a:first-child' ).text().split( 'as of ' )[ 1 ],
            // Author of the revision
            author: $('#mw-diff-ntitle2' ).children('a').text(),
            // Whether the revision is minor or not
            minor: ( $( '#mw-diff-ntitle3' ).children( '.minoredit' ).length
                    ? true
                    : false
                ),
            // The summary of the revision
            summary: (function( summary ) {
                    return summary.substring( 1, summary.length - 1 );
                })( $( '#mw-diff-ntitle3' ).children( '.comment' ).text() ),
            // The URL of the revision
            viewURL: url + '?oldid=' afterId,
            // The URL to edit the revision
            editURL: actionURLs.edit + '&oldid=' + afterId,
            // The URL to undo the revision
            undoURL: actionURLs.edit + '&undoafter=' + beforeId + '&undo=' + afterId,
            // The URL to rollback the page
            rollbackURL: $( '.mw-rollback-link' ).children( 'a' ).attr( 'href' )
        };
 
        return {
            firstRev: firstRev,
            secondRev: secondRev
        };
    })( mw.util.getParamValue( 'diff' ), parseInt( mw.util.getParamValue( 'oldid' ) ) );