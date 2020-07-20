/* Any JavaScript here will be loaded for all users on every page load. */

/***User Tags***/
window.UserTagsJS = {
	modules: {},
	tags: {
		// group: { associated tag data }
                Toast: 'The Captain',
                Amet: 'Italian Slut',
                Will: 'Tentacle Monster',
                Cat: 'Cat in a Bowl of Soup'
 
	}
};
//Custom
UserTagsJS.modules.custom = {
	'LizzieRose': ['Liz'],
	'CaptainMcToasty': ['Toast'],
	'Amet Revfold': ['Amet'],
	'Enderparadox': ['Will'],
	'Cat-Soup64': ['Cat']
 
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

/***Refresh***/ 
importScriptPage('AjaxRC/code.js', 'dev');