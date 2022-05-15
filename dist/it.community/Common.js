//=======================================
//       Variabili per le funzioni
//=======================================
// User Tags
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'staff', 'helper', 'vstf'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};

//==============================================
//  Configurazione per le richieste di diritti
//==============================================

window.adoptInternational = {
    unsupportedLanguages: ['de','en','es','fr','nl','pl','pt','pt-br','ru','zh'],
    adoptionConfig: {
        activityDays: 30,
        adminsDays: 60,
        permissionTypes: [
            'bureaucrat',
            'sysop'
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