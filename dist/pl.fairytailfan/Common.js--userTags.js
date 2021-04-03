// UserTag
// http://dev.wikia.com/wiki/UserTags
// Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity)


window.UserTagsJS = {
	modules: {},
	tags: {
	'Redaktor Magazynu': 		{ u:'Redaktor Magazynu', m:'Redaktor Magazynu', f:'Redaktorka Magazynu' },
	'Redaktor Naczelny': 		{ u:'Redaktor Naczelny', m:'Redaktor Naczelny', f:'Redaktorka Naczelna' },
	'Edytor': 		{ u:'Edytor', m:'Edytor', f:'Edytorka' }
	}
};

UserTagsJS.modules.custom = {
// RÓŻNE
	'Gilrean Ringerin':		['Redaktor Naczelny'],
	'Danse no Macabre':		['Edytor'],
	'Taiyo Ninja':		['Redaktor Magazynu'],

UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});