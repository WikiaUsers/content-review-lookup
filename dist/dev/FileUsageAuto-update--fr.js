LIR.i18n.fr= {
	queueModalTitle: 'Liste de la mise à jour de l\'utilisation des fichiers',
	fileNamespace: 'Fichier',
	imageNamespace: 'Image',
	videoNamespace: 'Vidéo',
    using: 'Utilisant',
	queue: 'Queue',
	userBlogCommentNamespace: 'Commentaire blog utilisateur', // Will always use the translated version because it's returned from the API (hopefully)
	editSummary: 'Mise à jour des liens des fichiers (automatique)',
	filesInQueue: 'Fichiers dans la liste',
	oldFileName: 'Ancien nom du fichier',
	newFileName: 'Nouveau nom du fichier',
	addToQueue: 'Ajouter à la liste',
	nameInUse: 'Le nom de destination est déjà dans la liste des fichiers à renommer ou est actuellement utilisé.',
	alreadyInQueue: 'Fichier déjà ajouté à la liste.',
	invalidExtension: 'Extension de fichier invalide.',
	blogComment: 'Fichier utilisé dans un commentaire de blog. Impossible de mettre à jour les fichiers dans les commentaires de blog.',
	fileNotUsed: 'Fichier utilisé sur aucune page.',
	noQueueExists: 'Aucune liste n\'existe pour être exécutée',
	itemRemoved: 'Élément retiré',
	destInUse: 'Le nom de destination est déjà utilisé.',
	processing: 'Traitement...',
	successful: 'Succès.',
	varsUndef: 'Variables indéfinies, vérifiez le code.',
	queueComplete: 'Exécution de la liste terminée',
	queueStarted: 'Exécution de la liste démarrée',
	contentsRetrieved: 'Contenu de la page retrouvé et enregistré',
	queueUpdate: 'Liste mise à jour',
	nothingInQueue: 'Il n\'y a rien dans la liste pour le moment.',
	tryDiffName: 'Merci d\'entrer un nom de fichier.',
	waitCleared: 'Liste des pages en attente blanchie',
	toUndef: 'La variable "To" n\'est pas précisée.',
	fileNameBlank: 'Le nom du fichier ne peut être laissé vide',
	submittingContent: 'Soumission du contenu de la page',
	namespaceCheckbox: 'Inclure les <span style="font-weight: bold">liens</span> dans tous les espaces de noms(ex: [[:Fichier:NomDuFichier.png]] <span style="font-size: 9px;">(Seul l\'espace de nom principal est inclus par défaut)</span>',
	failedDescription: 'Les erreurs apparaissent ici après l\'exécution. Notez que les pages pour lesquelles le fichier est inclus à travers un modèle apparaîtront aussi ici en tant qu\'erreurs.',
	pagesWaiting: 'Les pages attendent toujours d\'être ajoutées à la liste. Si ce n\'est pas le cas, utilisez le bouton "Réinitialiser la liste d\'attente" pour pouvoir exécuter la liste.',
	unableToMoveChoose: 'Merci d\'entrer un autre nom de destination pour ce fichier.',
	unableToMoveFail: /* Image name */ 'a été retiré de la liste.',
	singleButtonText: 'Renommer et mettre à jour',
	queueButtonText: 'Ajouter à la liste',
	fileInQueue: 'Ce fichier est actuellement dans votre liste de fichiers à renommer !',
	removeFromQueue: 'Retirer de la liste',
	queueModalClose: 'Fermer',
	queueModalManual: 'Ajouter manuellement',
	queueModalReset: 'Réinitialiser la liste d\'attente',
	queueModalUpdate: 'Rafraîchir',
	queueModalExecute: 'Exécuter',
	queueAddition: 'Ajout à la liste',
	manualModalDescription: 'Entrez le nom d\'un fichier (ou le nom précédent) avec des liens cassés pour mettre à jour manuellement. Notez que l\'ancien fichier n\'est pas obligé d\'exister, ça ne prendra en compte que les liens. Si l\'ancien fichier existe, il ne sera <span style="font-weight: bold">pas</span> renommé.',
	
	queueModalWaitConfirm: [
		'Ceci initialisera la liste des pages attendant d\'être ajoutées à la liste dans le cas où il y aurait un problème lors du traitement d\'une page vous empêchant d\'exécuter la liste.',
		'Notez qu\'il y a encore',
		/* Number of pages */
		'page(s) en attente d\'être ajoutées à la liste. Si vous êtes absolument sûr de n\'avoir actuellement aucune page ouverte qui est en attente pour être traitée ou qu\'un problème est survenu qui a stoppé le processus, alors cliquez sur "OK" pour blanchir la liste des fichiers en attente.',
		'Si vous avez des pages attendant d\'être traitées, vous devrez les actualiser et les soumettre à nouveau pour être ajoutées à la liste.'
	],
	waitList: [
		'Nombre',
		/* number on waitlist */
		'de fichiers sur la liste d\'attente'
	],
	unableToFind: [
		'Impossible de trouver',
		/* Image Name */
		'sur la page',
		/* Page Name */
		'il est possible qu\'elle soit incluse à travers un modèle. Merci de vérifier manuellement si besoin.'
	],
	unableToMove: [
		'Le fichier',
		/* Image Name */
		'n\'a pas pu être renommé en',
		/* Image Name */
		'pour la raison suivante :'
		/* error code */
	],
	unableToSubmit: [
		'La page',
		/* Page Name */
		'n\'a pas pu être soumise à cause du code d\'erreur suivant :',
		/* Image Name */
		'Merci de mettre à jour le(s) lien(s) sur la page manuellement.'
	],
	movePageNamespaceSelect: [
		'n\'affecte que',
		/* Single button name */
		'option'
	],
	movePageDescription: [
		'Le bouton',
		/* Single button name */
		'met à jour l\'utilisation du fichier à travers les pages pour une seule image tandis que le bouton',
		/* Multi button name */
		'ajoute l\'utilisation du fichier de l\'image à une liste pour être mis à jour en une seule fois en groupe. En mettant à jour l\'utilisation des fichiers en utilisant la liste, les utilisations localisées sur les pages sont regroupées en une seule modification plutôt qu\'une modification par utilisation. On peut accéder à la liste et l\'exécuter sur n\'importe quelle page de fichier dans le menu déroulant de modification (sous "Modifier"). Notez qu\'une liste enregistrée est locale au navigateur utilisé et ne tient pas compte des autres navigateurs/ordinateurs.'
	],
	
	movePageInfo: [
		'Script mis à jour',
		/* date */
		'Plus d\'informations à propos des mises à jour et fonctionnalités se trouvent <a href="//dev.fandom.com/wiki/FileUsageAuto-update">ici</a> (en anglais). Merci de reporter les bugs ou remplacements défectueux en détail sur la page de discussion.'
	]
};