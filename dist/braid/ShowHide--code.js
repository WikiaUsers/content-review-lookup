 /*
  * Copyright © 2009, Daniel Friesen
  * All rights reserved.
  * 
  * Redistribution and use in source and binary forms, with or without
  * modification, are permitted provided that the following conditions are met:
  *     * Redistributions of source code must retain the above copyright
  *       notice, this list of conditions and the following disclaimer.
  *     * Redistributions in binary form must reproduce the above copyright
  *       notice, this list of conditions and the following disclaimer in the
  *       documentation and/or other materials provided with the distribution.
  *     * Neither the name of the script nor the
  *       names of its contributors may be used to endorse or promote products
  *       derived from this software without specific prior written permission.
  * 
  * THIS SOFTWARE IS PROVIDED BY DANIEL FRIESEN AS IS AND ANY
  * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  * DISCLAIMED. IN NO EVENT SHALL DANIEL FRIESEN BE LIABLE FOR ANY
  * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
  */
 ( function( $ ) {
  
 	// common
 	$.fn.onLink = function( fn ) {
 		return this.bind( 'click keypress', function(e) {
 			if ( e.type === 'click' || ( e.type === 'keypress' && ( e.keyCode === 13 || e.charCode === 32 ) ) ) {
 				fn.call(this, e);
 			}
 		} );
 	};
  
 	/** Dynamic Navigation Bars with jQuery
 	 *
 	 *  Base Description: See Wikipedia:Wikipedia:NavFrame.
 	 */
  
 	// shows and hides content and picture (if available) of navigation bars
 	function toggleNavigationBar( node ) {
 		var	$navFrame = $( node ),
 			$navToggle = $navFrame.find( '.NavHead:first .collapseLink' );
  
 		if ( !$navFrame.length || !$navToggle.length ) {
 			return false;
 		}
  
 		$navFrame.find( '.NavPic, .NavContent' ).not( $navFrame.find( '.NavFrame .NavPic' ) ).not( $navFrame.find( '.NavFrame .NavContent' ) ).slideToggle("fast");
 		return true;
 	}
  
 	// adds show/hide-button to navigation bars
 	function createNavigationBarToggleButton() {
 		var NavFrames = $( '.NavFrame' ).each( function () {
 			var	$navHead = $( this ).find( '.NavHead:first' );
 			
 			$navHead.prepend('<span class="NavToggle collapseButton" /><span tabIndex=0 class=collapseLink />');
 			$navHead.onLink( function ( e ) { toggleNavigationBar( $( this ).closest( '.NavFrame' ) ); } );
 			
 			$navHead.css("cursor","pointer");
 			
 		} );
 		
 			NavFrames.find('.NavContent').each( function () { $(this).toggle(false); } );
 		return true;
 	}
  
 	$( createNavigationBarToggleButton );
  
 } )( jQuery );