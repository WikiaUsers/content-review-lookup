// UserTag
// http://dev.wikia.com/wiki/UserTags
// Autor: Lunarity (http://dev.wikia.com/wiki/User:Lunarity)


window.UserTagsJS = {
	modules: {},
	tags: {
	'Pirate-Community':		{ u:'Pirate-Community' },
	}
};

UserTagsJS.modules.custom = {

// RÓŻNE
	'Rulezetz':		['Pirate-Community'],
	'Maximalcon':		['Pirate-Community'],
	'Priophai':		['Pirate-Community'],
};

UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});