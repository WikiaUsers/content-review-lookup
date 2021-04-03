/* User Tags */
UserTagsJS.modules.inactive = 7; // 7 days

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { link:'Special:Listusers/bureaucrat' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		sysop: { link:'Special:Listusers/sysop' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		contentmoderator: { link:'Special:Listusers/contentmoderator' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		threadmoderator: { link:'Special:Listusers/threadmoderator' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		chatmoderator: { link:'Special:Listusers/chatmoderator' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { link:'Special:Listusers/rollback' }
	}
};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		bot: { link:'Special:Listusers/bot' }
	}
};
 
UserTagsJS.modules.newuser = {
	days: 7, // Must have been on the Wiki for 7 days
};
/* Image category for all photos */
if (mw.config.get('wgCanonicalSpecialPageName') === 'MultipleUpload' || mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
    if (!$.getUrlVar('wpForReUpload') && !$('#wpUploadDescription').val()) {
        jQuery(function ($) {
            'use strict';
            $('#wpUploadDescription').val('[[Category:Images]]');
        });
    }
}