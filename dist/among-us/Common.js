// <nowiki>
window.dev = window.dev || {};

// Prevents existing tags from being hidden
window.dev.profileTags = { noHideTags: true };

// MessageBlock config
window.MessageBlock = {
	title : 'Blocked',
	message : 'You have received a $2 block for the reason: \'$1\'. Unless otherwise stated and your block is not less than two weeks, you may appeal your block on my message wall at Community Central.',
	autocheck : true
};

// Set default file description to File template, skip when reuploading a file
if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
	if (mw.util.getParamValue('wpForReUpload') != 1) $('#wpUploadDescription').val('{'+'{File\n|description = \n|type = \n}}');
	// Hide the additional license field
	$('.mw-htmlform-field-Licenses').css('display', 'none');
	// For users of UploadMultipleFiles
	mw.config.set('UMFBypassLicenseCheck', true);
}

// VerifyUser defaults
window.dev.VerifyUser = {
	command: '$verify',
	channel: 'verification'
};

// We have our own rollbacks
window.RollbackWikiDisable = true;

// Add user tag to rollbacks
if (mw.config.get('profileUserName')) var rollbackTagLoader = setInterval(function() {
	if ($('.user-identity-box').length) {
		clearInterval(rollbackTagLoader);

		var user = mw.config.get('profileUserName');

		if (user) { // This page has a user profile
			$.getJSON(mw.util.wikiScript('api') + '?action=query&format=json&list=users&usprop=groups&ususers=' + mw.util.rawurlencode(user), // Check user's groups
			function(data) {
				if (data.query.users[0].groups.includes('rollback')) { // The user is a rollback
					$span = $('<span />').addClass('user-identity-header__tag tag-rollback').text('Rollback');
					$('.user-identity-box .user-identity-header__attributes').append($span, ' ');
				}
			});
		}
	}
}, 100);

// </nowiki>