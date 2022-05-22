window.adoptInternational = {
	unsupportedLanguages: ['en','de','fr','ru','it','nl','pl','pt','pt-br','zh'],
	
	adoptionConfig: {
		activityDays: 7,
		adminsDays: 30,
		permissionTypes: [
			'bureaucrat',
			'sysop'
		]
	},
	
	pageConfig: {
		namespace: 'Solicitud',
		namespaceId: 116,
		adoptionsPage: 'Comunidad_Central:Adopciones'
	},
	
	wikitextSchema: "{{bStart}}Solicitud/encabezado|Adopciones{{bEnd}}\n" +
		"== {{wikiName}} ==\n" +
		"{{bStart}}Solicitud de adopción\n" +
		"| 0-estado                       = p <!-- No editar - (d)one / (p)ending / (r)ejected --> \n" +
		"| 1-usuario                      = {{userName}}\n" +
		"| 2-enlace                       = {{{wikiURL}}}\n" +
		"| 3-tipo                         = {{permissionsType}}\n" +
		"| 4-mi_actividad                 = {{numDays}}\n" +
		"| 5-actividad_de_administradores = {{numAdmins}}\n" +
		"| 6-comentarios                  = {{comments}}\n" +
		"| 7-votación                     = {{{communityVote}}}\n" +
	"{{bEnd}}"
};

window.botFlagInternational = {
	pageConfig: {
		namespace: 'Solicitud',
		namespaceId: 116,
		requestsPage: 'Comunidad_Central:Rango_de_bot'
	},
	titleSchema: '$2', // Page title schema for request pages. $1 is bot's name, $2 is wiki name
	wikitextSchema: '{{bStart}}Solicitud de bot\n' +
		'| 0-estado      = p\n' + // Optional
		'| 1-wiki        = {{wikiName}}\n' + // Optional
		'| 2-bot_url     = {{{botUrl}}}\n' +
		'| 3-bot         = {{botName}}\n' + // Optional
		'| 4-usuario     = {{requesterName}}\n' +
		'| 5-votación    = {{{communityVote}}}\n' +
		'| 6-comentarios = {{comments}}\n' +
	'{{bEnd}}'
};

window.interwikiInternational = {
  namespace: 'Solicitud',
  namespaceId: 116,
  mainPage: 'Comunidad_Central:Interwikis',
  
  interwikiSchema: '* {{bStart}}EnlaceInterwiki|{{from}}|{{to}}{{bEnd}}',
  pageSchema: '{{bStart}}Solicitud/encabezado|Interwikis{{bEnd}}\n\n' +
    '{{interwikis}}\n\n' +
    '~~' + '~~'
};