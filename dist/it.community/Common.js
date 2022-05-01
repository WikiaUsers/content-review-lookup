//=======================================
//       Variabili per le funzioni
//=======================================
// User Tags
window.UserTagsJS = {
	modules: {},
	tags: {}
};
UserTagsJS.modules.inactive = 30;
UserTagsJS.modules.newuser = true;
UserTagsJS.modules.autoconfirmed = true;
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global', 'staff', 'helper', 'vstf'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat', 'founder'],
	bureaucrat: ['founder'],
	chatmoderator: ['sysop', 'bureaucrat']
};

//==============================================
//  Configurazione per le richieste di diritti
//==============================================

window.adoptInternational = {
	unsupportedLanguages: ['en','es','de','fr','ru','nl','pl','pt','pt-br','zh'],
	pageConfig: {
		namespace: 'Richiesta',
		namespaceId: 118,
		adoptionsPage: 'Wiki_della_Community:Richieste_di_diritti'
	},
	wikitextSchema: "{{bStart}}Richiesta di diritti\n" +
                    "| 0-status              = nuova\n" +
                    "| 1-user                = {{userName}}\n" +
                    "| 2-link_to_wiki        = {{{wikiURL}}}\n" +
                    "| 3-type                = {{permissionsType}}\n" +
                    "| 4-your_activity       = {{numDays}}\n" +
                    "| 5-admin_activity      = {{numAdmins}}\n" +
                    "| 6-your_motivation     = {{comments}}\n" +
                    "| 7-community_vote      = {{{communityVote}}}\n" +
                    "{{bEnd}}",
	i18n: {
		activeAdminsError: 'Ricorda che, se ci sono amministratori attivi, dovresti contattarli prima di inviare una richiesta di adozione.',
		adminsActivityLabel: 'Numero di amministratori attivi negli ultimi 60 giorni',
		adoptionButtonLabel: 'Adotta wiki',
		alreadyAdminError: 'Sei già amministratore su questa wiki. Tieni presente che non è necessario adottare una wiki di cui sei già amministratore a meno che tu non stia facendo domanda per diventare un burocrate.',
		alreadyBureaucratError: 'Sei già burocrate su questa wiki. Non è necessario che adotti questa wiki.',
		automaticQueryError: 'La wiki non ha risposto alla query automatica. Dovrai inserire i dettagli richiesti manualmente.',
		ccError: 'Non puoi adottare una wiki ufficiale di Fandom.',
		closeLabel: 'Annulla',
		commentsLabel: 'Commenti/Ragioni della richiesta',
		communityVoteLabel: 'Voto degli altri utenti',
		defaultStatus: 'nuova',
		invalidLanguageError: 'Per richieste internazionali, espandi la sezione dedicata alle richieste internazionali e visita la Wiki della Community (Community Central) della tua lingua per sottoscrivere una richiesta.',
		invalidUrlError: 'Il formato dell\'url fornito non è riconosciuto.',
		linkLabel: 'Link',
		modalTitle: 'Richiesta di adozione',
		nameLabel: 'Nome della wiki',
		noActivityError: 'Ricorda che dovresti aver contribuito alla wiki in modo continuativo per una settimana prima di inviare una richiesta di promozione.',
		noCommentsError: 'Per favore, prova a dichiarare il motivo per cui vuoi adottare questa wiki e perché saresti adatto come amministratore.',
		noEditsError: 'Devi avere modificato la wiki nell\'ultima settimana per poter essere promosso.',
		noNameError: 'Inserisci il nome della wiki.',
		noUrlError: 'Inserisci l\'url della wiki.',
		permissionLabel: 'Tipo di diritti',
		placeholderComments: 'Spiega perché vuoi ottenere questi diritti e perché ritieni di essere un buon candidato.',
		placeholderDiscussionsPost: 'ID del post di discussione',
		placeholderUrl: 'https://wiki.fandom.com/it',
		processFailError: 'Si è verificato un problema durante l\'elaborazione della tua richiesta.',
		provideCommunityVote: 'Sembra che ci siano altri utenti attivi sulla wiki. Ti invitiamo a considerare la creazione di un post di Discussioni per dichiarare la tua intenzione di adottare la wiki e lasciare che forniscano la loro opinione a riguardo. Se lo hai già fatto, assicurati di includere un link a quel post.',
		submitError: 'Si è verificato un problema durante l\'elaborazione della tua richiesta.',
		submitLabel: 'Invia',
		userActivityLabel: 'In quanti degli ultimi dieci giorni hai modificato la wiki?'
	}
};