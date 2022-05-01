// Configuration for adoptions form
window.adoptInternational = {
    unsupportedLanguages: ['en','es','fr','ru','it','nl','pl','pt','pt-br','zh'],
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
	"{{bEnd}}",
    i18n: {
        activeAdminsError: 'Es sind aktive Admins im Wiki. Wende dich für die Frage nach Adminrechten zuerst an die vorhandenen Admins.',
        adminsActivityLabel: 'Anzahl der in den letzten 60 Tagen aktiven Admins',
        adoptionButtonLabel: 'Wiki adoptieren',
        alreadyAdminError: 'Du bist bereits Admin. Sofern du nicht Bürokrat werden willst, musst du das Wiki nicht adoptieren',
        alreadyBureaucratError: 'Du bist bereits Bürokrat und musst das Wiki daher nicht adoptieren.',
        automaticQueryError: 'Die automatische Datenabfrage ist gescheitert. Du must das Formular manuell ausfüllen.',
        ccError: 'Das Community-Wiki kann nicht adoptiert werden.',
        closeLabel: 'Abbrechen',
        commentsLabel: 'Kommentar/Grund für die Adoption',
        communityVoteLabel: 'Community-Abstimmung',
        invalidLanguageError: 'For international adoption requests, please expand the International adoption request links section and visit the Community Central for your language to make an adoption request.',
        invalidUrlError: 'Das URL-Format wurde nicht erkannt.',
        linkLabel: 'Link',
        modalTitle: 'Wiki-Adoption',
        nameLabel: 'Wikiname',
        noActivityError: 'Denke daran, dass du das Wiki regelmäßig bearbeiten musst, um es adoptieren zu können.',
        noCommentsError: 'Sag uns, warum du dieses Wiki übernehmen möchtest und warum du als Administrator gut geeignet wärst.',
        noEditsError: 'Denke daran, dass du das Wiki regelmäßig bearbeiten musst, um es adoptieren zu können.',
        noNameError: 'Gib bitte den Namen des Wikis an.',
        noUrlError: 'Gib bitte die URL des Wikis an.',
        permissionLabel: 'Beantragtes Benutzerrecht',
        placeholderComments: 'Kommentare zum Antrag. Sag uns, warum du dieses Wiki übernehmen möchten und warum du als Administrator gut geeignet wärst.',
        placeholderDiscussionsPost: 'Post-ID',
        placeholderUrl: 'https://wiki.fandom.com/de',
        processFailError: 'Es gab Probleme beim Speichern deines Antrages.',
        provideCommunityVote: 'Es scheint mindestens einen anderen aktiven Benutzer im Wiki zu geben. Erstelle bitte einen Diskussionsbeitrag in dem du die anderen Benutzer nach Feedback zu deinen Adoptionsplänen fragst und verlinke die Diskussion hier.',
        submitError: 'Es gab ein Problem beim Speichern deines Antrages.',
        submitLabel: 'Speichern',
        userActivityLabel: 'An wie vielen der letzten 10 Tage hast du das Wiki bearbeitet?'
    }
};