// User images notification
// based on http://community.wikia.com/wiki/Thread:476904
if (mediaWiki.config.get("wgAction") === "view" && (!window.localStorage || !window.localStorage.getItem('#BTFFUserChatRestrictionIdentification'))) {
	(function ($, mw, window) {
		var wgServer = mw.config.get("wgServer"),
			wgUserName = mw.config.get("wgUserName");
		
		if (typeof wgUserName !== "string") {
			$(createNotification);
		} else {
			var url = wgServer + "/api.php?action=query&format=json&list=usercontribs&uclimit=25&ucuser=" + window.encodeURIComponent(wgUserName);

			$.get(url, function (data) {
				try {
					if (data.query.usercontribs.length < 25) {
						$(createNotification);
					}
				} catch (e) {}
			});
		}
		
		function createNotification() {
			// HTML for the notification (no wiki markup allowed here, e.g. [[page|link here]] is not HTML)
			var notificationHTML = '<ul id="BTFFUserChatRestrictionIdentification" class="WikiaNotifications" style="position:fixed;z-index:9001;margin:0;"><li><div style="padding:6px 15px 6px 20px;line-height:1.3;font-size:12px;"><span class="sprite close-notification"></span>Please remember that all users with less than 25 total edits and 15 mainspace edits will not be allowed on chat. We thank for you for joining our wiki, but apologize for this inconvenience.</div></li></ul>';
			
			// add notication into the page
			$('#BTFFUserChatRestrictionIdentification').remove();
			$('body').append(notificationHTML);
			
			// close the notification when clicking the x
			$('#BTFFUserChatRestrictionIdentification .close-notification').click(function () {
				$('#BTFFUserChatRestrictionIdentification').remove();
				if (window.localStorage) {
					window.localStorage.setItem('#BTFFUserChatRestrictionIdentification', 'dismissed');
				}
			});
		}
	}(jQuery, mediaWiki, window));