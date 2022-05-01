window.adoptInternational = {
	unsupportedLanguages: ['en','de','fr','ru','it','nl','pl','pt','pt-br','zh'],
	
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
	"{{bEnd}}",
	
	i18n: {
		activeAdminsError: 'Ten en cuenta que si hay administradores activos, deberías de contactarlos antes de intentar convertirte en administrador.',
		adminsActivityLabel: 'Número de administradores activos en los últimos 60 días',
		adoptionButtonLabel: 'Adoptar wiki',
		alreadyAdminError: 'Ya eres administrador en este wiki. Recuerda que no necesitas adoptar un wiki donde ya eres administrador a menos que estés intentando convertirte en burócrata.',
		alreadyBureaucratError: 'Ya eres burócrata en este wiki, por lo que no necesitas adoptarlo.',
		automaticQueryError: 'El wiki no respondió a la consulta automatizada. Tedrás que llenar los campos manualmente.',
		ccError: 'Los wikis oficiales de Fandom no pueden ser adoptados.',
		closeLabel: 'Cancelar',
		commentsLabel: 'Comentarios o motivación',
		communityVoteLabel: 'Votación de la comunidad',
		invalidLanguageError: 'Estás intentando adoptar un wiki en otro idioma. Consulta la sección de enlaces para solicitudes de adopción internacionales y visita la Comunidad Central que corresponde al idioma del wiki que intentas adoptar.',
		invalidUrlError: 'No se reconoce el formato del enlace provisto.',
		linkLabel: 'Enlace',
		modalTitle: 'Solicitud de adopción',
		nameLabel: 'Nombre del wiki',
		noActivityError: 'Ten en cuenta que debes de haber contribuido consistentemente en el wiki durante una semana antes de realizar tu solicitud.',
		noCommentsError: 'Por favor deja algunos motivos por los que quieres adoptar este wiki y porqué serías apto para ser administrador.',
		noEditsError: 'Debes de haber contribuido en el wiki durante la última semana para poder adoptarlo.',
		noNameError: 'Ingresa el nombre del wiki.',
		noUrlError: 'Ingresa el enlace del wiki.',
		permissionLabel: 'Tipo de permisos',
		placeholderComments: 'Comentarios sobre la solicitud de adopción. Cuéntanos porqué quieres adoptar el wiki y el motivo por el que eres un buen candidato para ser administrador.',
		placeholderDiscussionsPost: 'Identificador de la publicación de Discussions',
		placeholderUrl: 'https://wiki.fandom.com/',
		processFailError: 'Hubo un problema al procesar tu solicitud.',
		provideCommunityVote: 'Parece haber algunos usuarios activos en el wiki. Considera crear una publicación en Discussions describiendo tu intención de adoptar el wiki, y permite que dejen su opinión. Si ya lo hiciste, asegúrate de incluir un enlace a esa publicación.',
		submitError: 'Hubo un problema al intentar enviar tu solicitud.',
		submitLabel: 'Enviar',
		userActivityLabel: 'Número de días que has editado en los últimos 10 días'
	}
};