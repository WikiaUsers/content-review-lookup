/* Any JavaScript here will be loaded for all users on every page load. */
 
/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: 
  */
 
 var autoCollapse = 2;
 var collapseCaption = "▲";
 var expandCaption = "▼";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.rows;
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( $( Tables[i]).hasClass( "collapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( $( NavigationBoxes[i]).hasClass( "collapsed" ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i]).hasClass( "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
$( createCollapseButtons );
 
 
 /** jQuery tests *************************************
  *
  *  Description: Testing jQuery functions.
  *  Maintainers: 
  */
 
 function GEcollapseTable( tableIndex )
 {
     var Button = document.getElementById( "GEcollapseButton" + tableIndex );
     var $table = jQuery("#GEcollapsibleTable" + tableIndex );
 
     if ( !$table || !Button ) {
         return false;
     }
 
     jQuery("div.collapse", $table).slideToggle(400);
 
     if ( Button.firstChild.data == collapseCaption ) {
         Button.firstChild.data = expandCaption;
     } else {
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function GEcreateCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( $( Tables[i]).hasClass( "GEcollapsible" ) ) {
 
             /* only add button and increment count if there is a header row to work with */
             var HeaderRow = Tables[i].getElementsByTagName( "tr" )[0];
             if (!HeaderRow) continue;
             var Header = HeaderRow.getElementsByTagName( "th" )[0];
             if (!Header) continue;
 
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "GEcollapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.style.color = Header.style.color;
             ButtonLink.setAttribute( "id", "GEcollapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:GEcollapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             Header.insertBefore( Button, Header.childNodes[0] );
             tableIndex++;
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( $( NavigationBoxes[i]).hasClass( "GEcollapsed" ) || ( tableIndex >= autoCollapse && $( NavigationBoxes[i]).hasClass( "GEautocollapse" ) ) ) {
             GEcollapseTable( i );
         }
     }
 }
 
$( GEcreateCollapseButtons );
 
function createGETooltips () {
     //jQuery("div.GETooltip").tooltip();	
 }
 
$( createGETooltips );
 
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = collapseCaption;
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( $( NavChild).hasClass( 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( $( NavChild).hasClass( 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ($(NavChild).hasClass( 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if ($(NavChild).hasClass( 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if ($(NavFrame).hasClass( "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             for (
                  var NavChild = NavFrame.firstChild;
                  NavChild != null;
                  NavChild = NavChild.nextSibling
                 ) {
                 if ( $( NavChild).hasClass( 'NavPic' ) || $( NavChild).hasClass( 'NavContent' ) ) {
                     if (NavChild.style.display == 'none') {
                         NavToggleText = document.createTextNode(NavigationBarShow);
                         break;
                     }
                 }
             }
 
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if ($(NavFrame.childNodes[j]).hasClass( "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
  }
 
$( createNavigationBarToggleButton );
 
 
/* Test if an element has a certain class **************************************
  *
  * Description: Uses regular expressions and caching for better performance.
  * Maintainers: 
  */
 
 var hasClass = (function () {
     var reCache = {};
     return function (element, className) {
         return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
     };
 })();
 
 
 /** hover fix *************************************
 */
 
$("td").hover(function() {
 
  $el = $(this);
 
  $el.parent().addClass("hover");
 
  if ($el.parent().has('td[rowspan]').length == 0)
 
  	$el
      .parent()
      .prevAll('tr:has(td[rowspan]):first')
      .find('td[rowspan]')
      .addClass("hover");
 
}, function() { 
 
  $el
    .parent()
    .removeClass("hover")
    .prevAll('tr:has(td[rowspan]):first')
    .find('td[rowspan]')
    .removeClass("hover");
 
});
 
/*jshint jquery:true, browser:true, es5:true, devel:true, camelcase:true, curly:false, undef:true, 
 bitwise:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, 
 unused:true, regexp:true, strict:true, trailing:true, maxcomplexity:10 */
 
(function (module) {
 
    'use strict';
 
    /*!
     * contentloaded.js
     *
     * Author: Diego Perini (diego.perini at gmail.com)
     * Summary: cross-browser wrapper for DOMContentLoaded
     * Updated: 20101020
     * License: MIT
     * Version: 1.2
     *
     * URL:
     * http://javascript.nwbox.com/ContentLoaded/
     * http://javascript.nwbox.com/ContentLoaded/MIT-LICENSE
     *
     */
 
    // @win window reference
    // @fn function reference
    function contentLoaded(win, fn) {
 
        var done = false, top = true,
 
        doc = win.document, root = doc.documentElement,
 
        add = doc.addEventListener ? 'addEventListener' : 'attachEvent',
        rem = doc.addEventListener ? 'removeEventListener' : 'detachEvent',
        pre = doc.addEventListener ? '' : 'on',
 
        init = function(e) {
            if (e.type === 'readystatechange' && doc.readyState !== 'complete') return;
            (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) fn.call(win, e.type || e);
        },
 
        poll = function() {
            try { root.doScroll('left'); } catch(e) { setTimeout(poll, 50); return; }
            init('poll');
        };
 
        if (doc.readyState === 'complete') fn.call(win, 'lazy');
        else {
            if (doc.createEventObject && root.doScroll) {
                try { top = !win.frameElement; } catch(e) { }
                if (top) poll();
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }
    }
 
    var callbacks = [], ready = false;
    contentLoaded(window, function () {
        ready = true;
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](window.mediaWiki || {}, window.jQuery || window.$);
        }
    });
 
    module.ready = function (callback) {
        if (typeof callback !== 'function') {
            throw new Error('expected function as parameter');
        }
        if (ready) {
            callback(window.mediaWiki || {}, window.jQuery || window.$);
        } else {
            callbacks.push(callback);
        }
    };
 
}((window.dev = window.dev || {}).verbatim = window.dev.verbatim || {}));
 
 
/** image map
*********************************************************
  *
  *  Description: image map 
  *  Author: User: (http://www.mediawiki.org/wiki/Extension_talk:ImageMap#Imagemap_Area_highlight_script_11186)
  *  Maintainers: 
  */
 
$(document).ready(function() {
 
    var
//add this class to all elements created by the script. the reason is that we call the script again on
//window resize, and use the class to remove all the "artefacts" we created in the previous run.
		myClassName = 'imageMapHighlighterArtefacts',
		liHighlightClass = 'liHighlighting',
// "2d context" attributes used for highlighting.
		areaHighLighting = {fillStyle: 'rgba(0,0,0,0.35)', strokeStyle: 'DodgerBlue', lineJoin: 'round', lineWidth: 1},
		areaHighLightingAll = {fillStyle: 'rgba(0,0,0,0.20)', strokeStyle: 'white', lineJoin: 'round', lineWidth: 1},
 
//every imagemap that wants highlighting, should reside in a div of this 'class':
		hilightDivMarker = '.imageMapHighlighter',
// specifically for wikis - redlinks tooltip adds this message
		pageDoesntExistMessage = (mw && mw.config && mw.config.get('wgUserLanguage') == 'he')
			? ' (הדף אינו קיים)'
			: ' (page does not exist)';
 
 
	function drawMarker(context, areas) { // this is where the magic is done.
 
		function drawPoly(coords) {
			context.moveTo(coords.shift(), coords.shift());
			while (coords.length)
				context.lineTo(coords.shift(), coords.shift());
		}
 
		for (var i in areas) {
			var coords = areas[i].coords.split(',');
			context.beginPath();
			switch (areas[i].shape) {
				case 'rect': drawPoly([coords[0], coords[1], coords[0], coords[3], coords[2], coords[3], coords[2], coords[1]]); break;
				case 'circle': context.arc(coords[0],coords[1],coords[2],0,Math.PI*2);  break;//x,y,r,startAngle,endAngle
				case 'poly': drawPoly(coords); break;
			}
			context.closePath();
			context.stroke();
			context.fill();
		}
	}
 
	function mouseAction(e) {
		var $this = $(this),
			context = $this.data('context');
		$.extend(context, areaHighLighting);
		var activate = e.type == 'mouseenter';
		$this.toggleClass(liHighlightClass, activate);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		if (activate) {
			drawMarker(context, $this.data('areas'));
			if ($.client.profile().name === 'msie') {	// ie9: dimwit needs to be told twice.
				context.clearRect(0, 0, context.canvas.width, context.canvas.height);
				drawMarker(context, $this.data('areas'));
			}
		}
	}
	function mouseActionAll(e) {
		var $this = $(this),
			context = $this.data('context'),
			map = $this.data('map');
		$.extend(context, areaHighLightingAll);
		if (e.type == 'mouseenter') {
			$('area', map).each(function() {
				var $this = $(this), text = this.title, areas = new Array();
				areas.push(this);
				drawMarker(context, areas);
			});
		} else {
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	}
	}
 
	// massage the area "href" and create a human legible string to be used as the tooltip of "li"
	function pageOfHref(href, cssClass) {
		var page = href.replace(document.location.protocol + wgServer + "/wiki/", '').replace(/.*\/\//, '').replace(/_/g, ' ');
		page = page.replace(/#(.*)/, function(toReplace){return toReplace.replace(/\.([\dA-F]{2})/g, '%$1');});
		page = decodeURIComponent(page); // used for "title" of legends - just like "normal" wiki links.
		if (cssClass.indexOf('new') + 1)
			page += pageDoesntExistMessage;
		return page;
	}
 
	function init() {
		appendCSS('li.' + myClassName + '{white-space:nowrap;}\n' + //css for li element
					'li.' + liHighlightClass + '{background-color:Moccasin;}\n' + //css for highlighted li element.
					'.rtl li.' + myClassName + '{float: right; margin-left: 3em;}\n' +
					'.ltr li.' + myClassName + '{float: left; margin-right: 3em;}');
		$(hilightDivMarker+ ' img').each(function() {
			var img = $(this), map = img.siblings('map:first');
			if (!('area', map).length)
				return;	//not an imagemap. inside "each" anonymous function, 'return' means "continue".
			var w = img.width(), h = img.height();
			var dims = {position: 'absolute', width: w + 'px', height: h + 'px', border: 0, top:0, left:0};
			var jcanvas = $('<canvas>', {'class': myClassName})
				.css(dims)
				.attr({width: w, height: h});
			var bgimg = $('<img>', {'class': myClassName, src: img.attr('src')})
				.css(dims);//completely inert image. this is what we see.
			var context = $.extend(jcanvas[0].getContext("2d"), areaHighLighting);
// this is where the magic is done: prepare a sandwich of the inert bgimg at the bottom,
// the canvas above it, and the original, image, on top.
// so canvas won't steal the mouse events.
// pack them all TIGHTLY in a newly minted "relative" div, so when page chnage
// (other scripts adding elements, window resize etc.), canvas and imagese remain aligned.
			var div = $('<div>').css({position: 'relative', width: w + 'px', height: h + 'px'});
			img.before(div);	// put the div just above the image, and ...
			div.append(bgimg)	// place the background image in the div
				.append(jcanvas)// and the canvas. both are "absolute", so they don't occupy space in the div
				.append(img);	// now yank the original image from the window and place it on top.
			img.fadeTo(1, 0);	// make the image transparent - we see canvas and bgimg through it.
			var ol = $('<ol>', {'class': myClassName}).css({clear: 'both', marginTop: '1.5em'});
			// ol below image, hr below ol. original caption pushed below hr.
			div.after($('<hr>', {'class': myClassName}).css('clear', 'both')).after(ol);
			var lis = {};	//collapse areas with same caption to one list item
			$('area', map).each(function() {
				var $this = $(this), text = this.title;
				var li = lis[text];	// title already met? use the same li
				if (!li) {			//no? create a new one.
					var href = this.href, cssClass = this['class'] || '';
					lis[text] = li = $('<li>', {'class': myClassName})
						.append($('<a>', {href: href, title: pageOfHref(href, cssClass), text: text, 'class': cssClass})) 
						.bind('mouseenter mouseleave', mouseAction)
						.data('areas', [])
						.data('context', context);
					ol.append(li);
				}
				li.data('areas').push(this);	//add the area to the li
				$(this).bind('mouseenter mouseleave', function(e) {li.trigger(e);})
			});
			$(this).bind('mouseenter mouseleave', mouseActionAll)
				.data('context', context)
				.data('map', map);
		});
	}
 
	//has at least one "imagehighlight" div, and canvas-capable browser:
	if ($(hilightDivMarker).length && $('<canvas>')[0].getContext)
		init();
});
 
/* End of image map highlight script */

/* END OF TESTING ITEMS */