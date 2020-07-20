$(function() {
	if (wgNamespaceNumber == '0') {
		$editLinks = $('a#ca-edit,#ca-edit a,#WikiaPageHeader .wikia-menu-button > li > a');
		$editLinks.attr('href', $editLinks.attr('href') + '&editintro=Template:Editing');
	}
});


// User tags
window.UserTagsJS = {
	modules: {},
	tags: {
	    rollback: { u:'Rollback' },
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'chatmoderator', 'content-moderator', 'threadmoderator'];

UserTagsJS.modules.inactive = 50; // 50 days

UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat'], // Remove administrator group from bureaucrats
	threadmoderator: ['sysop', 'bureaucrat'], // Remove discussions moderator group from admins
	chatmoderator: ['sysop', 'bureaucrat'], // Remove chat moderator group from admins
	'content-moderator': ['sysop', 'bureaucrat'], // Remove content moderator group from admins
	rollback: ['content-moderator', 'sysop', 'bureaucrat'] // Remove rollback from content moderator and above
};