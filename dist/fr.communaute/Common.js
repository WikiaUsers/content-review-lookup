$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href;
});

//=================================
// Configuration for unified CC form
//===================================
// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: ['en','es','de','ru','it','nl','pl','pt','pt-br','zh'],
    adoptionConfig: {
        activityDays: 14,
        adminsDays: 60,
        permissionTypes: [
            'sysop',
            'bureaucrat'
        ]
    },
    pageConfig: {
        namespace: 'Demande_adoption',
        namespaceId: 116,
        adoptionsPage: 'Centre_des_communautés:Adoption'
    },
    wikitextSchema: "{{bStart}}Demande adoption\n" +
        "| 0-Statut            = \n" +
        "| 1-Utilisateur       = {{userName}}\n" +
        "| 2-Lien              = {{{wikiURL}}}\n" +
        "| 3-Type              = {{permissionsType}}\n" +
        "| 4-Votre_activité    = {{numDays}}\n" +
        "| 5-Activité_admin    = {{numAdmins}}\n" +
        "| 6-Raisons           = {{comments}}\n" +
        "| 7-Discussion        = {{{communityVote}}}\n" +
    "{{bEnd}}"
};

//Configuration interwiki
window.interwikiInternational = {
        namespace: 'Demande_interwiki',
    	namespaceId: 120,
    	mainPage: 'Centre_des_communautés:Interwiki',
	interwikiSchema: '{{bStart}}LienInterwiki|{{from}}|{{to}}{{bEnd}}',
	pageSchema: '{{bStart}}Demande|interwiki{{bEnd}}\n\n' +
			'{{interwikis}}\n\n' +
			'~~' + '~~',
};

window.botFlagInternational = {
	pageConfig: {
		namespace: 'Demande_bot',
		namespaceId: 122,
		requestsPage: 'Centre_des_communautés:Bot'
	},
	titleSchema: '$1 sur $2',
	wikitextSchema: '{{bStart}}Demande|bot{{bEnd}}\n\n' +
		'{{bStart}}Demande bot\n' +
		'| 0-Statut        = \n' +
		'| 1-Nom_wiki      = {{wikiName}}\n' +
		'| 2-Lien_bot      = {{{botUrl}}}\n' +
		'| 3-Nom_bot       = {{botName}}\n' +
		'| 4-Nom_demandeur = {{requesterName}}\n' +
		'| 5-Discussion    = {{{communityVote}}}\n' +
		'| 6-Raisons       = {{comments}}\n' +
	'{{bEnd}}'
};

importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
    ]
});