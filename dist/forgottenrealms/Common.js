/** Custom tags ****************************************************************
 * 
 * Description: Allows new tags to be added to a user's profile page and allows
 *              modifying existing tags.
 * Source:      Dev wiki (https://dev.fandom.com/wiki/UserTags)
 */
window.UserTagsJS = {
	modules: {},
	tags: {
	    'bureaucrat': { u:'Archmage', link:'Archmage', title:'This user is a Forgotten Realms Wiki bureaucrat.' },
	    'sysop':      { u:'Wizard', link: 'Wizard', title:'This user is a Forgotten Realms Wiki administrator.' },
	    'templates':  { u:'Templates Guru' },
	    'stars':      { u:'Astromancer' },
	    'ruffian':    { u:'Ruffian' },
	    'alchemist':  { u:'Alchemist' },
	    'cleric':     { u:'Cleric' },
	    'chiefscribe':{ u:'Chief Scribe' },
	    'comics':     { u:'Magazine & Comic Curator' },
	    'videogames': { u:'Video Game Curator' },
	    'eom-320':    { u:'Fandom Editor of the Month–March 2020' },
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
    'Moviesign' : ['templates'],
    'Sirwhiteout': ['stars'],
    'Ruf67': ['ruffian', 'eom-320'],
    'Lhynard': ['alchemist'],
    'Possessed Priest': ['cleric','videogames'],
    'BadCatMan': ['chiefscribe'],
    'Regis87': ['comics'],
};

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 *
 *  Source:      http://en.wikipedia.org/wiki/MediaWiki:Common.js
 */

var autoCollapse = 0;
var collapseCaption = "hide";
var expandCaption = "show";
 
function hasClass(element, className){
   var Classes = element.className.split(" ");
   for (var i = 0; i < Classes.length; i++){
      if (Classes[i] == className){
         return (true);
      }
   }
   return (false);
}
 
function collapseTable(tableIndex)
{
   var Button = document.getElementById("collapseButton" + tableIndex);
   var Table = document.getElementById("collapsibleTable" + tableIndex);
 
   if (!Table || !Button){
      return false;
   }
 
   var Rows = Table.getElementsByTagName("tr"); 
 
   if (Button.firstChild.data == collapseCaption){
      for (var i = 1; i < Rows.length; i++){
         Rows[i].style.display = "none";
      }
      Button.firstChild.data = expandCaption;
   } else{
      for (var i = 1; i < Rows.length; i++){
         Rows[i].style.display = Rows[0].style.display;
      }
      Button.firstChild.data = collapseCaption;
   }
}
 
function createCollapseButtons()
{
   var tableIndex = 0;
   var NavigationBoxes = new Object();
   var Tables = document.getElementsByTagName("table");
 
   for(var i = 0; i < Tables.length; i++){
      if(hasClass(Tables[i], "collapsible")){
         NavigationBoxes[ tableIndex ] = Tables[i];
         Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
         var Button     = document.createElement("span");
         var ButtonLink = document.createElement("a");
         var ButtonText = document.createTextNode(collapseCaption);
 
         Button.style.styleFloat = "right";
         Button.style.cssFloat = "right";
         Button.style.fontWeight = "normal";
         Button.style.textAlign = "right";
         Button.style.width = "6em";
 
         ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
         ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
         ButtonLink.appendChild(ButtonText);
 
         Button.appendChild(document.createTextNode("["));
         Button.appendChild(ButtonLink);
         Button.appendChild(document.createTextNode("]"));
 
         var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
         // only add button and increment count if there is a header row to work with
         if(Header){
            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
         }
      }
   }
 
   for(var i = 0; i < tableIndex; i++){
      if(hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))){
         collapseTable(i);
      }
   }
}
 
addOnloadHook(createCollapseButtons);

/* This conditionally loads the javascript necessary for Tools pages */
switch (mw.config.get('wgPageName')) {
    case 'Forgotten_Realms_Wiki:DM\'s_Helper_Tool_(3e)':
        importScript('MediaWiki:DMsHelper3e.js');
        break;
}

/*
    Added by User:Moviesign.
    
    The following script adds mouseover highlights to an <imagemap> and produces a collapsible legend
    of all links in the map, which also highlight map area on mouseover.
    
    Source: https://he.wikipedia.org/wiki/%D7%9E%D7%93%D7%99%D7%94_%D7%95%D7%99%D7%A7%D7%99:Imagemap-Highlight.js
    [copied unmodified except for a minor change: img.fadeTo(1, 0) -> img.fadeTo(1, 0.7) ]
    
    The <imagemap> must be surrounded by a <div class="imageMapHighlighter"> to enable this feature. Some CSS 
    modifications are also necessary for best presentation.
*/
$(document).ready(function() {

    var
//add this class to all elements created by the script. the reason is that we call the script again on
//window resize, and use the class to remove all the "artefacts" we created in the previous run.
		myClassName = 'imageMapHighlighterArtefacts'
		, liHighlightClass = 'liHighlighting'
// "2d context" attributes used for highlighting.
		, areaHighLighting = {fillStyle: 'rgba(250,0,0,0.7)', strokeStyle: 'yellow', lineJoin: 'round', lineWidth: 2}
//every imagemap that wants highlighting, should reside in a div of this 'class':
		, hilightDivMarker = '.imageMapHighlighter'
// specifically for wikis - redlinks tooltip adds this message
		, he = mw && mw.config && mw.config.get('wgUserLanguage') == 'he'
		, pageDoesntExistMessage = he ? ' (הדף אינו קיים)' : ' (page does not exist)'
		, expandLegend = he ? 'הצגת מקרא' : 'ּShow Legend'
		, collapseLegend = he ? 'הסתרת המקרא' : 'Hide Legend'
		;


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
			context = $this.data('context'),
			activate = e.type == 'mouseover',
			li = $this.prop('tagName') == 'LI';
		if (li && activate) { // in this case, we need to test visibility vis a vis scrolling
			var height = $this.height(),
				ol = $this.parent(),
				top = $this.position().top;
			if (top < 0 || top + height > ol.height()) 
				ol.animate({scrollTop: ol.scrollTop() + top - ol.height() / 2});
		}
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

	// massage the area "href" and create a human legible string to be used as the tooltip of "li"
	function pageOfHref(href, cssClass) {
		var page = href.replace(document.location.protocol + mw.config.get('wgServer') + "/wiki/", '').replace(/.*\/\//, '').replace(/_/g, ' ');
		page = page.replace(/#(.*)/, function(toReplace){return toReplace.replace(/\.([\dA-F]{2})/g, '%$1');});
		page = decodeURIComponent(page); // used for "title" of legends - just like "normal" wiki links.
		if (cssClass.indexOf('new') + 1)
			page += pageDoesntExistMessage;
		return page;
	}

	function init() {
		mw.util.addCSS('li.' + myClassName + '{white-space:nowrap;}\n' + //css for li element
					'li.' + liHighlightClass + '{background-color:yellow;}\n' + //css for highlighted li element.
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
			img.fadeTo(1, 0.7);	// make the image transparent - we see canvas and bgimg through it.
			var ol = $('<ol>', {'class': myClassName})
				.css({clear: 'both', margin: 0, listStyle: 'none', maxWidth: w + 'px', float: 'left', position: 'relative'})
				.attr({'data-expandtext' : expandLegend, 'data-collapsetext': collapseLegend});
			// ol below image, hr below ol. original caption pushed below hr.
			div.after($('<hr>', {'class': myClassName}).css('clear', 'both')).after(ol);
			var lis = {};	//collapse areas with same caption to one list item
			$('area', map).each(function() {
				var $this = $(this), text = this.title;
				var li = lis[text];	// title already met? use the same li
				if (!li) {			//no? create a new one.
					var href = this.href, cssClass = this['class'] || '';
					lis[text] = li = $('<li>', {'class': myClassName})
						.append($('<a>', {href: href, title: pageOfHref(href, cssClass), text: text, 'class': cssClass + ' internal'})) 
						.on('mouseover mouseout', mouseAction)
						.data('areas', [])
						.data('context', context)
						.appendTo(ol);
				}
				li.data('areas').push(this);	//add the area to the li
				$(this).on('mouseover mouseout', function(e) {li.trigger(e);});
			});
			ol.addClass('mw-collapsed')
			.makeCollapsible();
		});
	}

	//has at least one "imagehighlight" div, and canvas-capable browser:
	if ($(hilightDivMarker).length && $('<canvas>')[0].getContext)
		mw.loader.using( ['jquery.makeCollapsible', 'mediawiki.util'], init );
});

/* END <imagemap> highlighter script */