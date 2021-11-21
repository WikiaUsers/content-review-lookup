// <nowiki>
window.dev = window.dev || {};

// Default Image License: Fairuse
$(function() {
	if (wgPageName === "Special:Upload") {
    	$("#wpLicense").val("Fairuse");
	}
});

// Redirect Special:Chat to Discord
if (mw.config.get('wgPageName') === "Special:Chat") {
    window.location = "https://car-mechanic-simulator-2018.fandom.com/wiki/Project:Discord";
}

// Add user tag to rollbacks
var rollbackTagLoader = setInterval(function() {
	if ($('.user-identity-box').length) {
		clearInterval(rollbackTagLoader);

		var user = mw.config.get('profileUserName'),
			$masthead = $('.user-identity-box .user-identity-header__attributes');

		if (user) { // This page has a user profile
			$.getJSON(mw.util.wikiScript('api') + '?action=query&format=json&list=users&usprop=groups&ususers=' + mw.util.rawurlencode(user), // Check user's groups
			function(data) {
				if (data.query.users[0].groups.includes('rollback')) { // The user is a rollback
					$span = $('<span />').addClass('user-identity-header__tag tag-rollback').text('Rollback');
					$masthead.append($span, ' ');
				}
			});
		}
	}
}, 100);

// </nowiki>