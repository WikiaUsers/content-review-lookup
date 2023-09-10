// Skin Switch Button for monobook to oasis and for monobook and oasis to wikiamobile
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
 
        $( '.page-header__contribution-buttons .wds-dropdown ul' )
            .append(
                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/Special:WhatLinksHere/' + conf.wgPageName,
                                'title': 'Trang Dẫn Tới Đây'
                            } )
                            .text( 'Trang Dẫn Tới Đây' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/Special:PrefixIndex/' + conf.wgPageName,
                                'title': 'Trang Con'
                            } )
                            .text( 'Trang Con' )
                    ),

                $( '<li>' )
                    .append(
                        $( '<a>' )
                            .attr( {
                                'href': '/wiki/' + conf.wgPageName + '?useskin=mercury',
                                'title': 'Giao diện Di Động'
                            } )
                            .text( 'Giao diện Di Động' )
                    )

            );
    } );
 
}( jQuery, mediaWiki ) );

/* [[Special:WhatLinksHere]] on redirect page */
var h2header = $('#WikiaPageHeader').find('h2');
if (h2header.text().split('Redirected from').length == 2) {
    link = ' <a href="/wiki/Special:WhatLinksHere/' + h2header.children('a').attr('title') + '">(links)</a> <a href="/wiki/' + h2header.children('a').attr('title') + '?action=history">(history)</a>';
    h2header.append(link);
}