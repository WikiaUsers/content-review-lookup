/* Any JavaScript here will be loaded for all users on every page load. */
window.adoptRetainInternational = {
	unsupportedLanguages: [],
	requirementsConfig: {
		activityDays: 14,
		permissionTypes: [
			'sysop',
			'bureaucrat'
		]
	},
	pageConfig: {
		namespace: 'Adoption_retain',
		namespaceId: 114,
		requestsPage: 'Community_Central:Adoption_retain'
	},
	wikitextSchema: 'Fancy things!\n' +
	'* User name: {{userName}}\n' +
	'* Wiki name: {{wikiName}}\n' +
	'* Wiki URL: {{{wikiURL}}}\n' +
	'* Permissions type: {{permissionsType}}\n' +
	'* Days edited: {{numDays}}\n' +
	'* Provided reason: {{comments}}\n' +
	'* Provided discussion: {{{communityVote}}}\n\n' +
	'Foxes rule'
};