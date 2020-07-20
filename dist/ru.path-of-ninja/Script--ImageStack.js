// Copyright 2010, Brandon Aaron (http://brandonaaron.net/)
// See full license text at:
// https://github.com/brandonaaron/jquery-mousewheel/blob/master/LICENSE.txt

/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
    if ( event.detail     ) { delta = -event.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return $.event.handle.apply(this, args);
}

})(jQuery);















// Written by User:Hellerhoff, 2011
/** Skript for Template:Imagestack */
jQuery( document ).ready(function() {

$(".ImageStack_JS_required").hide();

if (document.URL.match(/printable/g)) return;

var scrollobject = false;    // flag for scroll-dragging
var mouse_y = 0;

$(document).bind('mouseup', function(event) {
  var did_scroll = !scrollobject;
  scrollobject = false;    // unset flag
  return did_scroll;
}); // bind mouseup



$("div.ImageStack").each( function () {
  var currentImage = 0, length, loop,
    	$images, $t, $counter, $leftLink, 
		$rightLink, $currentCount;

    $t = $( this );
    loop = $t.find('.ImageStack_loop').length ? true : false;
    //Use when 1.17 final is in use
    //loop = $t.attr('data-loop') == 'true' ? true : false; //Get loop prop
	$images = $t.find('.ImageStackUnits div.center');
	length = $images.length;
	if ( !length ) return true;
    
	$counter = $('<div class="ImageStackCounter">');
	$leftLink  = $('<a>', { href: '#', text : '< ' }).click( function() {
		toggleImage ( -1, loop );
		return false;
	});
	$rightLink = $('<a>', { href: '#', text : ' >' }).click( function() {
		toggleImage ( 1, loop );
		return false;
	});

	$currentCount = $('<span>', {'class' : 'ImageStackCounterCurrent', text: '0' });	
	$counter.append($leftLink, '(' , $currentCount, '/', length, ')', $rightLink);
	$counter.addClass('center');
	$t.prepend( $counter );
	$leftLink.add( $rightLink ).css({ fontSize : "110%", fontweight : "bold" });
	
	$images.bind('mousewheel', function( event, delta ) {
        console.log(delta, Math.floor( delta ))
		delta =  Math.floor( delta );
		if ( delta != 0 ) toggleImage( -delta, loop );
		return false;
	});
	$images.bind('mousedown', function( event ) {	// prepare scroll by drag
			mouse_y = event.screenY;	// remember mouse-position
			scrollobject = true;	// set flag
			return false;
	});
	$images.bind('mousemove', function( event ) {
		if ( scrollobject && Math.abs( mouse_y - event.screenY ) > 10 ) {
			var offset = (mouse_y < event.screenY) ? 1 : -1;
			mouse_y = event.screenY; //  remember mouse-position for next event
			toggleImage ( offset, loop );
		}
		return false;
	});
	
    var toggleImage = function( offset, loop ) {
        console.log(currentImage, offset, loop)
		currentImage += offset; //add offset
		$leftLink.show();
		$rightLink.show();
		if ( !loop ) {
			if ( currentImage <= 0 ) {
				currentImage = 0;
				$leftLink.hide();
			} else if ( currentImage >= $images.length -1 ) {
				currentImage = $images.length - 1;
				$rightLink.hide();
			}
		} else {
			if ( currentImage < 0 ) currentImage = $images.length - 1;
			if ( currentImage >= $images.length ) currentImage = 0;
		}
		$images.hide(); //Hide all
		$images.eq( currentImage ).show();
		$currentCount.text( currentImage + 1 );
	};
	toggleImage ( 0, loop );
});
});


//        else {
//   commentText = currentimage.getAttribute("title");
//   comment = document.createElement("span").appendChild(document.createTextNode(commentText));
//   currentimage.removeAttribute("title");
// }
// if(rightlink !== undefined) {
//   rightlink.setAttribute("title", commentText);
// }