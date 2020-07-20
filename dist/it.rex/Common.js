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
		bureaucrat: { u:'Bureaucrat Tag', link:'Project:Bureaucrats' },
		inactive: { u: 'Has not edited recently' }
	}
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'rollback', 'bannedfromchat', 'blocked'];
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