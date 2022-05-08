if ( mw.config.get('wgPageName') === 'Adoption_requests_(PL)' ) {

// Adopt International config – Polish
window.adoptInternational = {
	unsupportedLanguages: ['en','es','de','fr','ru','it','nl','pt','pt-br','zh'],
	pageConfig: {
		namespace: 'Adopcja',
		namespaceId: 114,
		adoptionsPage: 'Adoption_requests_(PL)'
	},
	adoptionConfig: {
		activityDays: 7,
		adminsDays: 30,
		permissionTypes: [
			'bureaucrat',
			'sysop'
		]
	},
	wikitextSchema: "{{bStart}}Prośba o adopcję\n" +
		"| 0-Status              = Otwarta\n" +
		"| 1-Użytkownik          = {{userName}}\n" +
		"| 2-URL Wiki            = {{{wikiURL}}}\n" +
		"| 3-Uprawnienia         = {{permissionsType}}\n" +
		"| 4-Dni edycje          = {{numDays}}\n" +
		"| 5-Dni administratorzy = {{numAdmins}}\n" +
		"| 6-Powód               = {{comments}}\n" +
		"| 7-URL Dyskusja        = {{{communityVote}}}\n" +
	"{{bEnd}}"
};
}