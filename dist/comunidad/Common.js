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