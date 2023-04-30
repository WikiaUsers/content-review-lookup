mw.loader.using(['mediawiki.util', 'jquery.client'], function () {
/**
 * Image switcher for card tables
 */
$('.image-switcher a').on('click', function(ev)
{
	ev.preventDefault();
 
	var $imagecolumn   = $(this).parents('.imagecolumn');
	var $selected      = $(this).parents('.image-dimensions');
	var $image_wrapper = $imagecolumn.find('.cardtable-main_image-wrapper')
	var $main_image    = $image_wrapper.find('img:first');
	var image_name     = this.getAttribute('title');
 
	// Images are not to go wider than the first one.
	var max_width    = $imagecolumn.data('max_width') ? $imagecolumn.data('max_width') : $main_image.width();
	// Natural dimensions of the selected image
	var n_width      = $selected.data('width');
	var n_height     = $selected.data('height');
	// Dimensions to display the selected image at
	var width        = (n_width < max_width) ? n_width  : max_width;
	var height       = (n_width < max_width) ? n_height : n_height * width / n_width;
 
	// Get the URL of the scaled image
	if (n_width == max_width)
		var src = this.href;
	else if (this.href.indexOf('?') > -1)
		var src = this.href.replace('?', '/scale-to-width-down/'+width+'?');
	else
		var src = this.href+'/scale-to-width-down/'+width;

	// Preventing content jumping 
	$imagecolumn.css('width', max_width);
	$imagecolumn.find('\+.infocolumn').css('width', 'calc(100% - '+max_width+'px)');
	$image_wrapper.css('min-height', $image_wrapper.height());
 
	var img = new Image();
	img.onload = function()
	{
		// Change the main image's URL to the new image and set its width and height 
		$main_image
			.attr('src', src)
			.attr('width', width)
			.attr('height', height);
 
		// Change the main image's link and hover text to match the new image
		$main_image.parents('a')
			.attr('href', '/wiki/File:'+image_name)
			.attr('title', image_name);
	}
	img.src = src;
});
/* End of mw.loader.using callback; DO NOT ADD CODE BELOW THIS LINE */
});