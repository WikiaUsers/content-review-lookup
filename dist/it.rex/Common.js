/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

// User Tags
window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};

window.UserTagsJS = {
	modules: {},
	tags: {
		bureaucrat: { u:'Burocrate', link:'Project:Amministratori#Strumenti_dei_burocrati' },
		sysop: { u:'Amministratore', link:'Project:Amministratori#Strumenti_degli_amministratori' },
		inactive: { u: 'Inattivo' }
	}
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'blocked'];
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.newuser = false;
UserTagsJS.modules.nonuser = true; // Switch on
UserTagsJS.modules.inactive = 35; // Inactive if no edits in 35 days
UserTagsJS.modules.mwGroups = ['bureaucrat']; // Add bureaucrat group to bureaucrats

//===================================
//       Importazioni funzioni
//===================================
importArticles({
    type: 'script',
    articles: [
        // User Tags
        'w:dev:UserTags/code.js',
        // ShowHide
        'w:dev:ShowHide/code.js'
    ]
});