// <nowiki>
window.dev = window.dev || {};

// No license warning config
/*window.NoLicenseWarning = {
	forceLicense: true,
	excludedGroups: [
		'bot-global'
	]
};*/

// Prevents existing tags from being hidden
// https://dev.fandom.com/wiki/ProfileTags
window.dev.profileTags = { noHideTags: true };

// MessageBlock config
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated and your block is not less than two weeks, you may appeal your block on my message wall at Community Central.',
	autocheck : true
};

// Set default file description to {{File}} template, skip when reuploading a file
window.ImageCategory = '{{File\n|description = \n|type = \n|source = \n|author = \n|license = Fairuse\n}}';
// When the previous code runs, hide the additional license field
$('.mw-htmlform-field-Licenses').css('display', 'none');

// Add border color to infoboxes
/*$('.portable-infobox').each(function () {
	var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
	if (cls) {
		$(this).css('border-color', '#' + cls[1]);
	}
});*/

// VerifyUser defaults
window.dev.VerifyUser = {
	command: '$verify',
	channel: 'verification'
};

// We have our own rollbacks
window.RollbackWikiDisable = true;

// Hide talk page badge, as we use Message Walls
$('div.UserProfileAchievementsModule > ul.badges-tracks > li:contains("leave someone a message on their talk page")').remove()

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