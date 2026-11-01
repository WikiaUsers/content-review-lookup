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
		specialist: { u:'Specialist' },
		reviewer: { u:'Rating Reviewer' },
		former: { u:'Former Nexus' }
		
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
            '!Davin012613': ['paragon'],
			'MarkoRBLXDEV': ['former'],
			'JacksonGreenwayy': ['nullsysop'],
			'TestNPC': ['nullsysop'],
			'KoolKidBlues3': ['nullsysop'],
			'PyroSyntax': ['paragon'],
			'Mrfloorisalava': ['paragon'],
			'Skyprotogen': ['logoist'],
			'Owentheverycool': ['logoist', 'moderator'],
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
			'REAL ThePurpleSystem': ['rollback'],
			'SpiritbloxTP': ['logoist', 'threadmoderator'],
			'Bubba_TheDeveloper': ['catalyst'],
			'MysteriousMunci': ['moderator'],
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
	'PyroSyntax': ['sysop'],
	'UserName 3': ['nonuser', 'newuser', 'inactive']
};