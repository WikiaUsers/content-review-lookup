/*Remove Edit Wall Greeting button unless it's your own or if you're Wiki staff*/
	$(function() {
		var config = mw.config.get([
	   'wgCanonicalNamespace',
	   'wgUserName',
	   'wgTitle',
	   'wgUserGroups'
		]);
		if (config.wgCanonicalNamespace == "Message_Wall" && config.wgTitle != config.wgUserName && !config.wgUserGroups.includes("sysop", "bureaucrat", "content-moderator", "threadmoderator", "rollback")) {
		    var interval = setInterval(function() {
				if ($('.MessageWallButtons').length) {
		   			clearInterval(interval);
					$(this).remove();
				}
			}, 10);
	    }
	});