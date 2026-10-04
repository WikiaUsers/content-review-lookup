/*UserTags Stuff*/
window.UserTagsJS = {
    tags: {
        catalyst: { u: 'Catalyst' },
		nexus: { u: 'Nexus' },
		nullsysop: { u: 'NullSysop' },
		paragon: { u: 'Paragon' },
		logoist: { u: 'Logoist' },
		moderator: { u: 'Moderator' },
		founder: { u: 'Founder' },
		rollback: { u:'Vandestroyer'},
		threadmoderator: { u:'Sentinel'},
		votecheck: { u:'Votechecker' },
		specialist: { u:'Specialist' }
		
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
        ],
        custom: {
            '!Davin012613': ['catalyst'],
			'MarkoRBLXDEV': ['nexus'],
			'JacksonGreenwayy': ['nullsysop'],
			'TestNPC': ['nullsysop'],
			'KoolKidBlues3': ['nullsysop'],
			'PyroSyntax': ['paragon'],
			'Mrfloorisalava': ['paragon'],
			'Skyprotogen': ['logoist'],
			'Owentheverycool': ['logoist'],
			'TheAntelligenceVerse': ['logoist'],
			'HatmanGD': ['moderator', 'votecheck'],
			'.higiggles04': ['moderator'],
			'Witherstormisdabest': ['moderator'],
			'Terraformation lover': ['test'],
			'Andrii2356': ['test'],
			'GoldaEpta': ['founder'],
			'OhMyGodTheAgonyLolLolLol': ['specialist'],
			'ErrVlialik': ['specialist', 'rollback'],
			'37litersofgallium': ['rollback'],
			'REAL ThePurpleSystem': ['rollback']
        }
    }
};
UserTagsJS.modules.metafilter = {
	bureaucrat: ['catalyst', 'paragon', 'nexus', 'nullsysop', 'moderator', 'founder'],
	contentmoderator: ['moderator',],
	threadmoderator: ['moderator'],
	sysop: ['paragon', 'catalyst', 'nullsysop', 'founder']
};
UserTagsJS.modules.userfilter = {
	'!Davin012613': ['vandestroyer', 'moderator', 'nexus', 'logoist', 'sysop', 'rollback'], // User is *never* inactive
	'PyroSyntax': ['sysop'], // Remove the founder group
	'UserName 3': ['nonuser', 'newuser', 'inactive']
};