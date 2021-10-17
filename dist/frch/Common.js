/* Any JavaScript here will be loaded for all users on every page load. */
/* Credits to the Among Us Wiki */
// <nowiki>
window.dev = window.dev || {};

// Prevents existing tags from being hidden
// https://dev.fandom.com/wiki/ProfileTags
window.dev.profileTags = { noHideTags: true };

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