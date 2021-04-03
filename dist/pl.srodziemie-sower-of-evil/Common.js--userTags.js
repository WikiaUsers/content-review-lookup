/****************************/
/* Skopiowane z Gothicpedii */
/****************************/
// UserTag
// http://dev.wikia.com/wiki/UserTags
// Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity)


window.UserTagsJS = {
	modules: {},
	tags: {
	'Skrypter':		{ u:'Skrypter', m:'Skrypter', f:'Skrypterka', title:'Administrator techniczny' },
	'Ekspert od screenów':	{ u:'Ekspert od screenów', m:'Ekspert od screenów', f:'Ekspertka od screenów' },
	'Ekspert od zadań':	{ u:'Ekspert od zadań', m:'Ekspert od zadań', f:'Ekspertka od zadań' },
	'Twitter':		{ u:'Operator konta GP na Twitterze' },
	'Weteran': 		{ u:'Weteran', m:'Weteran', f:'Weteranka' },
	'Przyjaciel':		{ u:'Przyjaciel wiki', m:'Przyjaciel wiki', f:'Przyjaciółka wiki', title:'Administrator zaprzyjaźnionej wiki' },
	'Moderator':		{ u:'Moderator', m:'Moderator', f:'Moderatorka' },
	'Przewodnik':		{ u:'Przewodnik', m:'Przewodnik', f:'Przewodniczka' }
	}
};

UserTagsJS.modules.custom = {

// RÓŻNE
	'Cassidy005':		['Weteran'],
	'Diode24q':		['Weteran'],
	'GothicFan94':		['Ekspert od screenów'],
	'JaguarPL':		['Weteran'],
        'Jao98':		['Ekspert od screenów'],
	'Kubar906':		['Ekspert od screenów', 'Weteran'],
	'Kubusiek24':		['Weteran'],
	'Lother':		['Ekspert od screenów'],
	'Lord of Pain Duriel':	['Weteran'],
	'Masiq':		['Weteran'],
	'Ossowski21':		['Ekspert od screenów'],
	'Paskudnik':		['Weteran'],
	'Prooskar':		['Weteran'],
	'RuthlessChimpanzee':	['Weteran'],
	'SpY':			['Weteran'],
	'TheSwordsman2':	['Weteran'],
	'Vuh':			['Skrypter','Przyjaciel'],
	'Wojciech Wawrzyńczak':	['Ekspert od zadań'],

// WSPÓŁPRACA - PRZYJACIELE
	'Pan Tak':		['Przyjaciel'], // Gothic Web Site
	'Baakamono':		['Przyjaciel'], // Bleach Wiki
	'Talho':		['Przyjaciel'], // Bleach Wiki
	'Gardian Grot':		['Przyjaciel'], // Marvel Wiki
	'Kubar906':		['Przyjaciel'], // Assassin's Creed Wiki
	'DarknessEyes27':	['Przyjaciel'], // Assassin's Creed Wiki
	'Pio387':		['Przyjaciel'], // Śródziemie Wiki
	'Neggev':		['Przyjaciel'], // Wiedźmińska Wiki
	'NexGaming27':		['Przyjaciel']  // Machinima Gothic Wiki
};

UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});