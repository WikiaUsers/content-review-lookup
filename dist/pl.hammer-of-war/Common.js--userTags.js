/* Plakietki. */
window.UserTagsJS = {
	modules: {},
	tags: {
	'Zasłużony':		{ u:'Zasłużony' },
	'Bot':		        { u:'Bot' }
	}
};
 
UserTagsJS.modules.custom = {
	'Don Chris':		['Zasłużony'],
	'Donmaślanoz14':	['Zasłużony'],
	'Sienixxx':		['Zasłużony'],
	'AdiBot':		['Bot']
};
 
UserTagsJS.modules.mwGroups = ['bureaucrat'];
UserTagsJS.modules.metafilter = {
	sysop: ['bureaucrat']
};
 
importArticles({type: "script",article: ["u:dev:UserTags/code.js"]});