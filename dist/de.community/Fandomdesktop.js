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
        adoptionsPage: 'Rechte-Antrag'
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