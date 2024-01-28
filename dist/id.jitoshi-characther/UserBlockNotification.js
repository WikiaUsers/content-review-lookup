/*************
Title        :   	UserBlockNotification
Description  :		Whenever a user gets blocked, users will have notification on the bottom-right corner.
Author       :   	Vastmine1029
Version      :   	1.0
*************/
// <nowiki>
mw.loader.using('mediawiki.api', function() {
	var api = new mw.Api(), block_data;
	var user = mw.config.get('wgUserName');
	
	// If no user is logged in, abort JS.
	if (!user) {
		console.error("No user is currently logged in. \'BlockUserNotification\' JS aborted!");
		return;
	}
	
	// Custom CSS Implementation
	mw.util.addCSS(".notifications-placeholder-custom .wds-banner-notification__container{bottom:50px;right:18px;font-family:rubik,helvetica,arial,sans-serif;position:fixed;z-index:200}");
	
	api.get({
	action: 'query',
	list: 'blocks',
	bkusers: user
	}).then(function(d) {
		block_data = d.query.blocks;
		
		// If user is not blocked, do not continue with the script. Abort JS.
		if (block_data.length < 1) {
			console.error(user + " is not blocked. \'BlockUserNotification\' JS aborted!");
			return;
		}
		
		var block_display = document.createElement("div");
		text_to_parse = "<div class=\"notifications-placeholder-custom\"><div class=\"wds-banner-notification__container\"><div class=\"wds-banner-notification wds-alert\"><div class=\"wds-banner-notification__icon\">[[File:Feather-core-x-octagon-white.svg|20px]]</div><div class=\"wds-banner-notification__text\"><b>You are currently blocked.</b> <i>More information about your block [[Special:MyContributions|here]].</i></div></div></div></div>";
		api.parse(text_to_parse).done(function(text_output) {
			var textParagraph = document.createElement("div");
			textParagraph.innerHTML = text_output;
			block_display.appendChild(textParagraph);
			$(".mediawiki").eq(0).after(block_display);
		});
	});
});
// </nowiki>