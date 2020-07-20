/* ================================ *\
	// # סקריפאט איןשיחה
	// # "noTalk" script

	// # shows notifications from the hebrew uncyclopedia
	// # https://eincyclopedia.org/

	// # for personal use, add the following to 
	
	importArticles({
		type: 'script',
		articles: [
			'u:cps05box:MediaWiki:Einwikitalk.js',
		]
	});


	// # if your eincyclopedia username is different than your wikia's, add below this code the following line as well, and replace 'abc' with your eincyclopedia username:

	window.einMishtamesh = "abc"; // שם משתמש לשיחות מאיןציקלופדיה


	// # @author Penguin-Pal
\* ================================ */
(function() {
	var fn = {}, // group functions
		username = typeof window.einMishtamesh === "string" ? window.einMishtamesh : mw.config.get("wgUserName"); // eincyclopedia username- uses wikia's by default

	// get contentless talk page revision
	fn.getLatestTalkRev = function(cb) {
		$.ajax({
			url: "https://eincyclopedia.org/w/api.php",
			data: {
				action: "query",
				format: "json",
				prop: "revisions",
				rvprop: "timestamp",
				titles: "User_talk:" + username
			},
			dataType: "jsonp",
			jsonpCallback: "einwikitalk_" + new Date().getTime(),
			success: function(data) {
				cb(data);
			}
		});
	}

	// get timestamp from revision
	fn.getRevTime = function(data) {
		var ts = false,
			pages = data.query.pages,
			pageid;
		for (pageid in pages) {
			// check if talk page exists
			if (pageid == -1) {
				// talk page does not exist or has been deleted
				break;
			}
			// talk page exists
			try {
				// use 'try' just in case 'revisions' is not a filled array or 'revisions[0]' is not an object, just in case
				ts = new Date(pages[pageid].revisions[0].timestamp).getTime();
			} catch(err) {}
			break;
		}
		return ts;
	}

	// get timestamp of last message read
	fn.getLastReadTime = function() {
		return localStorage.getItem("unwikitalkts") || 0;
	}

	// set last read message
	fn.updateLastReadTime = function(val) {
		return localStorage.setItem("unwikitalkts", val);
	}

	// add message to the interface
	fn.addNotification = function(ts) {
		var container = $("body > .WikiaSiteWrapper > #WikiaBar"),
			message = $('<li style="direction: rtl;"><div data-type="-1"><a class="sprite close-notification"></a>איןהודעות <a>חדשות</a>.</div></li>');
		if ($(container).find("#WikiaNotifications").length == 0) {
			// no existing notification - add wrapper
			$(container).prepend('<ul id="WikiaNotifications" class="WikiaNotifications" />');
		}
		// properly add link to eincyclopedia
		$(message).find("a").eq(1).attr({
			"href": "https://eincyclopedia.org/wiki/User_talk:" + mw.util.wikiUrlencode(username) + "?redirect=no"
		});
		// update timestamp upon clicking either read or close
		$(message).find("a").click(function() {
			$(message).remove();
			fn.updateLastReadTime(ts);
		});
		// add message
		$(container).find("#WikiaNotifications").append(message);
	}

	// provide a timestamp tracking system, in case it gets messed up for some reason
	fn.addResetButton = function() {
		var btn = $('<li class="custom"><a href>אתחול איןשיחה</a></li>');
		$(btn).find("a").click(function(e) {
			e.preventDefault();
			localStorage.removeItem("unwikitalkts");
		});
		$("body > .WikiaSiteWrapper > #WikiaBar #my-tools-menu").prepend(btn);
	}

	// implementations
	fn.getLatestTalkRev(function(data) {
		var lastRevTime = fn.getRevTime(data),
			lastReadTime = fn.getLastReadTime();
		// check if the revision is unread
		if (lastRevTime > lastReadTime) {
			fn.addNotification(lastRevTime);
		}
		// add reset button to the "my tools" list in the footer
		fn.addResetButton();
	});
}());