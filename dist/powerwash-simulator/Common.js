/* Any JavaScript here will be loaded for all users on every page load. */

// Prevents Existing Tags From Being Hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };

// Disables the Rollback Script 
window.RollbackWikiDisable = true;

// Redirect Special:Chat to Project:Discord
if (mw.config.get('wgPageName') === "Special:Chat") {
    window.location = "https://powerwash-simulator.fandom.com/wiki/Project:Discord";
}

// Credits: Caburum : https://among-us.fandom.com/wiki/
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