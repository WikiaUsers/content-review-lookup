/* =======================Main page hover buttons*/
if (wgPageName == wgMainPageTitle || wgPageName == "Template:Mainpage_Box_Content" || wgPageName == "WARFRAME_Wiki") {
	/** Button hover effect **/
	$(function() {
		// Pre-load the hover images
		var images = new Array();
		function preload() {
			for (i = 0; i < preload.arguments.length; i++) {
				images[i] = new Image();
				images[i].src = preload.arguments[i];
			}
		}
		preload(
			"https://images.wikia.nocookie.net/warframe/images/d/d7/Mainpage-Button-About-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/1/1a/Mainpage-Button-Contribute-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/3/3b/Mainpage-Button-Policies-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/6/64/Mainpage-Button-Style_Guide-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/4/42/Mainpage-Button-Admins-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/2/20/Mainpage-Button-Welcome-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/9/9a/Mainpage-Button-Beginners-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/a/ad/Mainpage-Button-Forum-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/6/6d/Mainpage-Button-Blogs-Hover.png",
			"https://images.wikia.nocookie.net/warframe/images/5/52/Mainpage-Button-Key_Bindings-Hover.png"
		);
		// On hover, replace the images with the "data-hover" attribute of the parent div
		$('.buttons .button-item').hover(function() {
			var image = $(this).attr('data-hover');
			var oldImage = $(this).find('img').attr('src');
			$(this).find('img').attr('src',image);
			$(this).attr('data-hover',oldImage);
		}, function() {
			var image = $(this).attr('data-hover');
			var oldImage = $(this).find('img').attr('src');
			$(this).find('img').attr('src',image);
			$(this).attr('data-hover',oldImage);		
		});
	});
}