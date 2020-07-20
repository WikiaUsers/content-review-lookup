var localcontent = false;

function importScriptPage(page, server) {
	if (localcontent) {
		var url = encodeURIComponent(page.replace(/ /g, '_')).replace('%2F', '/').replace('%3A', ':');
		var colonpos = url.lastIndexOf(":");
		if (colonpos>-1)
			url = url.slice(colonpos+1);
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.body.appendChild(script);
	} else {
		var url = '/index.php?title=' + encodeURIComponent(page.replace(/ /g, '_')).replace('%2F', '/').replace('%3A', ':') + '&action=raw&ctype=text/javascript';
		if (typeof server == "string")
			url = (server.indexOf('://') == -1) ? 'http://' + server + '.wikia.com' + url : server + url;
		return importScriptURI(url);
	}
}

var uniqueCounter=0;

function generateUniqueID() {
	return uniqueCounter++;
}

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function loadgooglemapscode() {
	if (getUrlVars()["SimulatedAjaxCalls"]) {
		localcontent = true;
	} else if (typeof SimulatedAjaxCalls == "boolean") {
		localcontent = SimulatedAjaxCalls  ;
	}
	if ( $('#map_canvas').length ) {
		importScriptPage('Mediawiki:Googlemaps.js')
	}
}

addOnloadHook(loadgooglemapscode);

/*!
* jQuery resize event - v1.1 - 3/14/2010
* http://benalman.com/projects/jquery-resize-plugin/
*
* Copyright (c) 2010 "Cowboy" Ben Alman
* Dual licensed under the MIT and GPL licenses.
* http://benalman.com/about/license/
*/

// Script: jQuery resize event
//
// *Version: 1.1, Last updated: 3/14/2010*
//
// Project Home - http://benalman.com/projects/jquery-resize-plugin/
// GitHub       - http://github.com/cowboy/jquery-resize/
// Source       - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.js
// (Minified)   - http://github.com/cowboy/jquery-resize/raw/master/jquery.ba-resize.min.js (1.0kb)
//
// About: License
//
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
//
// About: Examples
//
// This working example, complete with fully commented code, illustrates a few
// ways in which this plugin can be used.
//
// resize event - http://benalman.com/code/projects/jquery-resize/examples/resize/
//
// About: Support and Testing
//
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
//
// jQuery Versions - 1.3.2, 1.4.1, 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-resize/unit/
//
// About: Release History
//
// 1.1 - (3/14/2010) Fixed a minor bug that was causing the event to trigger
//       immediately after bind in some circumstances. Also changed $.fn.data
//       to $.data to improve performance.
// 1.0 - (2/10/2010) Initial release

(function($,window,undefined) {
	'$:nomunge'; // Used by YUI compressor.

	// A jQuery object containing all non-window elements to which the resize
	// event is bound.
	var elems = $([]),

	// Extend $.resize if it already exists, otherwise create it.
	jq_resize = $.resize = $.extend( $.resize, {} ),

	timeout_id,

	// Reused strings.
	str_setTimeout = 'setTimeout',
	str_resize = 'resize',
	str_data = str_resize + '-special-event',
	str_delay = 'delay',
	str_throttle = 'throttleWindow';

	// Property: jQuery.resize.delay
	//
	// The numeric interval (in milliseconds) at which the resize event polling
	// loop executes. Defaults to 250.

	jq_resize[ str_delay ] = 250;

	// Property: jQuery.resize.throttleWindow
	//
	// Throttle the native window object resize event to fire no more than once
	// every <jQuery.resize.delay> milliseconds. Defaults to true.
	//
	// Because the window object has its own resize event, it doesn't need to be
	// provided by this plugin, and its execution can be left entirely up to the
	// browser. However, since certain browsers fire the resize event continuously
	// while others do not, enabling this will throttle the window resize event,
	// making event behavior consistent across all elements in all browsers.
	//
	// While setting this property to false will disable window object resize
	// event throttling, please note that this property must be changed before any
	// window object resize event callbacks are bound.

	jq_resize[ str_throttle ] = true;

	// Event: resize event
	//
	// Fired when an element's width or height changes. Because browsers only
	// provide this event for the window element, for other elements a polling
	// loop is initialized, running every <jQuery.resize.delay> milliseconds
	// to see if elements' dimensions have changed. You may bind with either
	// .resize( fn ) or .bind( "resize", fn ), and unbind with .unbind( "resize" ).
	//
	// Usage:
	//
	// > jQuery('selector').bind( 'resize', function(e) {
	// >   // element's width or height has changed!
	// >   ...
	// > });
	//
	// Additional Notes:
	//
	// * The polling loop is not created until at least one callback is actually
	//   bound to the 'resize' event, and this single polling loop is shared
	//   across all elements.
	//
	// Double firing issue in jQuery 1.3.2:
	//
	// While this plugin works in jQuery 1.3.2, if an element's event callbacks
	// are manually triggered via .trigger( 'resize' ) or .resize() those
	// callbacks may double-fire, due to limitations in the jQuery 1.3.2 special
	// events system. This is not an issue when using jQuery 1.4+.
	//
	// > // While this works in jQuery 1.4+
	// > $(elem).css({ width: new_w, height: new_h }).resize();
	// >
	// > // In jQuery 1.3.2, you need to do this:
	// > var elem = $(elem);
	// > elem.css({ width: new_w, height: new_h });
	// > elem.data( 'resize-special-event', { width: elem.width(), height: elem.height() } );
	// > elem.resize();

	$.event.special[ str_resize ] = {

		// Called only when the first 'resize' event callback is bound per element.
		setup: function() {
			// Since window has its own native 'resize' event, return false so that
			// jQuery will bind the event using DOM methods. Since only 'window'
			// objects have a .setTimeout method, this should be a sufficient test.
			// Unless, of course, we're throttling the 'resize' event for window.
			if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) {
				return false;
			}

			var elem = $(this);

			// Add this element to the list of internal elements to monitor.
			elems = elems.add( elem );

			// Initialize data store on the element.
			$.data( this, str_data, {
				w: elem.width(),
				h: elem.height()
			} );

			// If this is the first element added, start the polling loop.
			if ( elems.length === 1 ) {
				loopy();
			}
		},
		// Called only when the last 'resize' event callback is unbound per element.
		teardown: function() {
			// Since window has its own native 'resize' event, return false so that
			// jQuery will unbind the event using DOM methods. Since only 'window'
			// objects have a .setTimeout method, this should be a sufficient test.
			// Unless, of course, we're throttling the 'resize' event for window.
			if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) {
				return false;
			}

			var elem = $(this);

			// Remove this element from the list of internal elements to monitor.
			elems = elems.not( elem );

			// Remove any data stored on the element.
			elem.removeData( str_data );

			// If this is the last element removed, stop the polling loop.
			if ( !elems.length ) {
				clearTimeout( timeout_id );
			}
		},
		// Called every time a 'resize' event callback is bound per element (new in
		// jQuery 1.4).
		add: function( handleObj ) {
			// Since window has its own native 'resize' event, return false so that
			// jQuery doesn't modify the event object. Unless, of course, we're
			// throttling the 'resize' event for window.
			if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) {
				return false;
			}

			var old_handler;

			// The new_handler function is executed every time the event is triggered.
			// This is used to update the internal element data store with the width
			// and height when the event is triggered manually, to avoid double-firing
			// of the event callback. See the "Double firing issue in jQuery 1.3.2"
			// comments above for more information.

			function new_handler( e, w, h ) {
				var elem = $(this),
				data = $.data( this, str_data );

				// If called from the polling loop, w and h will be passed in as
				// arguments. If called manually, via .trigger( 'resize' ) or .resize(),
				// those values will need to be computed.
				data.w = w !== undefined ? w : elem.width();
				data.h = h !== undefined ? h : elem.height();

				old_handler.apply( this, arguments );
			};

			// This may seem a little complicated, but it normalizes the special event
			// .add method between jQuery 1.4/1.4.1 and 1.4.2+
			if ( $.isFunction( handleObj ) ) {
				// 1.4, 1.4.1
				old_handler = handleObj;
				return new_handler;
			} else {
				// 1.4.2+
				old_handler = handleObj.handler;
				handleObj.handler = new_handler;
			}
		}
	};

	function loopy() {

		// Start the polling loop, asynchronously.
		timeout_id = window[ str_setTimeout ]( function() {

			// Iterate over all elements to which the 'resize' event is bound.
			elems.each( function() {
				var elem = $(this),
				width = elem.width(),
				height = elem.height(),
				data = $.data( this, str_data );

				// If element size has changed since the last time, update the element
				// data store and trigger the 'resize' event.
				if ( width !== data.w || height !== data.h ) {
					elem.trigger( str_resize, [ data.w = width, data.h = height ] );
				}

			});
			// Loop.
			loopy();

		}, jq_resize[ str_delay ] );
	};

})(jQuery,this);

function UpdateTableHeaders() {
	$("div.divTableWithFloatingHeader").each( function () {
		var originalHeaderRow = $(".tableFloatingHeaderOriginal", this);
		var floatingHeaderRow = $(".tableFloatingHeader", this);
		var offset = $(this).offset();
		var scrollTop = $(window).scrollTop();
		if ((scrollTop > offset.top) && (scrollTop < offset.top + $(this).height())) {
			floatingHeaderRow.css("visibility", "visible");
			floatingHeaderRow.css("display", "table-row");

			floatingHeaderRow.css("top", Math.min(scrollTop - offset.top, $(this).height() - floatingHeaderRow.height()) + "px");

			var rowWidth = $(this).css("width")+0;
			//floatingHeaderRow.css("width", rowWidth );
			floatingHeaderRow.width( rowWidth );

			// Copy cell widths from original header
			$("th", floatingHeaderRow).each( function (index) {
				var cellWidth = $("th", originalHeaderRow).eq(index).css("width")+0;
				$(this).css("width",cellWidth);
			});
			//var rowWidth = originalHeaderRow.css("width")+0;

			// Copy row width from whole table
		} else {
			floatingHeaderRow.css("visibility", "hidden");
			floatingHeaderRow.css("display", "none");
			floatingHeaderRow.css("top", "0px");
		}
	});
}

 
/* Test if an element has a certain class
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}