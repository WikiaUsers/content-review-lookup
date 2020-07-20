/* Mainpage */
if(wgPageName == "Star_Wars_Fanpedia") {
	addOnloadHook(function() {
		/** Video button icon **/
		$('.mainpage-button-mustseevideo').prepend('<a href="/wiki/Special:WikiaVideoAdd" class="wikia-button"><img src="https://images.wikia.nocookie.net/swfans/images/a/ae/Icon-Video.png" class="mustseevideo-icon">Add a video</a>');

		/** Blogs button icon **/
		$('.mainpage-button-communitynews').prepend('<a href="/wiki/Special:CreateBlogPage" class="wikia-button"><img src="https://images.wikia.nocookie.net/swfans/images/6/66/Icon-Blogs.png" class="communitynews-icon">Create news</a>');

		/** Chat button icon **/
		$('.mainpage-box-chat-chat .ChatModule .wikia-button').prepend('<img class="chat-icon" src="https://images.wikia.nocookie.net/swfans/images/7/72/Icon-Chat.png" />');

		/** Poll text class **/
		$('.mainpage-box-poll .total').parent().addClass('pollText');

		/** Make sure the Welcome boxes are the same height **/
		var todoBoxHeight = $('.mainpage-box-todo').height();
		var todoBoxHeightPadding = parseInt(todoBoxHeight) + 16 + 'px';
		$('.mainpage-box-welcome-text').css('height',todoBoxHeightPadding);
	 
		$(window).on('resize',function() {
			var todoBoxHeight = $('.mainpage-box-todo').height();
			var todoBoxHeightPadding = parseInt(todoBoxHeight) + 16 + 'px';
			$('.mainpage-box-welcome-text').css('height',todoBoxHeightPadding);
		});
	});
}

// Changes for the Portal:Star_Wars_Vacation_Guide page
if(mw.config.get('wgPageName') === "Portal:Star_Wars_Vacation_Guide") {
	// Clickable ad skin
	var timestamp = Date.now();
	var targetURL = 'https://ad.doubleclick.net/ddm/jump/N5552.143372WIKIAINC/B9307442.126651295;sz=1x1;ord=' + timestamp + '?';
	$('body').prepend('<a href="' + targetURL + '"><div class="clickable-skin"></div></a>');
	$('.clickable-skin').css({
		'height': '100%',
		'position': 'absolute',
		'width': '100%',
		'z-index': '1'
	});

	// Add tracking pixel
	$('body').append('<img src="https://ad.doubleclick.net/ddm/ad/N5552.143372WIKIAINC/B9307442.126651295;sz=1x1;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" border=0 width=1 height=1 alt="Advertisement">');
	
	// Add tracking pixel for clicking on the header
	$('a[href="http://bit.ly/1WVGxvQ"]').click(function(e){
		var urlToRedirect = $(this).attr('href');
		e.preventDefault();
		$('body').append('<img src="https://ad.doubleclick.net/ddm/ad/N5552.143372WIKIAINC/B9307442.126651475;sz=1x1;ord=' + timestamp + ';dc_lat=;dc_rdid=;tag_for_child_directed_treatment=?" border=0 width=1 height=1 alt="Advertisement">');
		// Delay at the end to make sure all of the above was at least invoked
		setTimeout(function() {
			document.location = urlToRedirect;
		}, 100 );
	});
}