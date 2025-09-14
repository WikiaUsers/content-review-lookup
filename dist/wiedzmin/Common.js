/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

/* Tagi profilów */
window.UserTagsJS = {
	modules: {},
	tags: {
		founder: { u:'Założyciel', link:'Project:Weterani' },
		bureaucrat: { u:'Biurokrata_ka', m:'Biurokrata', f: 'Biurokratka', link:'Project:Administracja' },
		sysop: { u:'Administrator_ka', m:'Administrator', f: 'Administratorka', link:'Project:Administracja' },
		contentsysop: { u:'Administrator_ka treści', m:'Administrator treści', f: 'Administratorka treści', link:'Project:Administracja' },
		threadsysop: { u:'Administrator_ka dyskusji', m:'Administrator dyskusji', f: 'Administratorka dyskusji', link:'Project:Administracja' },
		contentmoderator: { u:'Moderator_ka treści', m:'Moderator treści', f: 'Moderatorka treści', link:'Project:Administracja' },
		threadmoderator: { u:'Moderator_ka dyskusji', m:'Moderator dyskusji', f: 'Moderatorka dyskusji', link:'Project:Administracja' },
		technik: { u:'Administrator_ka techniczny_a', m:'Administrator techniczny', f: 'Administratorka techniczna', link:'Project:Administracja' },
		weteran: { u: 'Weteran_ka', m:'Weteran', f:'Weteranka', link:'Project:Weterani' },
		blocked: { u: 'Zablokowany_a', m:'Zablokowany', f:'Zablokowana' },
		newuser: { u: 'Nowy_a użytkownik_czka', m:'Nowy użytkownik', f:'Nowa użytkowniczka' },
		inactive: { u: 'Nieaktywny_a', m:'Nieaktywny', f:'Nieaktywna' },
		tt: { u: 'Zwycięzca Turnieju Trójtwórczego 2021' },
	}
};

UserTagsJS.modules.custom = {
	// Spersonalizowane dla obecnego składu
	'Dawid2': ['technik'],
	// Weterani
	'Leim': ['founder', 'weteran'],
	'Janek': ['weteran'],
	'W-Eamon': ['weteran'],
	'Glifion': ['weteran'],
	'WITCHER-Sum': ['weteran'],
	'Ausir-fduser': ['weteran'],
	'Game widow': ['weteran'],
	'Dyrektor Internetu': ['weteran'],
	'Neggev': ['weteran'],
	'ProOski': ['weteran'],
	'Isteres': ['weteran'],
	'NexGaming27': ['weteran'],
	'Ex q': ['weteran'],
	'Krętacz': ['weteran'],
	'Xardan': ['weteran'],
	'Xendou': ['weteran'],
	'Pio387': ['weteran'],
	'Wedkarski': ['weteran'],
	'Railfail536': ['weteran'],
	'Stygies VIII': ['weteran'],
	'Diode24q': ['weteran'],
	'Yrbeth': ['weteran'],
	'NephriteKnight': ['weteran'],
	'DeRudySoulStorm': ['weteran'],
	'Noxski': ['weteran'],
	'DuckeyD': ['weteran'],
	'Krzychukarniak': ['weteran'],
	// Inne
	'Mattibu': ['tt']
};

UserTagsJS.modules.metafilter = {
	'sysop': ['bureaucrat', 'technik', 'bot'],
};

UserTagsJS.modules.implode = {
	'contentsysop': ['sysop', 'contentmoderator'],
	'threadsysop': ['sysop', 'threadmoderator']
};

UserTagsJS.modules.inactive = {
	days: 60,
	zeroIsInactive: false
};


/* WDSIcons */
importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });

mw.hook('dev.wds').add(function(wds) {
	mw.hook('wikipage.content').add(function() {
    wds.render('.bar');
	});
});