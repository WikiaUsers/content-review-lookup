/* Copies the alt attribute of each image to its title attribute 
 * (to show in a tooltip when hovering the image), except if the 
 * alt attribute equals the image name (auto-generated alt) 
 */

$(function() {
	$("img[alt]").each(
		function(){
			if($(this).attr('alt') != $(this).data('image-name'))
				$(this).attr('title', $(this).attr('alt'))
		}
	)
})