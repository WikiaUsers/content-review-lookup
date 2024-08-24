/*Colores de los usuarios*/

a[href$=":MorderitaKawai :3"] {
	color: Pink;
	font-family: 'Pristina';
	font-weight: Bold;
        font-size: 100%;
        text-shadow: 1px 1px 1px BlueViolet;
}
a[href$=":Candy_Girl :3"] {
	color: DeepPink;
	font-family: 'Freestyle Script';
	font-weight: Bold;
        font-size: 100%;
        text-shadow: 1px 1px 1px Pink
	
}

//Custom user tags
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
	window.UserTagsJS = {
		modules: {
			inactive: { // Edits must be to content namespaces
				days: 25,
				namespaces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
				zeroIsInactive: false
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'mediawiki', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			newuser: true,
			metafilter: {
				bot: ['bot-global'],
				sysop: ['bureaucrat'],
			},
		}
	};
 
window.UserTagsJS = {
	modules: {},
	tags: {
		rollback: { u: 'Reversor' },
		rollback2: { u: 'Reversora' },
		chatmoderator: { u: 'Moderador del chat' },
		chatmoderator2: { u: 'Moderadora del chat' },
		sysop: { u: 'Administrador' },
		sysop2: { u: 'Administradora' },
		bureaucrat: { u: 'Burócrata' },
		founder: { u: 'Fundador' },
		founder2: { u: 'Fundadora' },
	}
};
 
UserTagsJS.modules.custom = {
	'MorderitaKawai :3': ['founder2'],
	'Candy Girl :3': ['sysop2'],['bureaucrat']