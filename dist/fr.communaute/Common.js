$('.centralhelpbox').click(function(){
    window.location = $(this).find('a').get(0).href
});

// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: ['en','es','de','ru','it','nl','pl','pt','pt-br','zh'],
    pageConfig: {
        namespace: 'Demande_adoption',
        namespaceId: 116,
        adoptionsPage: 'Centre_des_communautés:Adoption'
    },
    wikitextSchema: "{{bStart}}Demande d\'adoption\n" +
		"| 0-Statut            = \n" +
		"| 1-Utilisateur       = {{userName}}\n" +
		"| 2-Lien              = {{{wikiURL}}}\n" +
		"| 3-Type              = {{permissionsType}}\n" +
		"| 4-Votre_activité    = {{numDays}}\n" +
		"| 5-Activité_admin    = {{numAdmins}}\n" +
		"| 6-Raisons           = {{comments}}\n" +
		"| 7-Discussion        = {{{communityVote}}}\n" +
	"{{bEnd}}",
    i18n: {
        activeAdminsError: 'Veuillez garder à l\'esprit que s\'il y a déjà des administrateurs actifs, vous devez d\'abord les contacter pour devenir vous-même administrateur.',
        adminsActivityLabel: 'Nombre d\'admins actifs au cours des 60 derniers jours',
        adoptionButtonLabel: 'Adopter le wiki',
        alreadyAdminError: 'Vous êtes déjà administrateur sur ce wiki. Gardez à l\'esprit que vous n\'avez pas besoin d\'adopter un wiki sur lequel vous êtes déjà administrateur, sauf si vous postulez pour devenir un bureaucrate.',
        alreadyBureaucratError: 'Vous êtes déjà bureaucrate sur ce wiki. Vous n\'avez pas besoin d\'adopter ce wiki.',
        automaticQueryError: 'Le wiki n\'a pas réagit à une requête automatisée. Vous devrez remplir les valeurs demandées.',
        ccError: 'Les wikis de la marque Fandom ne sont pas disponibles à adoption.',
        closeLabel: 'Annuler',
        commentsLabel: 'Commentaires/Raisons motivant l\'adoption',
        communityVoteLabel: 'Vote de la communauté',
        invalidLanguageError: 'Pour les demandes d\'adoption internationale, veuillez développer la section \"Liens pour les requêtes d\'adoptions internationales\" et visiter le Centre des communautés de votre langue pour effectuer une demande d\'adoption.',
        invalidUrlError: 'Le format de l\'URL fourni n\'a pas été reconnu.',
        linkLabel: 'Lien',
        modalTitle: 'Demande d\'adoption',
        nameLabel: 'Nom du wiki',
        noActivityError: 'Veuillez garder à l\'esprit que vous devez avoir contribué de manière constante sur le wiki pendant une semaine avant de soumettre une demande.',
        noCommentsError: 'Veuillez tenter d\'expliquer pourquoi vous souhaitez adopter ce wiki et pourquoi vous seriez un bon administrateur.',
        noEditsError: 'Vous devez avoir contribué au wiki au cours de la semaine écoulée pour pouvoir l\'adopter.',
        noNameError: 'Veuillez insérer le nom du wiki.',
        noUrlError: 'Veuillez insérer l\'url du wiki.',
        permissionLabel: 'Type de droits',
        placeholderComments: 'Commentaires à propos de la demande d\'adoption. Veuillez nous dire pourquoi vous voulez adopter le wiki et en quoi vous êtes un bon candidat pour devenir administrateur.',
        placeholderDiscussionsPost: 'ID de la publication Discussions',
        placeholderUrl: 'https://wiki.fandom.com/fr',
        processFailError: 'Nous avons rencontré des problèmes lors de la soumission de votre demande.',
        provideCommunityVote: 'Il semble y avoir au moins quelques utilisateurs actifs sur le wiki. Pensez à créer un post de discussion décrivant votre intention d\'adopter le wiki et laissez-les donner leur avis. Si vous l\'avez déjà fait, assurez-vous d\'inclure un lien vers ce message.',
        submitError: 'Nous avons rencontré des problèmes lors de la soumission de votre demande.',
        submitLabel: 'Soumettre',
        userActivityLabel: 'Nombre de jours durant lesquels vous avez contribué au wiki sur ces 10 derniers jours'
    }
}

importArticles({
    type: "script",
    articles: [ 
       'MediaWiki:Common.js/Requests.js'
	]
});