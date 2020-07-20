// <syntaxhighlight lang="javascript">
$(document).ready(function() {

/* set objects */
window.dev = window.dev || {};
window.dev.DynamicImages = window.dev.DynamicImages || {};
window.dev.DynamicImages.svgGallery = typeof window.dev.DynamicImages.svgGallery === "boolean" ? window.dev.DynamicImages.svgGallery : true;
window.dev.DynamicImages.svgLightbox = typeof window.dev.DynamicImages.svgLightbox === "boolean" ? window.dev.DynamicImages.svgLightbox : true;
window.dev.DynamicImages.svgIncreaseSrc = $.isNumeric(window.dev.DynamicImages.svgIncreaseSrc) ? Number(window.dev.DynamicImages.svgIncreaseSrc) : 1;
var DI = window.dev.DynamicImages;

// prevent usage of non-positive numbers
if (DI.svgIncreaseSrc <= 0) {
	DI.svgIncreaseSrc = 1;
	console.error("DynamicImages - value for 'svgIncreaseSrc' was set to '0' or a negative number - value was reset to 1 to prevent errors");
}


// get a new src for an image and scale when loaded
function resizeRequet(node, src, width, height) {
	// maybe pass an additional attempt 'n' value to limit reloads?
	var img = document.createElement("img");
	img.onload = function() {
		$(node).attr({
			"src": src,
			"width": width,
			"height": height
		});
	}
	img.onerror = function() {
		this.src = src.split("?")[0] + "?cb=" + new Date().getTime()
	}
	img.src = src;
}

/* wiki galleries */
$("#mw-content-text a.image.lightbox > img.thumbimage[data-image-name]").each(function() {
	var format = $(this).attr("data-image-name").match(/\.([^\.]+)$/);
	if ($.isArray(format)) { // make sure that this isn't File:Wiki-background
		var width = $(this).parents().eq(2).width(), // container width
			height = $(this).parents().eq(2).height(), // container height
			format =  format[1].toLowerCase(), // file format
			src = $(this).attr("data-src"); // image source value
		if (
			DI.svgGallery && // modifier for gallery svgs is not diabled
			format == "svg" && // svg format
			$(this).width() < width &&
			$(this).height() < height
		) {
			/*
				this is a svg image, and:
				both the height and the width are smaller than the container's dimensions
				we are dealing with a small SVG image
			*/
			// either the image's width is larger than its height, or the SVG image is a square
			var width2 = Number($(this).parents().eq(1).css("width").match(/\d+/)[0]),
				height2 = Number($(this).parents().eq(1).css("height").match(/\d+/)[0]);
			if (width / height >= width2 / height2) {
				// height is dominant
				var newWidth = Math.floor(height * width2 / height2),
					newHeight = height;
			} else {
				// width is dominant
				var newWidth = width,
					newHeight = Math.floor(width * height2 / width2);
			}
			$(this).parents().eq(1).css({
				"width": newWidth,
				"height": newHeight,
				"top": (height - newHeight) / 2 + "px"
			});
			$(this).parent().css({
				"width": newWidth,
				"height": newHeight
			});
			var newSrc = src.replace(/(\/scale\-to\-width(?:\-down)?\/)(\d+)/g, function(m, m0, m1) {
				return m0 + Math.round(newWidth * DI.svgIncreaseSrc);
			});
			resizeRequet(this, newSrc, newWidth, newHeight);
		}
	}
});

/* thumb or ordinary wiki file images ([[File:]]) */
$("#mw-content-text a.image-thumbnail > img[data-image-name], #mw-content-text :not(a) > img[class][data-image-name]").each(function() { // '#mw-content-text :not(a) > img[class]' is for stuff like [[File:Foo.svg|link=]]
	var format = $(this).attr("data-image-name").match(/\.([^\.]+)$/);
	try {
		format = format[1].toLowerCase();
	} catch(err) {}
	if (typeof format == "string" && format == "svg") {
		var src = $(this).attr("src"),
			width = $(this).width(),
			height = $(this).height(),
			newSrc = src.replace(/(\/scale\-to\-width(?:\-down)?\/)(\d+)/g, function(m, m0, m1) {
				return m0 + Math.round(width * DI.svgIncreaseSrc);
			});
		resizeRequet(this, newSrc, width, height);
	}
});

/* lightboxes images */
if (DI.svgLightbox) {
	var lightboxListener = new MutationObserver(function(mutations) {
		for (var i in mutations) {
			for (var j in mutations[i].removedNodes) {
				var node = mutations[i].removedNodes[j];
				if (node.id == "LightboxPreload") {
					// lightbox section has fully loaded added
					var img = $("#LightboxModal .media:not(.video-media) img");
					if (img) {
						// not a vid
						var div = $(img).parent(),
							imgW = $(img).width(),
							imgH = $(img).height(),
							divW = $(div).width(),
							divH = $(div).height(),
							src = $(img).attr("src"),
							format = $("#LightboxModal").find(".more-info-button").attr("href").match(/\.([^\.]+)$/);
						try {
							format = format[1].toLowerCase();
						} catch(err) {}
						if (typeof format == "string" && format == "svg" && imgW < divW && imgH < divH) {
							// small svg image - need to resize
							if (imgW / imgH >= divW / divH) {
								// width is dominant
								var newWidth = divW,
									newHeight = Math.floor(divW * imgH / imgW);
							} else {
								// height is dominant
								var newWidth = Math.floor(divH * imgW / imgH),
									newHeight = divH;
							}
							var newSrc = src.replace(/(\/scale\-to\-width(?:\-down)?\/)(\d+)/g, function(m, m0, m1) {
								return m0 + Math.round(newWidth * DI.svgIncreaseSrc);
							});
							resizeRequet(img, newSrc, newWidth, newHeight);
						}
					}
				}
			}
		}
	});
	lightboxListener.observe(document.body, {
		childList: true
	});
}

});
// </syntaxhighlight>