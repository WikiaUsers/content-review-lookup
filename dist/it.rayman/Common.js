/* Il codice JavaScript inserito qui viene caricato da ciascuna pagina, per tutti gli utenti. */

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});


window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

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
UserTagsJS.modules.metafilter = {
	hello: ['muckraker'], // Remove hello group from people with muckraker group
	'vandal-patrol': ['mini-sysop'] // Remove vandal-patrol from mini-sysops
};
UserTagsJS.modules.userfilter = {
	'RexFan22': ['inactive'] // John Smith is never inactive, even when he is
};
UserTagsJS.modules.implode = {
	'mini-sysop': ['rollback', 'chatmoderator'] // Remove rollback and chatmoderator, if ALL 2 exist, and replace with 'mini-sysop'
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
	modules: {},
	tags: {
                leader: { u: 'Gestore', order: 100 },
                novandalism: { u: 'Disinfestatore di vandali', order: 101 },
		bureaucrat: { order: 1 }
	}
};
UserTagsJS.modules.custom = {
	'Nessuno': [] // NOTE: order of list here does NOT matter
};
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop'];
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});
 
// ShowHide - Tabelle espandibili (da http://dev.wikia.com/wiki/ShowHide )
importScriptPage('ShowHide/code.js', 'dev');
// END of ShowHide

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'})