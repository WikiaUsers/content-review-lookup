importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

UserTagsJS.modules.implode = {
	'inactive-bureaucrat': ['bureaucrat', 'inactive'], // Adds 'inactive-bureaucrat' BUT also removes bureaucrat and inactive.
	'inactive-sysop': ['sysop', 'inactive'],
	'half-sysop': ['chatmoderator', 'patroller', 'rollback']
};