/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

 // Import [[MediaWiki:Onlyifuploading.js]] 
 

 
 // END import Onlyifediting-functions
 // ============================================================

/* Substitute Template:Information into upload page */
$(document).ready(function() {

	if (wgPageName != 'Spécial:Téléverser') {
		return;
	}

	$('#wpUploadDescription').text("{{Fichier\r\n|nom=\r\n|auteur=\r\n|source=\r\n|licence=\r\n|détails=\r\n}}");

});

/* JS pour permettre la mise en surbrillance des zones d'une imagemap au survol de la souris - http://he.wikipedia.org/wiki/%D7%9E%D7%93%D7%99%D7%94_%D7%95%D7%99%D7%A7%D7%99:Imagemap-Highlight.js */
$(document).ready(function() {
 
    var
//add this class to all elements created by the script. the reason is that we call the script again on
//window resize, and use the class to remove all the "artefacts" we created in the previous run.
		myClassName = 'imageMapHighlighterArtefacts',
		liHighlightClass = 'liHighlighting',
// "2d context" attributes used for highlighting.
		areaHighLighting = {fillStyle: 'rgba(0,0,0,0.35)', strokeStyle: 'blue', lineJoin: 'round', lineWidth: 2},
//every imagemap that wants highlighting, should reside in a div of this 'class':
		hilightDivMarker = '.carte',
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
		var activate = e.type == 'mouseover';
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
		var page = href.replace(document.location.protocol + wgServer + "/wiki/", '').replace(/.*\/\//, '').replace(/_/g, ' ');
		page = page.replace(/#(.*)/, function(toReplace){return toReplace.replace(/\.([\dA-F]{2})/g, '%$1');});
		page = decodeURIComponent(page); // used for "title" of legends - just like "normal" wiki links.
		if (cssClass.indexOf('new') + 1)
			page += pageDoesntExistMessage;
		return page;
	}
 
	function init() {
		appendCSS('li.' + myClassName + '{white-space:nowrap;}\n' + //css for li element
					'li.' + liHighlightClass + '{background-color:blue;}\n' + //css for highlighted li element.
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
						.bind('mouseover mouseout', mouseAction)
						.data({areas: [], context: context});
					ol.append(li);
				}
				li.data('areas').push(this);	//add the area to the li
				$(this).bind('mouseover mouseout', function(e) {li.trigger(e);})
			});
		});
	}
 
	//has at least one "imagehighlight" div, and canvas-capable browser:
	if ($(hilightDivMarker).length && $('<canvas>')[0].getContext)
		init();
});

importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js",
        "w:c:dev:ShowHide/code.js"
    ]
});