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

var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
        buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');