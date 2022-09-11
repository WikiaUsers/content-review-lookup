window.AjaxRename = {
    renameReasons: {
        'Error': 'Error',
        'Misnamed Page': 'Misnamed Page',
        'Better Name': 'Better Name',
        'Page does not belong in mainspace': 'Page does not belong in mainspace',
        'Move request on talk page': 'Move request on talk page',
    }
};

/* UserTags */
window.UserTagsJS = {
	
	modules: {},
	tags: {
		ventmod: { u:'Vent Moderator' },
		headventmod: { u:'Head Vent Moderator' },
		officialwikicoder: { u:'Official Wiki Coder' },
		codinghelp: { u:'Code Helper' },
		bureaucrat: { u:'Burrowcrat' }, 
		sysop: { u:'Admin smh' },
		threadmoderator: { u:'Thread Mod' },
		'content-moderator': { u:'Content Mod' },
		maptest: { u:'Map Tester' },
		specialrole: { u:'Writing Lord' },
		otherspecialrolewow: { u:'Tired Artist' },
		lebesrole: { u:'Wiki Mom' },
		newuser: { u:'Just Joined!' },
	} 
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'content-moderator', 'threadmoderator'];
UserTagsJS.modules.custom = {
	'Halcyonmetanoia': ['officialwikicoder', 'codinghelp'],
	'HH346': ['specialrole', 'headventmod'],
	'GhostTheWick': ['codinghelp'],
	'LeahForsea': ['lebesrole'],
	'Rosellia Teh Hybrid': ['maptest'],
	'Khris Beleren': ['otherspecialrolewow'],
	'FrostdropdALT': ['ventmod']
};
window.MessageBlock = {
	title: 'Blocked',
	message: 'Hello! You have been blocked for a duration of $2 for the following reasons: $1. If you are blocked indefinitely but believe you can improve/have improved on your behavior, feel free to reply to this message with a properly made ban appeal: the admin who blocked you will have followed this message, so they will be notified. If you were blocked for a certain amount of time, feel free to either wait it out and think on your behavior, or reply with an appeal as well.'
};