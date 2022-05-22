// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: ['en','es','fr','ru','it','nl','pl','pt','pt-br','zh'],
	adoptionConfig: {
		activityDays: 7,
		adminsDays: 30,
		permissionTypes: [
			'sysop',
			'content-moderator',
			'bureaucrat'
		]
	},
    pageConfig: {
        namespace: 'Antrag',
        namespaceId: 118,
        adoptionsPage: 'Wiki-Adoptionen'
    },
    wikitextSchema: "{{bStart}}Wiki-Adoption\n" +
		"| 0-Status              = \n" +
		"| 1-Benutzername        = {{userName}}\n" +
		"| 2-Wiki-Adresse        = {{{wikiURL}}}\n" +
		"| 3-Benutzerrecht       = {{permissionsType}}\n" +
		"| 4-Eigene_Aktivität    = {{numDays}}\n" +
		"| 5-Admin-Aktivität     = {{numAdmins}}\n" +
		"| 6-Kommentar           = {{comments}}\n" +
		"| 7-Diskussion          = {{{communityVote}}}\n" +
	"{{bEnd}}"
};
// Interwiki configuration
window.interwikiInternational = {
  namespace: 'Antrag',
  namespaceId: 118,
  mainPage: 'Interwiki-Anfragen',
  
  interwikiSchema: '{{bStart}}InterwikiLink|{{from}}|{{to}}{{bEnd}}',
  pageSchema: '{{bStart}}Interwiki-Header{{bEnd}}\n\n' +
    '{{interwikis}}\n\n' +
    '~~' + '~~'
};
window.botFlagInternational = {
	pageConfig: {
		namespace: 'Antrag',
		namespaceId: 118,
		requestsPage: 'Bot-Rechte'
	},
	titleSchema: '$1 (Bot für $2)',
	wikitextSchema: '{{bStart}}Bot-Rechte-Antrag\n' +
		'| 0-Status         = \n' +
		'| 1-Wikiname       = {{wikiName}}\n' +
		'| 2-BotURL         = {{{botUrl}}}\n' +
		'| 3-Botname        = {{botName}}\n' +
		'| 4-Antragsteller  = {{requesterName}}\n' +
		'| 5-Erlaubnis      = {{{communityVote}}}\n' +
		'| 6-Kommentar      = {{comments}}\n' +
	'{{bEnd}}'
};