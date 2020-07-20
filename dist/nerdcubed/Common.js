/* Any JavaScript here will be loaded for all users on every page load. */

/* User Tags */
window.UserTagsJS = {
	modules: {},
	tags: {
        nerdcubed: { u:'NerdCubed Staff' }
	},
	oasisPlaceBefore: ''
};

UserTagsJS.modules.custom = {
    
    /* NerdCubed Staff Tags */
    
	'Mattophobia': ['nerdcubed'], 
	'Traeonia': ['nerdcubed']
};

importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});