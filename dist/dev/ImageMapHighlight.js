$(document).ready(function() {
	window.imagemap = window.imagemap || {};

	var i18n,
		// Added to all elements created by the script that should be removed when recreating
		artifactClass = 'imageMapHighlighterArtifact',

		// Default "2d context" attributes used for highlighting
		// Some can be overridden by data or CSS attributes, see handleOneMap(), which will always take precedence
		defaultAreaHighlight = {
			fillStyle: window.imagemap.hightlightfill || 'rgba(0, 0, 0, 0.35)',
			strokeStyle: window.imagemap.hightlightcolor || '#FFC500',
			lineJoin: 'round',
			lineWidth: window.imagemap.hightlightstrokewidth || 2
		};

	// Convert ImageMap area(s) to highlights on the canvas
	function drawMarker(context, areas) {
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
				case 'circle': context.arc(coords[0], coords[1], coords[2], 0, Math.PI * 2); break; //x,y,r,startAngle,endAngle
				case 'poly': drawPoly(coords); break;
			}
			context.closePath();
			context.stroke();
			context.fill();
		}
	}

	// Add highlighting on hover
	function mouseAction(e) {
		var $this = $(this),
			activate = e.type == 'mouseover',
			caption = $this.text(),
			ol = $this.parent(),
			context = ol.data('context'),
			areaHighlight = ol.data('area-highlight'); // Contains styles for the highlights

		$this.toggleClass('liHighlighting', activate); // Mark/unmark the list item

		context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clear previous highlights from the canvas

		ol.find('li').each(function() {
			var $li = $(this);
			var licap = $li.text();
			if (activate && licap === caption) { // Highlight!!!
				$.extend(context, areaHighlight || defaultAreaHighlight);
				drawMarker(context, $li.data('areas'));
			}
		});
	}

	// Add highlighting to an ImageMap
	function handleOneMap() {
		var img = $(this),
			w = img.width(),
			h = img.height(),
			dims = { position: 'absolute', width: w + 'px', height: h + 'px', border: 0, top: 0, left: 0 },
			parentMarker = img.closest('.imageMapHighlighter'),
			liClasses = parentMarker.data('list-classes'),
			
			map = img.siblings('map:first'),
			defaultLink = false;
		if (!map.length) { // for maps with "default" link, img is inside <a>
			map = img.parent().siblings('map:first');
			defaultLink = true;
		}

		if (!$('area', map).length) return; // not an ImageMap, or map with 0 areas
		img.addClass('highlighted');

		// remove hardcoded height/width that makes legend overflow (might break something?)
		$(img).closest('div.noresize').css({ height: '', width: '' });

		var jcanvas = $('<canvas>', { 'class': artifactClass })
			.css(dims)
			.attr({ width: w, height: h });
		var bgimg = $('<img>', { 'class': artifactClass, src: img.attr('src') })
			.css(dims); // completely inert the original image

		// Extend area highlighting with data attributes
		var areaHighlight = $.extend({}, defaultAreaHighlight, {
			fillStyle: parentMarker.data('fill') || parentMarker.css('--imagemaphighlight-fill'),
			strokeStyle: parentMarker.data('stroke') || parentMarker.css('--imagemaphighlight-stroke'),
			lineWidth: parentMarker.data('line-width') || parentMarker.css('--imagemaphighlight-stroke-width')
		});

		var context = $.extend(jcanvas[0].getContext('2d'), areaHighlight);

		// This is where the magic is done: prepare a sandwich of the inert bgimg at the bottom,
		// the canvas above it, and the original image on top,
		// so canvas won't steal the mouse events.
		// Pack them all TIGHTLY in a newly minted "relative" div, so when page changes
		// (other scripts adding elements, window resize etc.), canvas and imagese remain aligned.
		var div = $('<div>').css({ position: 'relative', width: w + 'px', height: h + 'px' });
		(defaultLink ? img.parent() : img).before(div); // put the div just above the image
		div.append(bgimg) // place the background image in the div
			.append(jcanvas) // and the canvas. both are "absolute", so they don't occupy space in the div
			.append(defaultLink ? img.parent() : img); // now yank the original image from the window and place it on the div.
		img.fadeTo(1, 0); // make the image transparent - we see canvas and bgimg through it, but it still creates the mouse events

		var ol = $('<ol>', { 'class': artifactClass })
			.css({ maxWidth: w + 'px' })
			.attr({ 'data-expandtext': i18n.msg('show').plain(), 'data-collapsetext': i18n.msg('hide').plain() })
			.data('area-highlight', areaHighlight)
			.data('context', context);

		if (![0, false, 'no'].includes(parentMarker.data('legend'))) { // data-legend
			mw.loader.using('jquery.makeCollapsible').then(function() {
				ol.addClass('mw-collapsed').makeCollapsible();
			});
		} else {
			ol.css('display', 'none');
		}
		div.after(ol);

		var lis = {}; // collapse areas with same caption to one list item
		var someli; // select arbitrary one
		$('area', map).each(function() {
			var text = this.title;
			var li = lis[text]; // title already met? use the same li
			if (!li) { // no? create a new one.
				var href = this.href;
				lis[text] = li = $('<li>', { 'class': artifactClass })
					.append($('<a>', { href: href }).html(mw.html.escape(this.title)))
					.on('mouseover mouseout', mouseAction)
					.data('areas', [])
					.addClass(liClasses && (liClasses[text] || liClasses['default']))
					.appendTo(ol);
			}
			li.data('areas').push(this); // add the area to the li
			someli = li; // whichever - we just want one...
			$(this).on('mouseover mouseout', function(e) {
				li.trigger(e.type);
			});
		});
		if (someli) someli.trigger('mouseout');
	}

	function init(i18no) {
		i18n = i18no;

		mw.util.addCSS(
			'ol.' + artifactClass + ' { columns: 2; margin: 0; list-style: none; z-index: 500; }' + // css for main ol element
			'li.' + artifactClass + ' { white-space: nowrap; border: solid 1px transparent; border-radius: 6px; }' + // css for li elements
			'li.' + artifactClass + '.liHighlighting { background-color: var(--imagemaphighlight-legend-highlight, rgba(var(--theme-link-color--rgb, 255,255,0), 0.1)); }' + // css for highlighted li element

			// hack for centering Legend toggle
			'#content ol.' + artifactClass + ' { position: relative; margin-top: 1.5em; margin-left: unset; }' +
			'#content ol.' + artifactClass + ' li.mw-collapsible-toggle-li { position: absolute; inset: -1.5em 0 auto; }'
		);

		var selector = '.imageMapHighlighter img[usemap]:not(.highlighted)';
		$(selector).each(handleOneMap);

		// Highlight maps added later on
		mw.hook('wikipage.content').add(function($content) {
			$content.find(selector).each(handleOneMap);
		});
	}

	mw.hook('dev.i18n').add(function(i18no) {
		// Only run if there is at least one marker div and the browser supports canvas
		if ($('.imageMapHighlighter').length && !!window.CanvasRenderingContext2D) {
			$.when(
				i18no.loadMessages('ImageMapHighlight'),
				mw.loader.using(['jquery.makeCollapsible', 'mediawiki.util'])
			).then(init);
		}
	});

	if (!window.dev || !window.dev.i18n) {
		importArticle({
			type: 'script',
			article: 'u:dev:MediaWiki:I18n-js/code.js'
		});
	}
});