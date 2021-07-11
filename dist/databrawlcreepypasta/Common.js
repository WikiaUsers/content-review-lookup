/* Any JavaScript here will be loaded for all users on every page load. */

/* LockForums customization */
window.LockForums = {
    lockMessageWalls: true,
    expiryMessage: "This thread has been locked in order to prevent necroposting."
};

/* Additional UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { u:'associated tag data' }
		seniorbureaucrat: { u:'Senior Bureaucrat' },
		juniorbureaucrat: { u:'Junior Bureaucrat' },
		seniorsysop: { u:'Senior Admin' },
		juniorsysop: { u:'Junior Admin' },
	}
};
 
/* Given UserTags */
UserTagsJS.modules.custom = {
    'Dr. DreyJaden': ['seniorbureaucrat'],
    'CasuallyJack': ['seniorsysop'],
};

/* UserTags metafilter */
UserTagsJS.modules.metafilter = {
    'sysop': ['seniorsysop', 'juniorsysop'],
    'bureaucrat': ['seniorbureaucrat', 'juniorbureaucrat'],
    'chatmoderator': ['sysop', 'bureaucrat', 'rollback', 'threadmoderator']
};