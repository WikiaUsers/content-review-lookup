/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
// UserTag
// http://dev.wikia.com/wiki/UserTags
// Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity)
 
 
window.UserTagsJS = {
	modules: {},
	tags: {
	'Przyjaciel':		{ u:'Przyjaciel wiki', m:'Przyjaciel wiki', f:'Przyjaciółka wiki', title:'Administrator zaprzyjaźnionej wiki' },
	'Próba':		{ u:'Okres Próbny', m:'Okres Próbny', f:'Okres Próbny' }
	}
};
 
UserTagsJS.modules.custom = {
// ADMINISTRATORZY
	'':		['Próba'],

 
// MODERATORZY I MODERATORZY CZATU

 
// RÓŻNE

 
// WSPÓŁPRACA - PRZYJACIELE
	'Wedkarski':		['Przyjaciel'], // Gothic Web Site
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});