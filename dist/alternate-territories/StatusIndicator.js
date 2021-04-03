// 17:57, October 12, 2020 (UTC)

// JS for the StatusIndicator (ATW:SI)
// From User:Rappy_4187 (Aion Wiki)
// Taken from w:c:admintools:MediaWiki:Common.js/statusIndicator.js
// Simplified

var interval = setInterval(function() {
	if ($('#userProfileApp').length) {
		clearInterval(interval);
		// Put StatusIndicator in ProfileMasthead
		// Support for Template:Statustop2
		if ($(".status.helpcursor").length) {
		$(".status.helpcursor").appendTo("ul.user-identity-social");
	}
}
	// 1000 = amount of seconds we'll be rechecking
	// whether the masthead exists
}, 1000);
}