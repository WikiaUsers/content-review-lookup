/* Powiększenie obrazów w miniaturkach galerii */

mw.hook("wikipage.content").add(function($content) {
	"use strict";
	
	const THUMB_WIDTH = 170;
	
	var $galleries = $("ul.mw-gallery-traditional");

	$galleries.each(function () {
		var $gallery = $(this);
		
		var $galleryImgs = $gallery.find("li.gallerybox .thumb img");

		var maxHeight = getMaxHeight($galleryImgs);
		$gallery.find("li.gallerybox .thumb > div").css("height", maxHeight)

		$galleryImgs.each(function () {
			var $img = $(this);
			var width = $img.attr("width");
			var height = $img.attr("height");
			var src = $img.attr("src");
			var dataSrc = $img.data("src");
			
			var newWidth = THUMB_WIDTH;
			
			if(width / height < 1)
				newWidth = Math.round(maxHeight * width / height);
			
			if($img.hasClass("lazyload")) {
				dataSrc = dataSrc.replace(/(scale-to-width-down\/)\d+/, "$1" + newWidth);
				$img.attr("data-src", dataSrc);
			} else {
				src = src.replace(/(scale-to-width-down\/)\d+/, "$1" + newWidth);
				$img.attr("src", src);
			}
			
		});
	});

	function getMaxHeight($galleryImgs) {
		var maxHeight = 1;
		var width = 1;
		$galleryImgs.each(function () {
			var height = parseInt($(this).attr("height"))
			if(height > maxHeight) {
				maxHeight = height;
				width = parseInt($(this).attr("width"));
			}
		});
		
		var ratio = width / maxHeight;
		
		if(ratio > 1)
			maxHeight = THUMB_WIDTH / ratio;
		else
			maxHeight = THUMB_WIDTH;
		
		return maxHeight;
	}
});