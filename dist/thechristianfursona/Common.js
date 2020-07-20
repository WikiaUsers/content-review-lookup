/* Any JavaScript here will be loaded for all users on every page load. */



window.UserTagsJS = {
	modules: {},
	tags: {
                 needing: { u: 'needs prayer' },
                 founder2: { u: 'co-founder' },
                 manager: { u: 'Media manager' },
                 helper: { u: 'volenteer' }
	}
};



UserTagsJS.modules.custom = {
	'USS HERO': ['founder2', 'manager'] 
};


importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});