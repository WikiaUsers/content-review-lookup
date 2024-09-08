/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* TAGI PROFILÓW użytkowniczek i użytkowników */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Założyciel' },
		bureaucrat: { u:'Biurokrata_ka', m:'Biurokrata', f: 'Biurokratka' },
		sysop: { u:'Administrator_ka', m:'Administrator', f: 'Administratorka' },
		contentmoderator: { u:'Moderator_ka treści', m:'Moderator treści', f: 'Moderatorka treści' },
		threadmoderator: { u:'Moderator_ka dyskusji', m:'Moderator dyskusji', f: 'Moderatorka dyskusji' },
		formerbureaucrat: { u: 'Były_a biurokrata_ka', m:'Były biurokrata', f:'Była biurokratka' },
		formersysop: { u: 'Były_a administrator_ka', m:'Były administrator', f:'Była administratorka' },
		formercontentmodeator: { u: 'Były_a moderator_ka treści', m:'Były moderator treści', f:'Była moderatorka treści' },
		formerthreadmoderator: { u: 'Były_a moderator_ka dyskusji', m:'Były moderator dyskusji', f:'Była moderatorka dyskusji' },
		blocked: { u: 'Zablokowany_a', m:'Zablokowany', f:'Zablokowana' },
		inactive: { u: 'Nieaktywny_a', m:'Nieaktywny', f:'Nieaktywna' }
	}
};

UserTagsJS.modules.custom = {
	'Dawid2': ['founder']
};

UserTagsJS.modules.metafilter = {
	'sysop': ['bot']
};

UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: false
};

/* PODTYTUŁY by Szynka013, Luqreg */ 
	$(".page-header__title").after('<div class="page-header__page-subtitle">' + $("span.changePageTitle").text() + '</div>');

/* DWA MODUŁY */
window.AddRailModule = ['Szablon:Aktualności', 'Szablon:Discord'];