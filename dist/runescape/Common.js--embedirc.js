/** <nowiki>
 * Embeds webchat iframe into [[RS:IRC]]
 *
 * @author Green Reaper
 * @author ShadowTale
 */

/*
// script rewrite
// TODO testme
// @author Cqm
;( function ( $, mw, rswiki ) {

    'use strict';

    function embedIRC() {

        var user = mw.config.get( 'wgUserName' ),
            nick = !user ? 'RSWiki-Visitor-' + Math.floor( Math.random() * 10 ) : user.replace( / /g, '_' ),
            $iframe = function ( channel ) {
                return $( '<iframe>' )
                           .attr( {
                               src: 'http://webchat.freenode.net/?nick=' + nick + '&channels=' + channel + '&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37',
                               width: '660',
                               height: '400'
                           } )
                           .css( 'border', '0' );
            };

            $( '#IRCReplace' )
                .empty()
                .append( $iframe( 'rswiki' ) );

            $( '#CVNIRCReplace' )
                .empty()
                .append( $iframe( 'cvn-wikia-runescape' ) );

    };

    $( embedIRC );

}( jQuery, mediaWiki, rswiki ) );
*/

//BEGIN IRC CODE
///HERE IS THE IRC REPLACER. Adds Embedded IRC to RS:IRC made by Green Reaper & ShadowTale
$(function() {
	var nick = (wgUserName == null) ? ('RSWiki-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=rswiki&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="660" height="400" style="border:0;"></iframe>');
	$('#CVNIRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-runescape&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="660" height="400" style="border:0;"></iframe>');
});
//END IRC CODE