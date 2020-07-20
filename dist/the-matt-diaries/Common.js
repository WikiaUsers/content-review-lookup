/* Any JavaScript here will be loaded for all users on every page load. */

/* Usertags - Credit to Gallows Hill Wiki - OldOneX */
window.UserTagsJS = {
	modules: {},
	tags: {
		writer: { u: 'Writer', order: 100 },
                designer: { u: 'Designer', order: 101 },
                coder: { u: 'Coder', order: 102 }
                
	}
};
UserTagsJS.modules.custom = {
	'OldOneX': ['designer', 'coder'],
        'TheMattDiaries': ['writer']
 // NOTE: order of list here does NOT matter
};
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});