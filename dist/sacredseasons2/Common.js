/* Any JavaScript here will be loaded for all users on every page load. */

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

/* importScriptPage('ShowHide/code.js', 'dev');  */
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');

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
function addPurgeButton() {
	var theText = 'Refresh'; //default text, ala SMW
	if (typeof PurgeButtonText == "string") {
		theText = PurgeButtonText;
	}
	if ((wgNamespaceNumber != 500 && wgNamespaceNumber != 502) || skin == 'oasis') {
		switch (skin) {
			case 'answers':
			/* forked from monaco, close enough, pass to monaco */
			case 'awesome':
			/* you really shouldnt even have this value... */
			case 'monaco_old':
			/* really, where are you getting these skin settings from... */
			case 'monaco':
				$('#page_controls').append('<li id="control_purgebutton"><img src="/skins/common/blank.gif" class="sprite refresh" /><a id="ca-purge" href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge" rel="nofollow" title="Purge page">' + theText + '</a></li>');
				break;
			case 'oasis':
				$('.wikia-menu-button > ul').append('<li id="ca-purge"><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge">' + theText + '</a></li>');
				break;

			case 'uncyclopedia':
			/* monobook clone, pass to monobook */
			case 'wowwiki':
			/* monobook clone, pass to monobook */
			case 'lostbook':
			/* monobook clone, pass to monobook */
			case 'monobook':
				$('#p-cactions > .pBody > ul').append('<li id="ca-purge"><a href="/index.php?title=' + encodeURIComponent(wgPageName) + '&action=purge" title="Purge page">' + theText + '</a></li>');
				break;
		}
	}
}

if (wgNamespaceNumber >= 0 && wgNamespaceNumber < 400 && document.getElementById('ca-talk') == null) { /* addOnloadHook( addDiscussionTab ); */
}

function addDiscussionTab() {

	switch (skin) {
		case 'answers':
		/* forked from monaco, close enough, pass to monaco */
		case 'awesome':
		/* you really shouldnt even have this value... */
		case 'monaco_old':
		/* really, where are you getting these skin settings from... */
		case 'monaco':
			$('#page_tabs').append('<li class=""><a href="/wiki/Talk:' + encodeURIComponent(wgPageName) + '" id="ca-talk" title="Discussion about the content page [t]" accesskey="t" class="">Discussion</a></li>');
			break;
		case 'uncyclopedia':
		/* monobook clone, pass to monobook */
		case 'wowwiki':
		/* monobook clone, pass to monobook */
		case 'lostbook':
		/* monobook clone, pass to monobook */
		case 'monobook':
			$('#p-cactions > .pBody > ul').append('<li id="ca-talk"><a href="/wiki/Talk:' + encodeURIComponent(wgPageName) + '" title="Discussion about the content page [alt-t]" accesskey="t">Discussion</a></li>');
			break;

	}
}

function addDiscussionButton() {
	var theText = 'Tech Talk'; //default text, ala SMW
	if (typeof DiscussionButtonText == "string") {
		theText = DiscussionButtonText;
	}

	switch (skin) {
		case 'answers':
		/* forked from monaco, close enough, pass to monaco */
		case 'awesome':
		/* you really shouldnt even have this value... */
		case 'monaco_old':
		/* really, where are you getting these skin settings from... */
		case 'monaco':
			$('#page_controls').append('<li id="ca-talk"><img src="/skins/common/blank.gif" class="sprite talk" /><a href="/wiki/Talk:' + encodeURIComponent(wgPageName) + '" rel="nofollow" title="Discussion about the layout">' + theText + '</a></li>');
			break;
		case 'uncyclopedia':
		/* monobook clone, pass to monobook */
		case 'wowwiki':
		/* monobook clone, pass to monobook */
		case 'lostbook':
		/* monobook clone, pass to monobook */
		case 'monobook':
			$('#p-cactions > .pBody > ul').append('<li id="ca-purge"><a href="/wiki/Talk:' + encodeURIComponent(wgPageName) + '" title="Technical Discussion">' + theText + '</a></li>');
			break;

	}
}

if (wgNamespaceNumber >= 0 && wgNamespaceNumber < 400 && document.getElementById('ca-talk') == null) {
	addOnloadHook(addDiscussionButton);
}

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

$(document).ready( function() {

	htmlbodyready($(this),false);
    $.fn.startThrobbing = function() {
	$('div[id^="flytabs_"]').css("display", "inline");
        this.append('<div class="wikiaThrobber"></div>');
    };
    $.fn.stopThrobbing = function() {
        htmlbodyready(this,true);
        this.find('.wikiaThrobber').remove();
    };
});



function htmlbodyready(htmlbody, subpage) {
 
	//$('div[id^="flytabs_"][id$="-content-wrapper"] > div',htmlbody).addClass("TabViewUnloaded");
 	//$('div[id^="flytabs_"][id$="-content-wrapper"]',htmlbody).addClass("TabViewUnloaded2");
	$('div[id^="flytabs_"]',htmlbody).css("display", "none");
        // $('div[id^="flytabs_"]',htmlbody).each(function(index) {
        //                alert('found');
        //           //alert(index + ': ' + $(this).attr("id"));
        // });
        //.bind('stopThrobbing', function(event, ui) {
        //         alert('done');
        //});
	//	htmlbodyready($(this));
	//}).bind('tabsshow', function(event, ui) {
	//	$(this).css("display", "inline");
	//}).css("display", "none");

	$('.showduringload',htmlbody).css("display", "none");
	$('.showafterload',htmlbody).css("display", "inline");
	$(".Expandable",htmlbody).parent(".table").parent(".WikiaWideTablesWrapper").addClass("WikiaWideTablesExpand").removeClass("WikiaWideTablesWrapper");
	$(".WikiaWideTablesWrapper .sprite.popout",htmlbody).remove();
	$('.WikiaWideTablesWrapper .table',htmlbody).contents().unwrap();
	$('.WikiaWideTablesWrapper',htmlbody).contents().unwrap();
	$(".WikiaWideTablesExpand",htmlbody).addClass("WikiaWideTablesWrapper").removeClass("WikiaWideTablesExpand");

	var useFloatingHeaders = !(/MSIE (\d+\.\d+);/.test(navigator.userAgent));
	if (typeof FloatingHeaders == "boolean") {
		useFloatingHeaders = FloatingHeaders;
	}
	$(".tabberlive",htmlbody).each( function (index) {
		var tabs = $(this)[0].tabber.tabs;
		var activetab = -1;
		for (var j = 0; j <= tabs.length - 1; j++) {
			var tab = tabs[j];
			var text = tab.div.innerText || tab.div.textContent || "";
			if (tab.div.innerHTML.trim().length <= 25 && text.trim().length == 0) {
				$("A", tab.li).attr("disabled", "disabled").css("cursor", "default").attr("onclick", "return false;");
			} else {
				if (activetab == -1) {
					activetab = j;
					$("A:first", tab.li).click();
				}
			}
		}
	});
        if (subpage) {
	     sortables_init_surface(htmlbody);
        }
	createCollapseButtons_surface(htmlbody);
	createNavigationBarToggleButton_surface(htmlbody);

	//if (useFloatingHeaders) {
	//	$(".wikitable",htmlbody).addClass("TableWithFloatingHeader");
	//	$(window).bind("scroll", UpdateTableHeaders);
	//	$(window).bind("resize", UpdateTableHeaders);
	//}

	//$(".TableWithFloatingHeader",htmlbody).addClass("TableWithFloatingHeaderNotDefined");

	//$(".TableWithFloatingHeaderNotDefined",htmlbody).bind("resize", createFloatingHeader);

	//$(".TableWithFloatingHeaderNotDefined",htmlbody).trigger("resize");
}

/*
 * Table sorting script based on one (c) 1997-2006 Stuart Langridge and Joost
 * de Valk:
 * http://www.joostdevalk.nl/code/sortable-table/
 * http://www.kryogenix.org/code/browser/sorttable/
 *
 * @todo don't break on colspans/rowspans (bug 8028)
 * @todo language-specific digit grouping/decimals (bug 8063)
 * @todo support all accepted date formats (bug 8226)
 */

var ts_image_path = stylepath+"/common/images/";
var ts_image_up = "sort_up.gif";
var ts_image_down = "sort_down.gif";
var ts_image_none = "sort_none.gif";
var ts_europeandate = wgContentLanguage != "en"; // The non-American-inclined can change to "true"
var ts_alternate_row_colors = false;
var ts_number_transform_table = null;
var ts_number_regex = null;

function sortables_init() {
	sortables_init_surface(document);
}

function sortables_init_surface(surface) {

	 mw.loader.using('jquery.tablesorter', function() {
              $(".sortable",surface).each( function (index) {
		     if (!this.id) {
		    	    this.setAttribute('id','sortable_table_id_'+generateUniqueID());
		     }

		     if (!$(this).hasClass("MakeSortableTableDone")) {
			     //ts_makeSortable(this);
                            $(this).tablesorter();
			    $(this).addClass("MakeSortableTableDone");
		     }
	      });
         });
}

function createFloatingHeader(ev) {
	var tableHeight = $(this).height();
	if (tableHeight > $(window).height()) {
		$(this).wrap("<div class=\"divTableWithFloatingHeader\" style=\"position:relative\"></div>");

		var originalHeaderRow = $("tr:first", this)
		$("th", originalHeaderRow).each( function (index) {
			var cellWidth = $(this).width() + 0;
			$(this).width(cellWidth);
		});
		$(this).css("width", originalHeaderRow.css("width"));
		originalHeaderRow.before(originalHeaderRow.clone());
		var clonedHeaderRow = $("tr:first", this)

		clonedHeaderRow.addClass("tableFloatingHeader unsortable ");
		clonedHeaderRow.css("position", "absolute");
		clonedHeaderRow.css("top", "0px");
		clonedHeaderRow.css("left", $(this).css("margin-left"));
		clonedHeaderRow.css("visibility", "hidden");
		clonedHeaderRow.css("display", "none");
		clonedHeaderRow.css("width", originalHeaderRow.css("width"));
		originalHeaderRow.addClass("tableFloatingHeaderOriginal unsortable ");
		$(this).removeClass("TableWithFloatingHeaderNotDefined");
		$(this).unbind("resize", createFloatingHeader);
	}

}

function ts_getInnerText(el) {
	return getInnerText( el );
}

function ts_resortTable_fhs(lnk) {

	var span = lnk.getElementsByTagName('span')[0];
	var td = lnk.parentNode;
	var tr = td.parentNode;
	var column = td.cellIndex;
	var table = tr.parentNode;
	while (table && !(table.tagName && table.tagName.toLowerCase() == 'table'))
		table = table.parentNode;
	if (!table)
		return;
	if (table.rows.length <= 1)
		return;
	if (ts_number_transform_table == null) {
		ts_initTransformTable();
	}
	var rowStart = (table.tHead && table.tHead.rows.length > 0 ? 0 : 1);
	var itm = "";
	for (var j = rowStart; j < table.rows.length - 1; j++) {
		var row = table.rows[j];
		if ((" " + row.className + " ").indexOf(" unsortable ") < 0) {
			break;
		} else {
			rowStart = j + 1;
		}
	}

	for (var i = rowStart; i < table.rows.length; i++) {
		if (table.rows[i].cells.length > column) {
			itm = ts_getInnerText(table.rows[i].cells[column]);
			itm = itm.replace(/^[\s\xa0]+/, "").replace(/[\s\xa0]+$/, "");
			if (itm != "")
				break;
		}
	}

	var sortfn = ts_sort_generic;
	var preprocessor = ts_toLowerCase;
	if (/^\d\d[\/. -][a-zA-Z]{3}[\/. -]\d\d\d\d$/.test(itm)) {
		preprocessor = ts_dateToSortKey;
	} else if (/^\d\d[\/.-]\d\d[\/.-]\d\d\d\d$/.test(itm)) {
		preprocessor = ts_dateToSortKey;
	} else if (/^\d\d[\/.-]\d\d[\/.-]\d\d$/.test(itm)) {
		preprocessor = ts_dateToSortKey;
	} else if (/(^[\u00a3$\u20ac\u00a4\u00a5]|\u00a2$)/.test(itm)) {
		preprocessor = ts_currencyToSortKey;
	} else if (ts_number_regex.test(itm)) {
		preprocessor = ts_parseFloat;
	}
	var reverse = (span.getAttribute("sortdir") == 'down');
	var newRows = new Array();
	var staticRows = new Array();
	for (var j = rowStart; j < table.rows.length; j++) {
		var row = table.rows[j];
		if ((" " + row.className + " ").indexOf(" unsortable ") < 0) {
			var keyText = ts_getInnerText(row.cells[column]);
			var oldIndex = (reverse ? -j : j);
			var preprocessed = preprocessor(keyText);
			newRows[newRows.length] = new Array(row, preprocessed, oldIndex);
		} else
			staticRows[staticRows.length] = new Array(row, false, j - rowStart);
	}
	newRows.sort(sortfn);
	var arrowHTML;
	if (reverse) {
		arrowHTML = '<img src="' + ts_image_path + ts_image_down + '" alt="&darr;"/>';
		newRows.reverse();
		span.setAttribute('sortdir', 'up');
	} else {
		arrowHTML = '<img src="' + ts_image_path + ts_image_up + '" alt="&uarr;"/>';
		span.setAttribute('sortdir', 'down');
	}
	for (var i = 0; i < staticRows.length; i++) {
		var row = staticRows[i];
		newRows.splice(row[2], 0, row);
	}
	for (var i = 0; i < newRows.length; i++) {
		if ((" " + newRows[i][0].className + " ").indexOf(" sortbottom ") == -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}
	for (var i = 0; i < newRows.length; i++) {
		if ((" " + newRows[i][0].className + " ").indexOf(" sortbottom ") != -1)
			table.tBodies[0].appendChild(newRows[i][0]);
	}
	var spans = getElementsByClassName(tr, "span", "sortarrow");
	for (var i = 0; i < spans.length; i++) {
		spans[i].innerHTML = '<img src="' + ts_image_path + ts_image_none + '" alt="&darr;"/>';
	}
	span.innerHTML = arrowHTML;

	if ((" " + tr.className + " ").indexOf(" tableFloatingHeaderOriginal ") >= 0) {
		$(".tableFloatingHeader", table).children().children("a").children(".sortarrow").html('<img src="' + ts_image_path + ts_image_none + '" alt="&darr;"/>');
		var Span2 = $(".tableFloatingHeader", table).children("*:nth-child(" + (column + 1) + ")").children("a").children(".sortarrow").eq(0);
		Span2.html(arrowHTML);
		Span2.attr('sortdir', span.getAttribute("sortdir"))
	}
	if ((" " + tr.className + " ").indexOf(" tableFloatingHeader ") >= 0) {
		$(".tableFloatingHeaderOriginal", table).children().children("a").children(".sortarrow").html('<img src="' + ts_image_path + ts_image_none + '" alt="&darr;"/>');
		var Span2 = $(".tableFloatingHeaderOriginal", table).children("*:nth-child(" + (column + 1) + ")").children("a").children(".sortarrow").eq(0);
		Span2.html(arrowHTML);
		Span2.attr('sortdir', span.getAttribute("sortdir"))

	}

	if (ts_alternate_row_colors) {
		ts_alternate(table);
	}
}

function ts_makeSortable(table) {

	var firstRow;
	if (table.rows && table.rows.length > 0) {
		if (table.tHead && table.tHead.rows.length > 0) {
			firstRow = table.tHead.rows[table.tHead.rows.length - 1];
		} else {
			firstRow = table.rows[0];
		}
	}
	if (!firstRow) {
		return;
	}

	// We have a first row: assume it's the header, and make its contents clickable links
	for (var i = 0; i < firstRow.cells.length; i++) {
		var cell = firstRow.cells[i];
		var numclicks = 0;
		if ((' ' + cell.className + ' ').indexOf(' unsortable ') == -1) {
			cell.innerHTML += '<br><a href="#" class="sortheader" ' + 'onclick="ts_resortTable_fhs(this);return false;">' + '<span class="sortarrow">' + '<img src="' + ts_image_path + ts_image_none + '" alt="&darr;"/></span></a>';

			if ((' ' + cell.className + ' ').indexOf(' sortable-asc ') > -1) {
				numclicks = 1;
			}
			if ((' ' + cell.className + ' ').indexOf(' sortable-desc ') > -1) {
				numclicks = 2;
			}

			if (numclicks > 0) {
				//alert(cell.className);
				//Create Array of All HTML Tags
				var allHTMLTags = cell.getElementsByTagName("*");

				//Loop through all tags using a for loop
				for (itag = 0; itag < allHTMLTags.length; itag++) {

					//Get all tags with the specified class name.
					if (allHTMLTags[itag].className == 'sortheader') {

						for (clicked = 0; clicked < numclicks; clicked++) {
							ts_resortTable_fhs(allHTMLTags[itag]);
						}

					}
				}
			}

		}
	}
	if (ts_alternate_row_colors) {
		ts_alternate(table);
	}
}


function ts_initTransformTable() {
	if ( typeof wgSeparatorTransformTable == "undefined"
			|| ( wgSeparatorTransformTable[0] == '' && wgDigitTransformTable[2] == '' ) )
	{
		digitClass = "[0-9,.]";
		ts_number_transform_table = false;
	} else {
		ts_number_transform_table = {};
		// Unpack the transform table
		// Separators
		ascii = wgSeparatorTransformTable[0].split("\t");
		localised = wgSeparatorTransformTable[1].split("\t");
		for ( var i = 0; i < ascii.length; i++ ) { 
			ts_number_transform_table[localised[i]] = ascii[i];
		}
		// Digits
		ascii = wgDigitTransformTable[0].split("\t");
		localised = wgDigitTransformTable[1].split("\t");
		for ( var i = 0; i < ascii.length; i++ ) { 
			ts_number_transform_table[localised[i]] = ascii[i];
		}

		// Construct regex for number identification
		digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '\\.'];
		maxDigitLength = 1;
		for ( var digit in ts_number_transform_table ) {
			// Escape regex metacharacters
			digits.push( 
				digit.replace( /[\\\\$\*\+\?\.\(\)\|\{\}\[\]\-]/,
					function( s ) { return '\\' + s; } )
			);
			if (digit.length > maxDigitLength) {
				maxDigitLength = digit.length;
			}
		}
		if ( maxDigitLength > 1 ) {
			digitClass = '[' + digits.join( '', digits ) + ']';
		} else {
			digitClass = '(' + digits.join( '|', digits ) + ')';
		}
	}

	// We allow a trailing percent sign, which we just strip.  This works fine
	// if percents and regular numbers aren't being mixed.
	ts_number_regex = new RegExp(
		"^(" +
			"[+-]?[0-9][0-9,]*(\\.[0-9,]*)?(E[+-]?[0-9][0-9,]*)?" + // Fortran-style scientific
			"|" +
			"[+-]?" + digitClass + "+%?" + // Generic localised
		")$", "i"
	);
}

function ts_toLowerCase( s ) {
	return s.toLowerCase();
}

function ts_dateToSortKey(date) {	
	// y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
	if (date.length == 11) {
		switch (date.substr(3,3).toLowerCase()) {
			case "jan": var month = "01"; break;
			case "feb": var month = "02"; break;
			case "mar": var month = "03"; break;
			case "apr": var month = "04"; break;
			case "may": var month = "05"; break;
			case "jun": var month = "06"; break;
			case "jul": var month = "07"; break;
			case "aug": var month = "08"; break;
			case "sep": var month = "09"; break;
			case "oct": var month = "10"; break;
			case "nov": var month = "11"; break;
			case "dec": var month = "12"; break;
			// default: var month = "00";
		}
		return date.substr(7,4)+month+date.substr(0,2);
	} else if (date.length == 10) {
		if (ts_europeandate == false) {
			return date.substr(6,4)+date.substr(0,2)+date.substr(3,2);
		} else {
			return date.substr(6,4)+date.substr(3,2)+date.substr(0,2);
		}
	} else if (date.length == 8) {
		yr = date.substr(6,2);
		if (parseInt(yr) < 50) { 
			yr = '20'+yr; 
		} else { 
			yr = '19'+yr; 
		}
		if (ts_europeandate == true) {
			return yr+date.substr(3,2)+date.substr(0,2);
		} else {
			return yr+date.substr(0,2)+date.substr(3,2);
		}
	}
	return "00000000";
}

function ts_parseFloat( s ) {
	if ( !s ) {
		return 0;
	}
	if (ts_number_transform_table != false) {
		var newNum = '', c;
		
		for ( var p = 0; p < s.length; p++ ) {
			c = s.charAt( p );
			if (c in ts_number_transform_table) {
				newNum += ts_number_transform_table[c];
			} else {
				newNum += c;
			}
		}
		s = newNum;
	}

	num = parseFloat(s.replace(/,/g, ""));
	return (isNaN(num) ? 0 : num);
}

function ts_currencyToSortKey( s ) {
	return ts_parseFloat(s.replace(/[^0-9.,]/g,''));
}

function ts_sort_generic(a, b) {
	return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : a[2] - b[2];
}

function ts_alternate(table) {
	// Take object table and get all it's tbodies.
	var tableBodies = table.getElementsByTagName("tbody");
	// Loop through these tbodies
	for (var i = 0; i < tableBodies.length; i++) {
		// Take the tbody, and get all it's rows
		var tableRows = tableBodies[i].getElementsByTagName("tr");
		// Loop through these rows
		// Start at 1 because we want to leave the heading row untouched
		for (var j = 0; j < tableRows.length; j++) {
			// Check if j is even, and apply classes for both possible results
			var oldClasses = tableRows[j].className.split(" ");
			var newClassName = "";
			for (var k = 0; k < oldClasses.length; k++) {
				if (oldClasses[k] != "" && oldClasses[k] != "even" && oldClasses[k] != "odd")
					newClassName += oldClasses[k] + " ";
			}
			tableRows[j].className = newClassName + (j % 2 == 0 ? "even" : "odd");
		}
	}
}

/*
 * End of table sorting code
 */
 
/* Test if an element has a certain class **************************************
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
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
	var Button = document.getElementById("collapseButton" + tableIndex);
	var Table = document.getElementById("collapsibleTable" + tableIndex);

	if (!Table || !Button) {
		return false;
	}

	var Rows = Table.rows;

	if (Button.firstChild.data == collapseCaption) {
		for (var i = 1; i < Rows.length; i++) {
			Rows[i].style.display = "none";
		}
		Button.firstChild.data = expandCaption;
	} else {
		for (var i = 1; i < Rows.length; i++) {
			Rows[i].style.display = Rows[0].style.display;
		}
		Button.firstChild.data = collapseCaption;
	}
}

function createCollapseButtons() {
	createCollapseButtons_surface(jQuery(document));
}

function createCollapseButtons_surface(surface) {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = $("table",surface) //surface[0].getElementsByTagName("table");

	for (var i = 0; i < Tables.length; i++) {

		if (hasClass(Tables[i], "collapsible") && !(hasClass(Tables[i], "collapsibleDone"))) {
			Tables[i].className += ' collapsibleDone';

			/* only add button and increment count if there is a header row to work with */
			var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
			if (!HeaderRow)
				continue;
			var Header = HeaderRow.getElementsByTagName("th")[0];
			if (!Header)
				continue;

			var TableID = generateUniqueID();

			NavigationBoxes[tableIndex] = Tables[i];
			NavigationBoxes[tableIndex+1] = TableID ;

			Tables[i].setAttribute("id", "collapsibleTable" + TableID );

			var Button = document.createElement("span");
			var ButtonLink = document.createElement("a");
			var ButtonText = document.createTextNode(collapseCaption);

			Button.className = "collapseButton"; //Styles are declared in Common.css
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute("id", "collapseButton" + TableID );
			ButtonLink.setAttribute("href", "javascript:collapseTable(" + TableID + ");");
			ButtonLink.appendChild(ButtonText);

			//          var ButtonImage = document.createElement("img");
			//            ButtonImage.src="http://www.gifandgif.eu/animated_gif/Arrows/Animated%20Gif%20Arrows%20%2862%29.gif";
			//            Button.appendChild(ButtonImage);
			Button.appendChild(document.createTextNode("["));
			Button.appendChild(ButtonLink);
			Button.appendChild(document.createTextNode("]"));

			Header.insertBefore(Button, Header.childNodes[0]);
			tableIndex+=2;
		}
	}

	for (var i = 0; i < tableIndex; i+=2) {
		if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i].Table, "autocollapse"))) {
			collapseTable(NavigationBoxes[i+1]);
		} else if (hasClass(NavigationBoxes[i], "innercollapse")) {
			var element = NavigationBoxes[i];
			while (element = element.parentNode) {
				if (hasClass(element, "outercollapse")) {
					collapseTable(NavigationBoxes[i+1]);
					break;
				}
			}
		}
	}
}

/** Dynamic Navigation Bars (experimental) *************************************
 *
 *  Description: See [[Wikipedia:NavFrame]].
 *  Maintainers: UNMAINTAINED
 */

// set up the words in your language
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';

// shows and hides content and picture (if available) of navigation bars
// Parameters:
//     indexNavigationBar: the index of navigation bar to be toggled

function toggleNavigationBar(indexNavigationBar) {
	var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
	var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

	if (!NavFrame || !NavToggle) {
		return false;
	}

	// if shown now
	if (NavToggle.firstChild.data == NavigationBarHide) {
		for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
			if (hasClass(NavChild, 'NavPic')) {
				NavChild.style.display = 'none';
			}
			if (hasClass(NavChild, 'NavContent')) {
				NavChild.style.display = 'none';
			}
		}
		NavToggle.firstChild.data = NavigationBarShow;

		// if hidden now
	} else if (NavToggle.firstChild.data == NavigationBarShow) {
		for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
			if (hasClass(NavChild, 'NavPic')) {
				NavChild.style.display = 'block';
			}
			if (hasClass(NavChild, 'NavContent')) {
				NavChild.style.display = 'block';
			}
		}
		NavToggle.firstChild.data = NavigationBarHide;
	}
}

// adds show/hide-button to navigation bars

function createNavigationBarToggleButton() {
	createNavigationBarToggleButton_surface(jQuery(document));
}

function createNavigationBarToggleButton_surface(surface) {
	var indexNavigationBar = 0;
	// iterate over all < div >-elements
	var divs = $("div",surface) //surface[0].getElementsByTagName("div");

	for (var i = 0; NavFrame = divs[i]; i++) {
		// if found a navigation bar
		if (hasClass(NavFrame, "NavFrame")) {

			indexNavigationBar = generateUniqueID();
			//           var ButtonImage = document.createElement("img");
			//            ButtonImage.src="http://www.gifandgif.eu/animated_gif/Arrows/Animated%20Gif%20Arrows%20%2862%29.gif";

			var NavToggle = document.createElement("a");
			NavToggle.className = 'NavToggle';
			NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
			NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

			var isCollapsed = hasClass(NavFrame, "collapsed");
			/*
			 * Check if any children are already hidden.  This loop is here for backwards compatibility:
			 * the old way of making NavFrames start out collapsed was to manually add style="display:none"
			 * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
			 * the content visible without JavaScript support), the new recommended way is to add the class
			 * "collapsed" to the NavFrame itself, just like with collapsible tables.
			 */
			for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
				if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
					if (NavChild.style.display == 'none') {
						isCollapsed = true;
					}
				}
			}
			if (isCollapsed) {
				for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
					if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
						NavChild.style.display = 'none';
					}
				}
			}
			var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
			//            NavToggle.appendChild(ButtonImage);
			NavToggle.appendChild(NavToggleText);

			// Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
			for (var j = 0; j < NavFrame.childNodes.length; j++) {
				if (hasClass(NavFrame.childNodes[j], "NavHead")) {
					NavFrame.childNodes[j].appendChild(NavToggle);
				}
			}
			NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
		}
	}
}

//addOnloadHook(createNavigationBarToggleButton);

/* http://www.wowwiki.com/MediaWiki:Common.js */

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

// AJAX RC
var ajaxPages = new Array("Special:RecentChanges");
var ajaxRCOverride = false;
var rcTimer;
var doRefresh = true;
var rcRefresh = 60000;
var rcBindAfterLoad;
var ajaxRCCookie ;

function ajaxRC() {
        rcBindAfterLoad=($(".AdminDashboardArticleHeader").length);
        bindRC();
	if (ajaxRCCookie)
		loadRCData();
}

function bindRC() {
        ajaxRCCookie = (getCookie("ajaxRC") == "on" || ajaxRCOverride) ? true : false;

	appTo = ($("#WikiaPageHeader").length) ? $("#WikiaPageHeader") : ($(".AdminDashboardArticleHeader").length) ? $(".AdminDashboardArticleHeader") : $(".firstHeading");
	appTo.append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; border-bottom-color: #6D0D00; cursor:help;" title="Enable auto-refreshing page loads">AJAX:</span><span style="position:relative; top:2px; left:5px;" id="ajaxRCCheckbox"><input type="checkbox" id="ajaxToggle"></span><span style="position:relative; top:0px; left:10px;" id="ajaxRCprogress"><img src="https://images.wikia.nocookie.net/sacredseasons2/images/d/d0/Ajaxrc_progressbar.gif" border="0" alt="AJAX operation in progress" /></span>');
	$("#ajaxRCprogress").bind("ajaxSend", function () {
		$(this).show();
	}).bind("ajaxComplete", function () {
		$(this).hide();
	});
	$("#ajaxToggle").click(toggleRC);
	$("#ajaxRCprogress").hide();
	$("#ajaxToggle").attr("checked", ajaxRCCookie);
}

function toggleRC() {
	if ($("#ajaxToggle").attr("checked")) {
		setCookie("ajaxRC", "on", 30);
		doRefresh = true;
		loadRCData();
	} else {
		setCookie("ajaxRC", "off", 30);
		doRefresh = false;
		clearTimeout(rcTimer);
	}
}

function loadRCData() {
	cC = ($("#WikiaArticle").length) ? "#WikiaArticle" : "#bodyContent";
	$(cC).load(location.href + " " + cC, function (data) {
                if (rcBindAfterLoad)
                        bindRC();
		if (doRefresh)
			rcTimer = setTimeout("loadRCData();", rcRefresh);
	});
}

// portal switch
var ptabs;

function doPortals() {
	cTab = $("#mptabs>strong").prevAll().length + 1;
	ptabs = $("#mptabs>*");
	ptabs.css("cursor", "pointer");
	ptabs.click( function (event) {
		event.preventDefault();
		target = $(event.target);
		if (target.parent().not("#mptabs").html())
			target = target.parent();
		sp = target.prevAll().length;
		ptabs.eq(cTab - 1).children("*").removeClass("activetab").addClass("inactivetab");
		$("#portal" + cTab).hide();
		cTab = sp + 1;
		ptabs.eq(sp).children("*").removeClass("inactivetab").addClass("activetab");
		$("#portal" + cTab).show();
	});
}

dil = new Array();

function findDupImages(gf) {
	output = "";
	url = "/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
	if (gf)
		url += "&gaifrom=" + gf;
	$.getJSON(url, function (data) {
		if (data.query) {
			pages = data.query.pages;
			for (pageID in pages) {
				dils = "," + dil.join();
				if (dils.indexOf("," + pages[pageID].title) == -1 && pages[pageID].title.indexOf("File::") == -1 && pages[pageID].duplicatefiles) {
					output += "<h3><a href='/" + pages[pageID].title + "'>" + pages[pageID].title + "</a></h3>\n<ul>\n";
					for (x = 0; x < pages[pageID].duplicatefiles.length; x++) {
						output += "<li><a href='/File:" + pages[pageID].duplicatefiles[x].name + "'>File:" + pages[pageID].duplicatefiles[x].name + "</a></li>\n";
						dil.push("File:" + pages[pageID].duplicatefiles[x].name.replace(/_/g, " "));
					}
					output += "</ul>\n\n"
				}
			}
			$("#mw-dupimages").append(output);
			if (data["query-continue"])
				setTimeout("findDupImages('" + data["query-continue"].allimages.gaifrom + "');", 5000);
		}
	});
}

$( function () {
	for (x in ajaxPages) {
		if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length == 0)
			ajaxRC();
	}

	if (wgNamespaceNumber >= 0 && !window.PurgeButtonsLoaded && document.getElementById('control_purge') == null) {
		addOnloadHook(addPurgeButton);
	}
	var PurgeButtonsLoaded = true; // prevent duplicate running (but not dupe buttons from outside this code)
});
// START OF TOOLTIP CODE
// This tooltip code was written by Pcj
// Updated to work with Wikia skin by Uberfuzzy

article = "";

var tooltipsOn = true;

var $tfb;

var $ttfb;

var $htt;

var activeHoverLink = null;

var tipCache = new Object;

function hideTip() {
	$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
	activeHoverLink = null;
}

function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility", "visible");
	moveTip(e);
}

function moveTip(e) {
	$ct = $htt.not(":empty");
	var newTop = e.clientY + (e.clientY > $(window).height() / 2 ? -($ct.innerHeight() + 20) : 20);
	var newLeft = e.clientX + (e.clientX > $(window).width() / 2 ? -($ct.innerWidth() + 20) : 20);
	$ct.css({
		position: "fixed",
		top: newTop + "px",
		left: newLeft + "px"
	});
}

function showTip(e) {
	var $t = $(this);
	activeHoverLink = $t;
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.removeAttr("title");
		$p.removeAttr("title");
		var url = "/index.php?title=" + $t.data("tt").replace(/ /g, "_").replace(/\?/g, "%3F") + "&action=render div.tooltip-content";
		if (tipCache[url] != null) {
			$tfb.html(tipCache[url]);
			displayTip(e);
			return;
		}
		$tfb.load(url, function() {
			if ($t != activeHoverLink)
				return;
			if ($tfb.html() == "")
				$tfb.html('<div class="tooltip-content"><b>Error</b><br />This target either has no tooltip<br />or was not intended to have one.</div>');
			$tfb.find(".tooltip-content").css("display", "");
			tipCache[url] = $tfb.html();
			displayTip(e);
		});
	}
}

function hideTemplateTip() {
	$ttfb.html("").removeClass("tooltip-ready").addClass("hidden");
}

function showTemplateTip(e) {
	$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + "</div>");
	displayTip(e);
}

function bindTT() {
	$t = $(this);
	$p = $t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)", "").replace("?", "%3F")).hover(showTip, hideTip).mousemove(moveTip);
	}
}

function ttMouseOver() {
	if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
		$(article + " span.ajaxttlink").each(bindTT);
		$(article + " span.tttemplatelink").hover(showTemplateTip, hideTemplateTip).mousemove(moveTip);
	}
}

// check to see if it is active then do it
$( function() {
	if(skin=='oasis') {
		article = "#WikiaArticle";
	} else {
		article = "#bodyContent";
	}

	ttMouseOver();
});
// END OF TOOLTIP CODE