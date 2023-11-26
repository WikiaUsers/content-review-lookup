/*
* rwdImageMaps jQuery plugin v1.6
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2016 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
*
*
* Modified by HumansCanWinElves to fit better for Fandom wikis
*
*/

/*
	The MIT License (MIT)
	
	Copyright (c) 2016 Matt Stow
	
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

;(function(window, $, mw) {
	if (window.responsiveImageMapLoaded) return;
	window.responsiveImageMapLoaded = true;
	
	function rwdImageMap($img) {
		$img.each(function() {
			if (typeof($(this).attr('usemap')) == 'undefined')
				return;

			var that = this,
				$that = $(that);

			// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
			$('<img />').on('load', function() {
				var attrW = 'width',
					attrH = 'height',
					w = $that.attr(attrW),
					h = $that.attr(attrH);

				if (!w || !h) {
					var temp = new Image();
					temp.src = $that.attr('src');
					if (!w)
						w = temp.width;
					if (!h)
						h = temp.height;
				}

				var wPercent = $that.width()/100,
					hPercent = $that.height()/100,
					map = $that.attr('usemap').replace('#', ''),
					c = 'coords';

				// The ImageMap MediaWiki extension uses the same map name for
				// identical maps on different images (probably the resulf of
				// a hash function). As such, the manipulation must be limited
				// not only by the map name but also to only sibling map
				$that.siblings('map[name="' + map + '"]').find('area').each(function() {
					var $this = $(this);
					if (!$this.data(c))
						$this.data(c, $this.attr(c));

					var coords = $this.data(c).split(','),
						coordsPercent = new Array(coords.length);

					for (var i = 0; i < coordsPercent.length; ++i) {
						if (i % 2 === 0)
							coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
						else
							coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
					}
					$this.attr(c, coordsPercent.toString());
				});
			}).attr('src', $that.attr('src'));
		});
	}

	mw.hook('wikipage.content').add(function($e) {
	    var $img =
		    $e.find('.responsive-imagemap .noresize:not(.made-responsive)').css({
		        'width': '',
		        'height': ''
		    })
		    .addClass('made-responsive')
		    .find('img[usemap]');
		rwdImageMap($img);
	});
	
	$(window).resize(function() {
		rwdImageMap($('.responsive-imagemap .made-responsive img[usemap]'));
	});

})(this, jQuery, mediaWiki);