// <nowiki>
//  Configurazione per le richieste di diritti
window.adoptInternational = {
    unsupportedLanguages: [
        'de',
        'en',
        'es',
        'fr',
        'id',
        'ja',
        'nl',
        'pl',
        'pt',
        'pt-br',
        'ru',
        'zh',
        'zh-tw',
        'zh-hk'
    ],
    adoptionConfig: {
        activityDays: 30,
        adminsDays: 60,
        permissionTypes: [
            'sysop',
            'content-moderator'
        ]
    },
    pageConfig: {
        namespace: 'Richiesta',
        namespaceId: 118,
        adoptionsPage: 'Wiki_della_Community:Richieste_di_diritti'
    },
    wikitextSchema: "{{bStart}}Richiesta di diritti\n" +
                    "| 0-status              = nuova\n" +
                    "| 1-user                = {{userName}}\n" +
                    "| 2-link_to_wiki        = {{{wikiURL}}}\n" +
                    "| 3-type                = {{permissionsType}}\n" +
                    "| 4-your_activity       = {{numDays}}\n" +
                    "| 5-admin_activity      = {{numAdmins}}\n" +
                    "| 6-your_motivation     = {{comments}}\n" +
                    "| 7-community_vote      = {{{communityVote}}}\n" +
                    "{{bEnd}}"
};

window.interwikiInternational = {
        namespace: 'Richiesta',
    	namespaceId: 118,
    	mainPage: 'Wiki_della_Community:Richieste_di_link_interlingua',
		interwikiSchema: '{{bStart}}Richiesta di link interlingua|{{from}}|{{to}}{{bEnd}}',
		pageSchema: '{{bStart}}Titolo richiesta di link interlingua{{bEnd}}\n\n' +
			'{{interwikis}}\n\n' +
			'~~' + '~~',
};

window.botFlagInternational = {
	pageConfig: {
		namespace: 'Richiesta',
		namespaceId: 118,
		requestsPage: 'Wiki_della_Community:Richieste_di_flag_bot'
	},
	titleSchema: '$1 su $2', // $1 = nome bot, $2 = nome wiki
	wikitextSchema: '{{bStart}}Richiesta_di_flag_bot\n' +
		'| 0-Status         = nuova\n' +
		'| 1-Wiki name      = {{wikiName}}\n' +
		'| 2-Bot URL        = {{{botUrl}}}\n' +
		'| 3-Bot name       = {{botName}}\n' +
		'| 4-Requester name = {{requesterName}}\n' +
		'| 5-Community vote = {{{communityVote}}}\n' +
		'| 6-Comments       = {{comments}}\n' +
	'{{bEnd}}'
};