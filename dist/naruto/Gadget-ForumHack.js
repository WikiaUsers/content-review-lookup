(function ($) {
	if (({Recentchanges: 1, WikiActivity: 1})
		[mw.config.get('wgCanonicalSpecialPageName')] === 1) {	
	
		var forumhack = function () {
			$("#mw-content-text a").each(function () {
				if (/Naruto Discussions/.test($(this).text()))
					$(this).closest("li").remove();
			});
		};
		
		$(forumhack);

		window.ajaxCallAgain = window.ajaxCallAgain || [];
		window.ajaxCallAgain.push(forumhack);
	}
}(jQuery));