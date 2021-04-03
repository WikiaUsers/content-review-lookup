if (mediaWiki.config.get("wgAction") === "view" && (!window.localStorage || !window.localStorage.getItem('#NichibrosNotif1'))) {
	(function ($, mw, window) {
		var wgServer = mw.config.get("wgServer"),
			wgUserName = mw.config.get("wgUserName");
		
		if (typeof wgUserName !== "string") {
			$(createNotification);
		} else {
			var url = wgServer + "/api.php?action=query&format=json&list=usercontribs&uclimit=10&ucuser=" + window.encodeURIComponent(wgUserName);

			$.get(url, function (data) {
				try {
					if (1) {
						$(createNotification);
					}
				} catch (e) {}
			});
		}
		
		function createNotification() {
			// HTML for the notification (no wiki markup allowed here, e.g. [[page|link here]] is not HTML)
			var notificationHTML = '<ul id="NichibrosNotif1" class="WikiaNotifications" style="position:fixed;z-index:9001;margin:0;"><li><div style="padding:6px 15px 6px 20px;line-height:1.3;font-size:12px;"><span class="sprite close-notification"></span>Getting started with editing? Please refer to the <a href="https://dailylivesofhighschoolboys.fandom.com/wiki/Manual_of_Style">Manual of Style</a> first!<br/>This website is best viewed on desktop.</div></li></ul>';
			
			// add notication into the page
			$('#NichibrosNotif1').remove();
			$('body').append(notificationHTML);
			
			// close the notification when clicking the x
			$('#NichibrosNotif1 .close-notification').click(function () {
				$('#NichibrosNotif1').remove();
				if (window.localStorage) {
					window.localStorage.setItem('#NichibrosNotif1', 'dismissed');
				}
			});
		}
	}(jQuery, mediaWiki, window));
}
//There are more new <a href="https://dailylivesofhighschoolboys.fandom.com/wiki/Danshi_Koukousei_no_Nichijou_Wiki">Main Page polls</a>!<br/>