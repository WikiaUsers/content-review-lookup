// Skin Switch Button for monobook to oasis
// and for monobook and oasis to wikiamobile
// Insert it into Edit Button (Oasis)
;( function ( $, mw ) {
 
    'use strict';
 
    var conf = mw.config.get( [
            'wgAction',
            'wgPageName'
        ] );
 
    $( function () {
 
        if ( conf.wgAction !== 'view' ) {
            return;
        }
 
        $( '#WikiaPageHeader .wikia-menu-button .WikiaMenuElement' )
            .append(
                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/Special:WhatLinksHere/' + conf.wgPageName,
                                'title': 'What links here'
                            } )
                            .text( 'What Links Here' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/Special:PrefixIndex/' + conf.wgPageName,
                                'title': 'Subpages'
                            } )
                            .text( 'Subpages' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/' + conf.wgPageName + '?action=edit&useskin=monobook',
                                'title': 'Edit trong Monobook'
                            } )
                            .text( 'Edit trong Monobook' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/' + conf.wgPageName + '?useskin=monobook',
                                'title': 'Giao diện Monobook'
                            } )
                            .text( 'Giao diện Monobook' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/' + conf.wgPageName + '?useskin=mercury',
                                'title': 'Giao diện Mercury'
                            } )
                            .text( 'Giao diện Mercury' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/' + conf.wgPageName + '?useskin=monobook&printable=yes',
                                'title': 'Bản in'
                            } )
                            .text( 'Bản in' )
                    )			
            );
    } );
 
}( jQuery, mediaWiki ) );

/* [[Special:WhatLinksHere]] on redirect page */
var h2header = $('#WikiaPageHeader').find('h2');
if (h2header.text().split('Redirected from').length == 2) {
  link = ' <a href="/wiki/Special:WhatLinksHere/'+h2header.children('a').attr('title')+'">(links)</a> <a href="/wiki/'+h2header.children('a').attr('title')+'?action=history">(history)</a>';
  h2header.append(link);
}