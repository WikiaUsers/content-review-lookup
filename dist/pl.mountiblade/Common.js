window.UserTagsJS = {
	modules: {},
	tags: {
	'Plakietka1':		{ u:'Technik'},
	'Plakietka2':		{ u:'Młodszy technik'}
	}
};
 
UserTagsJS.modules.custom = {
	'Marcopolo99':		['Plakietka2'],
	'Adi4510':		['Plakietka2']
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};

importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});