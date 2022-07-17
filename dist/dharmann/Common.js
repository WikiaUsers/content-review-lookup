/* Any JavaScript here will be loaded for all users on every page load. */
window.UserTagsJS = {
	tags: {
		montheditor: { u : 'Editor of the Month' },
		moderator: { u : 'Moderator' }
	},
	modules: {
		mwGroups: {
			merge: true,
			groups: ['content-moderator', 'threadmoderator', 'rollback', 'moderator']
			
		},
		implode: {
			'moderator': ['content-moderator', 'threadmoderator', 'rollback'],
		}
	},
};
/*window.UserTagsJS = {
    tags: {
        discordmod: { u: 'Discord Moderator' },
        imagecontrol: { u: 'Image Control' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagecontrol',
            'rollback',
            'bot'
        ]
    }
};*/