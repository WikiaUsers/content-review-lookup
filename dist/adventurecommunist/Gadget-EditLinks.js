
/** <nowiki>
 * Adds edit links to [[Special:WhatLinksHere]]
 *
 * @author JBed (Final Fantasy Wiki)
 * @author Cqm
 * @author Hairr
 */
 
;( function ( $, mw ) {
 
    'use strict';
 
    function editLinks () {
 
        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) !== 'Whatlinkshere' ) {
            return;
        }
 
        if ( $( '.mw-whatlinkshere-edit' ).length ) {
            return;
        }
 
        $( '#mw-whatlinkshere-list li' ).each( function () {
 
            var $this = $( this ),
                href = $this.children( 'a' ).first().attr( 'href' ),
                join = href.indexOf( '?' ) > -1 ? '&' : '?',
                $span = $( '<span>' )
                    .addClass( 'mw-whatlinkshere-edit' )
                    .append(
                        '(',
                        $( '<a>' )
                            .attr( {
                                title: 'Edit',
                                'href': href + join + 'action=edit'
                            } )
                            .text( 'edit' ),
                        ') '
                    );
 
            $this.children( '.mw-whatlinkshere-tools' ).before( $span );
 
        } );
    }
 
    $( editLinks );
 
}( jQuery, mediaWiki ) );