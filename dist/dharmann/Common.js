/* Any JavaScript here will be loaded for all users on every page load. */

//UserTags for Staff Positions.
window.UserTagsJS = {
	tags: {
		threadmoderator: { u : 'Thread Moderator' , link : 'Project:Staff#Thread Moderators'},
		contentmoderator: { u : 'Content Moderator' , link : 'Project:Staff#Content Moderators'},
		bureaucrat: { u : 'Bureaucrat', link : 'Project:Staff#Bureaucrats'},
		sysop: { u : 'Administrator', link : 'Project:Staff#Administrators'}
	},
	modules: {
		mwGroups: {
			merge: true,
			groups: ['content-moderator', 'threadmoderator', 'rollback', 'moderator', 'bureaucrat', 'sysop']
			
		},
		implode: {
			'moderator': ['content-moderator', 'threadmoderator', 'rollback'],
		},
		metafilter: {
			'sysop': ['bureaucrat'],
			'moderator': ['sysop', 'bureaucrat']
		}
	},
};